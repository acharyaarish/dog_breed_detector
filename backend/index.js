const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE leaderboard (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, score INTEGER)');
});

app.get('/breeds', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    const breeds = response.data.message;
    res.json({ breeds: Object.keys(breeds) });
  } catch (error) {
    console.error('Error fetching breeds:', error);
    res.status(500).send('Error fetching breeds');
  }
});

app.get('/random_dog', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const imageUrl = response.data.message;
    const breed = imageUrl.split('/')[4];
    res.json({ image_url: imageUrl, breed });
  } catch (error) {
    console.error('Error fetching random dog:', error);
    res.status(500).send('Error fetching random dog');
  }
});

app.post('/submit_score', (req, res) => {
  const { user_name, score } = req.body;
  db.run('INSERT INTO leaderboard (user_name, score) VALUES (?, ?)', [user_name, score], (err) => {
    if (err) {
      console.error('Error inserting score:', err);
      res.status(500).send('Error inserting score');
    } else {
      res.json({ message: 'Score submitted successfully!' });
    }
  });
});

app.get('/leaderboard', (req, res) => {
  db.all('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 1', (err, rows) => {
    if (err) {
      console.error('Error fetching leaderboard:', err);
      res.status(500).send('Error fetching leaderboard');
    } else {
      res.json({ leaderboard: rows });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
