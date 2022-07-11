
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Input,
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
  private _content: DivisionContent | undefined;

  @Input() set divContent(value: DivisionContent) {
    if (value.type !== 'paragraph') {
      this._logger.logException({
        name: 'InvalidType',
        message: `Invalid type '${value.type}' used to render Paragraph`,
      });
      return;
    }

    this._content = value;
    this._cdRef.detectChanges();
  };

  get id(): string | undefined {
    return this._content?.id;
  }

  get class(): string | undefined {
    return this._content?.class;
  }

  get content(): string {
    return this._content?.content ?? '';
  }

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _logger: LoggerService,
  ) { }
}
