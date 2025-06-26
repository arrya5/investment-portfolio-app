import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if we're in demo mode (GitHub Pages)
    const isGitHubPages = window.location.hostname.includes('github.io');
    if (isGitHubPages) {
      console.log('Running in GitHub Pages demo mode');
      setIsDemo(true);
      // Set a demo user in GitHub Pages
      setUser({ username: 'demo_user', email: 'demo@example.com' });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} isDemo={isDemo} />
        <main className="main-content">
          {isDemo && (
            <div className="demo-banner">
              <p>Running in Demo Mode. Some features are simulated. Backend functionality is limited.</p>
            </div>
          )}
          <Routes>
            <Route path="/login" element={
              !user ? <Login setUser={setUser} isDemo={isDemo} /> : <Navigate to="/dashboard" />
            } />
            <Route path="/register" element={
              !user ? <Register isDemo={isDemo} /> : <Navigate to="/dashboard" />
            } />
            <Route path="/dashboard" element={
              user ? <Dashboard user={user} isDemo={isDemo} /> : <Navigate to="/login" />
            } />
            <Route path="/companies" element={<CompanyList isDemo={isDemo} />} />
            <Route path="/company/:symbol" element={<CompanyDetail isDemo={isDemo} />} />
            <Route path="/" element={<Navigate to="/companies" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 