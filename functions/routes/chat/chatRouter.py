import flask
from firebase_admin import firestore

chatBlueprint = flask.Blueprint('chat', __name__, url_prefix="/chat")

@chatBlueprint.route("", methods=["POST"])
def create_chat():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        new_chat = flask.request.json
        
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document(document_id)
        chat_doc_ref = document_doc_ref.collection('chat').document()
        
        # insert messages array
        new_chat['messages'] = []
        
        #create the chat
        chat_doc_ref.set(new_chat)
        
        #set the id attribute
        chat_doc_ref.update({"chat_id":chat_doc_ref.id})
        
        # Add the doc refence to the user's chat collection
        document_doc_ref.update({"chat":firestore.ArrayUnion([chat_doc_ref.id])})
        
        return flask.jsonify({"message":"New chat created successfully","chat_id":chat_doc_ref.id}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new chat"}), 500
      
@chatBlueprint.route("", methods=["GET"])
def get_chat():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        chat_id = flask.request.args.get('chat_id')
        
        db = firestore.client()
        chat_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('chat').document(chat_id)
        chat = chat_doc_ref.get()
        
        return flask.jsonify(chat.to_dict()), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to get chat"}), 500

@chatBlueprint.route("", methods=["PUT"])
def update_chat():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        chat_id = flask.request.args.get('chat_id')
        updated_chat = flask.request.json
        
        db = firestore.client()
        chat_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('chat').document(chat_id)
        
        chat_doc_ref.update(updated_chat)
        
        return flask.jsonify({"message":"Chat updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update chat"}), 500
      
@chatBlueprint.route("", methods=["DELETE"])
def delete_chat():
    try:
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        chat_id = flask.request.args.get('chat_id')
        
        db = firestore.client()
        chat_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('chat').document(chat_id)
        
        chat_doc_ref.delete()
        
        return flask.jsonify({"message":"Chat deleted successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to delete chat"}), 500

@chatBlueprint.route("/sendMessage", methods=["POST"])
def send_message():
    try:
        # Logica para OpenAI
        user_id = flask.g.get('user_id')
        document_id = flask.request.args.get('document_id')
        chat_id = flask.request.args.get('chat_id')
        user_interaction = flask.request.json
        
        db = firestore.client()
        chat_doc_ref = db.collection('users').document(user_id).collection('documents').document(document_id).collection('chat').document(chat_id)
        messages = chat_doc_ref.get().to_dict().get('messages')
        messages.append(user_interaction)
        chat_doc_ref.update({"messages":messages})
        
        return flask.jsonify({"message":"Message sent successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to send message"}), 500