from flask import Flask, render_template, request, redirect, url_for, flash, session
import json
import os
from functools import wraps

app = Flask(__name__)
app.secret_key = 'your_secret_key'  


mahasiswa_json_path = 'mahasiswa.json'
akun_json_path = 'akun.json'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_name' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    # Load student data from JSON file
    data = []
    if os.path.exists(mahasiswa_json_path):
        with open(mahasiswa_json_path, 'r') as file:
            data = json.load(file)

    
    mahasiswa = data[2]['data'] if len(data) > 2 else []
    
    return render_template('kelompok.html', mahasiswa=mahasiswa)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['nama']
        password = request.form['password']

        accounts = []
        if os.path.exists(akun_json_path):
            with open(akun_json_path, 'r') as file:
                accounts = json.load(file)

        for account in accounts:
            if account['nama'] == username and account['password'] == password:
                session['user_name'] = username  # Simpan nama pengguna dalam sesi
                return redirect(url_for('dashboard'))

        flash('Login failed. Please check your username and password.')
        return redirect(url_for('login'))

    return render_template('login.html')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def buat_akun():
    if request.method == 'POST':
        username = request.form['nama']
        password = request.form['password']

        
        accounts = []
        if os.path.exists(akun_json_path):
            with open(akun_json_path, 'r') as file:
                accounts = json.load(file)

        
        accounts.append({"nama": username, "password": password})

        
        with open(akun_json_path, 'w') as file:
            json.dump(accounts, file, indent=4)

        return redirect(url_for('login'))

    return render_template('buat_akun.html')

@app.route('/dashboard')
@login_required
def dashboard():
    user_name = session.get('user_name', 'Guest')
    user_data = {"name": user_name}  
    return render_template('dashboard/dashboard.html', user_data=user_data)

@app.route('/Materi')
@login_required
def materi():
    return render_template('dashboard/materi.html')

@app.route('/quiz')
@login_required
def quiz():
    return render_template('index.html')

@app.route('/jadwalkuliah')
@login_required
def jadwal():
    return render_template('dashboard/jadwal.html')



if __name__ == '__main__':
    app.run(debug=True)