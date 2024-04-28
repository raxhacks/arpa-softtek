# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_admin import credentials, initialize_app
from firebase_functions import https_fn
from functools import wraps
import flask
from dotenv import load_dotenv
from flask_cors import CORS
from google.cloud import storage
import os
import json

# Import routes
from routes.auth.authRouter import authBlueprint
from routes.user.userRouter import userBlueprint
from routes.document.documentRouter import documentBlueprint
from routes.chat.chatRouter import chatBlueprint
from routes.analysis.analysisRouter import analysisBlueprint

# Import middlewares
from middlewares.validateJWT import validateJWT

# Load variables from the .env file
load_dotenv()

# Access the variables
current_directory = os.path.dirname(os.path.realpath(__file__))
keys_path = os.path.join(current_directory, "keys.json")

with open(keys_path) as f:
    keys = json.load(f)

FIREBASE_BUCKET = keys['FIREBASE_BUCKET']

cred = credentials.Certificate("./firebase-cred.json")
initialize_app(cred, {
    'storageBucket': FIREBASE_BUCKET
})
app = flask.Flask(__name__)

# Allow CORS for all origins on all routes
cors_config = {
    "origins": "*",
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
}
CORS(app, resources={r"*": cors_config})

@app.before_request
def before_request():
    blueprint_name = flask.request.blueprint
    if blueprint_name == 'document' or blueprint_name == 'chat' or blueprint_name == 'analysis':
        validateJWT()

# Register the routes
app.register_blueprint(authBlueprint)
app.register_blueprint(userBlueprint)
app.register_blueprint(documentBlueprint)
app.register_blueprint(chatBlueprint)
app.register_blueprint(analysisBlueprint)

# Expose Flask app as a single Cloud Function:
@https_fn.on_request()
def arpa(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        if req.method == 'OPTIONS':
            response = flask.make_response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            return response
    
        return app.full_dispatch_request()