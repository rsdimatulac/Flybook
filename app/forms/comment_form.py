from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired("Comment must not be empty.")])
