import { Observable } from 'rxjs';
import {
  debounceTime, map, shareReplay, tap,
} from 'rxjs/operators';
import {
  BreakpointObserver, Breakpoints,
} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy, Component,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggerService } from '@shared/services';
import {
  fromNav, fromPage,
} from '../state/selectors';

@Component({
  selector: 'app-primary-navigation',
  templateUrl: './primary-navigation.component.html',
  styleUrls: ['./primary-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryNavigationComponent {
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  pageTitle$ = this._store$.select(fromPage.selectCurrentTitle).pipe(
    tap((title) => this._logger.logDebug({ className: 'PrimaryNav', funcOrPropName: 'pageTitle$', message: title })),
    debounceTime(150),
  );

  menu$ = this._store$.select(fromNav.selectNavigationMenu);

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _store$: Store,
    private _logger: LoggerService,
  ) { }
}
