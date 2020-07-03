from flask import Flask, jsonify, request, json, session
from flask_mysqldb import MySQL
import os
from passlib.hash import sha256_crypt
from functools import wraps
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/register": {"origins": "http://127.0.0.1:5000"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_pyfile('config.py')

mysql = MySQL(app)

@app.route('/register', methods=['POST','GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def register():
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    full_name = request.get_json()['full_name']
    email = request.get_json()['email']
    address = request.get_json()['address']
    area = request.get_json()['area']
    city_with_pincode = request.get_json()['city_with_pincode']
    state_name = request.get_json()['address']
    mobile_number = request.get_json()['mobile_number']
    password = sha256_crypt.encrypt(request.get_json()['password']).decode('utf-8')
	
    cur.execute("INSERT INTO users(username,full_name,email,address,area,city_with_pincode,state_name,mobile_number,password) VALUES( %s, %s, %s, %s)",
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
	
# may not work due to session #
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
                results = { 
                            'session['logged_in']' : session['logged_in'],
                            'session['username']' : session['username'],
                            'session['role']' : session['role'],
                            'session['userID']' : session['userID']
                          }
                return jsonify({'result' : result})
            else:
                return jsonify({'message' : "Incorrect password!!!"})

        else:
            return jsonify({'message' : "Entered username not found.Please SignUp!!!"})
        cur.close()

# may not work #
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return jsonify({'message' : "You are not logged in!!"})
    return wrap

# may not work #
def is_admin(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if session['role'] == 'admin':
            return f(*args, **kwargs)
        else:
            return jsonify({'message' : "You are not a admin"})
    return wrap

# may not work #
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    return jsonify({'message' : "You are logged out"})

@app.route('/add_items', methods=['GET','POST'])
@is_logged_in
@is_admin
def add_items():
    if request.method = 'POST':
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
        cur.execute("INSERT INTO courseware(user_id, title, description, price, disc_price, size, colour, category, type, delivery_in_days) VALUES(%s, %s, %s, %s, %s, %s)",
                    (session['userID'], title, description, price, disc_price, size, colour, category, type_item, delivery_in_days))
        mysql.connection.commit()
        cur.close()

# Doubtful if Works #
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

@app.route('/formal', methods=['GET'])
def formal():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","formal"))
    if result > 0:
        formals = cur.fetchall()
        return jsonify({'formals' : formals})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/casual', methods=['GET'])
def casual():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","casual"))
    if result > 0:
        casuals = cur.fetchall()
        return jsonify({'casuals' : casuals})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/semi_casual', methods=['GET'])
def semi_casual():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","semi_casual"))
    if result > 0:
        semi_casuals = cur.fetchall()
        return jsonify({'semi_casuals' : semi_casuals})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/party_wear', methods=['GET'])
def party_wear():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Clothing","party_wear"))
    if result > 0:
        party_wears = cur.fetchall()
        return jsonify({'party_wears' : formals})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/mobile', methods=['GET'])
def mobile():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","mobile"))
    if result > 0:
        mobiles = cur.fetchall()
        return jsonify({'mobiles' : mobiles})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/laptop', methods=['GET'])
def laptop():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","laptop"))
    if result > 0:
        laptops = cur.fetchall()
        return jsonify({'laptops' : laptops})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/accessory', methods=['GET'])
def accessory():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","accessory"))
    if result > 0:
        accessorys = cur.fetchall()
        return jsonify({'accessorys' : accessorys})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/household', methods=['GET'])
def household():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * FROM items WHERE category=%s and type=%s", ("Electronics","household"))
    if result > 0:
        households = cur.fetchall()
        return jsonify({'households' : households})
    else:
        return jsonify({'message' : "No items found!!"})
    cur.close()

@app.route('/home', methods=['GET'])
def home():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM items WHERE id IN (%s,%s,%s,%s,%s);", (1,3,4,5,7))
    deals = cur.fetchall()
    return jsonify({'deals' : deals})
    cur.close()

# may not work #
@app.route('/add_cart/<string:id>', methods=['GET'])
@is_logged_in
def add_cart(id):
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO cart(user_id, item_id) VALUES(%s, %s)",
                    (session['userID'], [id]))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item added to cart"})

# may not work #
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

# may not work #
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

# may not work #
@app.route('/delete_cart/<string:id>', methods=['POST'])
@is_logged_in
def delete_cart(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM cart WHERE id = %s", [id])
    mysql.connection.commit()
    cur.close()
    return jsonify({'message' : "Item Deleted From Cart"})

# may not work #
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
