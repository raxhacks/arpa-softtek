import flask
from collections import Counter
from firebase_admin import firestore
from .helpers.AnalysisAndChatCreation import addAnalysisToDocument

analysisBlueprint = flask.Blueprint('analysis', __name__, url_prefix="/analysis")

@analysisBlueprint.route("", methods=["POST"])
def create_analysis():
    try:
        # Logica de OpenAI para analizar el texto
        user_id = flask.g.get('user_id')
        body = flask.request.json
        document_object = body['document_object']
        text = body['text']
        analysis_keywords = body['analysis_keywords']
        keywords = body['keywords']
        userOwnKeywords = body['userOwnKeywords']

        if userOwnKeywords:
            # Count the occurrences of each keyword in the text
            keyword_counts = Counter(word.lower() for word in text.split() if word.lower() in keywords)

            # Update the analysis_keywords array
            analysis_keywords = [{'keyword': keyword, 'count': count} for keyword, count in keyword_counts.items()]
        
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document()

        document_doc_ref.set(document_object)

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
        
        analysis_id = addAnalysisToDocument(user_id, document_doc_ref.id, text, analysis_keywords, keywords)
        document_doc_ref.update({"analysis":  analysis_id})
        
        return flask.jsonify({"message": "New document created successfully", "document_id": document_doc_ref.id, "text":text, "analysis_id":analysis_id}), 201
       
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new analysis"}), 500
      
@analysisBlueprint.route("", methods=["GET"])
def get_analysis():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        analysis_id = flask.request.args.get('analysis_id')
        
        db = firestore.client()
        analysis_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('analysis').document(analysis_id)
        analysis = analysis_doc_ref.get()
        
        return flask.jsonify(analysis.to_dict()), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to get analysis"}), 500

@analysisBlueprint.route("", methods=["PUT"])
def update_analysis():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        analysis_id = flask.request.args.get('analysis_id')
        updated_analysis = flask.request.json
        
        db = firestore.client()
        analysis_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('analysis').document(analysis_id)
        
        analysis_doc_ref.update(updated_analysis)
        
        return flask.jsonify({"message":"Analysis updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update analysis"}), 500
      
@analysisBlueprint.route("", methods=["DELETE"])
def delete_analysis():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        analysis_id = flask.request.args.get('analysis_id')
        
        db = firestore.client()
        analysis_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('analysis').document(analysis_id)
        
        analysis_doc_ref.delete()
        
        return flask.jsonify({"message":"Analysis deleted successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to delete analysis"}), 500
    
@analysisBlueprint.route("/sections", methods=["GET"])
def get_sections():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        analysis_id = flask.request.args.get('analysis_id')
        
        db = firestore.client()
        analysis_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('analysis').document(analysis_id)
        analysis = analysis_doc_ref.get()

        analysis_data = analysis.to_dict()
        sections = analysis_data.get('sections', [])
        mapped_sections = [
            {
                "title": section.get("title", ""),
                "content": section.get("content", "")
            }
            for section in sections
        ]
        
        return flask.jsonify(mapped_sections), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to get sections"}), 500