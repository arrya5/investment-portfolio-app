import axios from 'axios';
import { fetchDemoData } from './demoData';

// Check if we're in demo mode
const isDemo = window.location.hostname.includes('github.io');

// Base URL for API requests
const API_BASE_URL = isDemo ? '' : 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// API methods
const api = {
  // Authentication
  login: async (credentials) => {
    if (isDemo) {
      return {
        data: {
          user: { username: 'demo_user', email: 'demo@example.com' },
          token: 'demo-token'
        }
      };
    }
    return await apiClient.post('/auth/login', credentials);
  },

  register: async (userData) => {
    if (isDemo) {
      return {
        data: {
          user: { username: userData.username, email: userData.email },
          token: 'demo-token'
        }
      };
    }
    return await apiClient.post('/auth/register', userData);
  },

  // Companies
  getCompanies: async () => {
    if (isDemo) {
      const data = await fetchDemoData('companies');
      return { data };
    }
    return await apiClient.get('/companies');
  },

  getCompanyDetails: async (symbol) => {
    if (isDemo) {
      const data = await fetchDemoData('company', { symbol });
      return { data };
    }
    return await apiClient.get(`/companies/${symbol}`);
  },

  // Portfolio
  getPortfolio: async () => {
    if (isDemo) {
      const data = await fetchDemoData('portfolio');
      return { data };
    }
    return await apiClient.get('/portfolio');
  },

  // Transactions
  getTransactions: async () => {
    if (isDemo) {
      const data = await fetchDemoData('transactions');
      return { data };
    }
    return await apiClient.get('/transactions');
  },

  addTransaction: async (transaction) => {
    if (isDemo) {
      // In demo mode, just return success
      return { data: { success: true } };
    }
    return await apiClient.post('/transactions', transaction);
  },

  // Watchlist
  getWatchlist: async () => {
    if (isDemo) {
      const data = await fetchDemoData('watchlist');
      return { data };
    }
    return await apiClient.get('/watchlist');
  },

  addToWatchlist: async (symbol) => {
    if (isDemo) {
      return { data: { success: true } };
    }
    return await apiClient.post('/watchlist', { symbol });
  },

  removeFromWatchlist: async (symbol) => {
    if (isDemo) {
      return { data: { success: true } };
    }
    return await apiClient.delete(`/watchlist/${symbol}`);
  }
};

export default api; 