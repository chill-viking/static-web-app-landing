import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { DivisionContent } from '@shared/models';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-paragraph-content',
  templateUrl: './paragraph-content.component.html',
  styleUrls: ['./paragraph-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphContentComponent {
  @Input() divContent!: DivisionContent;

  constructor(
    private _logger: LoggerService,
  ) { }
}
