import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Paragraph } from './models';
import { ApiService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _paragraphSubject$ = new BehaviorSubject<Paragraph[]>([]);

  title = 'Hello world';
  paragraphs$ = this._paragraphSubject$.asObservable();

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this._api.getOpeningBlurb().pipe(
      first(),
    ).subscribe(paragraphs => {
      this._paragraphSubject$.next(paragraphs);
    });
  }
}
