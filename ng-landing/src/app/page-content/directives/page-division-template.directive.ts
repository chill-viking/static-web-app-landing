import {
  Directive, ElementRef, EmbeddedViewRef,
  Injector, TemplateRef,
} from '@angular/core';
import {
  DivisionContent, DivisionType, PageDivision,
} from '@shared/models';
import { LoggerService } from '@shared/services';

export interface PageDivisionWithTemplates {
  data: PageDivision;
  templates: { [k: string]: TemplateRef<DivisionContent> | undefined };
};

@Directive()
export abstract class PageDivisionTemplateDirective extends TemplateRef<PageDivisionWithTemplates> {
  protected abstract readonly _name: string;
  abstract type: DivisionType;

  constructor(
    public templateRef: TemplateRef<PageDivisionWithTemplates>,
    public elementRef: ElementRef<PageDivisionWithTemplates>,
    private _logger: LoggerService,
  ) {
    super();
  }

  createEmbeddedView(context: PageDivisionWithTemplates, injector?: Injector | undefined): EmbeddedViewRef<PageDivisionWithTemplates> {
    this._logger.logDebug({
      className: this._name,
      funcOrPropName: 'createEmbeddedView',
      message: '',
      properties: { context },
    });
    return this.templateRef.createEmbeddedView(context, injector);
  }
}
