import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function CompanyDetail() {
  const { symbol } = useParams();
  const [company, setCompany] = useState(null);
  const [fundamentals, setFundamentals] = useState(null);
  const [technicals, setTechnicals] = useState(null);
  const [dividends, setDividends] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  // Fetch watchlist status
  useEffect(() => {
    const checkWatchlistStatus = async () => {
      try {
        const response = await api.getWatchlist();
        setIsInWatchlist(response.data.some(item => item.Symbol === symbol));
      } catch (err) {
        console.error('Error checking watchlist status:', err);
      }
    };
    checkWatchlistStatus();
  }, [symbol]);

  const handleWatchlistToggle = async () => {
    try {
      setWatchlistLoading(true);
      if (isInWatchlist) {
        await api.removeFromWatchlist(symbol);
        setIsInWatchlist(false);
      } else {
        await api.addToWatchlist(symbol);
        setIsInWatchlist(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setWatchlistLoading(false);
    }
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await api.getCompanyDetails(symbol);
        
        if (response.data) {
          setCompany(response.data.company);
          setFundamentals(response.data.fundamentals);
          setTechnicals(response.data.technicals);
          setDividends(response.data.dividends || []);
          setNews(response.data.news || []);
          setLastUpdated(new Date());
        } else {
          setError('No data received from server');
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [symbol]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!company) return <div className="error">Company not found. The symbol {symbol} might not exist in the database.</div>;

  return (
    <div className="company-detail">
      <div className="company-header">
        <div className="header-content">
          <h1>{company.Company_name || 'Unknown Company'}</h1>
          <p className="symbol">{company.Symbol}</p>
          <p className="sector">{company.Sector || 'N/A'}</p>
          <p className="last-updated">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <button 
          className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
          onClick={handleWatchlistToggle}
          disabled={watchlistLoading}
        >
          {watchlistLoading ? 'Processing...' : (isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist')}
        </button>
      </div>

      <div className="detail-grid">
        {/* Company Profile */}
        <div className="detail-card">
          <h2>Company Profile</h2>
          <div className="data-grid">
            <div className="data-item">
              <label>Market Cap</label>
              <value>{company.Market_cap ? company.Market_cap.toLocaleString() : 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>Paid Up Capital</label>
              <value>{company.Paidup_capital ? company.Paidup_capital.toLocaleString() : 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>Listed Shares</label>
              <value>{company.Listed_share ? company.Listed_share.toLocaleString() : 'N/A'}</value>
            </div>
          </div>
        </div>

        {/* Technical Signals */}
        {technicals && (
          <div className="detail-card">
            <h2>Technical Indicators</h2>
            <div className="data-grid">
              <div className="data-item">
                <label>ADX</label>
                <value>{technicals.ADX || 'N/A'}</value>
              </div>
              <div className="data-item">
                <label>RSI</label>
                <value>{technicals.RSI || 'N/A'}</value>
              </div>
              <div className="data-item">
                <label>MACD</label>
                <value>{technicals.MACD || 'N/A'}</value>
              </div>
              <div className="data-item">
                <label>LTP</label>
                <value>{technicals.LTP || 'N/A'}</value>
              </div>
            </div>
          </div>
        )}

        {/* Fundamental Data */}
        {fundamentals && (
          <div className="detail-card">
            <h2>Fundamental Data</h2>
            <div className="data-grid">
              <div className="data-item">
                <label>Book Value</label>
                <value>{fundamentals.Book_Value || 'N/A'}</value>
              </div>
              <div className="data-item">
                <label>ROE</label>
                <value>{fundamentals.ROE ? `${fundamentals.ROE}%` : 'N/A'}</value>
              </div>
              <div className="data-item">
                <label>P/E Ratio</label>
                <value>{fundamentals.PE_Ratio || 'N/A'}</value>
              </div>
              <div className="data-item">
                <label>EPS</label>
                <value>{fundamentals.EPS || 'N/A'}</value>
              </div>
            </div>
          </div>
        )}

        {/* Dividend History */}
        {dividends && dividends.length > 0 && (
          <div className="detail-card">
            <h2>Dividend History</h2>
            <div className="dividend-table">
              <table>
                <thead>
                  <tr>
                    <th>Fiscal Year</th>
                    <th>Bonus Dividend</th>
                    <th>Cash Dividend</th>
                  </tr>
                </thead>
                <tbody>
                  {dividends.map((dividend, index) => (
                    <tr key={index}>
                      <td>{dividend.fiscal_year}</td>
                      <td>{dividend.bonus_dividend || '0'}%</td>
                      <td>{dividend.cash_dividend || '0'}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Latest News */}
        {news && news.length > 0 && (
          <div className="detail-card full-width">
            <h2>Latest News</h2>
            <div className="news-list">
              {news.map((item, index) => (
                <div key={index} className="news-item">
                  <h3>{item.title}</h3>
                  <p className="news-date">{new Date(item.date).toLocaleDateString()}</p>
                  <p>{item.summary}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="news-link">
                      Read more
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDetail; 