import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IGX_NAVBAR_DIRECTIVES } from 'igniteui-angular/navbar';
import { IgxIconComponent } from 'igniteui-angular/icon';
import { IgxBadgeComponent } from 'igniteui-angular/badge';
import { AlertService } from '../../services/alert.service';
import { Observable } from 'rxjs';
import { IgxButtonDirective } from 'igniteui-angular/directives';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        IGX_NAVBAR_DIRECTIVES,
        IgxIconComponent,
        IgxBadgeComponent,
        RouterLink,
        RouterLinkActive,
        AsyncPipe,
        IgxButtonDirective
    ],
    template: `
    <igx-navbar class="navbar" title="Portfolio Manager">
      <div class="toolbar-content">
        <nav class="nav-links">
          <button igxButton="flat" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <igx-icon>dashboard</igx-icon>
            Dashboard
          </button>
          <button igxButton="flat" routerLink="/portfolio" routerLinkActive="active">
            <igx-icon>folder</igx-icon>
            Portfolio
          </button>
          <button igxButton="flat" routerLink="/analytics" routerLinkActive="active">
            <igx-icon>analytics</igx-icon>
            Analytics
          </button>
          <button igxButton="flat" routerLink="/alerts" routerLinkActive="active">
            <igx-icon>notifications</igx-icon>
            Alerts
            @if (unreadCount$ | async; as unreadCount) {
              @if (unreadCount > 0) {
                <igx-badge [value]="unreadCount"></igx-badge>
              }
            }
          </button>
          <button igxButton="flat" routerLink="/registration" routerLinkActive="active">
            <igx-icon>person_add</igx-icon>
            Register
          </button>
        </nav>
      </div>
    </igx-navbar>
    `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  unreadCount$!: Observable<number>;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.unreadCount$ = this.alertService.getUnreadCount();
  }
}
