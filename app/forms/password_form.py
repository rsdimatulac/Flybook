from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError("Email provided not found.")


class PasswordForm(FlaskForm):
    email = StringField('confirm_email', validators=[DataRequired(), user_exists])
    # password = StringField('password', validators=[
    #                        DataRequired(), password_matches])
