import flask
from firebase_admin import firestore, auth

usersBlueprint = flask.Blueprint('users', __name__)

@usersBlueprint.route("/create_user", methods=["POST"])
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