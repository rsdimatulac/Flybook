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
        post_id=17,
        body="Thank you, Amelia! I'll bring sandwiches, see ya!",
    )

    comment_3 = Comment(
        user_id=5, # Sully
        post_id=10,
        body="Aww thank you, Ren! When you're around Texas, let me know and we'll go for a ride."
    )

    comment_4 = Comment(
        user_id=3,
        post_id=7,
        body="Hey, Orville. I'm well, miss you brother. Come visit me this weekend."
    )

    comment_5 = Comment(
        user_id=1, # Amelia
        post_id=2,
        body="Of course, Harriet! I'll send you a DM. 😊"
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
