import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={
              !user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />
            } />
            <Route path="/register" element={
              !user ? <Register /> : <Navigate to="/dashboard" />
            } />
            <Route path="/dashboard" element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            } />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/company/:symbol" element={<CompanyDetail />} />
            <Route path="/" element={<Navigate to="/companies" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 