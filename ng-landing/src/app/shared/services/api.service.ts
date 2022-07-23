import {
  catchError, map, Observable, of,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NavigationMenu, PageContents, Result,
} from '../models';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private _http: HttpClient,
    private _logger: LoggerService,
  ) { }

  private createDefault(initContent: string): PageContents {
    return {
      title: 'Chill Viking | Oops',
      divisions: [{
        type: 'div',
        class: 'error',
        content: [{
          content: initContent,
          type: 'paragraph',
          class: 'error',
        }],
      }],
    };
  }

  getPageContents(slug: string): Observable<PageContents> {
    return this._http.get<Result<PageContents>>(
      '/api/page-contents',
      {
        params: {
          ['page-slug']: slug,
        },
      }).pipe(
      catchError(error => {
        this._logger.logException(`Getting Page Contents for '${slug}'`, error, 1);
        return of({ data: this.createDefault('Failed to retrieve data') });
      }),
      map((result) => result.data),
    );
  }

  getNavigationMenu(): Observable<NavigationMenu> {
    return this._http.get<Result<NavigationMenu>>('/api/navigation-menu').pipe(
      catchError(error => {
        this._logger.logException('Getting Navigation Menu', error, 1);
        return of({ data: {} as NavigationMenu });
      }),
      map((result) => result.data),
    );
  }
}
