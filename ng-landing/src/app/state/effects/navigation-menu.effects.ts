import {
  catchError, map, mergeMap, of,
} from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  ApiService, LoggerService,
} from '@shared/services';
import { navActions } from '../actions';

@Injectable()
export class NavigationMenuEffects {
  onLoad$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(navActions.loadNavigationMenus),
      mergeMap(() => this._apiSvc.getNavigationMenu().pipe(
        map((data) => navActions.loadNavigationMenusSuccess({ data })),
        catchError(error => {
          this._logger.logException(error);
          return of(navActions.loadNavigationMenusFailed());
        }),
      )),
    );
  });

  constructor(
    private _actions$: Actions,
    private _apiSvc: ApiService,
    private _logger: LoggerService,
  ) { }
}
