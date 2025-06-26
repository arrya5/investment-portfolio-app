import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  // Function to fetch technical and fundamental data
  const fetchMarketData = async () => {
    try {
      const [technicalsRes, fundamentalsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/technical/${symbol}`),
        axios.get(`http://localhost:5000/api/fundamentals/${symbol}`)
      ]);

      setTechnicals(technicalsRes.data);
      setFundamentals(fundamentalsRes.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error updating market data:', err);
    }
  };

  // Initial data load
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Track pending requests
        let companyData, fundamentalsData, technicalsData, dividendsData, newsData;
        
        try {
          const companyRes = await axios.get(`http://localhost:5000/api/companies/${symbol}`);
          companyData = companyRes.data;
        } catch (err) {
          console.error('Error fetching company data:', err);
          companyData = null;
        }
        
        try {
          const fundamentalsRes = await axios.get(`http://localhost:5000/api/fundamentals/${symbol}`);
          fundamentalsData = fundamentalsRes.data;
        } catch (err) {
          console.error('Error fetching fundamentals:', err);
          fundamentalsData = null;
        }
        
        try {
          const technicalsRes = await axios.get(`http://localhost:5000/api/technical/${symbol}`);
          technicalsData = technicalsRes.data;
        } catch (err) {
          console.error('Error fetching technical data:', err);
          technicalsData = null;
        }
        
        try {
          const dividendsRes = await axios.get(`http://localhost:5000/api/dividends/${symbol}`);
          dividendsData = dividendsRes.data;
        } catch (err) {
          console.error('Error fetching dividends:', err);
          dividendsData = [];
        }
        
        try {
          const newsRes = await axios.get(`http://localhost:5000/api/news/${symbol}`);
          newsData = newsRes.data;
        } catch (err) {
          console.error('Error fetching news:', err);
          newsData = [];
        }
        
        setCompany(companyData);
        setFundamentals(fundamentalsData);
        setTechnicals(technicalsData);
        setDividends(dividendsData || []);
        setNews(newsData || []);
        setLoading(false);
        
      } catch (err) {
        console.error('Global error in fetchCompanyData:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [symbol]);

  // Auto-refresh market data every minute
  useEffect(() => {
    const intervalId = setInterval(fetchMarketData, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!company) return <div className="error">Company not found. The symbol {symbol} might not exist in the database.</div>;

  return (
    <div className="company-detail">
      <div className="company-header">
        <h1>{company.Company_name || 'Unknown Company'}</h1>
        <p className="symbol">{company.Symbol}</p>
        <p className="sector">{company.Sector || 'N/A'}</p>
        <p className="last-updated">Last Updated: {lastUpdated.toLocaleTimeString()}</p>
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
        <div className="detail-card">
          <h2>Technical Indicators</h2>
          <div className="data-grid">
            <div className="data-item">
              <label>ADX</label>
              <value>{technicals?.ADX || 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>RSI</label>
              <value>{technicals?.RSI || 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>MACD</label>
              <value>{technicals?.MACD || 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>LTP</label>
              <value>{technicals?.LTP || 'N/A'}</value>
            </div>
          </div>
        </div>

        {/* Fundamental Data */}
        <div className="detail-card">
          <h2>Fundamental Data</h2>
          <div className="data-grid">
            <div className="data-item">
              <label>Book Value</label>
              <value>{fundamentals?.Book_Value || 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>ROE</label>
              <value>{fundamentals?.ROE ? `${fundamentals.ROE}%` : 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>P/E Ratio</label>
              <value>{fundamentals?.PE_Ratio || 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>EPS</label>
              <value>{fundamentals?.EPS || 'N/A'}</value>
            </div>
            <div className="data-item">
              <label>LTP</label>
              <value>{fundamentals?.LTP || 'N/A'}</value>
            </div>
          </div>
        </div>

        {/* Dividend History */}
        <div className="detail-card">
          <h2>Dividend History</h2>
          {dividends && dividends.length > 0 ? (
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
                    <tr key={dividend.Fiscal_Year || index}>
                      <td>{dividend.Fiscal_Year || 'N/A'}</td>
                      <td>{dividend.Bonus_dividend ? `${dividend.Bonus_dividend}%` : 'N/A'}</td>
                      <td>{dividend.Cash_dividend ? `${dividend.Cash_dividend}%` : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No dividend history available</p>
          )}
        </div>

        {/* News */}
        <div className="detail-card full-width">
          <h2>Related News</h2>
          {news && news.length > 0 ? (
            <div className="news-list">
              {news.map((item, index) => (
                <div key={item.News_id || index} className="news-item">
                  <h3>{item.Title || 'No Title'}</h3>
                  <p className="news-meta">
                    <span>{item.Date ? new Date(item.Date).toLocaleDateString() : 'No Date'}</span>
                    {item.Sources && <span> • Source: {item.Sources}</span>}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No news available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail; 