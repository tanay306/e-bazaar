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
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO items(user_id, title, description, price, disc_price, size, colour, category, type, delivery_in_days) VALUES(%s, %s, %s, %s, %s, %s)",
                    (session['userID'], title, description, price, disc_price, size, colour, category, type_item, delivery_in_days))
        mysql.connection.commit()
        cur.close()


if __name__ == '__main__':
    app.run(debug=True)

