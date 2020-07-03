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
    print(session)
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
            session['userID'] = userID
           
            # return jsonify({ 'response': 'Login successful' })
        else:
            error = 'Invalid Password'
            return jsonify({ 'error': error })
        cur.close()

    else:
        error = 'Username not found'
        return False

    returning = {
		'username' : session['username']
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

@app.route('/add_items', methods=['GET','POST'])
@is_logged_in
@is_admin
def add_items():
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
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO items(user_id, title, description, img, price, disc_price, size, colour, category, type, delivery_in_days) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                    (session['userID'], title, description, img, price, disc_price, size, colour, category, type_item, delivery_in_days))
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

@app.route('/edit_items<string:id>', methods=['GET','POST'])
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
        cur = mysql.connection.cursor()
        cur.execute("UPDATE items SET title = %s, description = %s, img = %s, price = %s, disc_price = %s, size = %s, colour = %s, category = %s, type  = %s, delivery_in_days = %s WHERE id=%s",
                    (title, description, img, price, disc_price, size, colour, category, type_item, delivery_in_days, [id]))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message' : "Item Edited"})

@app.route('/admin_dashboard', methods=['GET'])
@is_logged_in
@is_admin
def admin_dashboard():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE user_id=%s", session['userID'])
    if result > 0:
        items = cur.fetchall()
        return jsonify({'items' : items})
    else:
        return jsonify({'message' : "No Items Found!!!"})
    cur.close()

@app.route('/category/<string:category_name>', methods=['GET'])
def category(category_name):
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s", ("category_name"))
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
                    (session['userID'], [id]))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item added to cart"})

@app.route('/cart', methods=['GET'])
@is_logged_in
def cart():
    total = 0
    count = 0
    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT
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
        for cart_item in cart_items:
            total = total + cart_item['disc_price']
            count = count + cart_item
        return jsonify({'cart_items' : cart_items, 'total' : total, 'count' : count})
    else:
        return jsonify({'message' : "No Item added to the cart"})
    cur.close()

@app.route('/bill', methods=['GET'])
@is_logged_in
def bill():
    total = 0
    count = 0
    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT
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
        for cart_item in cart_items:
            total = total + cart_item['disc_price']
            count = count + cart_item
        return jsonify({'cart_items' : cart_items, 'total' : total, 'count' : count})
    else:
        return jsonify({'message' : "No Item added to the cart"})
    cur.close()

@app.route('/delete_cart/<string:id>', methods=['POST'])
@is_logged_in
def delete_cart(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM cart WHERE id = %s", [id])
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item Deleted From Cart"})


if __name__ == '__main__':
    app.run(debug=True)

