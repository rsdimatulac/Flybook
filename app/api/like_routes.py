from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment, Like


like_routes = Blueprint('likes', __name__)

@like_routes.route('/posts/<int:post_id>/likes', methods=['POST']) # POST /api/posts/:post_id/likes
def post_like(post_id):
    
    updated_at = request.get_json()['updated_at']
    created_at = request.get_json()['created_at']

    like = Like(
        user_id=current_user.id,
        post_id=post_id,
        updated_at=updated_at,
        created_at=created_at
    )
    
    db.session.add(like)
    db.session.commit()
    return like.to_dict()


# POST /api/comments/:comment_id/likes
@like_routes.route('/comments/<int:comment_id>/likes', methods=['POST'])
def comment_like(comment_id):

    updated_at = request.get_json()['updated_at']
    created_at = request.get_json()['created_at']

    like = Like(
        user_id=current_user.id,
        comment_id=comment_id,
        like_type='comment',
        updated_at=updated_at,
        created_at=created_at
    )

    db.session.add(like)
    db.session.commit()
    return like.to_dict()

@like_routes.route('/likes/<int:like_id>', methods=['DELETE']) # DELETE /api/likes/:like_id
def delete_like(like_id):

    like_to_delete = Like.query.get(like_id)
    db.session.delete(like_to_delete)
    db.session.commit()
    return like_to_delete.to_dict()
