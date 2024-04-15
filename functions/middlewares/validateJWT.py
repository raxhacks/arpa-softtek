import flask
from firebase_admin import auth

def validateJWT():
    print("Validating JWT")
    req_token = flask.request.headers.get('Authorization')
    if not req_token: 
        flask.abort(401, "No token provided")
    if req_token and req_token.startswith('Bearer '):
        token = req_token.split(' ')[1]
        try:
            user = auth.verify_id_token(token)
            flask.g.user_id = user.get('uid')
        except:
            flask.abort(401, "Invalid token") 