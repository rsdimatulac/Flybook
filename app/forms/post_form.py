from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class PostForm(FlaskForm):
    photo_src = StringField('photo_src', validators=[Length(min=0, max=500, message="Photo url must be 500 characters or less.")])
    body = TextAreaField('body', validators=[DataRequired()])
