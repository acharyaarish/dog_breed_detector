import os
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'leaderboard.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Leaderboard model
class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)

# Create the database tables
def create_tables():
    with app.app_context():
        db.create_all()
        print("Database tables created.")
        print("Database path: ", db_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/breeds')
def get_breeds():
    response = requests.get('https://dog.ceo/api/breeds/list/all')
    breeds = response.json().get('message', {})
    breed_list = list(breeds.keys())
    return jsonify(breeds=breed_list)

@app.route('/random_dog')
def get_random_dog():
    response = requests.get('https://dog.ceo/api/breeds/image/random')
    image_url = response.json().get('message', '')
    breed = image_url.split('/')[4]
    return jsonify(image_url=image_url, breed=breed)

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.get_json()
    new_entry = Leaderboard(user_name=data['user_name'], score=data['score'])
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(message="Score submitted successfully!")

@app.route('/leaderboard')
def leaderboard():
    leaderboard_data = Leaderboard.query.order_by(Leaderboard.score.desc()).all()
    results = [{"user_name": entry.user_name, "score": entry.score} for entry in leaderboard_data]
    return jsonify(leaderboard=results)

if __name__ == '__main__':
    create_tables()  # Ensure tables are created
    app.run(debug=True)
