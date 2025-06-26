const axios = require('axios');
const db = require('../db');
const config = require('../config');

class MarketDataService {
    constructor() {
        this.priceUpdateInterval = config.PRICE_UPDATE_INTERVAL;
        this.technicalUpdateInterval = config.TECHNICAL_UPDATE_INTERVAL;
        this.isRunning = false;
        this.apiKey = config.ALPHA_VANTAGE_API_KEY;
        this.baseUrl = 'https://www.alphavantage.co/query';
    }

    // Start the update service
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            
            // Initial updates
            this.updateMarketData();
            this.updateTechnicalIndicators();

            // Set up intervals for updates
            this.priceIntervalId = setInterval(() => this.updateMarketData(), this.priceUpdateInterval);
            this.technicalIntervalId = setInterval(() => this.updateTechnicalIndicators(), this.technicalUpdateInterval);
            
            console.log('Market data service started');
        }
    }

    // Stop the update service
    stop() {
        if (this.isRunning) {
            clearInterval(this.priceIntervalId);
            clearInterval(this.technicalIntervalId);
            this.isRunning = false;
            console.log('Market data service stopped');
        }
    }

    // Get all company symbols from database
    async getCompanySymbols() {
        try {
            const [rows] = await db.query('SELECT Symbol FROM company_profile');
            return rows.map(row => row.Symbol);
        } catch (error) {
            console.error('Error fetching company symbols:', error);
            return [];
        }
    }

    // Update market data
    async updateMarketData() {
        try {
            const symbols = await this.getCompanySymbols();
            
            for (const symbol of symbols) {
                try {
                    // Get real-time quote
                    const response = await axios.get(this.baseUrl, {
                        params: {
                            function: 'GLOBAL_QUOTE',
                            symbol: symbol,
                            apikey: this.apiKey
                        }
                    });

                    const quote = response.data['Global Quote'];
                    if (quote) {
                        await this.updatePrices({
                            symbol: symbol,
                            price: parseFloat(quote['05. price']),
                            volume: parseInt(quote['06. volume']),
                            change: parseFloat(quote['09. change']),
                            changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
                        });
                    }

                    // Alpha Vantage has a rate limit of 5 calls per minute for free tier
                    await new Promise(resolve => setTimeout(resolve, 12000));
                } catch (error) {
                    console.error(`Error updating data for ${symbol}:`, error);
                }
            }

            console.log('Market data updated at:', new Date().toLocaleString());
        } catch (error) {
            console.error('Error in updateMarketData:', error);
        }
    }

    // Update stock prices in the database
    async updatePrices(stockData) {
        try {
            // Update fundamental report
            await db.query(`
                UPDATE fundamental_report 
                SET LTP = ?,
                    Updated_at = NOW()
                WHERE Symbol = ?
            `, [stockData.price, stockData.symbol]);

            // Update technical signals
            await db.query(`
                UPDATE technical_signals
                SET Volume = ?,
                    LTP = ?,
                    Updated_at = NOW()
                WHERE Symbol = ?
            `, [stockData.volume, stockData.price, stockData.symbol]);

        } catch (error) {
            console.error('Error updating prices:', error);
        }
    }

    // Calculate and update technical indicators
    async updateTechnicalIndicators() {
        try {
            const symbols = await this.getCompanySymbols();

            for (const symbol of symbols) {
                try {
                    // Get technical indicators
                    const [rsiRes, macdRes, adxRes] = await Promise.all([
                        this.getRSI(symbol),
                        this.getMACD(symbol),
                        this.getADX(symbol)
                    ]);

                    // Update technical signals
                    await db.query(`
                        UPDATE technical_signals
                        SET RSI = ?,
                            MACD = ?,
                            ADX = ?,
                            Updated_at = NOW()
                        WHERE Symbol = ?
                    `, [rsiRes, macdRes, adxRes, symbol]);

                    // Rate limiting
                    await new Promise(resolve => setTimeout(resolve, 12000));
                } catch (error) {
                    console.error(`Error updating technical indicators for ${symbol}:`, error);
                }
            }

            console.log('Technical indicators updated at:', new Date().toLocaleString());
        } catch (error) {
            console.error('Error in updateTechnicalIndicators:', error);
        }
    }

    // Get RSI (Relative Strength Index)
    async getRSI(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'RSI',
                    symbol: symbol,
                    interval: 'daily',
                    time_period: 14,
                    series_type: 'close',
                    apikey: this.apiKey
                }
            });

            const data = response.data['Technical Analysis: RSI'];
            if (data) {
                const latestDate = Object.keys(data)[0];
                return parseFloat(data[latestDate].RSI);
            }
            return null;
        } catch (error) {
            console.error(`Error getting RSI for ${symbol}:`, error);
            return null;
        }
    }

    // Get MACD (Moving Average Convergence Divergence)
    async getMACD(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'MACD',
                    symbol: symbol,
                    interval: 'daily',
                    series_type: 'close',
                    apikey: this.apiKey
                }
            });

            const data = response.data['Technical Analysis: MACD'];
            if (data) {
                const latestDate = Object.keys(data)[0];
                return parseFloat(data[latestDate].MACD);
            }
            return null;
        } catch (error) {
            console.error(`Error getting MACD for ${symbol}:`, error);
            return null;
        }
    }

    // Get ADX (Average Directional Index)
    async getADX(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'ADX',
                    symbol: symbol,
                    interval: 'daily',
                    time_period: 14,
                    apikey: this.apiKey
                }
            });

            const data = response.data['Technical Analysis: ADX'];
            if (data) {
                const latestDate = Object.keys(data)[0];
                return parseFloat(data[latestDate].ADX);
            }
            return null;
        } catch (error) {
            console.error(`Error getting ADX for ${symbol}:`, error);
            return null;
        }
    }
}

module.exports = new MarketDataService(); 