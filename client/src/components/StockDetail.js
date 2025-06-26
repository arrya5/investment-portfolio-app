import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap';
import './StockDetail.css';

const StockDetail = () => {
  const { symbol } = useParams();
  const [company, setCompany] = useState(null);
  const [fundamentals, setFundamentals] = useState(null);
  const [technical, setTechnical] = useState(null);
  const [dividends, setDividends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        
        // Fetch company profile
        const companyRes = await axios.get(`http://localhost:5000/api/companies/${symbol}`);
        setCompany(companyRes.data);
        
        // Fetch fundamental data
        const fundamentalsRes = await axios.get(`http://localhost:5000/api/fundamentals/${symbol}`);
        setFundamentals(fundamentalsRes.data);
        
        // Fetch technical signals
        const technicalRes = await axios.get(`http://localhost:5000/api/technical/${symbol}`);
        setTechnical(technicalRes.data);
        
        // Fetch dividend history
        const dividendsRes = await axios.get(`http://localhost:5000/api/dividends/${symbol}`);
        setDividends(dividendsRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchStockData();
  }, [symbol]);

  const addToWatchlist = async () => {
    if (!user) {
      alert("Please log in to add stocks to your watchlist");
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/watchlist', {
        username: user.username,
        symbol: symbol,
        action: 'add'
      });
      setAddedToWatchlist(true);
      setTimeout(() => setAddedToWatchlist(false), 3000);
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      alert("Failed to add to watchlist. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!company) return <Alert variant="warning">Stock not found</Alert>;

  return (
    <Container className="stock-detail-container">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>{company.Company_name} ({symbol})</h2>
            {user && (
              <Button 
                variant="outline-primary" 
                onClick={addToWatchlist}
                disabled={addedToWatchlist}
              >
                {addedToWatchlist ? 'Added to Watchlist!' : 'Add to Watchlist'}
              </Button>
            )}
          </div>
          <p className="text-muted">{company.Sector} | {company.Industry}</p>
        </Col>
      </Row>

      {/* Rest of the component */}
      
    </Container>
  );
};

export default StockDetail; 