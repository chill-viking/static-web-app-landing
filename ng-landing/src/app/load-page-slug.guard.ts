import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { pageActions } from './state/actions';

@Injectable({
  providedIn: 'root',
})
export class LoadPageSlugGuard implements CanActivate {
  constructor(
    private _store$: Store,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const slug = route.data?.['pageSlug'];
    if (!!slug) {
      this._store$.dispatch(pageActions.loadPageContents({ slug }));
    }

    return true;
  }
}
