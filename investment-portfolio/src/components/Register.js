import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (!userData.username || userData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!userData.password || userData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    setServerError('');
    
    try {
      const { confirmPassword, ...registerData } = userData;
      await api.register(registerData);
      navigate('/login');
    } catch (err) {
      setServerError(
        err.response?.data?.error || 
        err.message || 
        'Registration failed. Please try again.'
      );
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      const { [e.target.name]: _, ...rest } = errors;
      setErrors(rest);
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      {serverError && <div className="error-message">{serverError}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.username && <div className="field-error">{errors.username}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
          {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
        </div>
        
        <button 
          type="submit" 
          className="register-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register; 