const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789', // Using the provided MySQL password
    database: 'stock'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        return;
    }
    console.log('MySQL Connected Successfully');
});

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
});

// Get all companies
app.get('/api/companies', async (req, res) => {
    try {
        const query = 'SELECT * FROM company_profile';
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User authentication
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
        db.query(query, [username, password], (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (results.length === 0) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }
            res.json(results[0]);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 