import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
import { PortfolioService } from '../../services/portfolio.service';
import { AlertService } from '../../services/alert.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Portfolio, MarketAlert, CategoryPerformance } from '../../models/portfolio.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IgxButtonDirective } from 'igniteui-angular/directives';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        IGX_CARD_DIRECTIVES,
        IGX_LIST_DIRECTIVES,
        IgxIconComponent,
        IgxButtonDirective
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  portfolio$!: Observable<Portfolio>;
  alerts$!: Observable<MarketAlert[]>;
  categoryPerformance$!: Observable<CategoryPerformance[]>;
  topPerformers: any[] = [];
  bottomPerformers: any[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(
    private portfolioService: PortfolioService,
    private alertService: AlertService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.portfolio$ = this.portfolioService.getPortfolio();
    this.alerts$ = this.alertService.getAlerts();
    this.categoryPerformance$ = this.analyticsService.getCategoryPerformance();
    
    this.analyticsService.getTopPerformers(3)
      .pipe(takeUntil(this.destroy$))
      .subscribe(performers => this.topPerformers = performers);
    
    this.analyticsService.getBottomPerformers(3)
      .pipe(takeUntil(this.destroy$))
      .subscribe(performers => this.bottomPerformers = performers);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  getSeverityClass(severity: string): string {
    return `severity-${severity}`;
  }
}
