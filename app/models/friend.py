import datetime
from .db import db


friends = db.Table(
    "friends",
    db.Column(
        "user_a", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "user_b", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        'created_at', db.DateTime, nullable=False, default=datetime.datetime.utcnow()
    ),
    db.Column(
        'updated_at', db.DateTime, nullable=False, default=datetime.datetime.utcnow()
    )
)
