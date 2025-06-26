const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'stock'
});

// Connect
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  
  // Create transaction table
  const createTransactionTable = `
    CREATE TABLE IF NOT EXISTS \`transaction\` (
      transaction_id INT AUTO_INCREMENT PRIMARY KEY,
      Symbol VARCHAR(10) NOT NULL,
      username VARCHAR(50) NOT NULL,
      quantity INT NOT NULL,
      rate DECIMAL(10,2) NOT NULL,
      total DECIMAL(15,2) NOT NULL,
      buy_sell ENUM('buy', 'sell') NOT NULL,
      transaction_date DATETIME NOT NULL
    )
  `;
  
  db.query(createTransactionTable, (err, result) => {
    if (err) {
      console.error('Error creating transaction table:', err);
    } else {
      console.log('Transaction table created or already exists');
    }
    
    // Create holdings table
    const createHoldingsTable = `
      CREATE TABLE IF NOT EXISTS holdings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        Symbol VARCHAR(10) NOT NULL,
        quantity INT NOT NULL,
        UNIQUE KEY user_symbol (username, Symbol)
      )
    `;
    
    db.query(createHoldingsTable, (err, result) => {
      if (err) {
        console.error('Error creating holdings table:', err);
      } else {
        console.log('Holdings table created or already exists');
      }
      
      // Create watchlist table
      const createWatchlistTable = `
        CREATE TABLE IF NOT EXISTS watchlist (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          Symbol VARCHAR(10) NOT NULL,
          UNIQUE KEY user_symbol (username, Symbol)
        )
      `;
      
      db.query(createWatchlistTable, (err, result) => {
        if (err) {
          console.error('Error creating watchlist table:', err);
        } else {
          console.log('Watchlist table created or already exists');
        }
        
        // Close connection
        db.end(err => {
          if (err) {
            console.error('Error closing connection:', err);
          } else {
            console.log('Database tables checked and created if needed');
            console.log('Database connection closed');
          }
        });
      });
    });
  });
}); 