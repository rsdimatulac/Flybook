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

    if form.validate_on_submit():
        comment = Comment(
            user_id=current_user.id,
            post_id=post_id,
            body=form.data['body'],
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


today = datetime.datetime.now()

@comment_routes.route('/<int:comment_id>', methods=['PATCH']) # PATCH /api/comments/:comment_id
def edit_comment(comment_id):
    
    comment_to_edit = Comment.query.get(comment_id)
    body = request.get_json()['body']

    comment_to_edit.body = body
    comment_to_edit.updated_at = today
    db.session.commit()
    return comment_to_edit.to_dict()


@comment_routes.route('/<int:comment_id>', methods=['DELETE']) # DELETE /api/comments/:comment_id
def delete_comment(comment_id):

    comment_to_delete = Comment.query.get(comment_id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return comment_to_delete.to_dict()
