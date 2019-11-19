from flask import Flask, escape, request, render_template, url_for, flash, redirect
from forms import RegistrationForm, LoginForm
from pymongo import MongoClient
from bson.objectid import ObjectId
#from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
client = MongoClient("mongodb://127.0.0.1", 27017)



app.config['SECRET_KEY'] = '7e21975e2a9201053c1149418a527591'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://site.db'

#db = SQLAlchemy(app)
db = client.ltucook

data = [{

		'author' : 'chris wright',
		'recipe' : 'pizza',
		'date_posted' : 'november 12, 2019',
		'content' : 'recipe content'
		},

		{

		'author' : 'jane janeson',
		'recipe' : 'lamb moussaka',
		'date_posted' : 'november 13, 2019',
		'content' : 'recipe content'
		}]

@app.route('/')
@app.route('/home')
def home():
    _recipes = db.recipes.find()
    return render_template("home.html",page_name='Home', data =_recipes)

@app.route('/home_after_login')
def home_after_login():
    _recipes = db.recipes.find()
    return render_template("home_after_login.html",page_name='Home after login', data =_recipes)

@app.route('/recipes')
def recipes():

	_recipes = db.recipes.find()
	return render_template('recipes.html', page_name='Recipes', data=_recipes)


def get_user_by_id(id):
    doc = db.profiles.find_one({'_id': ObjectId(id) })
    return doc

@app.route('/profile_home')
def profile_home():
    _recipes = db.recipes.find()
    _id = request.args.get('id')
    user_data = get_user_by_id(_id)
    return render_template('profile_home.html', page_name= 'Profile home', data = user_data, recipe_data = _recipes)



@app.route('/about')
def about():
	return render_template("about.html", title = 'About')


@app.route("/register", methods=['GET', 'POST'])
def register():
    
    if form.validate_on_submit():

        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    
    if form.validate_on_submit():
        cursor = db.profiles.find({"email": form.email.data, "password": form.password.data})
        if cursor.count() > 0:
           flash('You have logged in', 'success')
           return redirect(url_for('profile_home', id=cursor[0]['_id']))
        else:
            flash('Log in unsuccessful please try again', 'danger')
                
    return render_template('login.html', title='Login', form=form)


if __name__ == "__main__":
	app.run(debug=True)
