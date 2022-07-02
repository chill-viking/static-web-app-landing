import {
  catchError, map, Observable, of,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paragraph, Result } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private _http: HttpClient,
  ) { }

  getOpeningBlurb(): Observable<Paragraph[]> {
    return this._http.get<Result<Paragraph[]>>('/api/opening-blurb').pipe(
      catchError(error => {
        console.error('Whoopsie, something went wrong', { error });
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
