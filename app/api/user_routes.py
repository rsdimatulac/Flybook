from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User

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


# If birds can glide for long periods of time, then… why can't I?
@user_routes.route('/<int:id>', methods=['PATCH'])  # PATCH /api/users/:id
def edit_profile(id):

    # MIGHT NEED TO ACCESS PROFILE FORM HERE
    
    edit_user = User.query.get(id)
    # [{ type: "bio", data: "Hello" }, {}]
    updates = request.get_json()

    for update in updates:
        type, data = (update['type'], update['data'])
        if type == "profile_src":
            edit_user.profile_src = data
        elif type == "cover_src":
            edit_user.cover_src = data
        elif type == "bio":
            edit_user.bio = data
        elif type == "location":
            edit_user.location = data
        elif type == "school":
            edit_user.school = data
        elif type == "work":
            edit_user.work = data
        db.session.commit()
    return edit_user.to_dict()
