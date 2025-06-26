const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection(config.DB_CONFIG);

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

async function populateDatabase() {
    try {
        console.log('Connected to MySQL database');

        // Create tables if they don't exist
        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS company_profile (
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
            CREATE TABLE IF NOT EXISTS technical_signals (
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
            CREATE TABLE IF NOT EXISTS fundamental_report (
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
            CREATE TABLE IF NOT EXISTS dividend_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(20),
                fiscal_year VARCHAR(10),
                bonus_dividend DECIMAL(5,2),
                cash_dividend DECIMAL(5,2),
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
            )
        `);

        await connection.promise().query(`
            CREATE TABLE IF NOT EXISTS news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                Symbol VARCHAR(20),
                title VARCHAR(200),
                content TEXT,
                date DATE,
                source VARCHAR(100),
                FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
            )
        `);

        // Clear existing data
        await connection.promise().query('DELETE FROM news');
        await connection.promise().query('DELETE FROM dividend_history');
        await connection.promise().query('DELETE FROM fundamental_report');
        await connection.promise().query('DELETE FROM technical_signals');
        await connection.promise().query('DELETE FROM company_profile');

        // Insert new data
        console.log('Inserting company profiles...');
        await connection.promise().query(
            'INSERT INTO company_profile (Symbol, Company_name, Sector, Industry, Market_cap, Paidup_capital, Listed_share) VALUES ?',
            [companies]
        );

        console.log('Inserting technical signals...');
        await connection.promise().query(
            'INSERT INTO technical_signals (Symbol, ADX, RSI, MACD, LTP, as_of_date) VALUES ?',
            [technicalSignals]
        );

        console.log('Inserting fundamental reports...');
        await connection.promise().query(
            'INSERT INTO fundamental_report (Symbol, EPS, Book_Value, ROE, PE_Ratio, as_of_date) VALUES ?',
            [fundamentalReports]
        );

        console.log('Inserting dividend history...');
        await connection.promise().query(
            'INSERT INTO dividend_history (Symbol, fiscal_year, bonus_dividend, cash_dividend) VALUES ?',
            [dividendHistory]
        );

        console.log('Inserting news...');
        await connection.promise().query(
            'INSERT INTO news (Symbol, title, content, date, source) VALUES ?',
            [news]
        );

        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
    } finally {
        connection.end();
    }
}

populateDatabase(); 