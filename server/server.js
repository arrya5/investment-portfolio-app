const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
// const marketDataService = require('./services/marketDataService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789', // Using the provided MySQL password
    database: 'stock'  // Using the stock database which has complete data
});

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
        return;
    }
    console.log('MySQL Connected');
    
    // Start market data service after database connection is established
    // marketDataService.start();
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    // marketDataService.stop();
    db.end();
    process.exit();
});

// Routes

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

// Get single company
app.get('/api/companies/:symbol', async (req, res) => {
    try {
        console.log(`Fetching company with symbol: ${req.params.symbol}`);
        const query = 'SELECT * FROM company_profile WHERE Symbol = ?';
        db.query(query, [req.params.symbol], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('Query results:', results);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Company not found' });
            }
            res.json(results[0]);
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get company fundamental data
app.get('/api/fundamentals/:symbol', async (req, res) => {
    try {
        console.log(`Fetching fundamentals for symbol: ${req.params.symbol}`);
        const query = 'SELECT * FROM fundamental_report WHERE Symbol = ?';
        db.query(query, [req.params.symbol], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('Fundamentals results:', results.length > 0 ? 'Data found' : 'No data');
            res.json(results[0] || {});
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get technical signals
app.get('/api/technical/:symbol', async (req, res) => {
    try {
        console.log(`Fetching technical data for symbol: ${req.params.symbol}`);
        const query = 'SELECT * FROM technical_signals WHERE Symbol = ?';
        db.query(query, [req.params.symbol], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('Technical results:', results.length > 0 ? 'Data found' : 'No data');
            // If no technical signals found, return empty object instead of error
            res.json(results[0] || {});
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get company dividend history
app.get('/api/dividends/:symbol', async (req, res) => {
    try {
        const query = 'SELECT * FROM dividend_history WHERE Symbol = ?';
        db.query(query, [req.params.symbol], (err, results) => {
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

// Get user holdings
app.get('/api/holdings/:username', async (req, res) => {
    try {
        console.log(`Fetching holdings for user: ${req.params.username}`);
        const query = `
            SELECT h.*, c.Company_name, c.Sector, t.LTP, f.PE_Ratio 
            FROM holdings h
            JOIN company_profile c ON h.Symbol = c.Symbol
            LEFT JOIN fundamental_report f ON h.Symbol = f.Symbol
            LEFT JOIN technical_signals t ON h.Symbol = t.Symbol
            WHERE h.username = ?
        `;
        db.query(query, [req.params.username], (err, results) => {
            if (err) {
                console.error('Error fetching holdings:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log(`Found ${results.length} holdings for user: ${req.params.username}`);
            res.json(results);
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get user watchlist
app.get('/api/watchlist/:username', async (req, res) => {
    try {
        console.log(`Fetching watchlist for user: ${req.params.username}`);
        const query = `
            SELECT w.*, c.Company_name, c.Sector, t.LTP, f.PE_Ratio 
            FROM watchlist w
            JOIN company_profile c ON w.Symbol = c.Symbol
            LEFT JOIN fundamental_report f ON w.Symbol = f.Symbol
            LEFT JOIN technical_signals t ON w.Symbol = t.Symbol
            WHERE w.username = ?
        `;
        db.query(query, [req.params.username], (err, results) => {
            if (err) {
                console.error('Error fetching watchlist:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log(`Found ${results.length} watchlist items for user: ${req.params.username}`);
            res.json(results);
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add/remove watchlist item
app.post('/api/watchlist', async (req, res) => {
    try {
        const { username, symbol, action } = req.body;
        
        if (action === 'add') {
            const query = 'INSERT INTO watchlist (username, Symbol) VALUES (?, ?)';
            db.query(query, [username, symbol], (err, results) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ message: 'Added to watchlist' });
            });
        } else if (action === 'remove') {
            const query = 'DELETE FROM watchlist WHERE username = ? AND Symbol = ?';
            db.query(query, [username, symbol], (err, results) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.json({ message: 'Removed from watchlist' });
            });
        } else {
            res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get company news
app.get('/api/news/:symbol', async (req, res) => {
    try {
        const query = 'SELECT * FROM news WHERE Symbol = ? ORDER BY date DESC';
        db.query(query, [req.params.symbol], (err, results) => {
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

// Get all news
app.get('/api/news', async (req, res) => {
    try {
        const query = 'SELECT n.*, c.Company_name FROM news n JOIN company_profile c ON n.Symbol = c.Symbol ORDER BY n.date DESC LIMIT 20';
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
        console.log(`Login attempt for user: ${username}`);
        
        // Check if user exists and password matches
        const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error('Login error:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            if (results.length === 0) {
                console.log(`Invalid credentials for user: ${username}`);
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }
            
            // Get user data
            const userData = results[0];
            console.log(`User logged in: ${username}`);
            
            // Create a safe user object
            const safeUser = {
                username: userData.username,
                email: userData.email || '',
                name: userData.name || ''
            };
            
            res.json(safeUser);
        });
    } catch (error) {
        console.error('Unexpected login error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add transaction
app.post('/api/transactions', async (req, res) => {
    try {
        const { symbol, username, quantity, rate, buy_sell } = req.body;
        const total = quantity * rate;
        const query = `
            INSERT INTO transactions 
            (Symbol, username, quantity, rate, total, buy_sell, transaction_date) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;
        db.query(
            query, 
            [symbol, username, quantity, rate, total, buy_sell],
            (err, results) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                
                // Update holdings
                updateHoldings(username, symbol, quantity, buy_sell, (err) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({ id: results.insertId });
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper function to update holdings after a transaction
function updateHoldings(username, symbol, quantity, buy_sell, callback) {
    const getQuery = 'SELECT quantity FROM holdings WHERE username = ? AND Symbol = ?';
    
    db.query(getQuery, [username, symbol], (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        
        const quantityChange = buy_sell === 'buy' ? parseInt(quantity) : -parseInt(quantity);
        
        if (results.length === 0) {
            // No existing holding, create new one if buying
            if (buy_sell === 'buy') {
                const insertQuery = 'INSERT INTO holdings (username, Symbol, quantity) VALUES (?, ?, ?)';
                db.query(insertQuery, [username, symbol, quantity], callback);
            } else {
                // Trying to sell what you don't have
                callback(new Error('Cannot sell shares you do not own'));
            }
        } else {
            // Update existing holding
            const currentQuantity = results[0].quantity;
            const newQuantity = currentQuantity + quantityChange;
            
            if (newQuantity < 0) {
                callback(new Error('Cannot sell more shares than you own'));
                return;
            }
            
            if (newQuantity === 0) {
                // Remove the holding if quantity becomes zero
                const deleteQuery = 'DELETE FROM holdings WHERE username = ? AND Symbol = ?';
                db.query(deleteQuery, [username, symbol], callback);
            } else {
                // Update the holding with new quantity
                const updateQuery = 'UPDATE holdings SET quantity = ? WHERE username = ? AND Symbol = ?';
                db.query(updateQuery, [newQuantity, username, symbol], callback);
            }
        }
    });
}

// Get user transactions
app.get('/api/transactions/:username', async (req, res) => {
    try {
        console.log(`Fetching transactions for user: ${req.params.username}`);
        const query = `
            SELECT t.*, c.Company_name 
            FROM transactions t
            JOIN company_profile c ON t.Symbol = c.Symbol
            WHERE t.username = ?
            ORDER BY t.transaction_date DESC
        `;
        db.query(query, [req.params.username], (err, results) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            console.log(`Found ${results.length} transactions for user: ${req.params.username}`);
            res.json(results);
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// User registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Check if username already exists
        const checkQuery = 'SELECT username FROM user WHERE username = ?';
        db.query(checkQuery, [username], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: err.message });
            }
            
            if (results.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            
            // Insert new user - adjusted to only include fields that exist in the database
            const insertQuery = 'INSERT INTO user (username, password, email) VALUES (?, ?, ?)';
            db.query(insertQuery, [username, password, email], (err, results) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({ error: err.message });
                }
                
                // Return success response
                res.status(201).json({ 
                    message: 'User registered successfully',
                    userId: results.insertId,
                    username
                });
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 