import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post
from app.forms import PostForm


post_routes = Blueprint('posts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages


@post_routes.route('/')  # GET /api/posts/
def posts():
    friends = current_user.friends  # {friends, current_user}
    friends.append(current_user)
    posts = [user.to_dict()['posts'] for user in friends]  # [[post1, post2], [postssss]]
    new_posts = {}

    for sub_posts in posts:
        for post in sub_posts:
            new_posts[post] = sub_posts[post]

    return new_posts  # only return current_user's posts and their friends' posts

    # posts = Post.query.all()
    # return {post.id: post.to_dict() for post in posts}


@post_routes.route('/', methods=['POST'])  # POST /api/posts/
def new_post():

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    wall_id = request.get_json()['wall_id']
    updated_at = request.get_json()['updated_at']
    created_at = request.get_json()['created_at']
    
    if form.validate_on_submit():
        post = Post(
            user_id=current_user.id,
            wall_id=wall_id,
            body=form.data['body'],
            photo_src=form.data['photo_src'],
            created_at=created_at,
            updated_at=updated_at
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<int:post_id>', methods=['PATCH']) # PATCH /api/posts/:post_id
def edit_post(post_id):
    
    post_to_edit = Post.query.get(post_id)
    body = request.get_json()['body']
    photo_src = request.get_json()['photo_src']
    updated_at = request.get_json()['updated_at']

    post_to_edit.body = body
    post_to_edit.photo_src = photo_src
    post_to_edit.updated_at = updated_at
    return post_to_edit.to_dict()


@post_routes.route('/<int:post_id>', methods=['DELETE']) # DELETE /api/posts/:post_id
def delete_post(post_id):

    post_to_delete = Post.query.get(post_id)
    db.session.delete(post_to_delete)
    db.session.commit()
    return post_to_delete.to_dict()
