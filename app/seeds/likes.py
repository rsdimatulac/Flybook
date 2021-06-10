from werkzeug.security import generate_password_hash
from app.models import db, Post, User, Comment, Like


def seed_likes():

    like_1 = Like( # post
        user_id=1, # Amelia
        post_id=3, # Ren's post
    )

    like_2 = Like(  # comment
        user_id=2, # Ren
        comment_id=1, # Amelia's comment 
        like_type='comment'
    )

    like_3 = Like(  # post
        user_id=2, # Ren
        post_id=17, # Amelia's post
    )

    db.session.add(like_1)
    db.session.add(like_2)
    db.session.add(like_3)
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
