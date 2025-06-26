const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'stock',
  multipleStatements: true
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
  
  // Import company data
  const companyData = [
    { symbol: 'AAPL', company_name: 'Apple Inc.', sector: 'Technology' },
    { symbol: 'AMZN', company_name: 'Amazon.com Inc.', sector: 'Consumer Cyclical' },
    { symbol: 'GOOGL', company_name: 'Alphabet Inc.', sector: 'Technology' },
    { symbol: 'JNJ', company_name: 'Johnson & Johnson', sector: 'Healthcare' },
    { symbol: 'JPM', company_name: 'JPMorgan Chase & Co.', sector: 'Financial Services' },
    { symbol: 'META', company_name: 'Meta Platforms Inc.', sector: 'Technology' },
    { symbol: 'MSFT', company_name: 'Microsoft Corp.', sector: 'Technology' },
    { symbol: 'PG', company_name: 'Procter & Gamble Co.', sector: 'Consumer Defensive' },
    { symbol: 'TSLA', company_name: 'Tesla Inc.', sector: 'Automotive' },
    { symbol: 'V', company_name: 'Visa Inc.', sector: 'Financial Services' }
  ];
  
  // Import dividend data
  const dividendData = [
    { id: 1, symbol: 'AAPL', fiscal_year: '2020', cash_dividend: 0.82, bonus_dividend: 0.00 },
    { id: 2, symbol: 'AAPL', fiscal_year: '2021', cash_dividend: 0.85, bonus_dividend: 0.00 },
    { id: 3, symbol: 'AAPL', fiscal_year: '2022', cash_dividend: 0.90, bonus_dividend: 0.00 },
    { id: 4, symbol: 'AAPL', fiscal_year: '2023', cash_dividend: 0.94, bonus_dividend: 0.00 },
    { id: 5, symbol: 'MSFT', fiscal_year: '2020', cash_dividend: 2.04, bonus_dividend: 0.00 },
    { id: 6, symbol: 'MSFT', fiscal_year: '2021', cash_dividend: 2.24, bonus_dividend: 0.00 },
    { id: 7, symbol: 'MSFT', fiscal_year: '2022', cash_dividend: 2.48, bonus_dividend: 0.00 },
    { id: 8, symbol: 'MSFT', fiscal_year: '2023', cash_dividend: 2.72, bonus_dividend: 0.00 },
    { id: 9, symbol: 'JPM', fiscal_year: '2020', cash_dividend: 3.60, bonus_dividend: 0.00 },
    { id: 10, symbol: 'JPM', fiscal_year: '2021', cash_dividend: 3.70, bonus_dividend: 0.00 },
    { id: 11, symbol: 'JPM', fiscal_year: '2022', cash_dividend: 4.00, bonus_dividend: 0.00 },
    { id: 12, symbol: 'JPM', fiscal_year: '2023', cash_dividend: 4.10, bonus_dividend: 0.00 },
    { id: 13, symbol: 'JNJ', fiscal_year: '2020', cash_dividend: 4.04, bonus_dividend: 0.00 },
    { id: 14, symbol: 'JNJ', fiscal_year: '2021', cash_dividend: 4.19, bonus_dividend: 0.00 },
    { id: 15, symbol: 'JNJ', fiscal_year: '2022', cash_dividend: 4.40, bonus_dividend: 0.00 },
    { id: 16, symbol: 'JNJ', fiscal_year: '2023', cash_dividend: 4.52, bonus_dividend: 0.00 },
    { id: 17, symbol: 'PG', fiscal_year: '2020', cash_dividend: 3.16, bonus_dividend: 0.00 },
    { id: 18, symbol: 'PG', fiscal_year: '2021', cash_dividend: 3.36, bonus_dividend: 0.00 },
    { id: 19, symbol: 'PG', fiscal_year: '2022', cash_dividend: 3.52, bonus_dividend: 0.00 },
    { id: 20, symbol: 'PG', fiscal_year: '2023', cash_dividend: 3.68, bonus_dividend: 0.00 }
  ];
  
  // Import transaction data
  const transactionData = [
    { id: 1, username: 'demouser', symbol: 'AAPL', quantity: 50, rate: 165.30, total: 8265.00, transaction_id: 'TRX123456', transaction_date: '2025-04-17', buy_sell: 'buy' },
    { id: 2, username: 'demouser', symbol: 'MSFT', quantity: 30, rate: 275.80, total: 8274.00, transaction_id: 'TRX234567', transaction_date: '2025-04-17', buy_sell: 'buy' },
    { id: 3, username: 'demouser', symbol: 'AMZN', quantity: 15, rate: 120.40, total: 1806.00, transaction_id: 'TRX345678', transaction_date: '2025-04-17', buy_sell: 'buy' },
    { id: 4, username: 'demouser', symbol: 'JPM', quantity: 25, rate: 175.60, total: 4390.00, transaction_id: 'TRX456789', transaction_date: '2025-04-17', buy_sell: 'buy' },
    { id: 5, username: 'demouser', symbol: 'V', quantity: 20, rate: 230.25, total: 4605.00, transaction_id: 'TRX567890', transaction_date: '2025-04-17', buy_sell: 'buy' }
  ];
  
  // Import news data
  const newsData = [
    { news_id: 1, title: 'Apple Inc. Quarterly Results Announced', content: 'Apple Inc. has announced quarterly results exceeding expectations...', date: '2025-04-12', related_company: 'AAPL', related_sector: 'Technology', sources: 'Financial Times' },
    { news_id: 2, title: 'Microsoft Corp. New Product Launch', content: 'Microsoft has unveiled a new version of Windows...', date: '2025-04-07', related_company: 'MSFT', related_sector: 'Technology', sources: 'TechCrunch' },
    { news_id: 3, title: 'Amazon.com Inc. Expansion Plans', content: 'Amazon plans to open new fulfillment centers in...', date: '2025-04-02', related_company: 'AMZN', related_sector: 'Consumer Cyclical', sources: 'Reuters' },
    { news_id: 4, title: 'Tesla Inc. Executive Changes', content: 'Tesla announces new Chief Technology Officer...', date: '2025-04-09', related_company: 'TSLA', related_sector: 'Automotive', sources: 'Bloomberg' },
    { news_id: 5, title: 'Meta Platforms Inc. Strategic Partnership', content: 'Meta partners with leading chipmakers for next-gen hardware...', date: '2025-04-05', related_company: 'META', related_sector: 'Technology', sources: 'The Verge' },
    { news_id: 6, title: 'JPMorgan Chase & Co. Quarterly Results Announced', content: 'JPMorgan reports strong performance in investment banking...', date: '2025-04-10', related_company: 'JPM', related_sector: 'Financial Services', sources: 'Wall Street Journal' },
    { news_id: 7, title: 'Visa Inc. Expansion Plans', content: 'Visa announces expansion into emerging markets...', date: '2025-04-03', related_company: 'V', related_sector: 'Financial Services', sources: 'CNBC' },
    { news_id: 8, title: 'Johnson & Johnson New Product Launch', content: 'Johnson & Johnson receives FDA approval for new product...', date: '2025-04-08', related_company: 'JNJ', related_sector: 'Healthcare', sources: 'Pharmaceutical Times' },
    { news_id: 9, title: 'Alphabet Inc. Strategic Partnership', content: 'Google Cloud partners with major retailers to enhance online shopping...', date: '2025-03-30', related_company: 'GOOGL', related_sector: 'Technology', sources: 'Business Insider' },
    { news_id: 10, title: 'Procter & Gamble Co. Executive Changes', content: 'P&G announces new CEO effective next quarter...', date: '2025-03-28', related_company: 'PG', related_sector: 'Consumer Defensive', sources: 'Forbes' }
  ];
  
  // Import financial metrics data
  const metricsData = [
    { id: 1, symbol: 'AAPL', eps: 6.35, ltp: 175.50, book_value: 37.20, roe: 15.75, pe_ratio: 27.64, sector: 'Technology', as_of_date: '2025-04-17' },
    { id: 2, symbol: 'GOOGL', eps: 5.80, ltp: 130.20, book_value: 45.60, roe: 12.40, pe_ratio: 22.45, sector: 'Technology', as_of_date: '2025-04-17' },
    { id: 3, symbol: 'MSFT', eps: 9.20, ltp: 290.80, book_value: 58.30, roe: 18.90, pe_ratio: 31.60, sector: 'Technology', as_of_date: '2025-04-17' },
    { id: 4, symbol: 'AMZN', eps: 4.10, ltp: 125.40, book_value: 30.75, roe: 10.50, pe_ratio: 30.60, sector: 'Consumer Cyclical', as_of_date: '2025-04-17' },
    { id: 5, symbol: 'META', eps: 8.50, ltp: 320.15, book_value: 40.60, roe: 19.80, pe_ratio: 37.66, sector: 'Technology', as_of_date: '2025-04-17' },
    { id: 6, symbol: 'TSLA', eps: 3.75, ltp: 215.60, book_value: 25.40, roe: 14.20, pe_ratio: 57.49, sector: 'Automotive', as_of_date: '2025-04-17' },
    { id: 7, symbol: 'JPM', eps: 12.10, ltp: 185.25, book_value: 65.80, roe: 16.30, pe_ratio: 15.31, sector: 'Financial Services', as_of_date: '2025-04-17' },
    { id: 8, symbol: 'V', eps: 8.90, ltp: 240.70, book_value: 35.20, roe: 25.40, pe_ratio: 27.04, sector: 'Financial Services', as_of_date: '2025-04-17' },
    { id: 9, symbol: 'PG', eps: 5.75, ltp: 155.40, book_value: 28.90, roe: 19.90, pe_ratio: 27.03, sector: 'Consumer Defensive', as_of_date: '2025-04-17' },
    { id: 10, symbol: 'JNJ', eps: 7.95, ltp: 162.30, book_value: 32.50, roe: 24.45, pe_ratio: 20.42, sector: 'Healthcare', as_of_date: '2025-04-17' }
  ];
  
  // Import watchlist data
  const watchlistData = [
    { username: 'demouser', symbol: 'GOOGL' },
    { username: 'demouser', symbol: 'META' },
    { username: 'demouser', symbol: 'TSLA' }
  ];

  // First, check if companies exist (to avoid foreign key constraint issues)
  connection.query("SELECT Symbol FROM fundamental_report WHERE Symbol IN ('AAPL', 'AMZN', 'GOOGL', 'JNJ', 'JPM', 'META', 'MSFT', 'PG', 'TSLA', 'V')", (err, results) => {
    if (err) {
      console.error('Error checking for companies:', err);
      connection.end();
      return;
    }

    const existingSymbols = results.map(row => row.Symbol);
    console.log('Existing symbols:', existingSymbols);

    // Add companies that don't exist yet
    const companiesToAdd = companyData.filter(c => !existingSymbols.includes(c.symbol));
    
    if (companiesToAdd.length > 0) {
      console.log('Adding companies:', companiesToAdd.map(c => c.symbol).join(', '));
      
      // Insert companies that don't exist
      const insertCompanyPromises = companiesToAdd.map(company => {
        return new Promise((resolve, reject) => {
          connection.query(
            'INSERT INTO fundamental_report (Symbol, Name, Sector) VALUES (?, ?, ?)',
            [company.symbol, company.company_name, company.sector],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      });
      
      Promise.all(insertCompanyPromises)
        .then(() => {
          console.log('Companies added successfully');
          importRemainingData();
        })
        .catch(err => {
          console.error('Error adding companies:', err);
          connection.end();
        });
    } else {
      console.log('All companies already exist');
      importRemainingData();
    }
  });

  function importRemainingData() {
    // Import dividend data
    connection.query("DELETE FROM dividend_history WHERE Symbol IN ('AAPL', 'AMZN', 'GOOGL', 'JNJ', 'JPM', 'META', 'MSFT', 'PG', 'TSLA', 'V')", (err) => {
      if (err) {
        console.error('Error clearing dividend history:', err);
      } else {
        console.log('Dividend history cleared');
        
        // Insert dividend data
        const insertDividendPromises = dividendData.map(dividend => {
          return new Promise((resolve, reject) => {
            connection.query(
              'INSERT INTO dividend_history (id, Symbol, Fiscal_Year, Cash_dividend, Bonus_dividend) VALUES (?, ?, ?, ?, ?)',
              [dividend.id, dividend.symbol, dividend.fiscal_year, dividend.cash_dividend, dividend.bonus_dividend],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          });
        });
        
        Promise.all(insertDividendPromises)
          .then(() => {
            console.log('Dividend data added successfully');
          })
          .catch(err => {
            console.error('Error adding dividend data:', err);
          });
      }
    });
    
    // Import transaction data
    connection.query("DELETE FROM transaction WHERE username = 'demouser'", (err) => {
      if (err) {
        console.error('Error clearing transaction data:', err);
      } else {
        console.log('Transaction data cleared');
        
        // Insert transaction data
        const insertTransactionPromises = transactionData.map(transaction => {
          return new Promise((resolve, reject) => {
            connection.query(
              'INSERT INTO transaction (username, Symbol, quantity, rate, total, transaction_id, transaction_date, buy_sell) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [
                transaction.username, 
                transaction.symbol, 
                transaction.quantity, 
                transaction.rate, 
                transaction.total, 
                transaction.transaction_id, 
                transaction.transaction_date, 
                transaction.buy_sell
              ],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          });
        });
        
        Promise.all(insertTransactionPromises)
          .then(() => {
            console.log('Transaction data added successfully');
          })
          .catch(err => {
            console.error('Error adding transaction data:', err);
          });
      }
    });
    
    // Import news data
    connection.query("DELETE FROM news", (err) => {
      if (err) {
        console.error('Error clearing news data:', err);
      } else {
        console.log('News data cleared');
        
        // Insert news data
        const insertNewsPromises = newsData.map(news => {
          return new Promise((resolve, reject) => {
            connection.query(
              'INSERT INTO news (news_id, title, content, date, related_company, related_sector, sources) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [
                news.news_id,
                news.title,
                news.content,
                news.date,
                news.related_company,
                news.related_sector,
                news.sources
              ],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          });
        });
        
        Promise.all(insertNewsPromises)
          .then(() => {
            console.log('News data added successfully');
          })
          .catch(err => {
            console.error('Error adding news data:', err);
          });
      }
    });
    
    // Import watchlist data
    connection.query("DELETE FROM watchlist WHERE username = 'demouser'", (err) => {
      if (err) {
        console.error('Error clearing watchlist data:', err);
      } else {
        console.log('Watchlist data cleared');
        
        // Insert watchlist data
        const insertWatchlistPromises = watchlistData.map(item => {
          return new Promise((resolve, reject) => {
            connection.query(
              'INSERT INTO watchlist (username, Symbol) VALUES (?, ?)',
              [item.username, item.symbol],
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          });
        });
        
        Promise.all(insertWatchlistPromises)
          .then(() => {
            console.log('Watchlist data added successfully');
            // Close the connection when all operations are complete
            setTimeout(() => {
              console.log('All data imported successfully');
              connection.end();
            }, 1000);
          })
          .catch(err => {
            console.error('Error adding watchlist data:', err);
            connection.end();
          });
      }
    });
  }
}); 