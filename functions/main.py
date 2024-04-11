# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_admin import credentials, initialize_app, firestore, auth
from firebase_functions import https_fn
from functools import wraps
import flask
import json
import requests
from dotenv import load_dotenv
import os

# Load variables from the .env file
load_dotenv()

# Access the variables
FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")

cred = credentials.Certificate("../firebase-cred.json")
initialize_app(cred)
app = flask.Flask(__name__)

# Handle auth token
def validate_jwt(f):
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        req_token = flask.request.headers.get('Authorization')
        if not req_token:
            return flask.jsonify({"error": "Invalid token"}), 401
        try:
            token = auth.verify_id_token(req_token[7:])
            # Get the user ID from the token
            user_id = token.get('uid')

            # Perform any necessary operations with the user ID
            # For example, you can fetch user data from the database
            # or perform some authorization checks

            # Continue to the view function
            return f(user_id, *args, **kwargs)
        except:
            return flask.jsonify({"error": "Invalid token"}), 401     
        # Here you can add your token validation logic
        # For example, you can use Firebase Admin SDK to verify the token
        # If the token is valid, continue to the view function
        # Otherwise, abort with an error
        # Example:
        # if not is_valid_token(token):
        #     abort(401, 'Invalid token')
        return f(*args, **kwargs)
    return decorated_function

@app.get("/auth_test")
@validate_jwt
def get_widget(user_id):
    return flask.jsonify({"id": user_id})

@app.post("/login")
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

@app.post("/create_user")
async def create_user():
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
        }
        firestore.client().collection('users').document(user_id).set(user_object)
        return flask.jsonify({"message":"New user created successfully","user_id":user_id}), 201
    except Exception as e:
        print("Error:",e)
        return flask.jsonify({"message":"Failed to create new user"}), 500

# Expose Flask app as a single Cloud Function:
@https_fn.on_request()
def arpa(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()