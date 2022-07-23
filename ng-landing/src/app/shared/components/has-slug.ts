import {
  pageActions,
} from 'src/app/state/actions';
import {
  fromPage,
} from 'src/app/state/selectors';
import { Directive, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Directive()
export abstract class HasSlug implements OnInit {
  abstract slug: string;

  pageContents$ = this._store$.select(fromPage.selectCurrentPageContents);

  constructor(
    private _store$: Store,
  ) { }

  ngOnInit(): void {
    // TODO: move load dispatch into a guard.
    this._store$.dispatch(pageActions.loadPageContents({ slug: this.slug }));
  }
}
