# Investment Portfolio Frontend

A React-based frontend for managing your investment portfolio and tracking company information.

## Features

- View and search companies
- Detailed company information with technical and fundamental data
- User authentication (login/register)
- Portfolio dashboard with holdings tracking
- Transaction recording
- Watchlist functionality

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd investment-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will open in your browser at [http://localhost:3000](http://localhost:3000)

## API Configuration

The frontend is configured to connect to a backend API at `http://localhost:5000/api`. Make sure your backend server is running at this address, or modify the `API_BASE_URL` in `src/services/api.js` to point to your backend.

## Project Structure

- `/src` - Source code
  - `/components` - React components
  - `/services` - API service and utilities
  - `App.js` - Main application component
  - `index.js` - Application entry point

## Backend API Endpoints

The frontend expects the following API endpoints:

- Authentication:
  - POST `/api/auth/login`
  - POST `/api/auth/register`

- Companies:
  - GET `/api/companies`
  - GET `/api/companies/:symbol`

- Portfolio:
  - GET `/api/portfolio`
  - GET `/api/transactions`
  - POST `/api/transactions`

- Watchlist:
  - GET `/api/watchlist`
  - POST `/api/watchlist`
  - DELETE `/api/watchlist/:symbol` 