import flask
from firebase_admin import firestore, storage
import PyPDF2
import docx2txt
import urllib.request
import os.path
import urllib.parse
from io import BytesIO, StringIO
from pdfminer.pdfparser import PDFParser
from pdfminer.converter import XMLConverter, HTMLConverter, TextConverter, PDFConverter, LTContainer, LTText, LTTextBox, LTImage
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter, PDFPage
import yake
from .helpers.AnalysisAndChatCreation import addAnalysisToDocument
from datetime import datetime
from babel.dates import format_date

MAX_FILE_SIZE_MB = 3 

def pdf_from_url_to_txt(url, user_id):
    # Parse the filename from the URL
    filename = os.path.basename(urllib.parse.urlparse(url).path)
    decoded_filename = urllib.parse.unquote(filename)
    print("Filename:", decoded_filename)

    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
    f = urllib.request.urlopen(url).read()
    
    # Calculate the size of the downloaded document
    file_size_mb = len(f) / (1024 * 1024)  # Size in MB
    if file_size_mb > MAX_FILE_SIZE_MB:
        return None, "File size exceeds the limit of 3MB"
    
    print("File extension:", file_size_mb)
    # Configure bucket
    bucket = storage.bucket()
    blob = bucket.blob(f"users/{user_id}/{filename}")
    blob.upload_from_string(f)

    blob.make_public()
    public_url = blob.public_url
    
    fp = BytesIO(f)
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos = set()
    for page in PDFPage.get_pages(fp,
                                  pagenos,
                                  maxpages=maxpages,
                                  password=password,
                                  caching=caching,
                                  check_extractable=True):
        interpreter.process_page(page)
    fp.close()
    device.close()
    str = retstr.getvalue()
    retstr.close()
    print(public_url)
    return [str, public_url, decoded_filename]

documentBlueprint = flask.Blueprint('document', __name__, url_prefix="/document")

@documentBlueprint.route("", methods=["POST"])
def create_document():
    try:
        user_id = flask.g.get('user_id')

        # Get other form data
        extension = flask.request.form.get('extension')

        url = flask.request.form.get('url')
        public_url = ""
        if url == None:
            # Check if file is present in request
            if 'file' not in flask.request.files:
                print("No file part in the request")
                return flask.jsonify({"message": "No file part in the request"}), 400

            file = flask.request.files['file']
            
            print("File",file.filename)
            # Check if file is allowed
            allowed_extensions = {'pdf', 'docx'}
            if '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
                return flask.jsonify({"message": "Invalid file extension"}), 400
            print("File extension:", extension)
            
             # Calculate file size
            # file_size_mb = os.path.getsize(file) / (1024 * 1024)  # Size in MB
            # if file_size_mb > MAX_FILE_SIZE_MB:
            #     return flask.jsonify({"message": "File size exceeds the limit of 3MB"}), 400
            
            # Configure bucket
            bucket = storage.bucket()
            blob = bucket.blob(f"users/{user_id}/{file.filename}")
            blob.upload_from_file(file)

            blob.make_public()
            public_url = blob.public_url

            title = os.path.splitext(file.filename)[0]

            # Parse PDF if the file is a PDF
            if extension == 'PDF':
                reader = PyPDF2.PdfReader(file)
                text = ''
                for page in range(len(reader.pages)):
                    text += reader.pages[page].extract_text()
            elif extension == 'DOCX':
                text = docx2txt.process(file)
            else:
                text = ''  # Placeholder for content extraction for other file types
        else:
            text = pdf_from_url_to_txt(url, user_id)[0]
            public_url = pdf_from_url_to_txt(url, user_id)[1]
        # Save other data to Firestore
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document()

        content = flask.request.form.get('content')

        # Extract keywords
        kw_extractor = yake.KeywordExtractor(top=10)
        keywords_tuple = kw_extractor.extract_keywords(text)
        keywords = [keyword[0] for keyword in keywords_tuple]
        # Get frequency of each keyword
        analysis_keywords = []
        for keyword in keywords:
            count = text.lower().count(keyword.lower())
            analysis_keywords.append({"keyword": keyword, "count": count})

        new_document = {
            'title': title,
            'content': text if extension == 'PDF' or extension == 'DOCX' else content,
            'url': url,
            'public_url': public_url,
            'extension': extension,
            'created_at': firestore.SERVER_TIMESTAMP,
            'favorite': False,
            'chat': {},
        }

        # Create the document
        document_doc_ref.set(new_document)

        # Set the id attribute
        document_doc_ref.update({"document_id": document_doc_ref.id})

        # Add the doc reference to the user's document collection
        user_doc_ref.update({"documents": firestore.ArrayUnion([document_doc_ref.id])})

        # Create chat collection for the document
        chat_doc_ref = document_doc_ref.collection('chat').document()
        
        new_chat = {}
        new_chat['messages'] = []
        
        chat_doc_ref.set(new_chat)
        
        chat_doc_ref.update({"chat_id":chat_doc_ref.id})
        
        document_doc_ref.update({"chat":firestore.ArrayUnion([chat_doc_ref.id])})

        # Create analysis collection for the document
        analysis_id = addAnalysisToDocument(user_id, document_doc_ref.id, text, analysis_keywords, keywords)
        document_doc_ref.update({"analysis":  analysis_id})
        
        return flask.jsonify({"message": "New document created successfully", "document_id": document_doc_ref.id, "text":text, "analysis_id":analysis_id}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new document"}), 500

@documentBlueprint.route("/precreation", methods=["POST"])
def precreate_document():
    try:
        user_id = flask.g.get('user_id')

        # Get other form data
        extension = flask.request.form.get('extension')

        url = flask.request.form.get('url')
        public_url = ""
        if url == None:
            # Check if file is present in request
            if 'file' not in flask.request.files:
                print("No file part in the request")
                return flask.jsonify({"message": "No file part in the request"}), 400

            file = flask.request.files['file']
            
            print("File",file.filename)
            # Check if file is allowed
            allowed_extensions = {'pdf', 'docx'}
            if '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
                return flask.jsonify({"message": "Invalid file extension"}), 400
            print("File extension:", extension)
            
             # Calculate file size
            # file_size_mb = os.path.getsize(file) / (1024 * 1024)  # Size in MB
            # if file_size_mb > MAX_FILE_SIZE_MB:
            #     return flask.jsonify({"message": "File size exceeds the limit of 3MB"}), 400
            
            # Configure bucket
            bucket = storage.bucket()
            blob = bucket.blob(f"users/{user_id}/{file.filename}")
            blob.upload_from_file(file)

            blob.make_public()
            public_url = blob.public_url

            title = os.path.splitext(file.filename)[0]

            # Parse PDF if the file is a PDF
            if extension == 'PDF':
                reader = PyPDF2.PdfReader(file)
                text = ''
                for page in range(len(reader.pages)):
                    text += reader.pages[page].extract_text()
            elif extension == 'DOCX':
                text = docx2txt.process(file)
            else:
                text = ''  # Placeholder for content extraction for other file types
        else:
            url_parser = pdf_from_url_to_txt(url, user_id)
            text = url_parser[0]
            public_url = url_parser[1]
            title = url_parser[2]
        # Save other data to Firestore
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document()

        content = flask.request.form.get('content')

        # Extract keywords
        kw_extractor = yake.KeywordExtractor(top=10)
        keywords_tuple = kw_extractor.extract_keywords(text)
        keywords = [keyword[0] for keyword in keywords_tuple]
        # Get frequency of each keyword
        analysis_keywords = []
        for keyword in keywords:
            count = text.lower().count(keyword.lower())
            analysis_keywords.append({"keyword": keyword, "count": count})

        new_document = {
            'title': title,
            'content': text if extension == 'PDF' or extension == 'DOCX' else content,
            'url': url,
            'public_url': public_url,
            'extension': extension,
            'created_at': firestore.SERVER_TIMESTAMP,
            'favorite': False,
            'chat': {},
        }

        # Create the document
        document_doc_ref.set(new_document)

        # Set the id attribute
        document_doc_ref.update({"document_id": document_doc_ref.id})

        # Add the doc reference to the user's document collection
        user_doc_ref.update({"documents": firestore.ArrayUnion([document_doc_ref.id])})

        # Create chat collection for the document
        chat_doc_ref = document_doc_ref.collection('chat').document()
        
        new_chat = {}
        new_chat['messages'] = []
        
        chat_doc_ref.set(new_chat)
        
        chat_doc_ref.update({"chat_id":chat_doc_ref.id})
        
        document_doc_ref.update({"chat":firestore.ArrayUnion([chat_doc_ref.id])})
        
        return flask.jsonify({"message": "New document created successfully", "document_id": document_doc_ref.id, "text":text, "analysis_keywords":analysis_keywords, "keywords":keywords}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new document"}), 500

@documentBlueprint.route("", methods=["GET"])
def get_document():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        
        db = firestore.client()
        document_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id)
        document = document_doc_ref.get()
        
        return flask.jsonify(document.to_dict()), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to get document"}), 500
    
@documentBlueprint.route("", methods=["PUT"])
def update_document():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        updated_document = flask.request.json
        
        db = firestore.client()
        document_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id)
        
        document_doc_ref.update(updated_document)
        
        return flask.jsonify({"message":"Document updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update document"}), 500

@documentBlueprint.route("", methods=["DELETE"])
def delete_document():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        
        db = firestore.client()
        document_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id)
        
        document_doc_ref.delete()
        
        # Remove the document reference from the user's document collection
        user_doc_ref = db.collection('users').document(user_id)
        user_doc_ref.update({"documents":firestore.ArrayRemove([document_id])})
        
        return flask.jsonify({"message":"Document deleted successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to delete document"}), 500
    
@documentBlueprint.route("/toggleFavorite", methods=["PUT"])
def toggle_favorite():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        favorite = flask.request.args.get('favorite')
        
        db = firestore.client()
        document_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id)
        
        if favorite != "true":
            document_doc_ref.update({"favorite": False})
        else:
            document_doc_ref.update({"favorite": True})
        
        return flask.jsonify({"message":"Favorite status updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update favorite status"}), 500

@documentBlueprint.route("/history", methods=["GET"])
def get_history():
    try:
        user_id = flask.g.get('user_id')
        
        db = firestore.client()
        documents_ref = db.collection('users').document(user_id).collection('documents').order_by('created_at', direction=firestore.Query.DESCENDING).stream()
        
        documents_list = []
        for doc in documents_ref:
            document_data = doc.to_dict()
            created_at = document_data.get("created_at", "")
            if created_at:
                created_at_str = created_at.strftime('%a, %d %b %Y %H:%M:%S %Z')
                date = datetime.strptime(created_at_str, '%a, %d %b %Y %H:%M:%S %Z')
                created_at_formatted = format_date(date, locale='es_ES', format='long')
            else:
                created_at_formatted = ""

            document_info = {
                "document_id": doc.id,
                "title": document_data.get("title", ""),
                "created_at": created_at_formatted,
                "public_url": document_data.get("public_url", ""),
                "analysis_id": document_data.get('analysis', ""),
                "favorite": document_data.get("favorite", False)
            }
            documents_list.append(document_info)
        
        return flask.jsonify(documents_list), 200
    except Exception as e:
        print("Error:", e)
        return flask.jsonify({"message": "Failed to get history"}), 500

@documentBlueprint.route("/favorites", methods=["GET"])
def get_favorites():
    try:
        user_id = flask.g.get('user_id')
        
        db = firestore.client()
        documents_ref = db.collection('users').document(user_id).collection('documents').where("favorite", "==", True).stream()

        documents_list = []
        for doc in documents_ref:
            document_data = doc.to_dict()
            created_at = document_data.get("created_at", "")
            if created_at:
                created_at_str = created_at.strftime('%a, %d %b %Y %H:%M:%S %Z')
                date = datetime.strptime(created_at_str, '%a, %d %b %Y %H:%M:%S %Z')
                created_at_formatted = format_date(date, locale='es_ES', format='long')
            else:
                created_at_formatted = ""
            
            document_info = {
                "document_id": doc.id,
                "title": document_data.get("title", ""),
                "created_at": created_at_formatted,
                "public_url": document_data.get("public_url", ""),
                "analysis_id": document_data.get('analysis', ""),
                "favorite": document_data.get("favorite", False)
            }
            documents_list.append(document_info)
        
        return flask.jsonify(documents_list), 200
    except Exception as e:
        print("Error:", e)
        return flask.jsonify({"message": "Failed to get favorites"}), 500