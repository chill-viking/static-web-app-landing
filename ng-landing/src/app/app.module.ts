import {
  LayoutModule,
} from '@angular/cdk/layout';
import {
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
} from '@angular/material/button';
import {
  MatIconModule,
} from '@angular/material/icon';
import {
  MatListModule,
} from '@angular/material/list';
import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  MatToolbarModule,
} from '@angular/material/toolbar';
import {
  BrowserModule,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import {
  DebugMonitoringService, LoggerService,
  MonitoringService,
} from '@shared/services';
import {
  SharedModule,
} from '@shared/shared.module';
import {
  environment,
} from '../environments/environment';
import {
  AppRoutingModule,
} from './app-routing.module';
import { AppComponent } from './app.component';
import {
  PageNotFoundComponent,
} from './page-not-found/page-not-found.component';
import {
  PrimaryNavigationComponent,
} from './primary-navigation/primary-navigation.component';
import {
  metaReducers, reducers,
} from './state/reducers';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PrimaryNavigationComponent,
  ],
  providers: [
    {
      provide: LoggerService,
      useClass: environment.production ? MonitoringService : DebugMonitoringService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
