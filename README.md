# Portfolio Manager - Investment Bank Application

A comprehensive financial portfolio management application built with Angular 18 for large investment banks. This enterprise-grade application enables real-time portfolio tracking, asset management, market alerts, and advanced analytics.

## 🚀 Features

### Core Functionality
- **Real-Time Portfolio Tracking** - Live updates of asset prices every 3 seconds
- **Asset Management** - Manage diverse asset classes including stocks, bonds, commodities, forex, crypto, and real estate
- **Market Alerts & Signals** - Automatic alerts for price changes, market news, volatility, and technical signals
- **Category Performance** - Track performance across different asset categories
- **Advanced Analytics** - Detailed portfolio analytics with top/bottom performer tracking

### Key Pages
1. **Dashboard** - Comprehensive overview with portfolio summary, category performance, and recent alerts
2. **Portfolio** - Detailed asset listing with real-time pricing and profit/loss calculations
3. **Analytics** - In-depth performance analysis and category allocation
4. **Alerts** - Market signals and alerts management with severity indicators

## 🛠️ Technology Stack

- **Framework:** Angular 18 (Standalone Components)
- **UI Library:** Angular Material
- **State Management:** RxJS with Observables
- **Styling:** SCSS
- **Build Tool:** Angular CLI
- **Language:** TypeScript 5.4

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## 🔧 Installation

1. Clone the repository (if applicable):
```bash
git clone <repository-url>
cd portfolio-manager
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

### Development Server
Start the development server with live reload:
```bash
npm start
```
Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you change source files.

### Build
Build the project for production:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

### Watch Mode
Build and watch for changes:
```bash
npm run watch
```

### Run Tests
Execute unit tests via Karma:
```bash
npm test
```

## 📁 Project Structure

```
portfolio-manager/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components
│   │   │   └── header/          # Navigation header
│   │   ├── models/              # TypeScript interfaces and enums
│   │   │   └── portfolio.model.ts
│   │   ├── pages/               # Feature pages
│   │   │   ├── dashboard/       # Main dashboard
│   │   │   ├── portfolio/       # Asset listing
│   │   │   ├── alerts/          # Alerts management
│   │   │   └── analytics/       # Performance analytics
│   │   ├── services/            # Business logic services
│   │   │   ├── portfolio.service.ts
│   │   │   ├── alert.service.ts
│   │   │   └── analytics.service.ts
│   │   ├── app.component.ts     # Root component
│   │   └── app.routes.ts        # Application routes
│   ├── assets/                  # Static assets
│   ├── styles.scss              # Global styles
│   ├── main.ts                  # Application entry point
│   └── index.html               # HTML entry point
├── angular.json                 # Angular CLI configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🎨 Key Features Explained

### Real-Time Price Updates
The application simulates real-time market data by updating asset prices every 3 seconds with random fluctuations (-2% to +2%). This provides a realistic trading environment experience.

### Asset Categories
Supports seven major asset categories:
- **Stocks** - Equity securities
- **Bonds** - Fixed-income securities
- **Commodities** - Physical goods (gold, oil, etc.)
- **Forex** - Foreign exchange pairs
- **Cryptocurrency** - Digital currencies
- **Real Estate** - Property investments
- **Derivatives** - Financial contracts

### Alert System
Three severity levels for market alerts:
- **INFO** - General market information
- **WARNING** - Important price movements or signals
- **CRITICAL** - Urgent market events requiring attention

### Analytics Dashboard
- Portfolio allocation by category
- Top and bottom performers ranking
- Profit/loss calculations and percentages
- Real-time portfolio valuation

## 🔐 Sample Data

The application comes pre-loaded with sample portfolio data including:
- AAPL (Apple Inc.) - Stocks
- GOOGL (Alphabet Inc.) - Stocks
- MSFT (Microsoft Corporation) - Stocks
- US10Y (US 10-Year Treasury) - Bonds
- GLD (Gold) - Commodities
- BTC (Bitcoin) - Cryptocurrency

## 🎯 Usage Tips

1. **Dashboard** - Start here for a quick overview of your entire portfolio
2. **Portfolio Tab** - View detailed asset information with real-time pricing
3. **Analytics Tab** - Deep dive into performance metrics and allocation
4. **Alerts Tab** - Stay informed about market events and price movements

## 🚀 Deployment

For production deployment:

1. Build the application:
```bash
npm run build
```

2. Deploy the contents of `dist/portfolio-manager` to your web server

3. Ensure proper routing configuration for Angular's client-side routing

## 🧪 Future Enhancements

Potential features for future releases:
- Historical price charts using Chart.js
- Advanced technical indicators
- Custom alert rules configuration
- Portfolio comparison tools
- Export to PDF/Excel functionality
- Real API integration for live market data
- Multi-user support with authentication
- Dark mode theme

## 📝 License

This project is licensed for use by authorized investment banking personnel only.

## 👥 Support

For support, please contact your system administrator or the development team.

---

**Note:** This application is for demonstration and internal use. Market data is simulated and not suitable for actual trading decisions.
