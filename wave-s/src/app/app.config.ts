import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  importProvidersFrom(HttpClientModule),
  importProvidersFrom(HttpClient),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(ErrorStateMatcher),
  importProvidersFrom(ShowOnDirtyErrorStateMatcher)
  ]
};


