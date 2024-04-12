import flask
import json
import requests
from dotenv import load_dotenv
import os

# Load variables from the .env file
load_dotenv()

# Access the variables
FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")

authBlueprint = flask.Blueprint('auth', __name__)

@authBlueprint.route("/login", methods=["POST"])
def login():
    try:
        user = flask.request.json
        payload = json.dumps({"email":user['email'], "password":user['password'], "return_secure_token":True})
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