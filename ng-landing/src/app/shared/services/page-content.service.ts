import {
  Observable, of, Subject, tap,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageContents } from '../models';
import { ApiService } from './api.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {
  private _pageContentsSubject$ = new Subject<PageContents>();
  protected _cache: { [slug: string]: PageContents } = {};

  currentPageContents$ = this._pageContentsSubject$.asObservable();

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
}
