import flask
from firebase_admin import firestore

documentBlueprint = flask.Blueprint('documents', __name__, url_prefix="/document")

@documentBlueprint.route("/", methods=["POST"])
def create_document():
    try:
        user_id = flask.g.get('user_id')
        new_document = flask.request.json
        
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document()
        
        # insert chat and analysis object (empty objects)
        new_document['chat'] = {}
        new_document['analysis'] = {}
        
        #create the document
        document_doc_ref.set(new_document)
        
        #set the id attribute
        document_doc_ref.update({"document_id":document_doc_ref.id})
        
        # Add the doc refence to the user's document collection
        user_doc_ref.update({"documents":firestore.ArrayUnion([document_doc_ref.id])})
        
        return flask.jsonify({"message":"New document created successfully","document_id":document_doc_ref.id}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new document"}), 500

@documentBlueprint.route("/", methods=["GET"])
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
    
@documentBlueprint.route("/", methods=["PUT"])
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

@documentBlueprint.route("/", methods=["DELETE"])
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