from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .posts import seed_posts, undo_posts
from .friends import seed_friends, undo_friends
from .friend_requests import seed_friend_requests, undo_friend_requests
from .likes import seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_comments()
    seed_friends()
    seed_friend_requests()
    seed_likes()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_comments()
    undo_friends()
    undo_friend_requests()
    undo_likes()
    # Add other undo functions here
