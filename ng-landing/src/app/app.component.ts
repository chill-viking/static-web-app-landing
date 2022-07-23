
import { tap } from 'rxjs';
import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggerService } from '@shared/services';
import { navActions } from './state/actions';
import {
  fromNav, fromPage,
} from './state/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  menu$ = this._store$.select(fromNav.selectNavigationMenu);
  title$ = this._store$.select(fromPage.selectCurrentTitle);

  slugs$ = this._store$.select(fromPage.selectLoadedPageSlugs).pipe(
    tap((loaded) => this._logger.logDebug({ message: 'loaded page slugs', properties: { loaded } })),
  );

  constructor(
    private _store$: Store,
    private _logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this._store$.dispatch(navActions.loadNavigationMenus());
  }
}
