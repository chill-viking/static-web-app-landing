import { Directive } from '@angular/core';
import {
  DivisionContentType,
} from '@shared/models';
import {
  DivisionContentTemplateDirective,
} from './division-content-template.directive';

@Directive({
  selector: 'ng-template.[appParagraphTemplate]'
})
export class ParagraphTemplateDirective extends DivisionContentTemplateDirective {
  protected readonly _name = ParagraphTemplateDirective.name;
  type: DivisionContentType = 'paragraph';
}
