from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/') # GET /api/users/
@login_required
def users():
    users = User.query.all()
    return {user.id: user.to_dict() for user in users}


@user_routes.route('/<int:id>') # GET /api/users/:id
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PATCH'])  # PATCH /api/users/:id
def edit_profile(id):
    # get the body from request
    edit_user = User.query.get(id)
    type = request.get_json()['type']
    data = request.get_json()['data']

    if type == "profile_src":
        edit_user.profile_src = data
    elif type == "bio":
        edit_user.bio = data
    elif type == "cover_src":
        edit_user.cover_src = data
    
    db.session.commit()
    return edit_user.to_dict()
