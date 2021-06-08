import datetime
from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        firstname="Amelia", 
        lastname="Earhart", 
        email='amelia@fb.com',
        password='password',
        birthday=datetime.date(1897, 7, 24),
        profile_src="https://theflybook.s3.amazonaws.com/amelia.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/amelia_cover.jpg",
        bio="Adventure is worthwhile in itself.",
        location="Somewhere in Howland Island",
        school="Columbia University",
        work="Aviator and Author"
    )

    user_1 = User(
        firstname="Renerose",
        lastname="Dimatulac",
        email='rdimatulac@fb.com',
        password='password',
        birthday=datetime.date(1993, 11, 27),
        profile_src="https://theflybook.s3.amazonaws.com/ren.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/ren_cover.jpg",
        bio="Your thoughts and actions become your world.",
        location="Chicago, Illinois",
        school="App Academy",
        work="Software Engineer"
    )

    user_2 = User(
        firstname="Wilbur",
        lastname="Wright",
        email='wilbur@fb.com',
        password='password',
        birthday=datetime.date(1867, 4, 16),
        profile_src="https://theflybook.s3.amazonaws.com/wilbur.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/wilbur_cover.jpeg",
        bio="If birds can glide for long periods of time, then… why can't I?",
        location="Millville, Indiana",
        school="App Academy",
        work="Aviator and Inventor"
    )

    user_3 = User(
        firstname="Bessie",
        lastname="Coleman",
        email='bessie@fb.com',
        password='password',
        birthday=datetime.date(1892, 1, 26),
        profile_src="https://theflybook.s3.amazonaws.com/bessie.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/bessie_cover.webp",
        bio="The air is the only place free from prejudice.",
        location="Atlanta, Texas",
        school="Langston University",
        work="American civil aviator"
    )

    db.session.add(demo)
    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
