# Investment Portfolio Management System

## FRONTEND:

The **Investment Portfolio Management System** is designed to streamline stock portfolio tracking and analysis by handling essential operations such as company data visualization, portfolio tracking, transaction recording, and watchlist management. This system utilizes a React-based frontend and a RESTful API backend for data management and user interaction. The application's main modules cover user authentication, company listings, portfolio dashboard, and transaction management.

## System Architecture and Components

The project is structured into separate modules, each dedicated to a different aspect of portfolio management. Below, we outline the purpose of each folder and file in this project.

| FOLDER/FILE | DESCRIPTION |
|-------------|-------------|
| src/App.js | The main React component managing application routes, user authentication state, and implementing frontend logic. |
| src/components/ | Contains all React components that build the user interface of the application. |
| src/services/api.js | Houses the API service layer for connecting to the backend server and handling data requests. |
| public/ | Contains static assets like HTML templates and images. |

The Investment Portfolio Management System is organized into a clear component structure that separates UI elements, business logic, and API services to facilitate efficient development and maintenance.

The main frontend file, App.js, serves as the core of the application. It manages all routes for navigating between pages in the system and handles user authentication state. Within App.js, each route is associated with specific components, including login validation, dashboard display, and company details. This file utilizes React Router to handle navigation, allowing users to move seamlessly between different sections of the application.

The components/ folder contains essential React components that are crucial for the visual and interactive aspects of the web application. Each component provides specific functionality like authentication, company listing, portfolio tracking, and transaction management.

## Database Design

The backend uses a relational database that organizes financial data into multiple tables. Below is an overview of the primary tables in the database:

| Table | Purpose |
|-------|---------|
| Users | Manages user credentials and profile information for secure access. |
| Companies | Stores company information including symbol, name, sector, and market data. |
| Portfolio | Tracks user portfolio holdings with quantity, purchase price, and current value. |
| Transactions | Records buy/sell transactions with details on price, quantity, and date. |
| Watchlist | Manages companies users are monitoring but haven't purchased yet. |
| CompanyFundamentals | Contains fundamental financial data like PE ratio, EPS, and Book Value. |
| CompanyTechnicals | Stores technical indicators like RSI, MACD, and moving averages. |
| Dividends | Tracks dividend history for companies including amount and payment dates. |

## React Component Overview

The React components serve as the frontend of the system, offering an interface through which users interact with their financial data. Below is an overview of each component and its functionality:

| Component | Description |
|-----------|-------------|
| Login.js | A login page where users enter credentials. Authenticates users and redirects them to their dashboard. |
| Register.js | Registration form for new users to create an account with validation and error handling. |
| Navbar.js | Navigation bar providing links to different sections based on user authentication state. |
| Dashboard.js | The main dashboard for users, showing portfolio summary, holdings, watchlist, and recent transactions. |
| CompanyList.js | Displays a filterable grid of companies with basic information and search functionality. |
| CompanyDetail.js | Shows detailed information about a specific company including fundamentals, technicals, and price data. |

## Application Flow

1. User Authentication and Access:
   > Users access the system through the Login component, entering credentials.
   > Based on authentication status, users are directed to either the dashboard or public company listings.

2. Portfolio Management:
   > Authenticated users can view their portfolio summary and holdings on the Dashboard.
   > They can record buy/sell transactions and track performance over time.

3. Company Research and Watchlist:
   > Users can browse and search companies in the CompanyList component.
   > Detailed company information is available in the CompanyDetail component.
   > Users can add companies to their watchlist for future reference.

4. Transaction Management:
   > Users can record portfolio transactions directly from the Dashboard.
   > Recent transaction history is displayed for user reference.

---

# Investment Portfolio Frontend Code

This document contains all the code files for the Investment Portfolio application for printing purposes.

## Table of Contents
1. Project Configuration
   - package.json
   - public/index.html
2. Entry Points
   - src/index.js
   - src/index.css
   - src/reportWebVitals.js
   - src/App.js
   - src/App.css
3. API Service
   - src/services/api.js
4. Components
   - src/components/Navbar.js
   - src/components/Login.js
   - src/components/Register.js
   - src/components/CompanyList.js
   - src/components/CompanyDetail.js
   - src/components/Dashboard.js 