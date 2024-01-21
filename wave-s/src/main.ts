import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClient),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ErrorStateMatcher),
    importProvidersFrom(ShowOnDirtyErrorStateMatcher)
  ]
})
  .catch((err) => console.error(err));


