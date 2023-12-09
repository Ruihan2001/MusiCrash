from threading import Lock
from flask import Flask, config
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
from config import config
async_mode = None
socketio = SocketIO()


db = SQLAlchemy()
# from models import *


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    from .test import testRoute as test_blueprint
    app.register_blueprint(test_blueprint)
    from .main_ch import ch as ch_blueprint
    app.register_blueprint(ch_blueprint)

    socketio.init_app(app=app, async_mode=async_mode)

    return app

