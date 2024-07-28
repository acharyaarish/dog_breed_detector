const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 8080;

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variables for sensitive information
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Could not connect to the database:', err);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Middleware
app.use(cors({
  origin: 'http://dog-breed-detector.s3-website-ap-southeast-2.amazonaws.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());

// API to get all dog breeds
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

// API to get a random dog image and breed
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

// API to submit a score
app.post('/submit_score', (req, res) => {
  const { user_name, score } = req.body;
  const query = 'INSERT INTO leaderboard (user_name, score) VALUES (?, ?) ON DUPLICATE KEY UPDATE score = GREATEST(score, VALUES(score))';
  db.query(query, [user_name, score], (err, result) => {
    if (err) {
      console.error('Error inserting score:', err);
      res.status(500).send('Error inserting score');
    } else {
      res.json({ message: 'Score submitted successfully!' });
    }
  });
});

// API to get the leaderboard
app.get('/leaderboard', (req, res) => {
  const query = 'SELECT user_name, MAX(score) as score FROM leaderboard GROUP BY user_name ORDER BY score DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching leaderboard:', err);
      res.status(500).send('Error fetching leaderboard');
    } else {
      res.json({ leaderboard: results });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
