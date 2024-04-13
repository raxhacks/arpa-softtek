import flask
from firebase_admin import firestore

analysisBlueprint = flask.Blueprint('analysis', __name__, url_prefix="/analysis")

@analysisBlueprint.route("/", methods=["POST"])
def create_analysis():
    try:
        # Logica de OpenAI para analizar el texto
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        new_analysis = flask.request.json
        
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document(document_id)
        analysis_doc_ref = document_doc_ref.collection('analysis').document()
        
        #create the analysis
        analysis_doc_ref.set(new_analysis)
        
        #set the id attribute
        analysis_doc_ref.update({"analysis_id":analysis_doc_ref.id})
        
        # Add the doc refence to the user's analysis collection
        user_doc_ref.update({f"documents.{document_id}.analysis": analysis_doc_ref})
        
        return flask.jsonify({"message":"New analysis created successfully","analysis_id":analysis_doc_ref.id}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new analysis"}), 500
      
@analysisBlueprint.route("/", methods=["GET"])
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

@analysisBlueprint.route("/", methods=["PUT"])
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
      
@analysisBlueprint.route("/", methods=["DELETE"])
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