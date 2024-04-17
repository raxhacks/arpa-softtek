import flask
from firebase_admin import firestore
import PyPDF2
import docx2txt
import io

documentBlueprint = flask.Blueprint('document', __name__, url_prefix="/document")

@documentBlueprint.route("", methods=["POST"])
def create_document():
    try:
        user_id = flask.g.get('user_id')

        # Get other form data
        extension = flask.request.form.get('extension')
        
        # Check if file is present in request
        if 'file' not in flask.request.files:
            return flask.jsonify({"message": "No file part in the request"}), 400

        file = flask.request.files['file']
        
        # Check if file is allowed
        allowed_extensions = {'pdf', 'docx'}
        if '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
            return flask.jsonify({"message": "Invalid file extension"}), 400
        
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
        
        # Save other data to Firestore
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document()

        title = flask.request.form.get('title')
        content = flask.request.form.get('content')
        url = flask.request.form.get('url')

        new_document = {
            'title': title,
            'content': text if extension == 'PDF' or extension == 'DOCX' else content,
            'url': url,
            'extension': extension,
            'created_at': firestore.SERVER_TIMESTAMP,
            'favorite': False,
            'chat': {},
            'analysis': {}
        }

        # Create the document
        document_doc_ref.set(new_document)

        # Set the id attribute
        document_doc_ref.update({"document_id": document_doc_ref.id})

        # Add the doc reference to the user's document collection
        user_doc_ref.update({"documents": firestore.ArrayUnion([document_doc_ref.id])})

        return flask.jsonify({"message": "New document created successfully", "document_id": document_doc_ref.id, "text":text}), 201
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
    
@documentBlueprint.route("/toggleFavorite", methods=["GET"])
def toggle_favorite():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        favorite = flask.request.args.get('favorite')
        
        db = firestore.client()
        document_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id)
        document = document_doc_ref.get().to_dict()
        
        if favorite != 'true':
            document_doc_ref.update({"favorite":False})
        else:
            document_doc_ref.update({"favorite":True})
        
        return flask.jsonify({"message":"Favorite status updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update favorite status"}), 500