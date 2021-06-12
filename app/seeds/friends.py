from app.models import db, User


def seed_friends():
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
    mark = users[17]


    amelia.friends.append(ren) # amelia <-> ren
    ren.friends.append(amelia)
    amelia.friends.append(mark)  # amelia <-> mark
    mark.friends.append(amelia)
    amelia.friends.append(wilbur) # amelia <-> wilbur 
    wilbur.friends.append(amelia)
    amelia.friends.append(bessie) # amelia <-> bessie
    bessie.friends.append(amelia)
    amelia.friends.append(sully) # amelia <-> sully
    sully.friends.append(amelia)
    amelia.friends.append(jimmy) # amelia <-> jimmy
    jimmy.friends.append(amelia)
    amelia.friends.append(charles) # amelia <-> charles
    charles.friends.append(amelia)
    amelia.friends.append(bob) # amelia <-> bob
    bob.friends.append(amelia)
    amelia.friends.append(jacqueline) # amelia <-> jacqueline
    jacqueline.friends.append(amelia)
    amelia.friends.append(orville) # amelia <-> orville
    orville.friends.append(amelia)
    amelia.friends.append(harriet) # amelia <-> harriet
    harriet.friends.append(amelia)
    amelia.friends.append(james)  # amelia <-> james
    james.friends.append(amelia)
    ren.friends.append(james) # ren <-> james
    james.friends.append(ren)
    ren.friends.append(kimi) # ren <-> kimi
    kimi.friends.append(ren)
    ren.friends.append(vivian)  # ren <-> vivian
    vivian.friends.append(ren)
    ren.friends.append(mark)  # ren <-> mark
    mark.friends.append(ren)
    ren.friends.append(nathaniel)  # ren <-> nathaniel
    nathaniel.friends.append(ren)
    ren.friends.append(earl)  # ren <-> earl
    earl.friends.append(ren)
    ren.friends.append(nurs)  # ren <-> nurs
    nurs.friends.append(ren)
    vivian.friends.append(kimi) # vivian <-> kimi
    kimi.friends.append(vivian)
    vivian.friends.append(nathaniel)  # vivian <-> nathaniel
    nathaniel.friends.append(vivian)
    vivian.friends.append(earl)  # vivian <-> earl
    earl.friends.append(vivian)
    vivian.friends.append(nurs)  # vivian <-> nurs
    nurs.friends.append(vivian)
    nathaniel.friends.append(kimi)  # nathaniel <-> kimi
    kimi.friends.append(nathaniel)
    nathaniel.friends.append(earl)  # nathaniel <-> earl
    earl.friends.append(nathaniel)
    nathaniel.friends.append(nurs)  # nathaniel <-> nurs
    nurs.friends.append(nathaniel)
    earl.friends.append(kimi)  # earl <-> kimi
    kimi.friends.append(earl)
    earl.friends.append(nurs)  # earl <-> nurs
    nurs.friends.append(earl)
    nurs.friends.append(kimi)  # nurs <-> kimi
    kimi.friends.append(nurs)
    wilbur.friends.append(orville) # wilbur <-> orville
    orville.friends.append(wilbur)
    
    db.session.commit()

def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
