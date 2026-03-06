import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Portfolio, Asset, AssetCategory } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioSubject = new BehaviorSubject<Portfolio>(this.getInitialPortfolio());
  public portfolio$ = this.portfolioSubject.asObservable();

  constructor() {
    // Simulate real-time price updates every 3 seconds
    interval(3000).subscribe(() => {
      this.updatePrices();
    });
  }

  private getInitialPortfolio(): Portfolio {
    // S&P500 stock list (symbol and name). In a real app, fetch from API or static file.
    const sp500Stocks: { symbol: string; name: string }[] = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'META', name: 'Meta Platforms Inc.' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation' },
      { symbol: 'TSLA', name: 'Tesla Inc.' },
      { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
      { symbol: 'V', name: 'Visa Inc.' },
      // ... (add all S&P500 stocks here, truncated for brevity)
    ];

    // Generate S&P500 assets with mock data
    const sp500Assets: Asset[] = sp500Stocks.map((stock, idx) => ({
      id: `sp500-${idx + 1}`,
      symbol: stock.symbol,
      name: stock.name,
      category: AssetCategory.STOCKS,
      quantity: 10 + Math.floor(Math.random() * 100),
      purchasePrice: 100 + Math.random() * 200,
      currentPrice: 100 + Math.random() * 200,
      purchaseDate: new Date('2024-01-01'),
      lastUpdated: new Date()
    }));

    // Add Oil (COMMODITIES)
    const oilAsset: Asset = {
      id: 'oil-1',
      symbol: 'OIL',
      name: 'Crude Oil',
      category: AssetCategory.COMMODITIES,
      quantity: 50,
      purchasePrice: 70.00,
      currentPrice: 78.50,
      purchaseDate: new Date('2024-02-01'),
      lastUpdated: new Date()
    };

    // Add Ethereum (CRYPTO)
    const ethAsset: Asset = {
      id: 'eth-1',
      symbol: 'ETH',
      name: 'Ethereum',
      category: AssetCategory.CRYPTO,
      quantity: 5,
      purchasePrice: 2200.00,
      currentPrice: 3400.00,
      purchaseDate: new Date('2024-03-01'),
      lastUpdated: new Date()
    };

    const assets: Asset[] = [
      ...sp500Assets,
      oilAsset,
      ethAsset
    ];

    return this.calculatePortfolioMetrics(assets);
  }

  private calculatePortfolioMetrics(assets: Asset[]): Portfolio {
    const totalValue = assets.reduce((sum, asset) => sum + (asset.currentPrice * asset.quantity), 0);
    const totalCost = assets.reduce((sum, asset) => sum + (asset.purchasePrice * asset.quantity), 0);
    const profitLoss = totalValue - totalCost;
    const profitLossPercentage = (profitLoss / totalCost) * 100;

    return {
      id: 'main-portfolio',
      name: 'Main Investment Portfolio',
      description: 'Diversified portfolio across multiple asset classes',
      assets,
      totalValue,
      totalCost,
      profitLoss,
      profitLossPercentage,
      createdDate: new Date('2024-01-01'),
      lastUpdated: new Date()
    };
  }

  private updatePrices(): void {
    const currentPortfolio = this.portfolioSubject.value;
    const updatedAssets = currentPortfolio.assets.map(asset => {
      // Simulate price changes (-2% to +2%)
      const priceChange = (Math.random() - 0.5) * 0.04;
      const newPrice = asset.currentPrice * (1 + priceChange);
      
      return {
        ...asset,
        currentPrice: parseFloat(newPrice.toFixed(2)),
        lastUpdated: new Date()
      };
    });

    const updatedPortfolio = this.calculatePortfolioMetrics(updatedAssets);
    this.portfolioSubject.next(updatedPortfolio);
  }

  getPortfolio(): Observable<Portfolio> {
    return this.portfolio$;
  }

  addAsset(asset: Asset): void {
    const currentPortfolio = this.portfolioSubject.value;
    const updatedAssets = [...currentPortfolio.assets, asset];
    const updatedPortfolio = this.calculatePortfolioMetrics(updatedAssets);
    this.portfolioSubject.next(updatedPortfolio);
  }

  updateAsset(assetId: string, updatedAsset: Partial<Asset>): void {
    const currentPortfolio = this.portfolioSubject.value;
    const updatedAssets = currentPortfolio.assets.map(asset =>
      asset.id === assetId ? { ...asset, ...updatedAsset } : asset
    );
    const updatedPortfolio = this.calculatePortfolioMetrics(updatedAssets);
    this.portfolioSubject.next(updatedPortfolio);
  }

  deleteAsset(assetId: string): void {
    const currentPortfolio = this.portfolioSubject.value;
    const updatedAssets = currentPortfolio.assets.filter(asset => asset.id !== assetId);
    const updatedPortfolio = this.calculatePortfolioMetrics(updatedAssets);
    this.portfolioSubject.next(updatedPortfolio);
  }
}
