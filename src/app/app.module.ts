import {NgModule, provideZoneChangeDetection} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CardGaleriaComponent} from './shared/components/card-galeria/card-galeria.component';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ServicesService} from './shared/services/services.service';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CardGaleriaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [
    ServicesService,
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
