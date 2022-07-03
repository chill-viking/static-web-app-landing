import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DivisionContent } from './models';
import { ApiService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _paragraphSubject$ = new BehaviorSubject<DivisionContent[]>([]);

  title = 'Hello world';
  paragraphs$ = this._paragraphSubject$.asObservable();

  constructor(
    private _api: ApiService,
    private readonly _title: Title,
  ) { }

  ngOnInit(): void {
    this._title.setTitle('Chill Viking | Loading...');
    this._api.getPageContents('home').pipe(
      first(),
    ).subscribe(content => {
      this._title.setTitle(content.title);
      this._paragraphSubject$.next(content.divisions[0].content);
    });
  }
}
