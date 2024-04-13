import flask
from firebase_admin import firestore, auth

userBlueprint = flask.Blueprint('user', __name__, url_prefix="/user")

@userBlueprint.route("/", methods=["POST"])
def create_user():
    try:
        new_user = flask.request.json
        user = auth.create_user(
            email=new_user['email'],
            password=new_user['password'],
        )
        user_id = user.uid
        email = new_user['email']
        user_object  = {
            "user_id":user_id,
            "email":email,
            "documents":[]
        }
        firestore.client().collection('users').document(user_id).set(user_object)
        return flask.jsonify({"message":"New user created successfully","user_id":user_id}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new user"}), 500
    
@userBlueprint.route("/", methods=["GET"])
def get_user():
    try:
        user_id = flask.request.args.get('user_id')
        user = firestore.client().collection('users').document(user_id).get()
        user_object = user.to_dict()
        return flask.jsonify(user_object), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to get user"}), 500
    
@userBlueprint.route("/", methods=["PUT"])
def update_user():
    try:
        user_id = flask.request.args.get('user_id')
        updated_user = flask.request.json
        firestore.client().collection('users').document(user_id).update(updated_user)
        return flask.jsonify({"message":"User updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update user"}), 500

@userBlueprint.route("/", methods=["DELETE"])
def delete_user():
    try:
        user_id = flask.request.args.get('user_id')
        firestore.client().collection('users').document(user_id).delete()
        auth.delete_user(user_id)
        return flask.jsonify({"message":"User deleted successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to delete user"}), 500