import datetime
from .db import db
# from app.models import db, User

today = datetime.datetime.utcnow()


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    wall_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    photo_src = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, nullable=False, default=today)
    updated_at = db.Column(db.DateTime, nullable=False, default=today)

    post_user_id = db.relationship(
        'User',
        back_populates='post_sender',
        foreign_keys=user_id
    )

    post_wall_id = db.relationship(
        'User',
        back_populates='post_receiver',
        foreign_keys=wall_id
    )

    comments = db.relationship('Comment', back_populates="post")
    likes = db.relationship('Like', back_populates="post")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "wall_id": self.wall_id,
            "body": self.body,
            "photo_src": self.photo_src,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "comments": [comment.to_dict() for comment in self.comments],
            "likes": [like.to_dict() for like in self.likes],
        }
