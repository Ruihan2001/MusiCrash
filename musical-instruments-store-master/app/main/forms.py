from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired('username is null')])
    password = PasswordField('password', validators=[DataRequired('password is null')])
    submit = SubmitField("Log in")