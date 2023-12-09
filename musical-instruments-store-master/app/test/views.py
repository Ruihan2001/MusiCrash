import leancloud

from app import socketio
from flask_socketio import SocketIO, emit
from flask import render_template, request, session, jsonify
from . import testRoute
from threading import Lock
from leancloud import cloud
from ..utils import product

# leancloud.init("pPObpvTV7pQB9poQHO1NJoMP-MdYXbMMI", "pShwYQQ4JVfSStc56MvkHNrr")

thread = None
thread_lock = Lock()


@socketio.event
def my_ping():
    emit('my_pong')


@socketio.event
def join():
    emit("id", {'data': 'test'})
    emit("notify", {'data': "someone join"}, broadcast=True)


@testRoute.route('/io')
def testio():
    return render_template("test_io.html", async_mode=socketio.async_mode)


@testRoute.route('/login')
def testlogin():
    return render_template("test_login.html", async_mode=socketio.async_mode)


@testRoute.route('/order')
def testorder():
    products = product.getAllProduct(0, 50)
    return render_template("test_order.html", products=products, async_mode=socketio.async_mode)


@testRoute.route('/')
def test():
    return render_template("MusiCrashTemplates/test.html", async_mode=socketio.async_mode)


@testRoute.route('/modifypw')
def testmodifypw():
    return render_template("MusiCrashTemplates/re.html", async_mode=socketio.async_mode)


@testRoute.route('/fuwenben')
def testfuwenben():
    return render_template("MusiCrashTemplates/fuwenben.html")


@testRoute.route('/collection')
def testCollection():
    return render_template("MusiCrashTemplates/collectionLists.html")


@testRoute.route('/CommunicationA')
def testCommunicationA():
    return render_template("test_communication_A.html")


@testRoute.route('/CommunicationB')
def testCommunicationB():
    return render_template("test_communication_B.html")




@testRoute.route('/orderList')
def testOrderList():
    return render_template("MusiCrashTemplates/orderList.html")




@testRoute.route('/producteditor')
def testProductEditor():
    labels=product.getAllCategory()
    return render_template("MusiCrashTemplates/productEditorNew.html",labels=labels)

@testRoute.route('/fillBillInfo')
def fillBillInfo():
    labels=product.getAllCategory()
    return render_template("MusiCrashTemplates/orderForm.html",labels=labels)

@testRoute.route('/orderDetail')
def orderDetail():
    labels=product.getAllCategory()
    return render_template("MusiCrashTemplates/orderDetail.html",labels=labels)


@testRoute.route('/producteditor/<id>')
def testProductEditorUpdate(id):
    labels = product.getAllCategory()
    return render_template("MusiCrashTemplates/productEditorNew.html", product_id=id,labels=labels)




# @main.route('/grotrian')
# def grotrian():
#     return render_template("category/grotrian.html", async_mode=socketio.async_mode)
#
#
# @main.route('/steinmeyer')
# def steinmeyer():
#     return render_template("category/steinmeyer.html", async_mode=socketio.async_mode)
#
#
# @main.route('/petrof')
# def petrof():
#     return render_template("category/petrof.html", async_mode=socketio.async_mode)
#
#
# @main.route('/yamaha')
# def yamaha():
#     return render_template("category/yamaha.html", async_mode=socketio.async_mode)
#
#
# @main.route('/Bösendorfer')
# def Bösendorfer():
#     return render_template("category/Bösendorfer.html", async_mode=socketio.async_mode)