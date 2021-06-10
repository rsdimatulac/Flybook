import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages

@comment_routes.route('/') # GET /api/comments/
def comments():
    comments = Comment.query.all()
    return {comment.id: comment.to_dict() for comment in comments}


@comment_routes.route('/', methods=['POST'])  # POST /api/comments/
def new_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post_id = request.get_json()['post_id']
    body = request.get_json()['body']
    updated_at = request.get_json()['updated_at']
    created_at = request.get_json()['created_at']

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            post_id=post_id,
            body=body,
            created_at=created_at,
            updated_at=updated_at
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@comment_routes.route('/<int:comment_id>', methods=['PATCH']) # PATCH /api/comments/:comment_id
def edit_comment(comment_id):
    
    comment_to_edit = Comment.query.get(comment_id)
    body = request.get_json()['body']
    updated_at = request.get_json()['updated_at']

    comment_to_edit.body = body
    comment_to_edit.updated_at = updated_at
    db.session.commit()
    return comment_to_edit.to_dict()


@comment_routes.route('/<int:comment_id>', methods=['DELETE']) # DELETE /api/comments/:comment_id
def delete_comment(comment_id):

    comment_to_delete = Comment.query.get(comment_id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return comment_to_delete.to_dict()
