import {
  catchError, map, Observable, of,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageContents, Result } from '../models';
import {
  MonitoringService,
} from './monitoring.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private _http: HttpClient,
    private _logger: MonitoringService,
  ) { }

  private createDefault(initContent: string): PageContents {
    return {
      title: 'Chill Viking | Oops',
      divisions: [{
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
        this._logger.logException(error, 1);
        return of({ data: this.createDefault('Failed to retrieve data') });
      }),
      map((result) => result.data),
    );
  }
}
