import {
  PageContents,
} from 'dist/chill-viking-template';
import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './api.service';
import {
  MonitoringService,
} from './monitoring.service';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {
  protected _cache: { [slug: string]: PageContents } = {};

  constructor(
    private _api: ApiService,
    private _title: Title,
    private _logger: MonitoringService,
  ) { }

  getPageContents(slug: string): Observable<PageContents> {
    if (!!this._cache[slug]) {
      const result = { ...this._cache[slug] };
      this._title.setTitle(result.title);
      return of(result);
    }

    return this._api.getPageContents(slug).pipe(
      tap(contents => {
        this._title.setTitle(contents.title);
        this._cache[slug] = contents;
      }),
    );
  }
}
