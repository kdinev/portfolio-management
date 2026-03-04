import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarketAlert, AlertType, AlertSeverity } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<MarketAlert[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  private alertIdCounter = 1;

  constructor() {
    // Add initial alerts
    this.addAlert({
      type: AlertType.MARKET_NEWS,
      severity: AlertSeverity.INFO,
      title: 'Federal Reserve Meeting',
      message: 'FOMC meeting scheduled for next week. Interest rate decision expected.',
      timestamp: new Date()
    });

    this.addAlert({
      type: AlertType.PRICE_CHANGE,
      severity: AlertSeverity.WARNING,
      title: 'Significant Price Movement',
      message: 'AAPL has increased by 5% in the last hour',
      assetSymbol: 'AAPL',
      timestamp: new Date()
    });

    // Simulate random alerts every 30 seconds
    interval(30000).subscribe(() => {
      this.generateRandomAlert();
    });
  }

  private generateRandomAlert(): void {
    const alertTypes = Object.values(AlertType);
    const severities = Object.values(AlertSeverity);
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'BTC', 'GLD'];

    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    const messages = [
      `${randomSymbol} showing unusual trading volume`,
      `Market volatility detected in ${randomSymbol}`,
      `Technical indicator signal for ${randomSymbol}`,
      `News impact on ${randomSymbol} sector`,
      `Price target updated for ${randomSymbol}`
    ];

    this.addAlert({
      type: randomType,
      severity: randomSeverity,
      title: `Alert: ${randomSymbol}`,
      message: messages[Math.floor(Math.random() * messages.length)],
      assetSymbol: randomSymbol,
      timestamp: new Date()
    });
  }

  private addAlert(alertData: Omit<MarketAlert, 'id' | 'isRead'>): void {
    const newAlert: MarketAlert = {
      id: `alert-${this.alertIdCounter++}`,
      isRead: false,
      ...alertData
    };

    const currentAlerts = this.alertsSubject.value;
    const updatedAlerts = [newAlert, ...currentAlerts].slice(0, 50); // Keep only last 50 alerts
    this.alertsSubject.next(updatedAlerts);
  }

  getAlerts(): Observable<MarketAlert[]> {
    return this.alerts$;
  }

  markAsRead(alertId: string): void {
    const currentAlerts = this.alertsSubject.value;
    const updatedAlerts = currentAlerts.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    );
    this.alertsSubject.next(updatedAlerts);
  }

  markAllAsRead(): void {
    const currentAlerts = this.alertsSubject.value;
    const updatedAlerts = currentAlerts.map(alert => ({ ...alert, isRead: true }));
    this.alertsSubject.next(updatedAlerts);
  }

  deleteAlert(alertId: string): void {
    const currentAlerts = this.alertsSubject.value;
    const updatedAlerts = currentAlerts.filter(alert => alert.id !== alertId);
    this.alertsSubject.next(updatedAlerts);
  }

  getUnreadCount(): Observable<number> {
    return this.alerts$.pipe(
      map(alerts => alerts.filter(alert => !alert.isRead).length)
    );
  }
}
