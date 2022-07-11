import {
  Directive, ElementRef, EmbeddedViewRef,
  Injector, TemplateRef,
} from '@angular/core';
import {
  DivisionContent, DivisionContentType,
} from '@shared/models';
import { LoggerService } from '@shared/services';

@Directive()
export abstract class DivisionContentTemplateDirective extends TemplateRef<DivisionContent> {
  protected abstract readonly _name: string;

  abstract type: DivisionContentType;

  constructor(
    public templateRef: TemplateRef<DivisionContent>,
    public elementRef: ElementRef<DivisionContent>,
    private _logger: LoggerService,
  ) {
    super();
  }

  createEmbeddedView(context: DivisionContent, injector?: Injector | undefined): EmbeddedViewRef<DivisionContent> {
    this._logger.logDebug({
      className: this._name,
      funcOrPropName: 'createEmbeddedView',
      message: '',
      properties: { context },
    });

    return this.templateRef.createEmbeddedView(context, injector);
  }
}
