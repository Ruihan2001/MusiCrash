import random

import leancloud
from leancloud import cloud

leancloud.init("pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI", "pShwYQQ4JVfSStc56MvkHNrr")

username = 'webserver'
password = '12345678'
email=''
phone=''

current_user = leancloud.User.get_current()
if current_user is not None:
    if current_user.get('username') != username:
        current_user.logout()

if leancloud.User.get_current() is None:
    print('webserver login...')
    user = leancloud.User()
    user.login(username=username, password=password)

if leancloud.User.get_current() is not None:
    print('webserver login successfully with "{}"'.format(username))
else:
    print('webserver login fail')

def register():
    # 创建实例
    user = leancloud.User()

    # 等同于 user.set('username', 'Tom')
    user.set_username(username)
    user.set_password(password)

    # 可选
    user.set_email(email)
    user.set_mobile_phone_number(phone)

    # 设置其他属性的方法跟 leancloud.Object 一样
    user.set('gender', 'secret')

    user.sign_up()

def login():
    user = leancloud.User()
    user.login(username=username, password=password)

def logout():
    current_user = leancloud.User.get_current()
    if current_user is not None:
        current_user.logout()

def checkLoginState():
    current_user = leancloud.User.get_current()
    if current_user is not None:
        print(current_user)
    else:
        print('No user!!!')

def testCreateObject():
    # 声明 class
    Todo = leancloud.Object.extend('TestACL')

    # 构建对象
    todo = Todo()

    # 为属性赋值
    todo.set('title', 'my data')

    # 将对象保存到云端
    todo.save()

def testVisitObject():
    Todo = leancloud.Object.extend('TestACL')
    query = Todo.query
    todo = query.get('621dc04647ea564cbed7a5dc')

    # todo 就是 objectId 为 582570f38ac247004f39c24b 的 Todo 实例
    title = todo.get('title')

    # 获取内置属性
    object_id = todo.id
    update_at = todo.updated_at
    created_at = todo.created_at

    print(title)

def testUpdateObject():
    Todo = leancloud.Object.extend('TestACL')
    todo = Todo.create_without_data('621dc04647ea564cbed7a5dc')
    todo.set('title',str(random.random()*100))
    todo.save()



print(cloud.run('test'))
