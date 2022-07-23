import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggerService } from '@shared/services';
import { navActions } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private _store$: Store,
    private _logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this._store$.dispatch(navActions.loadNavigationMenus());
  }
}
