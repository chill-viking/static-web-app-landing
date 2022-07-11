import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DivisionDivContainerComponent,
  PageContentContainerComponent,
  PageContentControllerComponent,
  ParagraphContentComponent,
} from './components';
import {
  DivTemplateDirective,
  ParagraphTemplateDirective,
} from './directives';

@NgModule({
  declarations: [
    ParagraphContentComponent,
    PageContentControllerComponent,
    PageContentContainerComponent,
    DivisionDivContainerComponent,
    DivTemplateDirective,
    ParagraphTemplateDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageContentControllerComponent,
    DivTemplateDirective,
    ParagraphTemplateDirective,
  ]
})
export class PageContentModule { }
