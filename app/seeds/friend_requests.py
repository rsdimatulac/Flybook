from app.models import db, User


def seed_friend_requests():
    users = User.query.all()

    amelia = users[0]
    wilbur = users[2]

    amelia.request_received.append(wilbur)
    wilbur.request_sent.append(amelia)
    db.session.commit()


def undo_friend_requests():
    db.session.execute('TRUNCATE friend_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
