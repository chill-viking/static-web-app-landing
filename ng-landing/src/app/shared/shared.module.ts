import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PageContentsComponent,
} from './components';

@NgModule({
  declarations: [
    PageContentsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageContentsComponent,
  ]
})
export class SharedModule { }
