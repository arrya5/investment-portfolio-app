import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  // Ensure user has required properties
  const username = user?.username;
  
  useEffect(() => {
    // Check if user object is valid
    if (!username) {
      setError('User information is incomplete. Please log out and log in again.');
      setLoading(false);
      return;
    }
    
    // Rest of the code...
  }, [username]);

  // Function to fetch market data
  const fetchMarketData = async () => {
    if (!username) return;
    
    try {
      const [holdingsRes, watchlistRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/holdings/${username}`),
        axios.get(`http://localhost:5000/api/watchlist/${username}`)
      ]);

      setHoldings(holdingsRes.data);
      setWatchlist(watchlistRes.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error updating market data:', err);
    }
  };

  // Initial data load
  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;
      
      try {
        // Try each request separately to identify which one is failing
        try {
          const holdingsRes = await axios.get(`http://localhost:5000/api/holdings/${username}`);
          setHoldings(holdingsRes.data);
        } catch (holdingsErr) {
          console.error('Error fetching holdings:', holdingsErr);
          setError(`Holdings error: ${holdingsErr.response?.data?.error || holdingsErr.message}`);
        }
        
        try {
          const watchlistRes = await axios.get(`http://localhost:5000/api/watchlist/${username}`);
          setWatchlist(watchlistRes.data);
        } catch (watchlistErr) {
          console.error('Error fetching watchlist:', watchlistErr);
          if (!error) {
            setError(`Watchlist error: ${watchlistErr.response?.data?.error || watchlistErr.message}`);
          }
        }
        
        try {
          const transactionsRes = await axios.get(`http://localhost:5000/api/transactions/${username}`);
          setTransactions(transactionsRes.data);
        } catch (transactionsErr) {
          console.error('Error fetching transactions:', transactionsErr);
          if (!error) {
            setError(`Transactions error: ${transactionsErr.response?.data?.error || transactionsErr.message}`);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('General dashboard error:', err);
        setError(`Dashboard error: ${err.response?.data?.error || err.message}`);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, error]);

  // Auto-refresh market data every minute
  useEffect(() => {
    if (!username) return;
    
    const intervalId = setInterval(fetchMarketData, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('User session invalid. Please log in again.');
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/transactions', {
        ...transactionData,
        username: username
      });
      
      // Refresh data
      const [holdingsRes, transactionsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/holdings/${username}`),
        axios.get(`http://localhost:5000/api/transactions/${username}`)
      ]);

      setHoldings(holdingsRes.data);
      setTransactions(transactionsRes.data);
      setShowTransactionForm(false);
      setTransactionData({
        symbol: '',
        quantity: '',
        rate: '',
        buy_sell: 'buy'
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="last-updated">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
      
      {/* Holdings Section */}
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
                <button type="submit">Submit</button>
                <button 
                  type="button" 
                  onClick={() => setShowTransactionForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="holdings-grid">
          {holdings.length > 0 ? (
            holdings.map((holding) => (
              <Link 
                to={`/company/${holding.Symbol}`} 
                key={holding.Symbol} 
                className="holding-card"
              >
                <h3>{holding.Company_name}</h3>
                <p className="symbol">{holding.Symbol}</p>
                <p className="quantity">Quantity: {holding.quantity}</p>
                <p className="value">
                  Current Value: ${(holding.quantity * (holding.LTP || 0)).toLocaleString()}
                </p>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <p>You don't have any holdings yet.</p>
              <p>Click "Add Transaction" to start investing!</p>
            </div>
          )}
        </div>
      </div>

      {/* Watchlist Section */}
      <div className="dashboard-section">
        <h2>Your Watchlist</h2>
        <div className="watchlist-grid">
          {watchlist.length > 0 ? (
            watchlist.map((item) => (
              <Link 
                to={`/company/${item.Symbol}`} 
                key={item.Symbol} 
                className="watchlist-card"
              >
                <h3>{item.Company_name}</h3>
                <p className="symbol">{item.Symbol}</p>
                <p className="sector">{item.Sector}</p>
                <p className="price">LTP: ${item.LTP || 'N/A'}</p>
                <p className="pe">P/E: {item.PE_Ratio || 'N/A'}</p>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <p>Your watchlist is empty.</p>
              <p>Visit the Companies page to add stocks to your watchlist.</p>
            </div>
          )}
        </div>
      </div>

      {/* Transactions Section */}
      <div className="dashboard-section">
        <h2>Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transaction_id}>
                    <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                    <td>{transaction.Symbol}</td>
                    <td>{transaction.Company_name}</td>
                    <td className={transaction.buy_sell}>
                      {transaction.buy_sell.toUpperCase()}
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>${transaction.rate}</td>
                    <td>${transaction.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-results">
            <p>You haven't made any transactions yet.</p>
            <p>Click "Add Transaction" to record your first trade.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard; 