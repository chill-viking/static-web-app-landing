import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SharedModule,
} from '@shared/shared.module';
import {
  PageContentModule,
} from '../page-content/page-content.module';
import {
  HomeRoutingModule,
} from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PageContentModule,
  ]
})
export class HomeModule { }
