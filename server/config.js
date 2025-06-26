module.exports = {
    // Get your API key from https://www.alphavantage.co/support/#api-key
    ALPHA_VANTAGE_API_KEY: 'YOUR_API_KEY_HERE',
    
    // Update intervals (in milliseconds)
    PRICE_UPDATE_INTERVAL: 60000, // 1 minute
    TECHNICAL_UPDATE_INTERVAL: 300000, // 5 minutes
    
    // Database configuration
    DB_CONFIG: {
        host: 'localhost',
        user: 'root',
        password: '123456789', // MySQL password
        database: 'stock'
    }
}; 