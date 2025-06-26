const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection(config.DB_CONFIG);

async function setupDatabase() {
    try {
        console.log('Connected to MySQL database');

        // Drop existing tables in correct order
        await connection.promise().query('DROP TABLE IF EXISTS news');
        await connection.promise().query('DROP TABLE IF EXISTS dividend_history');
        await connection.promise().query('DROP TABLE IF EXISTS technical_signals');
        await connection.promise().query('DROP TABLE IF EXISTS fundamental_report');
        await connection.promise().query('DROP TABLE IF EXISTS transactions');
        await connection.promise().query('DROP TABLE IF EXISTS watchlist');
        await connection.promise().query('DROP TABLE IF EXISTS holdings');
        await connection.promise().query('DROP TABLE IF EXISTS user');
        await connection.promise().query('DROP TABLE IF EXISTS company_profile');

        // Create tables
        await connection.promise().query(`
            CREATE TABLE company_profile (
                Symbol VARCHAR(20) PRIMARY KEY,
                Company_name VARCHAR(100) NOT NULL,
                Sector VARCHAR(50),
                Industry VARCHAR(50),
                Market_cap DECIMAL(20,2),
                Paidup_capital DECIMAL(20,2),
                Listed_share BIGINT
            )
        `);

        await connection.promise().query(`
            CREATE TABLE user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.promise().query(`
            CREATE TABLE holdings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                Symbol VARCHAR(20) NOT NULL,
                quantity INT NOT NULL,
                average_price DECIMAL(10,2) NOT NULL,
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol),
                FOREIGN KEY (username) REFERENCES user(username)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE watchlist (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                Symbol VARCHAR(20) NOT NULL,
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol),
                FOREIGN KEY (username) REFERENCES user(username)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE technical_signals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(20),
                ADX DECIMAL(10,2),
                RSI DECIMAL(10,2),
                MACD DECIMAL(10,2),
                LTP DECIMAL(10,2),
                as_of_date DATE,
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE fundamental_report (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(20),
                EPS DECIMAL(10,2),
                Book_Value DECIMAL(10,2),
                ROE DECIMAL(10,2),
                PE_Ratio DECIMAL(10,2),
                as_of_date DATE,
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE dividend_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(20),
                fiscal_year VARCHAR(10),
                bonus_dividend DECIMAL(5,2),
                cash_dividend DECIMAL(5,2),
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(20),
                title VARCHAR(200),
                content TEXT,
                date DATE,
                source VARCHAR(100),
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                Symbol VARCHAR(20) NOT NULL,
                quantity INT NOT NULL,
                rate DECIMAL(10,2) NOT NULL,
                total DECIMAL(10,2) NOT NULL,
                transaction_id VARCHAR(20) NOT NULL,
                transaction_date DATE NOT NULL,
                buy_sell VARCHAR(4) NOT NULL,
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol),
                FOREIGN KEY (username) REFERENCES user(username)
            )
        `);

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

        // Insert company profiles
        const companies = [
            ['AAPL', 'Apple Inc.', 'Technology', 'Consumer Electronics', 3000000000000, 50000000000, 16000000000],
            ['MSFT', 'Microsoft Corporation', 'Technology', 'Software', 2800000000000, 45000000000, 7500000000],
            ['GOOGL', 'Alphabet Inc.', 'Technology', 'Internet Services', 1900000000000, 40000000000, 6500000000],
            ['AMZN', 'Amazon.com Inc.', 'Consumer Cyclical', 'E-commerce', 1700000000000, 35000000000, 10200000000],
            ['META', 'Meta Platforms Inc.', 'Technology', 'Social Media', 1200000000000, 30000000000, 2800000000],
            ['TSLA', 'Tesla Inc.', 'Automotive', 'Electric Vehicles', 800000000000, 25000000000, 3200000000],
            ['JPM', 'JPMorgan Chase & Co.', 'Financial Services', 'Banking', 500000000000, 40000000000, 2900000000],
            ['V', 'Visa Inc.', 'Financial Services', 'Payment Services', 450000000000, 20000000000, 1700000000],
            ['PG', 'Procter & Gamble Co.', 'Consumer Defensive', 'Consumer Goods', 350000000000, 15000000000, 2400000000],
            ['JNJ', 'Johnson & Johnson', 'Healthcare', 'Pharmaceuticals', 400000000000, 18000000000, 2600000000]
        ];

        await connection.promise().query(
            'INSERT INTO company_profile (Symbol, Company_name, Sector, Industry, Market_cap, Paidup_capital, Listed_share) VALUES ?',
            [companies]
        );

        // Insert technical signals
        const technicalSignals = [
            ['AAPL', 25.45, 65.30, 2.15, 175.50, '2024-05-05'],
            ['MSFT', 28.75, 70.20, 3.45, 290.80, '2024-05-05'],
            ['GOOGL', 22.30, 58.90, 1.75, 130.20, '2024-05-05'],
            ['AMZN', 24.60, 62.40, 2.30, 125.40, '2024-05-05'],
            ['META', 30.20, 75.60, 4.20, 320.15, '2024-05-05'],
            ['TSLA', 35.80, 80.30, 5.60, 215.60, '2024-05-05'],
            ['JPM', 20.40, 55.70, 1.20, 185.25, '2024-05-05'],
            ['V', 23.90, 68.50, 2.80, 240.70, '2024-05-05'],
            ['PG', 19.80, 52.30, 0.90, 155.40, '2024-05-05'],
            ['JNJ', 21.50, 57.80, 1.45, 162.30, '2024-05-05']
        ];

        await connection.promise().query(
            'INSERT INTO technical_signals (Symbol, ADX, RSI, MACD, LTP, as_of_date) VALUES ?',
            [technicalSignals]
        );

        // Insert fundamental reports
        const fundamentalReports = [
            ['AAPL', 6.35, 37.20, 15.75, 27.64, '2024-05-05'],
            ['MSFT', 9.20, 58.30, 18.90, 31.60, '2024-05-05'],
            ['GOOGL', 5.80, 45.60, 12.40, 22.45, '2024-05-05'],
            ['AMZN', 4.10, 30.75, 10.50, 30.60, '2024-05-05'],
            ['META', 8.50, 40.60, 19.80, 37.66, '2024-05-05'],
            ['TSLA', 3.75, 25.40, 14.20, 57.49, '2024-05-05'],
            ['JPM', 12.10, 65.80, 16.30, 15.31, '2024-05-05'],
            ['V', 8.90, 35.20, 25.40, 27.04, '2024-05-05'],
            ['PG', 5.75, 28.90, 19.90, 27.03, '2024-05-05'],
            ['JNJ', 7.95, 32.50, 24.45, 20.42, '2024-05-05']
        ];

        await connection.promise().query(
            'INSERT INTO fundamental_report (Symbol, EPS, Book_Value, ROE, PE_Ratio, as_of_date) VALUES ?',
            [fundamentalReports]
        );

        // Insert dividend history
        const dividendHistory = [
            ['AAPL', '2023', 0.00, 0.92],
            ['AAPL', '2022', 0.00, 0.88],
            ['MSFT', '2023', 0.00, 2.72],
            ['MSFT', '2022', 0.00, 2.48],
            ['GOOGL', '2023', 0.00, 0.00],
            ['GOOGL', '2022', 0.00, 0.00],
            ['AMZN', '2023', 0.00, 0.00],
            ['AMZN', '2022', 0.00, 0.00],
            ['META', '2023', 0.00, 0.00],
            ['META', '2022', 0.00, 0.00],
            ['TSLA', '2023', 0.00, 0.00],
            ['TSLA', '2022', 0.00, 0.00],
            ['JPM', '2023', 0.00, 4.00],
            ['JPM', '2022', 0.00, 3.80],
            ['V', '2023', 0.00, 1.80],
            ['V', '2022', 0.00, 1.50],
            ['PG', '2023', 0.00, 3.76],
            ['PG', '2022', 0.00, 3.52],
            ['JNJ', '2023', 0.00, 4.52],
            ['JNJ', '2022', 0.00, 4.24]
        ];

        await connection.promise().query(
            'INSERT INTO dividend_history (Symbol, fiscal_year, bonus_dividend, cash_dividend) VALUES ?',
            [dividendHistory]
        );

        // Insert news
        const news = [
            ['AAPL', 'Apple Reports Record Q1 2024 Earnings', 'Apple Inc. has reported record-breaking earnings for Q1 2024, driven by strong iPhone sales and growing services revenue.', '2024-05-01', 'Financial Times'],
            ['MSFT', 'Microsoft Cloud Revenue Soars', 'Microsoft\'s cloud business continues to show remarkable growth, with Azure revenue up 45% year-over-year.', '2024-05-02', 'Reuters'],
            ['GOOGL', 'Google Announces AI Breakthrough', 'Alphabet\'s Google has announced a major breakthrough in artificial intelligence technology, potentially revolutionizing search capabilities.', '2024-05-03', 'TechCrunch'],
            ['AMZN', 'Amazon Prime Day Sets New Sales Record', 'Amazon\'s Prime Day 2024 has set new sales records, with over 300 million items sold worldwide.', '2024-05-01', 'Bloomberg'],
            ['META', 'Meta\'s VR Hardware Sales Double', 'Meta\'s virtual reality hardware sales have doubled year-over-year, showing strong adoption of metaverse technology.', '2024-05-02', 'The Verge'],
            ['TSLA', 'Tesla Announces New Battery Technology', 'Tesla has unveiled new battery technology that promises to increase range by 50% while reducing costs.', '2024-05-03', 'Electrek'],
            ['JPM', 'JPMorgan Expands Digital Banking Services', 'JPMorgan Chase announces expansion of digital banking services with new features and improved security.', '2024-05-01', 'Wall Street Journal'],
            ['V', 'Visa Reports Strong Cross-Border Volume', 'Visa sees significant growth in cross-border transaction volume as global travel recovers.', '2024-05-02', 'CNBC'],
            ['PG', 'P&G Launches Sustainable Product Line', 'Procter & Gamble introduces new environmentally friendly product line with recyclable packaging.', '2024-05-03', 'Business Wire'],
            ['JNJ', 'Johnson & Johnson Advances Cancer Research', 'J&J announces promising results from phase 3 trials of new cancer treatment.', '2024-05-01', 'Reuters']
        ];

        await connection.promise().query(
            'INSERT INTO news (Symbol, title, content, date, source) VALUES ?',
            [news]
        );

        // Insert sample transactions
        const transactions = [
            ['demouser', 'AAPL', 50, 165.30, 8265.00, 'TRX123456', '2024-04-17', 'buy'],
            ['demouser', 'MSFT', 30, 275.80, 8274.00, 'TRX234567', '2024-04-17', 'buy'],
            ['demouser', 'AMZN', 15, 120.40, 1806.00, 'TRX345678', '2024-04-17', 'buy'],
            ['demouser', 'JPM', 25, 175.60, 4390.00, 'TRX456789', '2024-04-17', 'buy'],
            ['demouser', 'V', 20, 230.25, 4605.00, 'TRX567890', '2024-04-17', 'buy']
        ];

        await connection.promise().query(
            'INSERT INTO transactions (username, Symbol, quantity, rate, total, transaction_id, transaction_date, buy_sell) VALUES ?',
            [transactions]
        );

        // Insert sample watchlist items
        const watchlistItems = [
            ['demouser', 'GOOGL'],
            ['demouser', 'META'],
            ['demouser', 'TSLA']
        ];

        await connection.promise().query(
            'INSERT INTO watchlist (username, Symbol) VALUES ?',
            [watchlistItems]
        );

        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        connection.end();
    }
}

setupDatabase(); 