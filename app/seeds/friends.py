from app.models import db, User


def seed_friends():
    users = User.query.all()

    amelia = users[0]
    ren = users[1]

    amelia.friends.append(ren)
    ren.friends.append(amelia)
    db.session.commit()

def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
