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
    const assets: Asset[] = [
      {
        id: '1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        category: AssetCategory.STOCKS,
        quantity: 100,
        purchasePrice: 150.00,
        currentPrice: 175.50,
        purchaseDate: new Date('2024-01-15'),
        lastUpdated: new Date()
      },
      {
        id: '2',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        category: AssetCategory.STOCKS,
        quantity: 50,
        purchasePrice: 140.00,
        currentPrice: 142.25,
        purchaseDate: new Date('2024-03-10'),
        lastUpdated: new Date()
      },
      {
        id: '3',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        category: AssetCategory.STOCKS,
        quantity: 75,
        purchasePrice: 380.00,
        currentPrice: 415.80,
        purchaseDate: new Date('2024-02-20'),
        lastUpdated: new Date()
      },
      {
        id: '4',
        symbol: 'US10Y',
        name: 'US 10-Year Treasury',
        category: AssetCategory.BONDS,
        quantity: 100,
        purchasePrice: 98.50,
        currentPrice: 97.80,
        purchaseDate: new Date('2024-01-05'),
        lastUpdated: new Date()
      },
      {
        id: '5',
        symbol: 'GLD',
        name: 'Gold',
        category: AssetCategory.COMMODITIES,
        quantity: 20,
        purchasePrice: 1950.00,
        currentPrice: 2045.30,
        purchaseDate: new Date('2024-04-01'),
        lastUpdated: new Date()
      },
      {
        id: '6',
        symbol: 'BTC',
        name: 'Bitcoin',
        category: AssetCategory.CRYPTO,
        quantity: 2,
        purchasePrice: 45000.00,
        currentPrice: 67500.00,
        purchaseDate: new Date('2024-05-15'),
        lastUpdated: new Date()
      }
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
