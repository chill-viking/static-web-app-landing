
import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(
    private _store$: Store,
  ) { }

  ngOnInit(): void {
    this._store$.dispatch(navActions.loadNavigationMenus());
  }
}
