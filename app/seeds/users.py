import datetime
from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User( # id 1
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

    user_1 = User( # id 2
        firstname="Renerose",
        lastname="Dimatulac",
        email='rdimatulac@fb.com',
        password='password',
        birthday=datetime.date(1993, 11, 27),
        profile_src="https://theflybook.s3.amazonaws.com/ren.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/ren_cover.jpg",
        bio="CEO of Flybook and BRenB. Co-Founder of SlackX.",
        location="Chicago, Illinois",
        school="App Academy",
        work="Aviator and Software Engineer"
    )

    user_2 = User( # 3
        firstname="Wilbur",
        lastname="Wright",
        email='wilbur@fb.com',
        password='password',
        birthday=datetime.date(1867, 4, 16),
        profile_src="https://theflybook.s3.amazonaws.com/wilbur.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/wilbur_cover.jpeg",
        bio="If birds can glide for long periods of time, then… why can't I?",
        location="Millville, Indiana",
        school="High school diploma",
        work="Aviator and Inventor"
    )

    user_3 = User( # 4
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

    user_4 = User( # 5
        firstname="Chesley",
        lastname="Sullenberger",
        email='sully@fb.com',
        password='password',
        birthday=datetime.date(1952, 1, 23),
        profile_src="https://theflybook.s3.amazonaws.com/sully.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/sully_cover.jpg",
        bio="Tom Hanks played as me in the movie Sully.",
        location="Denison, Texas",
        school="University of Northern Colorado",
        work="Retired fighter pilot and airline captain"
    )

    user_5 = User( # 6
        firstname="Jimmy",
        lastname="Doolittle",
        email='jimmy@fb.com',
        password='password',
        birthday=datetime.date(1896, 12, 14),
        profile_src="https://theflybook.s3.amazonaws.com/jimmy.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/jimmy_cover.jpeg",
        bio="WWII Medal of Honor awardee.",
        location="Alameda, California",
        school="Massachusetts Institute of Technology",
        work="US Air Force General"
    )

    user_6 = User( # 7
        firstname="Charles",
        lastname="Lindbergh",
        email='charles@fb.com',
        password='password',
        birthday=datetime.date(1902, 2, 4),
        profile_src="https://theflybook.s3.amazonaws.com/charles.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/charles_cover.jpg",
        bio="I flew across the Atlantic Ocean, from New York City to Paris nonstop.",
        location="Detroit, Michigan",
        school="University of Wisconsin–Madison",
        work="American aviator, military officer, and author"
    )

    user_7 = User( # 8
        firstname="Bob",
        lastname="Hoover",
        email='bob@fb.com',
        password='password',
        birthday=datetime.date(1922, 1, 24),
        profile_src="https://theflybook.s3.amazonaws.com/bob.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/bob_cover.jpg",
        bio="If you're faced with a forced landing, fly the thing as far into the crash as possible.",
        location="Nashville, Tennessee",
        school="US Air Force Academy",
        work="American fighter pilot and flight instructor"
    )

    user_8 = User( # 9
        firstname="Jacqueline",
        lastname="Cochran",
        email='jacqueline@fb.com',
        password='password',
        birthday=datetime.date(1906, 5, 11),
        profile_src="https://theflybook.s3.amazonaws.com/jacqueline.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/jacqueline_cover.jpg",
        bio="First woman to ferry a bomber across the Atlantic Ocean in support of the war effort in 1941.",
        location="Muscogee, Cantonment, FL",
        school="US Air Force Academy",
        work="American pilot and business executive"
    )

    user_9 = User( # 10
        firstname="Orville",
        lastname="Wright",
        email='orville@fb.com',
        password='password',
        birthday=datetime.date(1871, 8, 19),
        profile_src="https://theflybook.s3.amazonaws.com/orville.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/orville_cover.jpg",
        bio="Inventor of Wright Flyer, the first successful heavier-than-air powered aircraft.",
        location="Dayton, Ohio",
        school="High school diploma",
        work="Aviator and Inventor"
    )

    user_10 = User( # 11
        firstname="Harriet",
        lastname="Quimby",
        email='harriet@fb.com',
        password='password',
        birthday=datetime.date(1875, 5, 11),
        profile_src="https://theflybook.s3.amazonaws.com/harriet.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/harriet_cover.jpg",
        bio="First woman to gain a pilot's license in the United States.",
        location="Arcadia, Michigan",
        school="Aero Club of America",
        work="American aviator and movie screenwriter"
    )

    user_11 = User( # 12
        firstname="James",
        lastname="Lentzsch",
        email='jameslentzsch@fb.com',
        password='password',
        birthday=datetime.date(1984, 12, 16),
        profile_src="https://theflybook.s3.amazonaws.com/lentzsch.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/lentzsch_cover.png",
        bio="Texas born and raised, TV/Film crew turned Software Engineer. Been flying since I was eight and flew aerobatics for the first time in a T-6 Texan when I was 12.",
        location="Los Angeles, California",
        school="Southern Methodist University",
        work="Aviator, Software Engineer, and CEO of Syphr"
    )

    user_12 = User( # 13
        firstname="Kimi",
        lastname="Yaaa",
        email='kimi@fb.com',
        password='password',
        birthday=datetime.date(2020, 3, 3),
        profile_src="https://slackx.s3.amazonaws.com/kimi.png",
        cover_src="https://theflybook.s3.amazonaws.com/kimi_cover.png",
        bio="I'm an aspiring teacup pomeranian pilot.",
        location="Jersey City, New Jersey",
        school="Pup Academy",
        work="Just an awesome pup eating some snacks"
    )

    user_13 = User( # 14
        firstname="Vivian",
        lastname="Chen",
        email='vivian@fb.com',
        password='password',
        birthday=datetime.date(1992, 4, 7),
        profile_src="https://theflybook.s3.amazonaws.com/vivian.png",
        cover_src="https://theflybook.s3.amazonaws.com/vivian_cover.png",
        bio="I am from Beijing. I traveled a lot, Arcadia National Park is my favorite place to go. I'm a TV reporter turned Helicopter Pilot.",
        location="Jersey City, New Jersey",
        school="Northwestern University, University of Minnesota",
        work="Journalist at Phoenix TV and CEO of Empirebnb"
    )

    user_14 = User( # 15
        firstname="Nathaniel",
        lastname="Cooke",
        email='nathaniel@fb.com',
        password='password',
        birthday=datetime.date(1996, 11, 3),
        profile_src="https://slackx.s3.amazonaws.com/nathaniel.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/nathaniel_cover.jpg",
        bio="CEO and Founder of Meme-azon. Add to cart now!",
        location="Las Vegas, Nevada",
        school="App Academy",
        work="Software Engineer and Airline Pilot"
    )

    user_15 = User( # 16
        firstname="Earl",
        lastname="Woo",
        email='earl@fb.com',
        password='password',
        birthday=datetime.date(1987, 6, 16),
        profile_src="https://slackx.s3.amazonaws.com/earl.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/earl_cover.png",
        bio="I love puppies! Bork bork! Founder of My Neighbork.",
        location="Philadelphia, Pennsylvania",
        school="App Academy",
        work="Software Engineer and Aerobatics Pilot"
    )

    user_16 = User( # 17
        firstname="Nurs",
        lastname="Asanov",
        email='nurs@fb.com',
        password='password',
        birthday=datetime.date(1994, 7, 31),
        profile_src="https://theflybook.s3.amazonaws.com/nurs.jpeg",
        cover_src="https://theflybook.s3.amazonaws.com/nurs-cover.jpg",
        bio="Founder of Numizmat, collect your coins today.",
        location="Houston, Texas",
        school="App Academy",
        work="CEO of Green Garden and Fighter Pilot"
    )

    user_17 = User(  # 18
        firstname="Mark",
        lastname="Zuckerberg",
        email='mark@fb.com',
        password='password',
        birthday=datetime.date(1984, 5, 14),
        profile_src="https://brenb.s3.amazonaws.com/avatars/user-3.jpg",
        cover_src="https://theflybook.s3.amazonaws.com/mark_cover.jpg",
        bio="Unless you are breaking stuff, you are not moving fast enough.",
        location="White Plains, New York",
        school="Harvard University",
        work="Chairman, CEO and co-founder of Facebook"
    )


    db.session.add(demo)
    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.add(user_6)
    db.session.add(user_7)
    db.session.add(user_8)
    db.session.add(user_9)
    db.session.add(user_10)
    db.session.add(user_11)
    db.session.add(user_12)
    db.session.add(user_13)
    db.session.add(user_14)
    db.session.add(user_15)
    db.session.add(user_16)
    db.session.add(user_17)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
