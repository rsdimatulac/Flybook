from werkzeug.security import generate_password_hash
from app.models import db, Post, User


def seed_posts():

    post_1 = Post( # Amelia
        user_id=1,
        body="Women must try to do things as men have tried. When they fail, their failure must be but a challenge to others.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/amelia_1.jpg"
    )

    post_2 = Post( # Amelia
        user_id=1,
        body="The most effective way to do it, is to do it.",
    )

    post_3 = Post( # Ren
        user_id=2,
        body="Welcome to Flybook!",
    )

    post_4 = Post( # Ren
        user_id=2,
        body="A bird sitting on a tree is never afraid of the branch breaking, because its trust is not on the branch but on its own wings.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/ren_1.jpg"
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
