import datetime
from .db import db

today = datetime.datetime.now()


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=today)
    updated_at = db.Column(db.DateTime, nullable=False, default=today)

    user = db.relationship('User', back_populates='comments')

    post = db.relationship('Post', back_populates='comments')

    likes = db.relationship('Like', back_populates='comment')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "body": self.body,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "likes": {like.id: like.to_dict() for like in self.likes}
        }
