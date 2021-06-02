import datetime
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .friend import friends
# from app.models import db, Post

today = datetime.datetime.now()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    birthday = db.Column(db.Date, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_src = db.Column(db.String(500), nullable=False, default='https://theflybook.s3.amazonaws.com/avatar.png')
    cover_src = db.Column(db.String(500), nullable=False, default='https://theflybook.s3.amazonaws.com/cover.png')
    bio = db.Column(db.Text)
    location = db.Column(db.String(50))
    school = db.Column(db.String(50))
    work = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, nullable=False, default=today)
    updated_at = db.Column(db.DateTime, nullable=False, default=today)

    posts = db.relationship(
      'Post', 
      back_populates='user',
      # primaryjoin=(Post.user_id == id),
      # secondaryjoin=(Post.wall_id == id),
    )
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')

    # users = db.relationship('User', secondary=friends, back_populates='friends', foreign_key)
    users = db.relationship(
        'User',
        secondary=friends,
        back_populates='friends',
        primaryjoin=(friends.c.user_a == id),
        secondaryjoin=(friends.c.user_b == id)
    )
    
    friends = db.relationship(
      'User', 
      secondary=friends, 
      back_populates='users', 
      primaryjoin=(friends.c.user_a == id),
      secondaryjoin=(friends.c.user_b == id)
    )
    

    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_no_friends(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "birthday": self.birthday,
            "profile_src": self.profile_src,
            "cover_src": self.cover_src,
            "bio": self.bio,
            "location": self.location,
            "school": self.school,
            "work": self.work,
            "created_at": self.created_at,
            "posts": {post.id: post.to_dict() for post in self.posts},
            "comments": {comment.id: comment.to_dict() for comment in self.comments},
            "likes": {like.id: like.to_dict() for like in self.likes}
        }

    def to_dict(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "birthday": self.birthday,
            "profile_src": self.profile_src,
            "cover_src": self.cover_src,
            "bio": self.bio,
            "location": self.location,
            "school": self.school,
            "work": self.work,
            "created_at": self.created_at,
            "friends": {friend.id: friend.to_dict_no_friends() for friend in self.friends},
            "posts": {post.id: post.to_dict() for post in self.posts},
            "comments": {comment.id: comment.to_dict() for comment in self.comments},
            "likes": {like.id: like.to_dict() for like in self.likes}
        }
