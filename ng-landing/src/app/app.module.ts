import {
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import {
  AppComponent, PageNotFoundComponent,
  PrimaryNavigationComponent,
} from './components';
import {
  MaterialModule,
} from './material/material.module';
import {
  NavigationMenuEffects, PageContentsEffects,
} from './state/effects';
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
    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    EffectsModule.forRoot([
      PageContentsEffects,
      NavigationMenuEffects,
    ]),
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
