const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();

// Initialize Database
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);
});

app.use(bodyParser.urlencoded({ extended: true }));

// Handle Sign In
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.send("User not found or error occurred.");
    }

    // Compare the entered password with the hashed one in the DB
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
      res.send("Sign In Successful!");
    } else {
      res.send("Incorrect password.");
    }
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

