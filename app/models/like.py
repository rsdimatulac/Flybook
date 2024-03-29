import datetime
from .db import db

today = datetime.datetime.utcnow()


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    like_type = db.Column(db.String(10), nullable=False, default='post')
    created_at = db.Column(db.DateTime, nullable=False, default=today)
    updated_at = db.Column(db.DateTime, nullable=False, default=today)

    user = db.relationship('User', back_populates='likes')

    post = db.relationship('Post', back_populates='likes')

    comment = db.relationship('Comment', back_populates='likes')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment_id": self.comment_id,
            "like_type": self.like_type,
        }
