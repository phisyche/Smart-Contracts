from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)


@app.route('/Projects')
def Projects():
    return render_template('Projects.html')


@app.route('/Blockchain')
def Blockchain():
    return render_template('Blockchain.html')


@app.route('/Scientists')
def Scientists():
    return render_template('Scientists.html')


@app.route('/Login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid credentials. Please try again.'
        else:
            return redirect('index.html')
    return render_template('Login.html', error=error)


@app.route('/Register')
def Register():
    return render_template('Register.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
