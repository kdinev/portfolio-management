import { Component, OnInit } from '@angular/core';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { AlertService } from '../../services/alert.service';
import { MarketAlert } from '../../models/portfolio.model';
import { Observable } from 'rxjs';
import { IGX_CARD_DIRECTIVES } from 'igniteui-angular/card';
import { IGX_LIST_DIRECTIVES } from 'igniteui-angular/list';
import { IGX_CHIPS_DIRECTIVES } from 'igniteui-angular/chips';
import { AsyncPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { IgxButtonDirective, IgxIconButtonDirective } from 'igniteui-angular/directives';
import { IgxBadgeComponent } from 'igniteui-angular/badge';

@Component({
    selector: 'app-alerts',
    standalone: true,
    imports: [
        IGX_CARD_DIRECTIVES,
        IGX_LIST_DIRECTIVES,
        IGX_CHIPS_DIRECTIVES,
        IgxButtonDirective,
        IgxIconButtonDirective,
        IgxIconComponent,
        IgxBadgeComponent,
        AsyncPipe,
        NgClass,
        UpperCasePipe,
        DatePipe
    ],
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts$!: Observable<MarketAlert[]>;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alerts$ = this.alertService.getAlerts();
  }

  markAsRead(alertId: string) {
    this.alertService.markAsRead(alertId);
  }

  markAllAsRead() {
    this.alertService.markAllAsRead();
  }

  deleteAlert(alertId: string) {
    this.alertService.deleteAlert(alertId);
  }

  getSeverityClass(severity: string): string {
    return `severity-${severity}`;
  }

  getSeverityIcon(severity: string): string {
    switch(severity) {
      case 'critical': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}
