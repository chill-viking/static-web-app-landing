import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import {
  PageContents, PageDivision,
} from '@shared/models';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-page-content-container',
  templateUrl: './page-content-container.component.html',
  styleUrls: ['./page-content-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContentContainerComponent {
  private readonly _name = PageContentContainerComponent.name;

  @Input() pageContents!: PageContents;

  get pageDivisions(): PageDivision[] {
    return this.pageContents?.divisions ?? [];
  }

  constructor(
    private _logger: LoggerService,
  ) { }
}
