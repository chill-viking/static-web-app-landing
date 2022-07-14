import { Observable } from 'rxjs';
import {
  ChangeDetectionStrategy, Component, Input,
  OnInit,
} from '@angular/core';
import { PageContents } from '@shared/models';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-page-content-controller',
  templateUrl: './page-content-controller.component.html',
  styleUrls: ['./page-content-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContentControllerComponent implements OnInit {
  private readonly _name = PageContentControllerComponent.name;

  @Input()
  pageContent$!: Observable<PageContents>;

  constructor(
    private _logger: LoggerService,
  ) { }

  ngOnInit(): void {
    if (!this.pageContent$) {
      this._logger.logException(new Error('pageContent$ not provided.'));
      return;
    }
  }
}
