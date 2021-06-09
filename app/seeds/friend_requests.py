from app.models import db, User


def seed_friend_requests():
    users = User.query.all()

    amelia = users[0]
    ren = users[1]
    wilbur = users[2]
    bessie = users[3]
    sully = users[4]
    jimmy = users[5]
    charles = users[6]
    bob = users[7]
    jacqueline = users[8]
    orville = users[9]
    harriet = users[10]
    james = users[11]
    kimi = users[12]
    vivian = users[13]
    nathaniel = users[14]
    earl = users[15]
    nurs = users[16]

    amelia.request_received.append(kimi) # kimi sent fr to amelia
    kimi.request_sent.append(amelia)
    amelia.request_received.append(vivian) # vivian sent fr to amelia
    vivian.request_sent.append(amelia)
    amelia.request_received.append(earl)  # earl sent fr to amelia
    earl.request_sent.append(amelia)
    amelia.request_received.append(nurs) # nurs sent fr to amelia
    nurs.request_sent.append(amelia)
    amelia.request_received.append(nathaniel)  # nathaniel sent fr to amelia
    nathaniel.request_sent.append(amelia)
    db.session.commit()


def undo_friend_requests():
    db.session.execute('TRUNCATE friend_requests RESTART IDENTITY CASCADE;')
    db.session.commit()
