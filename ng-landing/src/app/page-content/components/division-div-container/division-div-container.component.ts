import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { PageDivision } from '@shared/models';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-division-div-container',
  templateUrl: './division-div-container.component.html',
  styleUrls: ['./division-div-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DivisionDivContainerComponent {
  private readonly _name = DivisionDivContainerComponent.name;

  @Input() division!: PageDivision;

  constructor(
    private _logger: LoggerService,
  ) { }
}
