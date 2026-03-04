export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
  lastUpdated: Date;
}

export enum AssetCategory {
  STOCKS = 'Stocks',
  BONDS = 'Bonds',
  COMMODITIES = 'Commodities',
  FOREX = 'Forex',
  CRYPTO = 'Cryptocurrency',
  REAL_ESTATE = 'Real Estate',
  DERIVATIVES = 'Derivatives'
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  assets: Asset[];
  totalValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercentage: number;
  createdDate: Date;
  lastUpdated: Date;
}

export interface MarketAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  assetSymbol?: string;
  timestamp: Date;
  isRead: boolean;
}

export enum AlertType {
  PRICE_CHANGE = 'Price Change',
  MARKET_NEWS = 'Market News',
  PORTFOLIO_THRESHOLD = 'Portfolio Threshold',
  VOLATILITY = 'Volatility Alert',
  TECHNICAL_SIGNAL = 'Technical Signal'
}

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical'
}

export interface CategoryPerformance {
  category: AssetCategory;
  totalValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercentage: number;
  assetCount: number;
  allocation: number; // percentage of portfolio
}

export interface PriceHistory {
  timestamp: Date;
  price: number;
  volume?: number;
}

export interface MarketSignal {
  id: string;
  assetSymbol: string;
  signalType: 'BUY' | 'SELL' | 'HOLD';
  confidence: number; // 0-100
  indicators: string[];
  timestamp: Date;
  description: string;
}
