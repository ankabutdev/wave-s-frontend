import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routes from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpHeaderResponse, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { InstantiateExpr } from '@angular/compiler';
import { IMAGE_CONFIG } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientJsonpModule),
    importProvidersFrom(XMLHttpRequest),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ErrorStateMatcher),
    importProvidersFrom(ShowOnDirtyErrorStateMatcher),
    importProvidersFrom(ProgressEvent),
    importProvidersFrom(HttpHeaders),
    importProvidersFrom(HttpHeaderResponse),
    importProvidersFrom(InstantiateExpr),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadingWarning: true
      }
    }
  ]
})
  .catch((err) => console.error(err));


