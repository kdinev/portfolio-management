import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGX_GRID_DIRECTIVES } from 'igniteui-angular/grids/grid';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio, Asset } from '../../models/portfolio.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [
        CommonModule,
        IGX_GRID_DIRECTIVES,
        IGX_CARD_DIRECTIVES
    ],
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  portfolio$!: Observable<Portfolio>;
  displayedColumns: string[] = ['symbol', 'name', 'category', 'quantity', 'purchasePrice', 'currentPrice', 'value', 'profitLoss', 'profitLossPercent'];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolio$ = this.portfolioService.getPortfolio();
  }

  calculateValue(asset: Asset): number {
    return asset?.currentPrice * asset?.quantity;
  }

  calculateProfitLoss(asset: Asset): number {
    return (asset?.currentPrice - asset?.purchasePrice) * asset?.quantity;
  }

  calculateProfitLossPercent(asset: Asset): number {
    return ((asset?.currentPrice - asset?.purchasePrice) / asset?.purchasePrice) * 100;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  formatPercent(value: number): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  }

  getChangeClass(value: number): string {
    if (value > 0) return 'positive';
    if (value < 0) return 'negative';
    return 'neutral';
  }
}
