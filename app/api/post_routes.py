from flask import Blueprint, jsonify, request
# from flask_login import login_required
from app.models import db, User, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')  # GET /api/posts/
def posts():
    # posts = Post.query.all()
    # postList = {post.id: post.to_dict() for post in posts}
    # print("!!!!!!!!!!!!USER", userList)
    print("!!!!!!!!! USERRRRSS", userList)

    return userList
    # return {
    #     1: {"id": 1,
    #         "user_id": 5,
    #         "wall_id": 2,
    #         "body": "Post bodyyy here",
    #         "photo_url": "Photo url here",
    #         "created_at": "Created at",
    #         "updated_at": "Updated at here"
    #         },
    #     2: {"id": 2,
    #         "user_id": 10,
    #         "wall_id": 4,
    #         "body": "Post bodyyy here",
    #         "photo_url": "Photo url here",
    #         "created_at": "Created at",
    #         "updated_at": "Updated at here"
    #         }
    # }


@post_routes.route('/', methods=['POST'])  # POST /api/posts/
def new_post():

    # get the data from request body
    # user_id = request.get_json()['user_id']
    # wall_id = request.get_json()['wall_id']
    # body = request.get_json()['body']
    # pgoto
    # updated_at = request.get_json()['updated_at']

    # create an instance of the MODEL
    # post = Post(
    #              firstname=form.data['firstname'],
    #              lastname = form.data['lastname'],
    #              email = form.data['email'],
    #              password = form.data['password']
    #        )
    # db.session.add(post)
    # db.session.commit()
    # return post.
    return ("post.to_dict() HIT POST POST ROUTE")


# @post_routes.route('/<int:post_id>', methods=['PATCH']) # PATCH /api/posts/:post_id
