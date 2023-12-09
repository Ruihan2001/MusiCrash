from app import socketio
from flask_socketio import SocketIO, emit
from flask import render_template, request, session, jsonify, redirect, url_for
from . import ch
from threading import Lock
from functools import wraps
from leancloud import cloud
from ..utils import product, user

thread = None
thread_lock = Lock()


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('authenticated') is None or session.get('authenticated') is False:
            return redirect(url_for("ch.signUp"))
        return f(*args, **kwargs)
    return decorated_function


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('is_operation') is None or session.get('is_operation') is False:
            return redirect(url_for("ch.index"))
        return f(*args, **kwargs)
    return decorated_function


# 索引页面index
@ch.route('/')
def index():
    kinds = product.getAllCategory(0, 50)
    if session.get('authenticated') is None or session.get('authenticated') is False:
        authenticated = False
    else:
        authenticated = True
    return render_template("index_zh.html", kinds=kinds, authenticated=authenticated, async_mode=socketio.async_mode)


# 登录注册页面
@ch.route('/signUp')
def signUp():
    return render_template("signUp_zh.html", async_mode=socketio.async_mode)


# 个人信息页面
@ch.route('/testbase')
def testbase():
    return render_template("MusiCrashTemplates/userCenter_zh.html", async_mode=socketio.async_mode)


@ch.route('/testinfo')
def testinfo():
    return render_template("MusiCrashTemplates/userInformation_zh.html", async_mode=socketio.async_mode)


@ch.route('/testmodify')
def testmodify():
    return render_template("MusiCrashTemplates/modifyInfomation_zh.html", async_mode=socketio.async_mode)


# @ch.route('/history_order')
# def history_order():
#     return render_template("MusiCrashTemplates/orderList_zh.html", async_mode=socketio.async_mode)
#订单填写页面
@ch.route('/ViewBillInfo/<order_id>')
@login_required
def ViewBillInfo(order_id):
    order = product.getOrderById(order_id)
    return render_template("MusiCrashTemplates/orderMerchant_zh.html", order= order)


# 商品品牌分类页面
@ch.route('/category')
def category():
    kinds = product.getAllCategory(0, 50)
    return render_template("category_zh.html", kinds=kinds, async_mode=socketio.async_mode)


# 不同品牌商品的商品展示页面
@ch.route('/kind/<kind_id>')
def kinds(kind_id):
    products = product.getProductByCategory(kind_id)
    kind = product.getCategoryById(kind_id)
    return render_template("kind_zh.html", products=products, kind=kind, async_mode=socketio.async_mode)


# 商品具体信息页面
@ch.route('/productInfo/<product_id>')
def productInfo(product_id):
    commodity = product.getProductById(product_id, record=True)
    # print(product_id)
    # commodity_title = commodity.get('title').get('english')
    return render_template("piano_zh.html", commodity=commodity, async_mode=socketio.async_mode)


# 后台页面index
@ch.route('/staff_index')
@admin_required
def staff_index():
    return render_template("staff_index_CN.html")


# 后台页面数据展示
@ch.route('/backend_data')
def backend_data():
    logs = user.getLogs()
    return render_template("backend_zh.html",logs=logs)


# 个人中心展示商品订单
@ch.route('/orderList/<user_id>')
@login_required
def userOrderList(user_id):
    orders = user.getOrderByUser(user_id, 0, 100)
    page_size = 5
    if len(orders) % page_size != 0:
        page = len(orders) // page_size + 1
    else:
        page = len(orders) // page_size

    current_page = request.args.get('page', 1, type=int)
    next_page = current_page + 1
    pre_page = current_page - 1
    pre_pos = current_page // 5 * 5 - 1
    next_post = current_page // 5 * 5 + 5
    has_next = True
    has_pre = True
    page_orders = user.getOrderByUser(user_id, (current_page - 1) * page_size, page_size)
    if current_page >= page:
        next_page = None
        has_next = False
    if current_page == 1:
        pre_page = None
        has_pre = False
    pagination = {
        "page": page,
        "current_page": current_page,
        "next_page": next_page,
        "pre_page": pre_page,
        "pre_post": pre_pos,
        "has_next": has_next,
        "has_pre": has_pre,
        "next": next_post
    }
    return render_template("MusiCrashTemplates/orderList_zh.html", user_id=user_id, order_list=page_orders, pagination=pagination)

# 后台展示商品订单
@ch.route('/allOrderList')
def allOrderList():
    state = request.args.get('state', None, type=str)
    order = request.args.get('order', 'createdAt', type=str)
    orders = user.getOrderFilter(order, state, 0, 1000)
    page_size = 5
    if len(orders) % page_size != 0:
        page = len(orders) // page_size + 1
    else:
        page = len(orders) // page_size

    current_page = request.args.get('page', 1, type=int)
    next_page = current_page + 1
    pre_page = current_page - 1
    pre_pos = current_page // 5 * 5 - 1
    next_post = current_page // 5 * 5 + 5
    has_next = True
    has_pre = True
    page_orders = user.getOrderFilter(order, state, (current_page-1)*page_size, page_size)
    print(page_orders)
    if current_page >= page:
        next_page = None
        has_next = False
    if current_page == 1:
        pre_page = None
        has_pre = False
    pagination = {
        "page": page,
        "current_page": current_page,
        "next_page": next_page,
        "pre_page": pre_page,
        "has_next": has_next,
        "has_pre": has_pre,
        "pre_post": pre_pos,
        "next": next_post
    }

    return render_template("orderList_merchant_zh.html", order_list=page_orders, pagination=pagination, status=state, filter=order)


#订单填写页面
@ch.route('/fillBillInfo/<product_id>')
@login_required
def fillBillInfo(product_id):
    piano = product.getProductById(product_id)
    labels = product.getAllCategory()
    return render_template("MusiCrashTemplates/orderForm_zh.html", piano=piano, labels=labels)


# 后台页面显示商品列表
@ch.route('/productList')
def productList():
    products = product.getAllProduct(0, 100)
    page_size = 15
    if len(products) % page_size != 0:
        page = len(products) // page_size + 1
    else:
        page = len(products) // page_size

    current_page = request.args.get('page', 1, type=int)
    next_page = current_page + 1
    pre_page = current_page - 1
    pre_pos = current_page // 5 * 5 - 1
    next_post = current_page // 5 * 5 + 5
    has_next = True
    has_pre = True
    page_products = product.getAllProduct((current_page - 1) * page_size, page_size)
    if current_page >= page:
        next_page = None
        has_next = False
    if current_page == 1:
        pre_page = None
        has_pre = False
    pagination = {
        "page": page,
        "current_page": current_page,
        "next_page": next_page,
        "pre_page": pre_page,
        "has_next": has_next,
        "has_pre": has_pre,
        "pre_post": pre_pos,
        "next": next_post
    }

    lst = []
    for i in page_products:
        lst += [[product.getCategoryByProduct(i.id), i]]
    return render_template("staff_chat_CN.html", lst=lst, pagination=pagination)


@ch.route('/resetPassword')
def resetPassword():
    return render_template("MusiCrashTemplates/resetPassword_zh.html")


@ch.route('/about_us')
def aboutus():
    return render_template("MusiCrashTemplates/about_us_zh.html")

@ch.route('/communicate/1')
@login_required
def communicate():
    return render_template("test_communication_A_CN.html")


@ch.route('/conversation/<conversation_id>')
def conversation(conversation_id):
    return render_template("test_communication_A_CN.html", conversation_id=conversation_id)


@ch.route('/checkEmail', methods=['GET', 'POST'])
def check_email():
    email = request.args.get('email')
    user_lst = user.getUserByEmail(email)
    if len(user_lst) > 0:
        return jsonify(code=400, msg='邮箱已存在')
    else:
        return jsonify(code=200, msg="邮箱可用")


@ch.route('/checkPhone', methods=['GET', 'POST'])
def check_phone():
    phone = request.args.get('phone')
    user_lst = user.getUserByPhonenumber(phone)
    if len(user_lst) > 0:
        return jsonify(code=400, msg="电话号码已存在")
    else:
        return jsonify(code=200, msg="电话号码可用")


@ch.route('/checkPassword', methods=['GET', 'POST'])
def check_password():
    password = request.args.get('password')
    cpassword = request.args.get('cpassword')
    if password != cpassword:
        return jsonify(code=400, msg="两次输入的密码不一样")
    else:
        return jsonify(code=200, msg="成功")



@ch.route('/collection/<user_id>')
def collection(user_id):
    collections = user.getCollectionByUser(user_id, 1000, 0)

    page_size = 5
    if len(collections) % page_size != 0:
        page = len(collections) // page_size + 1
    else:
        page = len(collections) // page_size

    current_page = request.args.get('page', 1, type=int)
    next_page = current_page + 1
    pre_page = current_page - 1
    pre_pos = current_page // 5 * 5 - 1
    next_post = current_page // 5 * 5 + 5
    has_next = True
    has_pre = True
    page_orders = user.getCollectionByUser(user_id, page_size, (current_page - 1) * page_size)
    if current_page >= page:
        next_page = None
        has_next = False
    if current_page == 1:
        pre_page = None
        has_pre = False
    pagination = {
        "page": page,
        "current_page": current_page,
        "next_page": next_page,
        "pre_page": pre_page,
        "pre_post": pre_pos,
        "has_next": has_next,
        "has_pre": has_pre,
        "next": next_post
    }
    return render_template("MusiCrashTemplates/collectionLists_zh.html", user_id=user_id, collections=page_orders, async_mode=socketio.async_mode,pagination=pagination)


