import {
  BehaviorSubject, Observable, of, shareReplay,
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
  providedIn: 'root'
})
export class PageContentService {
  private _pageContentsSubject$ = new Subject<PageContents>();
  private _navigationMenuSubject$ = new BehaviorSubject<NavigationMenu | null>(null);

  protected _cache: { [slug: string]: PageContents } = {};

  currentPageContents$ = this._pageContentsSubject$.asObservable();
  menu$ = this._navigationMenuSubject$.asObservable().pipe(
    shareReplay(1),
  );

  constructor(
    private _api: ApiService,
    private _title: Title,
    private _logger: LoggerService,
  ) { }

  private fetchPageContents(slug: string) {
    if (!!this._cache[slug]) {
      const result = { ...this._cache[slug] };
      return of(result);
    }

    return this._api.getPageContents(slug).pipe(
      tap(contents => {
        this._cache[slug] = contents;
      }),
    );
  }

  getPageContents(slug: string): Observable<PageContents> {
    return this.fetchPageContents(slug).pipe(
      tap(contents => {
        this._title.setTitle(contents.title);
        this._pageContentsSubject$.next(contents);
      }),
    );
  }

  getNavigationMenu(): Observable<NavigationMenu> {
    return this._api.getNavigationMenu().pipe(
      tap((menu) => this._navigationMenuSubject$.next(menu)),
      shareReplay(1),
    );
  }
}
