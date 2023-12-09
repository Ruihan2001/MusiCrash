from flask import Blueprint

testRoute = Blueprint('test', __name__, url_prefix='/test', template_folder='templates', static_folder='static')

from . import views