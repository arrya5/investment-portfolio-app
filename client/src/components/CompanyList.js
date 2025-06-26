import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
        
        // Extract unique sectors
        const uniqueSectors = [...new Set(response.data.map(company => company.Sector).filter(Boolean))];
        setSectors(uniqueSectors);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.Company_name?.toLowerCase().includes(filter.toLowerCase()) ||
      company.Symbol?.toLowerCase().includes(filter.toLowerCase()) ||
      company.Sector?.toLowerCase().includes(filter.toLowerCase());
    
    const matchesSector = selectedSector === '' || company.Sector === selectedSector;
    
    return matchesSearch && matchesSector;
  });

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Loading companies...</p>
    </div>
  );
  
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="companies-container">
      <div className="page-header">
        <h1>Companies</h1>
        <p>Browse and search companies to view details and add to your portfolio</p>
      </div>
      
      <div className="filter-controls">
        <div className="filter-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search companies by name, symbol or sector..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="sector-filter">
          <label htmlFor="sector-select">Filter by Sector:</label>
          <select 
            id="sector-select" 
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedSector && (
        <div className="active-filters">
          <span className="filter-tag">
            {selectedSector}
            <button onClick={() => setSelectedSector('')}>×</button>
          </span>
        </div>
      )}
      
      <div className="companies-count">
        <span>{filteredCompanies.length} companies found</span>
      </div>
      
      <div className="companies-grid">
        {filteredCompanies.map((company) => (
          <Link to={`/company/${company.Symbol}`} key={company.Symbol} className="company-card">
            <div className="company-card-header">
              <h3>{company.Company_name}</h3>
              <span className="symbol">{company.Symbol}</span>
            </div>
            {company.Sector && <p className="sector">📊 {company.Sector}</p>}
            {company.Market_cap && (
              <p className="market-cap">
                <span className="label">Market Cap:</span> ${company.Market_cap.toLocaleString()}
              </p>
            )}
            {company.Listed_share && (
              <p className="listed-shares">
                <span className="label">Listed Shares:</span> {company.Listed_share.toLocaleString()}
              </p>
            )}
          </Link>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && (
        <div className="no-results">
          <h3>No companies found matching your search</h3>
          <p>Try adjusting your search criteria or select a different sector</p>
          <button onClick={() => {setFilter(''); setSelectedSector('')}} className="reset-button">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default CompanyList; 