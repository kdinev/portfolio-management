import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryPerformance, AssetCategory } from '../models/portfolio.model';
import { PortfolioService } from './portfolio.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private portfolioService: PortfolioService) {}

  getCategoryPerformance(): Observable<CategoryPerformance[]> {
    return this.portfolioService.getPortfolio().pipe(
      map(portfolio => {
        const categoryMap = new Map<AssetCategory, CategoryPerformance>();
        
        // Initialize categories
        Object.values(AssetCategory).forEach(category => {
          categoryMap.set(category, {
            category,
            totalValue: 0,
            totalCost: 0,
            profitLoss: 0,
            profitLossPercentage: 0,
            assetCount: 0,
            allocation: 0
          });
        });

        // Calculate metrics for each category
        portfolio.assets.forEach(asset => {
          const category = categoryMap.get(asset.category)!;
          const assetValue = asset.currentPrice * asset.quantity;
          const assetCost = asset.purchasePrice * asset.quantity;

          category.totalValue += assetValue;
          category.totalCost += assetCost;
          category.assetCount += 1;
        });

        // Calculate profit/loss and allocation
        const categories = Array.from(categoryMap.values()).filter(cat => cat.assetCount > 0);
        
        categories.forEach(category => {
          category.profitLoss = category.totalValue - category.totalCost;
          category.profitLossPercentage = (category.profitLoss / category.totalCost) * 100;
          category.allocation = (category.totalValue / portfolio.totalValue) * 100;
        });

        return categories.sort((a, b) => b.totalValue - a.totalValue);
      })
    );
  }

  getTopPerformers(limit: number = 5): Observable<any[]> {
    return this.portfolioService.getPortfolio().pipe(
      map(portfolio => {
        return portfolio.assets
          .map(asset => {
            const profitLoss = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
            const profitLossPercentage = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
            return { ...asset, profitLoss, profitLossPercentage };
          })
          .sort((a, b) => b.profitLossPercentage - a.profitLossPercentage)
          .slice(0, limit);
      })
    );
  }

  getBottomPerformers(limit: number = 5): Observable<any[]> {
    return this.portfolioService.getPortfolio().pipe(
      map(portfolio => {
        return portfolio.assets
          .map(asset => {
            const profitLoss = (asset.currentPrice - asset.purchasePrice) * asset.quantity;
            const profitLossPercentage = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
            return { ...asset, profitLoss, profitLossPercentage };
          })
          .sort((a, b) => a.profitLossPercentage - b.profitLossPercentage)
          .slice(0, limit);
      })
    );
  }
}
