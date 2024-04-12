# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_admin import credentials, initialize_app
from firebase_functions import https_fn
from functools import wraps
import flask
from dotenv import load_dotenv

# Import routes
from routes.users.usersRoute import usersBlueprint
from routes.auth.authRoute import authBlueprint

# Import middlewares
from middlewares.validateJWT import validateJWT

# Load variables from the .env file
load_dotenv()

# Access the variables

cred = credentials.Certificate("../firebase-cred.json")
initialize_app(cred)
app = flask.Flask(__name__)

@app.before_request
def before_request():
    blueprint_name = flask.request.blueprint
    # if blueprint_name == 'analysis':
    #     validateJWT()

# Register the routes
app.register_blueprint(usersBlueprint)
app.register_blueprint(authBlueprint)

# Expose Flask app as a single Cloud Function:
@https_fn.on_request()
def arpa(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()