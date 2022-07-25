import { takeWhile, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromPage } from './state/selectors';

@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private _title$ = this._store$.select(fromPage.selectCurrentTitle);

  constructor(
    private _store$: Store,
    private readonly _title: Title,
  ) {
    super();
  }

  updateTitle(): void {
    this._title$.pipe(
      takeWhile((t) => t.includes("Loading..."), true),
      tap((title) => this._title.setTitle(title)),
    ).subscribe();
  }
}
