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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
