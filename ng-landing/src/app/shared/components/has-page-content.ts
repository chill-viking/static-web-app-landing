import {
  fromPage,
} from 'src/app/state/selectors';
import { Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggerService } from '@shared/services';

@Directive()
export abstract class HasPageContent {
  pageContents$ = this._store$.select(fromPage.selectCurrentPageContents);

  constructor(
    private _store$: Store,
    protected _logger: LoggerService,
  ) { }
}
