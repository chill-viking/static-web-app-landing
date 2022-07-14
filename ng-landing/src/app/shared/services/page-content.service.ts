import {
  first, map, Observable, shareReplay, startWith,
  Subject, tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  NavigationMenu, PageContents,
} from '../models';
import { ApiService } from './api.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class PageContentService {
  private _pageContentsSubject$ = new Subject<PageContents>();
  private _navigationMenuSubject$ = new Subject<NavigationMenu>();

  currentPageContents$ = this._pageContentsSubject$.asObservable();
  currentTitle$ = this.currentPageContents$.pipe(
    startWith(null),
    map((content) => content?.title ?? 'ChillViking | Loading...'),
    tap((title) => this._title.setTitle(title)),
  );
  menu$ = this._navigationMenuSubject$.asObservable().pipe(
    shareReplay(1),
  );

  constructor(
    private _api: ApiService,
    private _title: Title,
    private _logger: LoggerService,
  ) { }

  private fetchPageContents(slug: string) {
    return this._api.getPageContents(slug);
  }

  getPageContents(slug: string): Observable<PageContents> {
    return this.fetchPageContents(slug).pipe(
      tap(contents => {
        this._pageContentsSubject$.next(contents);
      }),
    );
  }

  publishNavigationMenu(): void {
    this._api.getNavigationMenu().pipe(
      first(),
      tap((menu) => this._navigationMenuSubject$.next(menu)),
    ).subscribe();
  }
}
