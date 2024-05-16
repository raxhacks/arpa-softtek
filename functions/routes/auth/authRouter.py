import flask
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

authBlueprint = flask.Blueprint('auth', __name__)

@authBlueprint.route("/login", methods=["POST"])
def login():
    try:
        user = flask.request.json
        payload = json.dumps({"email":user['email'], "password":user['password'], "return_secure_token":True, "expiresIn": "43200"})
        rest_api_url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"

        r = requests.post(rest_api_url,
                    params={"key": FIREBASE_API_KEY},
                    data=payload)

        response = r.json()
        token = response['idToken']
        return flask.jsonify({"message":"Login successful","token":token}), 200
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to login"}), 500