import datetime
from .db import db

friend_requests = db.Table(
    "friend_requests",
    db.Column(
        "sender_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "receiver_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        'created_at', db.DateTime, nullable=False, default=datetime.datetime.now()
    ),
    db.Column(
        'updated_at', db.DateTime, nullable=False, default=datetime.datetime.now()
    )
)
