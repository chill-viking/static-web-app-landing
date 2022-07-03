import {
  catchError, map, Observable, of,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paragraph, Result } from '../models';
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

  getOpeningBlurb(): Observable<Paragraph[]> {
    return this._http.get<Result<Paragraph[]>>('/api/opening-blurb').pipe(
      catchError(error => {
        this._logger.logException(error, 1);
        return of({
          data: [
            { content: 'Failed to retrieve data', class: 'error' },
          ],
        });
      }),
      map((result) => result.data),
    );
  }
}
