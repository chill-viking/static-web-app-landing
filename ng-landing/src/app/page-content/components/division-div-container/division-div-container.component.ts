import {
  ChangeDetectionStrategy, Component, Input,
  TemplateRef, ViewChild,
} from '@angular/core';
import {
  DivisionContent, DivisionContentType,
  PageDivision,
} from '@shared/models';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-division-div-container',
  templateUrl: './division-div-container.component.html',
  styleUrls: ['./division-div-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DivisionDivContainerComponent {
  private readonly _name = DivisionDivContainerComponent.name;

  @Input() division?: PageDivision;

  @ViewChild('defaultParagraphTemplate', { static: true })
  defaultParagraphTemplate!: TemplateRef<DivisionContent>;

  @Input() paragraphTemplateRef: TemplateRef<DivisionContent> | undefined;

  constructor(
    private _logger: LoggerService,
  ) { }

  getTemplateRef(type: DivisionContentType): TemplateRef<DivisionContent> {
    // in future will need a switch
    return !!this.paragraphTemplateRef ? this.paragraphTemplateRef : this.defaultParagraphTemplate;
  }

  getTemplateContext(content: DivisionContent): { $implicit: DivisionContent } {
    return { $implicit: content };
  }
}
