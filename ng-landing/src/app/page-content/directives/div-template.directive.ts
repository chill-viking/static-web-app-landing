import { Directive } from '@angular/core';
import { DivisionType } from '@shared/models';
import {
  PageDivisionTemplateDirective,
} from './page-division-template.directive';

@Directive({
  selector: 'ng-template.[appDivTemplate]'
})
export class DivTemplateDirective extends PageDivisionTemplateDirective {
  protected readonly _name = DivTemplateDirective.name;
  type: DivisionType = 'div';
}
