import {
  environment,
} from 'src/environments/environment';
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
import {
  DebugMonitoringService, LoggerService,
  MonitoringService,
} from '@shared/services';
import {
  SharedModule,
} from '@shared/shared.module';
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
