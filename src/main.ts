import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import 'hammerjs';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),provideAnimations(),
    provideHttpClient(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
