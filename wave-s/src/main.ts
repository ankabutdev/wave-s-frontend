import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from './timeoutinscreptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientJsonpModule),
    importProvidersFrom(XMLHttpRequest),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ErrorStateMatcher),
    importProvidersFrom(ShowOnDirtyErrorStateMatcher),
    importProvidersFrom(ProgressEvent),
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 900000 }],
  ]
})
  .catch((err) => console.error(err));


