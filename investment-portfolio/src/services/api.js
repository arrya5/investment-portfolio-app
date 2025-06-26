import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:5000/api';

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
    return await apiClient.post('/auth/login', credentials);
  },

  register: async (userData) => {
    return await apiClient.post('/auth/register', userData);
  },

  // Companies
  getCompanies: async () => {
    return await apiClient.get('/companies');
  },

  getCompanyDetails: async (symbol) => {
    return await apiClient.get(`/companies/${symbol}`);
  },

  // Portfolio
  getPortfolio: async () => {
    return await apiClient.get('/portfolio');
  },

  // Transactions
  getTransactions: async () => {
    return await apiClient.get('/transactions');
  },

  addTransaction: async (transaction) => {
    return await apiClient.post('/transactions', transaction);
  },

  // Watchlist
  getWatchlist: async () => {
    return await apiClient.get('/watchlist');
  },

  addToWatchlist: async (symbol) => {
    return await apiClient.post('/watchlist', { symbol });
  },

  removeFromWatchlist: async (symbol) => {
    return await apiClient.delete(`/watchlist/${symbol}`);
  }
};

export default api; 