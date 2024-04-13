# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_admin import credentials, initialize_app
from firebase_functions import https_fn
from functools import wraps
import flask
from dotenv import load_dotenv
from flask_cors import CORS

# Import routes
from functions.routes.auth.authRouter import authBlueprint
from functions.routes.user.userRouter import userBlueprint
from functions.routes.document.documentRouter import documentBlueprint
from functions.routes.chat.chatRouter import chatBlueprint
from functions.routes.analysis.analysisRouter import analysisBlueprint

# Import middlewares
from middlewares.validateJWT import validateJWT

# Load variables from the .env file
load_dotenv()

# Access the variables

cred = credentials.Certificate("./firebase-cred.json")
initialize_app(cred)
app = flask.Flask(__name__)

# Allow CORS for all origins on all routes
CORS(app)

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
        return app.full_dispatch_request()