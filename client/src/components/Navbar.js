import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="logo-icon">📈</span> Investment Portfolio
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/companies" className={isActive('/companies')}>
          <span className="nav-icon">🏢</span> Companies
        </Link>
        
        {user ? (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              <span className="nav-icon">📊</span> Dashboard
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <span className="nav-icon">🚪</span> Logout
            </button>
            <div className="user-info">
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <span className="username">{user.name || user.username}</span>
            </div>
          </>
        ) : (
          <Link to="/login" className={isActive('/login')}>
            <span className="nav-icon">🔑</span> Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 