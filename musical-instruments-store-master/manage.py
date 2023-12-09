import os
from app import create_app, db, socketio
from flask_socketio import SocketIO, emit
from flask_script import Manager, Shell
import leancloud




async_mode = None
app = create_app(os.getenv('FLASK_CONFIG') or 'default')


manager = Manager(app)


manager.add_command('run', socketio.run(app, debug=True, host="0.0.0.0", port=5000))


def make_shell_context():
    manager.add_command("shell", Shell(make_context=make_shell_context))
    # manager.add_command('db', MigrateCommand)


def background_thread():
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count})


if __name__ == '__main__':
    manager.run()


