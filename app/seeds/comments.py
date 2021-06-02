from werkzeug.security import generate_password_hash
from app.models import db, Post, User, Comment


def seed_comments():

    comment_1 = Comment(
        user_id=1, # Amelia
        post_id=4,
        body="This is amazing! Keep flying, Ren!",
    )

    comment_2 = Comment(
        user_id=2, # Ren
        post_id=1,
        body="You are an inspiration, Amelia <3",
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
