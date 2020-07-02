from flask import Flask, jsonify, request, json, session, redirect, url_for
from flask_mysqldb import MySQL
import os
from PIL import Image
from passlib.hash import sha256_crypt
from functools import wraps
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/item_pics/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config.from_pyfile('config.py')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        username = request.get_json()['username']
        full_name = request.get_json()['full_name']
        email = request.get_json()['email']
        address = request.get_json()['address']
        area = request.get_json()['area']
        city_with_pincode = request.get_json()['city_with_pincode']
        state_name = request.get_json()['address']
        mobile_number = request.get_json()['mobile_number']
        password = sha256_crypt.encrypt(str(request.get_json()['password']))
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users(username,full_name,email,address,area,city_with_pincode,state_name,mobile_number,password) VALUES( %s, %s, %s, %s)",
                            (username,full_name,email,address,area,city_with_pincode,state_name,mobile_number,password))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message' : "You have successfully signed up!!!"})
	

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

            if sha256_crypt.verify(password, data['password']):
                results = { 
                            session['logged_in'] = True
                            session['username'] = username
                            session['role'] = role
                            session['userID'] = userID 
                          }
                return jsonify({'result' : result})
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

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#### LEFT ####
@app.route('/add_items', methods=['GET','POST'])
@is_logged_in
@is_admin
def add_items():
    if request.method = 'POST':
        cur = mysql.connection.cursor()
        title = request.get_json()['title']
        description = request.get_json()['description']
        img = request.files['img']
        price = request.get_json()['price']
        disc_price = request.get_json()['disc_price']
        size = request.get_json()['size']
        colour = request.get_json()['colour']
        category = request.get_json()['category']
        type_item = request.get_json()['type']
        delivery_in_days = request.get_json()['category']
        cur.execute("INSERT INTO courseware(user_id, title, description, img, price, disc_price, size, colour, category, type, delivery_in_days) VALUES(%s, %s, %s, %s, %s, %s)",
                    (session['userID'], title, description, img, price, disc_price, size, colour, category, type_item, delivery_in_days))

        mysql.connection.commit()
        cur.close()

@app.route('/admin_dashboard', methods=['GET'])
@is_logged_in
@is_admin
def admin_dashboard():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM items WHERE user_id=%s", session['userID'])
    results = cur.fetchall()
    cur.fetchall()
    return jsonify({'results' : results})
    cur.close()

@app.route('/clothing', methods=['GET'])
def clothing():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s", ("Clothing"))
    if result > 0:
        clothes = cur.fetchall()
        return jsonify({'clothes' : clothes})
    else:
        return jsonify({'message' : "No Items found in this category!!"})
    cur.close()

@app.route('/electronics', methods=['GET'])
def electronics():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s", ("Electronics"))
    if result > 0:
        electronics = cur.fetchall()
        return jsonify({'electronics' : electronics})
    else:
        return jsonify({'message' : "No Items found in this category!!"})
    cur.close()

@app.route('/furniture', methods=['GET'])
def furniture():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s", ("Furniture"))
    if result > 0:
        furnitures = cur.fetchall()
        return jsonify({'furnitures' : furnitures})
    else:
        return jsonify({'message' : "No Items found in this category!!"})
    cur.close()

@app.route('/home', methods=['GET'])
def home():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM items WHERE id IN (%s,%s,%s,%s,%s);", (1,3,4,5,7))
    deals = cur.fetchall()
    return jsonify({'deals' : deals})
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

@app.route('/dashboard', methods=['GET'])
@is_logged_in
def dashboard():
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


#### LEFT ####
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
