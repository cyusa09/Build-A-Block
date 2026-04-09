const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// Initialize Database with both Farming and Construction tables
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS farm_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL,
        moisture REAL,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS construction_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_name TEXT DEFAULT 'Kigali Residential',
        current_phase INTEGER DEFAULT 1, 
        budget_spent REAL DEFAULT 0,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

app.use(bodyParser.json());
app.use(express.static('public')); // This is where your unified index.html lives

const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");

// MASTER AI ROUTE: Handles both modes
app.post('/api/chat', async (req, res) => {
    const { message, mode } = req.body; 
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        let systemContext = "";

        if (mode === 'construction') {
            systemContext = "You are the BuildABlock Construction AI for Kigali projects.";
        } else {
            systemContext = "You are the BuildABlock Agronomist AI for Rwandan farms.";
        }

        const result = await model.generateContent(`${systemContext}\n\nUser: ${message}`);
        res.json({ reply: result.response.text() });
    } catch (error) {
        res.status(500).json({ reply: "AI Error occurred." });
    }
});

app.listen(port, () => console.log(`Platform live at http://localhost:${port}`));