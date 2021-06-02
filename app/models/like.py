import datetime
from .db import db

today = datetime.datetime.now()


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    like_type = db.Column(db.String(10), nullable=False, default='post')
    created_at = db.Column(db.DateTime, nullable=False, default=today)
    updated_at = db.Column(db.DateTime, nullable=False, default=today)

    user = db.relationship('User', back_populates='likes')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "like_type": self.like_type,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
