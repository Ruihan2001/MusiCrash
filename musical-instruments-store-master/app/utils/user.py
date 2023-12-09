import leancloud
import config


def getOrderByUser(user_id, skip, limit):
    leancloud.User.set_current(config.CURRENT_USER)
    User = leancloud.Object.extend('_User')
    user = User.create_without_data(user_id)
    query = leancloud.Query('Order')
    query.limit(limit)
    query.skip(skip)
    query.descending('createdAt')
    query.equal_to('user', user)
    query.include('product')
    query.include('product.title')
    query.include('product.description')
    query.include('product.price')
    query.include('price')

    result = query.find()
    # lst = []
    # for i in result:
    #     lst += [i.get('product')]
    return result


def getCollectionByUser(user_id, limit, skip):
    User = leancloud.Object.extend('_User')
    user = User.create_without_data(user_id)
    query = leancloud.Query('CollectionMap')
    query.equal_to('user', user)
    query.include('product')
    query.include('product.title')
    query.include('product.description')
    query.include('product.price')
    query.limit(limit)
    query.skip(skip)
    result = query.find()
    # lst = []
    # for i in result:
    #     lst += [i.get('product')]
    return result


def getAllOrder(skip, limit):
    query = leancloud.Query('Order')
    query.limit(limit)
    query.skip(skip)
    query.include('product')
    query.include('user')
    query.include('price')
    query.include('product.title')
    query.include('product.description')
    result = query.find()
    return result


def getLogs(skip=0, limit=1000):
    leancloud.User.set_current(config.CURRENT_USER)
    query = leancloud.Query('Log')
    query.limit(limit)
    query.skip(skip)
    query.descending('createdAt')
    query.include('product')
    query.include('user')
    query.include('content')
    query.include('product.title')
    result = query.find()
    return result


def getOrderFilter(order, state, skip, limit):
    leancloud.User.set_current(config.CURRENT_USER)
    query = leancloud.Query('Order')
    if state is not None:
        query.equal_to('status', state)
        print(type(state))

    query.limit(limit)
    query.skip(skip)
    query.descending(order)
    query.include('product')
    query.include('user')
    query.include('price')
    query.include('product.title')
    query.include('product.description')
    result = query.find()
    return result


def getUserByPhonenumber(phone, skip=0, limit=50):
    query = leancloud.Query('_User')
    query.limit(limit)
    query.skip(skip)
    query.equal_to('mobilePhoneNumber', phone)
    result = query.find()
    return result


def getUserByEmail(email, skip=0, limit=50):
    query = leancloud.Query('_User')
    query.limit(limit)
    query.skip(skip)
    query.equal_to('email', email)
    result = query.find()
    return result
