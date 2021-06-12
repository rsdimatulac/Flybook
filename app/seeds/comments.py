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
        post_id=18,
        body="Thank you, Amelia! I'll bring sandwiches, see ya!",
    )

    comment_3 = Comment(
        user_id=5, # Sully
        post_id=10,
        body="Aww thank you, Ren! When you're around Texas, let me know and we'll go for a ride."
    )

    comment_4 = Comment(
        user_id=3, # Wilbur
        post_id=7,
        body="Hey, Orville. I'm well, miss you brother. Come visit me this weekend."
    )

    comment_5 = Comment(
        user_id=1, # Amelia
        post_id=2,
        body="Of course, Harriet! I'll send you a DM. 😊"
    )

    comment_6 = Comment(
        user_id=1,  # Amelia
        post_id=16,
        body="This is so cool! 😎"
    )

    comment_7 = Comment(
        user_id=3, # Wilbur
        post_id=15,
        body="Hilarious! It was too late for me to help you. 😅"
    )

    comment_8 = Comment(
        user_id=4, # Bessie
        post_id=18,
        body="Congrats, Ren! Well done girl 👏🏼"
    )

    comment_9 = Comment(
        user_id=9,
        post_id=3,
        body="This website is amazing!"
    )

    comment_10 = Comment(
        user_id=8,
        post_id=3,
        body="I'm sharing this to my friends. Awesome work!"
    )

    comment_11 = Comment(
        user_id=18,
        post_id=3,
        body="I'm not a Pilot but Flybook makes me wanna learn how to fly. Amazing job here, Renerose! Do you wanna work for me? 😊"
    )

    comment_12 = Comment(
        user_id=2,
        post_id=17,
        body="Hey Mark, I'm down. Wanna fly around this weekend? 😎"
    )

    comment_13 = Comment(
        user_id=18,
        post_id=17,
        body="Yes, that'll be awesome! We're so excited to meet you! 🙌🏼"
    )

    comment_14 = Comment(
        user_id=1,
        post_id=17,
        body="OMG! Post some photos please! 😁"
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)
    db.session.add(comment_14)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
