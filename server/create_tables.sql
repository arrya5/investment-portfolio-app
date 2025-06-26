-- Create technical_signals table if it doesn't exist
CREATE TABLE IF NOT EXISTS technical_signals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Symbol VARCHAR(20) NOT NULL,
    ADX DECIMAL(10,2),
    RSI DECIMAL(10,2),
    MACD DECIMAL(10,2),
    Volume BIGINT,
    LTP DECIMAL(10,2),
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
);

-- Create dividend_history table if it doesn't exist
CREATE TABLE IF NOT EXISTS dividend_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Symbol VARCHAR(20) NOT NULL,
    Fiscal_Year VARCHAR(10),
    Bonus_dividend DECIMAL(10,2),
    Cash_dividend DECIMAL(10,2),
    FOREIGN KEY (Symbol) REFERENCES company_profile(Symbol)
);

-- Create or update the CompanyDetail component to handle missing tables gracefully
ALTER TABLE company_profile MODIFY COLUMN Symbol VARCHAR(20) PRIMARY KEY; 