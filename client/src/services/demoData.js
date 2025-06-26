// Mock data for GitHub Pages demo

export const demoCompanies = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 173.75,
    change: 2.35,
    marketCap: '2.8T',
    volume: '65.2M'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 327.42,
    change: 1.28,
    marketCap: '2.4T',
    volume: '23.8M'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    sector: 'Consumer Cyclical',
    price: 142.85,
    change: -0.53,
    marketCap: '1.5T',
    volume: '34.1M'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Communication Services',
    price: 134.20,
    change: 0.87,
    marketCap: '1.7T',
    volume: '21.4M'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    sector: 'Communication Services',
    price: 343.82,
    change: 5.26,
    marketCap: '879.2B',
    volume: '15.9M'
  }
];

export const demoPortfolio = [
  {
    symbol: 'AAPL',
    shares: 25,
    avgCost: 145.32,
    currentValue: 4343.75
  },
  {
    symbol: 'MSFT',
    shares: 15,
    avgCost: 280.45,
    currentValue: 4911.30
  },
  {
    symbol: 'AMZN',
    shares: 20,
    avgCost: 130.72,
    currentValue: 2857.00
  }
];

export const demoTransactions = [
  {
    id: 1,
    date: '2023-01-15',
    symbol: 'AAPL',
    type: 'buy',
    shares: 15,
    price: 142.65,
    total: 2139.75
  },
  {
    id: 2,
    date: '2023-02-23',
    symbol: 'MSFT',
    type: 'buy',
    shares: 10,
    price: 275.32,
    total: 2753.20
  },
  {
    id: 3,
    date: '2023-03-10',
    symbol: 'AAPL',
    type: 'buy',
    shares: 10,
    price: 149.32,
    total: 1493.20
  },
  {
    id: 4,
    date: '2023-04-18',
    symbol: 'AMZN',
    type: 'buy',
    shares: 20,
    price: 130.72,
    total: 2614.40
  },
  {
    id: 5,
    date: '2023-05-05',
    symbol: 'MSFT',
    type: 'buy',
    shares: 5,
    price: 290.72,
    total: 1453.60
  }
];

export const demoWatchlist = ['GOOGL', 'META', 'NFLX', 'TSLA'];

export const demoCompanyDetails = {
  'AAPL': {
    name: 'Apple Inc.',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, iPad, Mac, Apple Watch, and services such as Apple TV+, Apple Music, iCloud, and the App Store.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: 164000,
    ceo: 'Tim Cook',
    founded: 1976,
    headquarters: 'Cupertino, California, USA',
    website: 'https://www.apple.com',
    financials: {
      revenue: '394.33B',
      netIncome: '99.80B',
      eps: '6.14',
      pe: 28.33,
      dividendYield: '0.50%',
      marketCap: '2.8T',
      bookValue: '4.25',
      priceToBook: 40.88
    },
    historicalPrices: [
      { date: '2023-01', price: 142.56 },
      { date: '2023-02', price: 147.92 },
      { date: '2023-03', price: 158.30 },
      { date: '2023-04', price: 164.78 },
      { date: '2023-05', price: 171.34 },
      { date: '2023-06', price: 167.48 },
      { date: '2023-07', price: 175.63 },
      { date: '2023-08', price: 178.72 },
      { date: '2023-09', price: 170.25 },
      { date: '2023-10', price: 168.47 },
      { date: '2023-11', price: 180.56 },
      { date: '2023-12', price: 192.53 }
    ]
  },
  'MSFT': {
    name: 'Microsoft Corporation',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.',
    sector: 'Technology',
    industry: 'Software—Infrastructure',
    employees: 221000,
    ceo: 'Satya Nadella',
    founded: 1975,
    headquarters: 'Redmond, Washington, USA',
    website: 'https://www.microsoft.com',
    financials: {
      revenue: '211.92B',
      netIncome: '72.36B',
      eps: '9.73',
      pe: 33.65,
      dividendYield: '0.73%',
      marketCap: '2.4T',
      bookValue: '31.37',
      priceToBook: 10.44
    },
    historicalPrices: [
      { date: '2023-01', price: 242.45 },
      { date: '2023-02', price: 249.22 },
      { date: '2023-03', price: 272.36 },
      { date: '2023-04', price: 288.45 },
      { date: '2023-05', price: 310.65 },
      { date: '2023-06', price: 335.40 },
      { date: '2023-07', price: 340.54 },
      { date: '2023-08', price: 326.78 },
      { date: '2023-09', price: 315.34 },
      { date: '2023-10', price: 321.80 },
      { date: '2023-11', price: 340.67 },
      { date: '2023-12', price: 344.92 }
    ]
  },
  // Add similar detailed data for other symbols as needed
};

export const fetchDemoData = (endpoint, params = {}) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      switch(endpoint) {
        case 'companies':
          resolve(demoCompanies);
          break;
        case 'portfolio':
          resolve(demoPortfolio);
          break;
        case 'transactions':
          resolve(demoTransactions);
          break;
        case 'watchlist':
          resolve(demoWatchlist);
          break;
        case 'company':
          resolve(demoCompanyDetails[params.symbol] || null);
          break;
        default:
          resolve(null);
      }
    }, 500); // 500ms delay to simulate network request
  });
}; 