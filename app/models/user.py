import datetime
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .friend import friends
from .friend_request import friend_requests
from .post import Post

today = datetime.datetime.utcnow()


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

    post_sender = db.relationship(
        'Post',
        back_populates='post_user_id',
        foreign_keys=Post.user_id,
        cascade='all, delete-orphan'
    )

    post_receiver = db.relationship(
        'Post',
        back_populates='post_wall_id',
        foreign_keys=Post.wall_id,
        cascade='all, delete-orphan'
    )

    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')

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

    request_received = db.relationship(
        'User',
        secondary=friend_requests,
        back_populates='request_sent',
        primaryjoin=(friend_requests.c.sender_id == id),
        secondaryjoin=(friend_requests.c.receiver_id == id)
    )

    request_sent = db.relationship(
        'User',
        secondary=friend_requests,
        back_populates='request_received',
        primaryjoin=(friend_requests.c.receiver_id == id),
        secondaryjoin=(friend_requests.c.sender_id == id)
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
        posts = Post.query.filter(Post.wall_id == self.id).all()
        # all_posts = {}
        # user_posts = Post.query.filter(Post.user_id == self.id).all()
        # all_posts.append(user_posts)
        # friends_posts = Post.query.filter(Post.wall_id == self.id).all()
        # all_posts.append(friends_posts)

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
            "posts": {post.id: post.to_dict() for post in posts},
            "comments": [comment.to_dict() for comment in self.comments],
            "likes": [like.to_dict() for like in self.likes]
        }

    def to_dict_simple(self):
      return {
          "id": self.id,
          "firstname": self.firstname,
          "lastname": self.lastname,
          "profile_src": self.profile_src,
          "email": self.email
      }

    def to_dict(self):
        posts = Post.query.filter(Post.wall_id == self.id).all()
        # all_posts = {}
        # user_posts = Post.query.filter(Post.user_id == self.id).all()
        # all_posts.append(user_posts)
        # friends_posts = Post.query.filter(Post.wall_id == self.id).all()
        # all_posts.append(friends_posts)

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
            "friends": [friend.to_dict_no_friends() for friend in self.friends],
            "request_sent": [user.to_dict_simple() for user in self.request_sent],
            "request_received": [user.to_dict_simple() for user in self.request_received],
            "posts": {post.id: post.to_dict() for post in posts},
            "comments": [comment.to_dict() for comment in self.comments],
            "likes": [like.to_dict() for like in self.likes]
        }
