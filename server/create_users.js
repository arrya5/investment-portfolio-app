const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection(config.DB_CONFIG);

async function createUserTable() {
    try {
        console.log('Connected to MySQL database');

        // Create user table
        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Clear existing users
        await connection.promise().query('DELETE FROM user');

        // Insert sample users
        const users = [
            ['demouser', 'demo123', 'demo@example.com'],
            ['Anuj', 'password', 'anuj@example.com'],
            ['admin', 'admin123', 'admin@example.com']
        ];

        await connection.promise().query(
            'INSERT INTO user (username, password, email) VALUES ?',
            [users]
        );

        console.log('User table created and populated successfully');
    } catch (error) {
        console.error('Error creating user table:', error);
    } finally {
        connection.end();
    }
}

createUserTable(); 