from werkzeug.security import generate_password_hash
from app.models import db, Post, User


def seed_posts():

    post_1 = Post(
        user_id=1,  # Amelia
        wall_id=1,  # Amelia
        body="Women must try to do things as men have tried. When they fail, their failure must be but a challenge to others.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/amelia_1.jpg"
    )

    post_2 = Post(
        user_id=11, # Harriet
        wall_id=1,  # Amelia
        body="Hey Amelia, English Channel is waving at you, do you wanna go flying with me?",
        photo_src="https://theflybook.s3.amazonaws.com/posts/harriet_1.jpg"
    )

    post_3 = Post(
        user_id=2,  # Ren
        wall_id=2,  # Ren
        body="Greetings from the CEO, Welcome to Flybook!",
    )

    post_4 = Post(
        user_id=2,  # Ren
        wall_id=1,  # Amelia
        body="A bird sitting on a tree is never afraid of the branch breaking, because its trust is not on the branch but on its own wings. I am inspired by you, Amelia. ❤️",
        photo_src="https://theflybook.s3.amazonaws.com/posts/ren_1.jpg"
    )

    post_5 = Post(
        user_id=3,  # Wilbur
        wall_id=1,  # Amelia
        body="The desire to fly is an idea handed down to us by our ancestors who, in their grueling travels across trackless lands in prehistoric times, looked enviously on the birds soaring freely through.",
    )

    post_6 = Post(
        user_id=3,  # Wilbur
        wall_id=3,  # Wilbur
        body="With all the knowledge and skill acquired in thousands of flights in the last ten years, I would hardly think today of making my first flight on a strange machine in a 27-mile wind, even if I knew that the machine had already been flown and was safe.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/wilbur_1.jpg"
    )

    post_7 = Post(
        user_id=10, # Orville
        wall_id=3,  # Wilbur
        body="What's up, brother? How are you doing?",
    )

    post_8 = Post(
        user_id=4, # Bessie
        wall_id=4, # Bessie
        body="I decided blacks should not have to experience the difficulties I had faced, so I decided to open a flying school and teach other black women to fly.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/bessie_1.jpg"
    )

    post_9 = Post(
        user_id= 5, # Sully
        wall_id= 5, # Sully
        body="The transcripts of our conversation also show how Patrick’s choice of phrasing was helpful to me. Rather than telling me what airport I had to aim for, he asked me what airport I wanted. His words let me know that he understood that these hard choices were mine to make, and it wasn’t going to help if he tried to dictate a plan to me.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/sully_1.jpg"
    )

    post_10 = Post(
        user_id=2, # Ren
        wall_id=5, # Sully
        body="Hey Captain Sully, I watched your movie many times and I'm still amazed. ❤️",
    )

    post_11 = Post(
        user_id=7, # Charles
        wall_id=7, # Charles
        body="About forty miles away from Paris, I began to see the old trench flares they were sending up at Le Bourget. I knew then I had made it, and as I approached the field with all its lights, it was a simple matter to circle once and then pick a spot sufficiently far away from the crowd to land O.K.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/charles_1.jpg"
    )
    
    post_12 = Post(
        user_id=6, # Jimmy
        wall_id=6, # Jimmy
        body="The first lesson is that you can't lose a war if you have command of the air, and you can't win a war if you haven't.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/jimmy_1.jpg"
    )

    post_13 = Post(
        user_id=8, # Bob
        wall_id=8, # Bob
        body="I don't think I possess any skill that anyone else doesn't have. I've just had perhaps more of an opportunity, more of an exposure, and been fortunate to survive a lot of situations that many other weren't so lucky to make it.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/bob_1.jpg"
    )

    post_14 = Post(
        user_id=9, # Jacqueline
        wall_id=9, # Jacqueline
        body="I might have been born in a hovel, but I determined to travel with the wind and the stars.",
        photo_src="https://theflybook.s3.amazonaws.com/posts/jacqueline_1.jpg"
    )

    post_15 = Post(
        user_id=10, # Orville
        wall_id=10, # Orville
        body="Throwback to when my brother, Wilbur, just watched while I landed one of the early Wright gliders badly. 😂",
        photo_src="https://theflybook.s3.amazonaws.com/posts/orville_1.jpg"
    )

    post_16 = Post(
        user_id=2, # Ren
        wall_id=2, # Ren
        body="My kind of social distancing. 😎✌🏼",
        photo_src="https://theflybook.s3.amazonaws.com/posts/ren_2.jpg"
    )

    post_17 = Post(
        user_id=18, # Mark
        wall_id=18, # Mark
        body="Anyone here wants to take me and Priscilla up on a ride? 😁",
    )

    post_18 = Post(
        user_id=1,  # Amelia
        wall_id=2,  # Ren
        body="Congrats on your pilot's license, Ren! Let's go flying this weekend. See ya!",
        photo_src="https://theflybook.s3.amazonaws.com/posts/amelia_2.jpg"
    )

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.add(post_6)
    db.session.add(post_7)
    db.session.add(post_8)
    db.session.add(post_9)
    db.session.add(post_10)
    db.session.add(post_11)
    db.session.add(post_12)
    db.session.add(post_13)
    db.session.add(post_14)
    db.session.add(post_15)
    db.session.add(post_16)
    db.session.add(post_17)
    db.session.add(post_18)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
