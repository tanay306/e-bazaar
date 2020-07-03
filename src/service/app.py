from flask import Flask, jsonify, request, json, session
from flask_mysqldb import MySQL
from passlib.hash import sha256_crypt
from functools import wraps
import json
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
    print(json.loads(request.data))
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

@app.route('/login', methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    username = request.get_json()['username']
    password = request.get_json()['password']
	
    result = cur.execute("SELECT * FROM users WHERE username = %s", [username])
    if result > 0:
        data = cur.fetchone()
        userID = data['id']
        role = data['role']

        if sha256_crypt.verify(data['password'], password):
            session['logged_in'] = True
            session['username'] = username
            session['role'] = role
            session['userID'] = userID
            return True
        else:
            error = 'Invalid Password'
            return False
        cur.close()

    else:
        error = 'Username not found'
        return False
        
    returning = {
		'username' : session['username']
	}
    return jsonify({'returning' : returning})


if __name__ == '__main__':
    app.run(debug=True)
