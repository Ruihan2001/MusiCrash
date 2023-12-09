from flask import Blueprint

ch = Blueprint('ch', __name__, url_prefix='/ch', template_folder='templates', static_folder='static')

from . import views