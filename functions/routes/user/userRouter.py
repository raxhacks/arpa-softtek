import flask
from firebase_admin import firestore, auth, storage
import json
import requests
import os


# Get the current directory of the script
current_directory = os.path.dirname(os.path.realpath(__file__))

# Construct the path to keys.json
keys_path = os.path.join(current_directory, "..", "..", "keys.json")

with open(keys_path) as f:
    keys = json.load(f)

FIREBASE_API_KEY = keys['FIREBASE_API_KEY']

userBlueprint = flask.Blueprint('user', __name__, url_prefix="/user")

@userBlueprint.route("", methods=["POST"])
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
        
        # create user's document folder
        bucket = storage.bucket()
        bucket.blob(f"users/{user_id}/initial.txt").upload_from_string("")

        # login user automatically
        payload = json.dumps({"email":email, "password":new_user['password'], "return_secure_token":True, "expiresIn": "43200"})
        rest_api_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"

        r = requests.post(rest_api_url,
                    params={"key": FIREBASE_API_KEY},
                    data=payload)

        response = r.json()
        token = response['idToken']
        return flask.jsonify({"message":"New user created successfully","user_id":user_id, "token":token}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new user"}), 500
    
@userBlueprint.route("", methods=["GET"])
def get_user():
    try:
        user_id = flask.request.args.get('user_id')
        user = firestore.client().collection('users').document(user_id).get()
        user_object = user.to_dict()
        return flask.jsonify(user_object), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to get user"}), 500
    
@userBlueprint.route("", methods=["PUT"])
def update_user():
    try:
        user_id = flask.request.args.get('user_id')
        updated_user = flask.request.json
        firestore.client().collection('users').document(user_id).update(updated_user)
        return flask.jsonify({"message":"User updated successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to update user"}), 500

@userBlueprint.route("", methods=["DELETE"])
def delete_user():
    try:
        user_id = flask.request.args.get('user_id')
        firestore.client().collection('users').document(user_id).delete()
        auth.delete_user(user_id)
        return flask.jsonify({"message":"User deleted successfully"}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to delete user"}), 500