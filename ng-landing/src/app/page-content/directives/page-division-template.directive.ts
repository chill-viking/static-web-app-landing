import {
  ContentChildren, Directive, ElementRef,
  EmbeddedViewRef, Injector, TemplateRef,
} from '@angular/core';
import {
  DivisionType, PageDivision,
} from '@shared/models';
import { LoggerService } from '@shared/services';
import {
  ParagraphTemplateDirective,
} from './paragraph-template.directive';

@Directive()
export abstract class PageDivisionTemplateDirective extends TemplateRef<PageDivision> {
  protected abstract readonly _name: string;
  abstract type: DivisionType;

  @ContentChildren(ParagraphTemplateDirective)
  paragraphTemplate: ParagraphTemplateDirective | undefined;

  constructor(
    public templateRef: TemplateRef<PageDivision>,
    public elementRef: ElementRef<PageDivision>,
    private _logger: LoggerService,
  ) {
    super();
  }

  createEmbeddedView(context: PageDivision, injector?: Injector | undefined): EmbeddedViewRef<PageDivision> {
    this._logger.logDebug({
      className: this._name,
      funcOrPropName: 'createEmbeddedView',
      message: '',
      properties: { context },
    });
    return this.templateRef.createEmbeddedView(context, injector);
  }
}
