import {
  ChangeDetectionStrategy, Component, Input,
  ViewChild,
} from '@angular/core';
import {
  DivisionType, PageContents, PageDivision,
} from '@shared/models';
import { LoggerService } from '@shared/services';
import {
  PageDivisionTemplateDirective,
  PageDivisionWithTemplates,
} from '../../abstract-directives';
import {
  DivTemplateDirective,
  ParagraphTemplateDirective,
} from '../../directives';

@Component({
  selector: 'app-page-content-container',
  templateUrl: './page-content-container.component.html',
  styleUrls: ['./page-content-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContentContainerComponent {
  private readonly _name = PageContentContainerComponent.name;

  @Input() pageContents: PageContents | undefined;

  get divisions(): PageDivision[] {
    return this.pageContents?.divisions ?? [];
  }

  @ViewChild(DivTemplateDirective, { static: true })
  defaultDivTemplate!: DivTemplateDirective;

  @Input() divTemplate: DivTemplateDirective | undefined;

  @Input() paragraphTemplate: ParagraphTemplateDirective | undefined;

  constructor(
    private _logger: LoggerService,
  ) { }

  getTemplateRef(type: DivisionType): PageDivisionTemplateDirective {
    // later will become a switch, for now it's always div.
    const templateRef = !!this.divTemplate ? this.divTemplate : this.defaultDivTemplate;
    this._logger.logDebug({
      className: this._name,
      funcOrPropName: 'getTemplateRef',
      message: 'Getting template ref',
      properties: { type, templateRef, paragraphTemplate: this.paragraphTemplate },
    });

    return templateRef;
  }

  getPageDivisionContext(data: PageDivision): { $implicit: PageDivisionWithTemplates } {
    return {
      $implicit: {
        data,
        templates: { ['paragraph']: this.paragraphTemplate },
      },
    };
  }
}
