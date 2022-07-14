import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DivisionDivContainerComponent,
  PageContentContainerComponent,
  PageContentControllerComponent,
  ParagraphContentComponent,
} from './components';

@NgModule({
  declarations: [
    ParagraphContentComponent,
    PageContentControllerComponent,
    PageContentContainerComponent,
    DivisionDivContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageContentControllerComponent,
  ]
})
export class PageContentModule { }
