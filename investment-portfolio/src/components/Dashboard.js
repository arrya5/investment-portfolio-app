import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Dashboard({ user }) {
  const [holdings, setHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionData, setTransactionData] = useState({
    symbol: '',
    quantity: '',
    rate: '',
    buy_sell: 'buy'
  });

  // Function to fetch all user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const [portfolioRes, watchlistRes, transactionsRes] = await Promise.all([
          api.getPortfolio(),
          api.getWatchlist(),
          api.getTransactions()
        ]);
        
        setHoldings(portfolioRes.data || []);
        setWatchlist(watchlistRes.data || []);
        setTransactions(transactionsRes.data || []);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.addTransaction(transactionData);
      
      // Refresh portfolio and transactions data
      const [portfolioRes, transactionsRes] = await Promise.all([
        api.getPortfolio(),
        api.getTransactions()
      ]);
      
      setHoldings(portfolioRes.data);
      setTransactions(transactionsRes.data);
      setShowTransactionForm(false);
      setTransactionData({
        symbol: '',
        quantity: '',
        rate: '',
        buy_sell: 'buy'
      });
    } catch (err) {
      setError(err.message || 'Failed to add transaction');
    }
  };

  const handleRemoveFromWatchlist = async (symbol) => {
    try {
      await api.removeFromWatchlist(symbol);
      setWatchlist(watchlist.filter(item => item.Symbol !== symbol));
    } catch (err) {
      setError(err.message || 'Failed to remove from watchlist');
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Calculate total portfolio value
  const portfolioValue = holdings.reduce((total, holding) => {
    return total + (holding.quantity * holding.last_price);
  }, 0);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="last-updated">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
      
      {/* Portfolio Summary */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Portfolio Summary</h2>
        </div>
        <div className="portfolio-summary">
          <div className="summary-card">
            <div className="summary-value">${portfolioValue.toLocaleString()}</div>
            <div className="summary-label">Total Value</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{holdings.length}</div>
            <div className="summary-label">Companies</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">{transactions.length}</div>
            <div className="summary-label">Transactions</div>
          </div>
        </div>
      </div>
      
      {/* Holdings */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Your Holdings</h2>
          <button 
            className="add-transaction-btn"
            onClick={() => setShowTransactionForm(true)}
          >
            Add Transaction
          </button>
        </div>
        
        {showTransactionForm && (
          <div className="transaction-form-container">
            <form onSubmit={handleTransactionSubmit} className="transaction-form">
              <h3>Add Transaction</h3>
              <div className="form-group">
                <label>Symbol:</label>
                <input
                  type="text"
                  value={transactionData.symbol}
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    symbol: e.target.value.toUpperCase()
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={transactionData.quantity}
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    quantity: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rate:</label>
                <input
                  type="number"
                  step="0.01"
                  value={transactionData.rate}
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    rate: e.target.value
                  })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type:</label>
                <select
                  value={transactionData.buy_sell}
                  onChange={(e) => setTransactionData({
                    ...transactionData,
                    buy_sell: e.target.value
                  })}
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div className="form-buttons">
                <button type="submit">Add Transaction</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowTransactionForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
        {holdings.length > 0 ? (
          <div className="holdings-table">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Quantity</th>
                  <th>Avg. Buy</th>
                  <th>Current Price</th>
                  <th>Value</th>
                  <th>Gain/Loss</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => {
                  const value = holding.quantity * holding.last_price;
                  const invested = holding.quantity * holding.avg_buy_price;
                  const gainLoss = value - invested;
                  const gainLossPercent = (gainLoss / invested) * 100;
                  
                  return (
                    <tr key={holding.symbol}>
                      <td>
                        <Link to={`/company/${holding.symbol}`}>{holding.symbol}</Link>
                      </td>
                      <td>{holding.company_name}</td>
                      <td>{holding.quantity}</td>
                      <td>${holding.avg_buy_price.toFixed(2)}</td>
                      <td>${holding.last_price.toFixed(2)}</td>
                      <td>${value.toFixed(2)}</td>
                      <td className={gainLoss >= 0 ? 'positive' : 'negative'}>
                        ${Math.abs(gainLoss).toFixed(2)} 
                        ({gainLossPercent >= 0 ? '+' : '-'}{Math.abs(gainLossPercent).toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>You don't have any holdings yet.</p>
            <button 
              onClick={() => setShowTransactionForm(true)}
              className="action-btn"
            >
              Add Your First Investment
            </button>
          </div>
        )}
      </div>
      
      {/* Watchlist */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Your Watchlist</h2>
          <Link to="/companies" className="view-all-btn">View All Companies</Link>
        </div>
        
        {watchlist.length > 0 ? (
          <div className="watchlist-grid">
            {watchlist.map((item) => (
              <div key={item.Symbol} className="watchlist-card">
                <div className="watchlist-header">
                  <Link to={`/company/${item.Symbol}`}>
                    <h3>{item.Company_name}</h3>
                    <span className="symbol">{item.Symbol}</span>
                  </Link>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFromWatchlist(item.Symbol)}
                  >
                    ×
                  </button>
                </div>
                <div className="watchlist-data">
                  <div className="data-row">
                    <span className="label">Price:</span>
                    <span className="value">${item.Last_price}</span>
                  </div>
                  <div className="data-row">
                    <span className="label">Change:</span>
                    <span className={`value ${item.Change >= 0 ? 'positive' : 'negative'}`}>
                      {item.Change >= 0 ? '+' : ''}{item.Change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>You don't have any companies in your watchlist.</p>
            <Link to="/companies" className="action-btn">
              Browse Companies
            </Link>
          </div>
        )}
      </div>
      
      {/* Recent Transactions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Transactions</h2>
        </div>
        
        {transactions.length > 0 ? (
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((transaction, index) => {
                  const total = transaction.quantity * transaction.rate;
                  
                  return (
                    <tr key={index}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/company/${transaction.symbol}`}>{transaction.symbol}</Link>
                      </td>
                      <td className={transaction.buy_sell === 'buy' ? 'buy' : 'sell'}>
                        {transaction.buy_sell === 'buy' ? 'Buy' : 'Sell'}
                      </td>
                      <td>{transaction.quantity}</td>
                      <td>${transaction.rate.toFixed(2)}</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>You haven't made any transactions yet.</p>
            <button 
              onClick={() => setShowTransactionForm(true)}
              className="action-btn"
            >
              Record Your First Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;