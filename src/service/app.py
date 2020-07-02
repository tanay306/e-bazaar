from flask import Flask, jsonify, request, json, session
from flask_mysqldb import MySQL
import os
from passlib.hash import sha256_crypt
from functools import wraps
import json

app = Flask(__name__)
app.config.from_pyfile('config.py')

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        username = request.get_json()['username']
        full_name = request.get_json()['full_name']
        email = request.get_json()['email']
        address = request.get_json()['address']
        mobile_number = request.get_json()['mobile_number']
        password = sha256_crypt.encrypt(str(request.get_json()['password']))

        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users WHERE email=%s or mobile_number=%s", ([email], [mobile_number]))
        if result > 0:
            data = cur.fetchone()
            if data['email'] == email:
                return jsonify({'message' : "Email already taken"})
            if data['mobile_number'] == mobile_number:
                return jsonify({'message' : "Phone Number already taken"})
        else:
            cur.execute("INSERT INTO users(username,full_name,email,address,mobile_number,password) VALUES( %s, %s, %s, %s)",
                                (username,full_name,email,address,mobile_number,password))
            mysql.connection.commit()
            return jsonify({'message' : "You have successfully signed up!!!"})
        cur.close()
	
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.get_json()['username']
        password = request.get_json()['password']

        cur = mysql.connection.cursor()
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])
        if result > 0:
            data = cur.fetchone()
            userID = data['id']
            role = data['role']
            password_stored = data['password']

            if sha256_crypt.verify(password, password_stored):
                session['logged_in'] = True
                session['username'] = username
                session['role'] = role
                session['userID'] = userID 
                return jsonify({'message' : "Succesfully Logged In!!!"})
            else:
                return jsonify({'message' : "Incorrect password!!!"})

        else:
            return jsonify({'message' : "Entered username not found.Please SignUp!!!"})
        cur.close()

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
        title = request.get_json()['title']
        description = request.get_json()['description']
        price = request.get_json()['price']
        disc_price = request.get_json()['disc_price']
        size = request.get_json()['size']
        colour = request.get_json()['colour']
        category = request.get_json()['category']
        type_item = request.get_json()['type']
        delivery_in_days = request.get_json()['delivery_in_days']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO items(user_id, title, description, price, disc_price, size, colour, category, type, delivery_in_days) VALUES(%s, %s, %s, %s, %s, %s)",
                    (session['userID'], title, description, price, disc_price, size, colour, category, type_item, delivery_in_days))
        mysql.connection.commit()
        cur.close()

@app.route('/admin_dashboard', methods=['GET'])
@is_logged_in
@is_admin
def admin_dashboard():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM items WHERE user_id=%s", session['userID'])
    results = cur.fetchall()
    if results>0:
        return jsonify(results)
    cur.close()

@app.route('/clothing', methods=['GET'])
def clothing():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s", ("Clothing"))
    if result > 0:
        clothes = cur.fetchall()
        return jsonify(clothes)
    else:
        return jsonify({'message' : "No Items found in this category!!"})
    cur.close()

@app.route('/electronics', methods=['GET'])
def electronics():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s", ("Electronics"))
    if result > 0:
        electronics = cur.fetchall()
        return jsonify(electronics)
    else:
        return jsonify({'message' : "No Items found in this category!!"})
    cur.close()

@app.route('/formal', methods=['GET'])
def formal():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","formal"))
    if result > 0:
        formals = cur.fetchall()
        return jsonify(formals)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/casual', methods=['GET'])
def casual():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","casual"))
    if result > 0:
        casuals = cur.fetchall()
        return jsonify(casuals)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/semi_casual', methods=['GET'])
def semi_casual():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","semi_casual"))
    if result > 0:
        semi_casuals = cur.fetchall()
        return jsonify(semi_casuals)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/party_wear', methods=['GET'])
def party_wear():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","party_wear"))
    if result > 0:
        party_wears = cur.fetchall()
        return jsonify(party_wears)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/mobile', methods=['GET'])
def mobile():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","mobile"))
    if result > 0:
        mobiles = cur.fetchall()
        return jsonify(mobiles)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/laptop', methods=['GET'])
def laptop():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","laptop"))
    if result > 0:
        laptops = cur.fetchall()
        return jsonify(laptops)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/accessory', methods=['GET'])
def accessory():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","accessory"))
    if result > 0:
        accessories = cur.fetchall()
        return jsonify(accessories)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/household', methods=['GET'])
def household():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","household"))
    if result > 0:
        households = cur.fetchall()
        return jsonify(households)
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/home', methods=['GET'])
def home():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE id IN (%s,%s,%s,%s,%s);", (1,2,3,4,5))
    if result > 0:
        deals = cur.fetchall()
        return jsonify(deals)
    else:
        return jsonify({'message' : "No Deals Found"})
    cur.close()

@app.route('/add_cart/<string:id>', methods=['GET'])
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
    cart_items = cur.fetchall()
    if result>0:
        return jsonify({'cart_items' : cart_items})
    else:
        return jsonify({'message' : "No Item added to the cart"})
    cur.close()

"""
@app.route('/bill', methods=['GET'])
@is_logged_in
def bill():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT Sum(disc_price),Count(id)")
    if result>0:
        return jsonify({'billed_items' : billed_items})
    else:
        return jsonify({'message' : "No Item added to the cart"})
    cur.close()
"""

@app.route('/delete_cart/<string:id>', methods=['POST'])
@is_logged_in
def delete_cart(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM cart WHERE id = %s", [id])
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item Deleted From Cart"})

@app.route('/delete_item/<string:title>', methods=['POST'])
@is_logged_in
def delete_item(title):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM items WHERE title = %s", [title])
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item Deleted"})

if __name__ == '__main__':
    app.run(debug=True)
