from flask import Flask, jsonify, request, json, session
from flask_session import Session
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt
from functools import wraps
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
SECRET_KEY ='e-bazaar'
SESSION_TYPE = 'filesystem'
cors = CORS(app, resources={r"/register": {"origins": "http://127.0.0.1:5000"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_pyfile('config.py')
Session(app)

sess=Session()
app.secret_key = SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
sess.init_app(app)

mysql = MySQL(app)

@app.route('/register', methods=['POST','GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def register():
    cur = mysql.connection.cursor()
    requestdata=json.loads(request.data)
    print(requestdata)
    print(json.loads(request.data)['username'])
    username = requestdata['username']
    full_name = requestdata['full_name']
    email = requestdata['email']
    address = requestdata['address']
    area = requestdata['area']
    city_with_pincode = requestdata['city_with_pincode']
    state_name = requestdata['state']
    mobile_number = requestdata['mobile_number']
    password = requestdata['password']

    cur.execute("INSERT INTO users(username,full_name,email,address,area,city_with_pincode,state_name,mobile_number,password) VALUES( %s, %s, %s, %s,%s,%s,%s,%s,%s)",
                        (username,full_name,email,address,area,city_with_pincode,state_name,mobile_number,password))
    mysql.connection.commit()
	
    result = {
		'username' : username,
		'full_name' : full_name,
		'email' : email,
        'address' : address,
        'area' : area,
        'city_with_pincode' : city_with_pincode,
        'state_name' : state_name,
        'mobile_number' : mobile_number,
		'password' : password,
	}
    cur.close()
    return jsonify({'result' : result})

@app.route('/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    requestdata=json.loads(request.data)
    username = requestdata['username']
    password = requestdata['password']
	
    result = cur.execute("SELECT * FROM users WHERE username = %s", [username])
    if result > 0:
        data = cur.fetchone()
        userID = data['id']
        role = data['role']

        if data['password'] == password:
            session['logged_in'] = True
            session['username'] = username
            session['role'] = role
            session['user_id'] = userID
           
            # return jsonify({ 'response': 'Login successful' })
        else:
            error = 'Invalid Password'
            return jsonify({ 'error': error })
        cur.close()

    else:
        error = 'Username not found'
        return jsonify({ 'error': error })

    returning = {
        'userId': session['user_id'],
		'username': session['username']
	}
    return jsonify({'returning' : returning})

def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return jsonify({'message' : "You are not logged in!!"})
    return wrap

def is_admin(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if session['role'] == 'admin':
            return f(*args, **kwargs)
        else:
            return jsonify({'message' : "You are not a admin"})
    return wrap

@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    return jsonify({'message' : "You are logged out"})

@app.route('/user_details/<string:userId>', methods=['GET'])
@is_logged_in
def user_details(userId):
    print(userId)
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM users WHERE id=%s", userId)
    if result > 0:
        user_details = cur.fetchall()[0]
        return jsonify({'user_details' : user_details})
    else:
        return jsonify({'message' : "No User details Found!!!"})
    cur.close()

@app.route('/update_user', methods=['POST', 'PUT'])
@is_logged_in
def update_user():
    cur = mysql.connection.cursor()
    requestdata=json.loads(request.data)
    username = requestdata['username']
    full_name = requestdata['full_name']
    email = requestdata['email']
    address = requestdata['address']
    area = requestdata['area']
    city_with_pincode = requestdata['city_with_pincode']
    state_name = requestdata['state']
    mobile_number = requestdata['mobile_number']
    password = requestdata['password']

    cur.execute("UPDATE users SET username = %s, full_name = %s, email = %s, address = %s, area = %s, city_with_pincode = %s, state_name = %s, mobile_number = %s, password=%s WHERE id=%s",(username,full_name,email,address,area,city_with_pincode,state_name,mobile_number,password,session['userID']))
    mysql.connection.commit()
    result = {
		'username' : username,
		'full_name' : full_name,
		'email' : email,
        'address' : address,
        'area' : area,
        'city_with_pincode' : city_with_pincode,
        'state_name' : state_name,
        'mobile_number' : mobile_number,
		'password' : password,
	}
    cur.close()
    return jsonify({'result' : result})

@app.route('/add_items', methods=['GET','POST'])
@is_logged_in
@is_admin
def add_items():
    if request.method == 'POST':
        requestdata=json.loads(request.data)
        title = requestdata['title']
        description = requestdata['description']
        price = requestdata['price']
        disc_price = requestdata['disc_price']
        size = requestdata['size']
        colour = requestdata['colour']
        category = requestdata['category']
        type_item = requestdata['type']
        delivery_in_days = requestdata['delivery_in_days']
        seller = requestdata['seller']
        img = requestdata['img']
        
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO items(user_id, title, description, price, disc_price, size, colour, category, type, delivery_in_days, seller, img) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (session['userID'], title, description, price, disc_price, size, colour, category, type_item, delivery_in_days, seller, img))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message' : "Item Added"})

@app.route('/delete_item/<string:title>', methods=['POST'])
@is_logged_in
def delete_item(title):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM items WHERE title = %s", [title])
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item Deleted"})

@app.route('/edit_items/<string:id>', methods=['GET','POST'])
@is_logged_in
@is_admin
def edit_items(id):
    if request.method == 'POST':
        requestdata=json.loads(request.data)
        title = requestdata['title']
        description = requestdata['description']
        img = requestdata['description']
        price = requestdata['price']
        disc_price = requestdata['disc_price']
        size = requestdata['size']
        colour = requestdata['colour']
        category = requestdata['category']
        type_item = requestdata['type']
        delivery_in_days = requestdata['delivery_in_days']
        seller = requestdata['seller']

        cur = mysql.connection.cursor()
        cur.execute("UPDATE items SET title = %s, description = %s, img = %s, price = %s, disc_price = %s, size = %s, colour = %s, category = %s, type  = %s, delivery_in_days = %s, seller = %s WHERE id=%s",
                    (title, description, img, price, disc_price, size, colour, category, type_item, delivery_in_days, seller, [id]))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message' : "Item Edited"})

@app.route('/all_products', methods=['GET'])
def all_products():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items")
    if result > 0:
        products = cur.fetchall()
        return jsonify({'products' : products})
    else:
        return jsonify({'message' : "No Items Found!!!"})
    cur.close()

@app.route('/products/<string:title>', methods=['GET'])
def products(title):
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE title = %s", [title])
    if result > 0:
        details = cur.fetchall()
        return jsonify({'details' : details})
    else:
        return jsonify({'message' : "No Items Found!!!"})
    cur.close()

@app.route('/admin_products', methods=['GET'])
@is_logged_in
@is_admin
def admin_products():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE user_id=%s", (session['userID']))
    if result > 0:
        items = cur.fetchall()
        return jsonify({'items' : items})
    else:
        return jsonify({'message' : "No Items Found!!!"})
    cur.close()

@app.route('/category/<string:category_name>', methods=['GET'])
def category(category_name):
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s",[category_name])
    if result > 0:
        values = cur.fetchall()
        return jsonify({'values' : values})
    else:
        return jsonify({'message' : "No Items found in this category!!"})
    cur.close()

@app.route('/add_cart/<string:id>', methods=['GET','POST'])
@is_logged_in
def add_cart(id):
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO cart(user_id, item_id) VALUES(%s, %s)",
                    (session['user_id'], [id]))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item added to cart"})

@app.route('/cart', methods=['GET'])
@is_logged_in
def cart():
    total = 0
    count = 0
    cur = mysql.connection.cursor()
    result = cur.execute(f"""SELECT
                            cart.id,
                            users.coins,
                            cart.ordered,
                            items.id,
                            items.title,
                            items.price,
                            items.disc_price,
                            items.size,
                            items.colour,
                            items.delivery_in_days
                            FROM cart
                            INNER JOIN items on items.id = cart.item_id
                            INNER JOIN users on users.id = cart.user_id
                            WHERE users.id = {session['user_id']}
                            """)
    if result>0:
        cart_items = cur.fetchall()
        user_coins = cart_items['coins']
        for cart_item in cart_items:
            print(cart_item)
            total = total + float(cart_item['disc_price'])
            count = count + 1
        if user_coins >= total:
            cur.execute("UPDATE cart SET sufficient_balance = %s WHERE user_id = %s", ("True",session['user_id']))
            mysql.connection.commit()
            return jsonify({'cart_items' : cart_items, 'total' : total, 'count' : count, 'user_coins' : user_coins})
        else:
            return jsonify({'cart_items' : cart_items, 'total' : total, 'count' : count, 'user_coins' : user_coins, 'message': "Vannot proceed due to insufficient balance"})      
    else:
        return jsonify({'message' : "No Item added to the cart"})
    cur.close()

@app.route('/bill', methods=['GET'])
@is_logged_in
def bill():
    total = 0
    count = 0
    cur = mysql.connection.cursor()
    result = cur.execute(f"""SELECT
                            cart.id,
                            cart.ordered,
                            items.id,
                            items.title,
                            items.price,
                            items.disc_price,
                            items.size,
                            items.colour,
                            items.delivery_in_days
                            FROM cart
                            INNER JOIN items on items.id = cart.item_id
                            INNER JOIN users on users.id = cart.user_id
                            WHERE users.id = {session['userID']}
                            """)
    if result>0:
        cart_items = cur.fetchall()
        total = 0
        for cart_item in cart_items:
            print(cart_item['disc_price'])
            total = total + cart_item['disc_price']
            count = count + cart_item
        return jsonify({'cart_items' : cart_items, 'total' : total, 'count' : count})
    else:
        return jsonify({'message' : "No Item added to the cart"})
    cur.close()

@app.route('/order_status', methods=['GET'])
@is_logged_in
def order_status():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT id FROM orders WHERE user_id = %s",(session['userID']))
    if result > 0:
        values = cur.fetchall()
        return jsonify({'values' : values})
    else:
        return jsonify({'message' : "No orders"})

@app.route('/update_status/<string:id>' ,methods=['POST','PUT'])
@is_logged_in
def update_status(id):
    cur = mysql.connection.cursor()
    requestdata=json.loads(request.data)
    status = requestdata['status']

    cur.execute("UPDATE orders SET status=%s WHERE id=%s",(status,[id]))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Status Updated"})

@app.route('/add_orders', methods=['POST','PUT'])
@is_logged_in
def add_orders():
    cur = mysql.connection.cursor()
    cur.execute("UPDATE cart SET ordered = %s WHERE user_id = %s", ("True",session['userID']))
    cur.execute("INSERT INTO orders (user_id, item_id, cart_id) SELECT user_id, item_id, id FROM cart where ordered=%s",("True"))
    cur.execute("DELETE from cart where ordered=%s and user_id = %s", ("True",session['userID']))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Your Ordered has been placed"})

@app.route('/orders', methods=['GET'])
@is_logged_in
def orders():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM orders WHERE user_id = %s",[session['userID']])
    if result > 0:
        orders = cur.fetchall()
        return jsonify({'orders' : orders})
    else:
        return jsonify({'message' : "No ordered items"})

@app.route('/delete_cart/<string:id>', methods=['POST'])
@is_logged_in
def delete_cart(id):
    cur = mysql.connection.cursor()
    print("DELETE FROM cart WHERE id = %s AND user_id=%s", [id,session['user_id']])
    cur.execute("DELETE FROM cart WHERE id = %s AND user_id=%s", [id,session['user_id']])
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item Deleted From Cart"})


if __name__ == '__main__':
    app.run(debug=True)

