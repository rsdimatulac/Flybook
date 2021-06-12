from random import randint
from werkzeug.security import generate_password_hash
from app.models import db, Post, User, Comment, Like


def seed_likes():

    users = User.query.all()
    posts = Post.query.all()
    comments = Comment.query.all()

    for _i in range(100):
        like = Like(
            user_id=users[randint(0, 17)].id,
            post_id=posts[randint(0, 17)].id
        )
        db.session.add(like)
        db.session.commit()

    for _i in range(100):
        like = Like(
            user_id=users[randint(0, 17)].id,
            comment_id=comments[randint(0, 13)].id,
            like_type='comment'
        )
        db.session.add(like)
        db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
