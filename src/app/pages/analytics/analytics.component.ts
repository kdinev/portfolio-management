import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_SLIDER_DIRECTIVES } from 'igniteui-angular/slider';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { AnalyticsService } from '../../services/analytics.service';
import { PortfolioService } from '../../services/portfolio.service';
import { CategoryPerformance, Portfolio } from '../../models/portfolio.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-analytics',
    standalone: true,
    imports: [
        CommonModule,
        IGX_CARD_DIRECTIVES,
        IgxIconComponent,
        IGX_SLIDER_DIRECTIVES
    ],
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  portfolio$!: Observable<Portfolio>;
  categoryPerformance$!: Observable<CategoryPerformance[]>;
  topPerformers$!: Observable<any[]>;
  bottomPerformers$!: Observable<any[]>;

  constructor(
    private analyticsService: AnalyticsService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.portfolio$ = this.portfolioService.getPortfolio();
    this.categoryPerformance$ = this.analyticsService.getCategoryPerformance();
    this.topPerformers$ = this.analyticsService.getTopPerformers(10);
    this.bottomPerformers$ = this.analyticsService.getBottomPerformers(10);
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
