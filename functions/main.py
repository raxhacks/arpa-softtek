# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_admin import initialize_app, db
from firebase_functions import https_fn
import flask

initialize_app()
app = flask.Flask(__name__)

# Build multiple CRUD interfaces:


@app.get("/widgets")
@app.get("/widgets/<id>")
def get_widget(id=None):
    if id is not None:
        return db.reference(f"/widgets/{id}").get()
    else:
        return db.reference("/widgets").get()


@app.post("/widgets")
def add_widget():
    new_widget = flask.request.get_data(as_text=True)
    db.reference("/widgets").push(new_widget)
    return flask.Response(status=201, response="Added widget")


# Expose Flask app as a single Cloud Function:


@https_fn.on_request()
def httpsflaskexample(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()