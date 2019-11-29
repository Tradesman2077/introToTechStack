from flask import Flask, escape, request, render_template, url_for, flash, redirect, session
from forms import RegistrationForm, LoginForm, SearchForm
from pymongo import MongoClient
from wtforms import TextField
from bson.json_util import dumps
import json
from bson import json_util


from wtforms.validators import DataRequired, Length, Email, EqualTo


app = Flask(__name__)
client = MongoClient("mongodb+srv://chris:Blagger11@cluster0-alnur.azure.mongodb.net/test?retryWrites=true&w=majority")



app.config['SECRET_KEY'] = '7e21975e2a9201053c1149418a527591'

db = client.get_database('tech_careers')


@app.route('/')
@app.route('/home')
def home():
    _jobs = db.jobs.find()
    
    return render_template("home.html",page_name='Home', data =_jobs)


 
@app.route('/about')
def about():
	return render_template("about.html", title = 'About')

@app.route('/job_page')
def job_page():
	return render_template("job_page.html", title = 'Job Page')

@app.route('/results')
def results():
    data= [i for i in session['results']]   
    final_list=[]
    for i in data:
        i =0
        obj =json.loads(data[i])
        final_list.append(obj)
        i+=1
    
    
    
    
    return render_template("results.html", title = 'Results', results = final_list )


@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        new_profile = {'username' : form.username.data, 'email' : form.email.data, 'password': form.password.data}
        db.profiles.insert_one(new_profile)
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
           return redirect(url_for('home', id=cursor[0]['_id']))
        else:
            flash('Log in unsuccessful please try again', 'danger')
                
    return render_template('login.html', title='Login', form=form)



@app.route('/search', methods=['GET', 'POST'])
def search():
    form = SearchForm()
    if form.validate_on_submit():
        cursor = db.jobs.find({"title": {"$regex": form.keyword.data.replace(" ", ""), "$options": 'i'}})
        if cursor.count() > 0:
            json_docs = []
            for doc in cursor:
                json_doc = json.dumps(doc, default=json_util.default)
                json_docs.append(json_doc)
                session['results'] = json_docs   
            return redirect(url_for('results'))
        
        else:
            flash('No results found', 'danger')
        

    return render_template('search.html', title='Search', form=form)



if __name__ == "__main__":
	app.run(debug=True)
