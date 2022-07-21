import {
  catchError, map, mergeMap, Observable, of,
} from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  Action, select, Store,
} from '@ngrx/store';
import {
  ApiService, LoggerService,
} from '@shared/services';
import { pageActions } from '../actions';
import { fromPage } from '../selectors';

@Injectable()
export class PageContentsEffects {
  onLoad$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(pageActions.loadPageContents),
      mergeMap(({ slug }) => this.getLoadAction(slug).pipe(
        catchError(error => {
          this._logger.logException(error);
          return of(pageActions.loadPageContentsFailed({ error, slug }));
        }),
      )),
    );
  });

  constructor(
    private _actions$: Actions,
    private _apiSvc: ApiService,
    private _store$: Store,
    private _logger: LoggerService,
  ) { }

  private getLoadAction(slug: string): Observable<Action> {
    return this._store$.select(fromPage.selectLoadedPageSlugs).pipe(
      mergeMap((loaded) => {
        if (loaded.includes(slug)) {
          return of(pageActions.pageContentsAlreadyLoaded({ slug }));
        }

        return this._apiSvc.getPageContents(slug).pipe(
          map((data) => pageActions.loadPageContentsSuccess({ data, slug })),
        );
      }),
    );
  }
}
