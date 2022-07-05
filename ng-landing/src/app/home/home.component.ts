import {
  BehaviorSubject, first, map,
} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { PageContents } from '../models';
import {
  MonitoringService, PageContentService,
} from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _contentsSubject$ = new BehaviorSubject<PageContents | null>(null);
  private _content$ = this._contentsSubject$.asObservable();

  hasContents$ = this._content$.pipe(
    map((content) => !!content),
  );
  paragraphs$ = this._content$.pipe(
    map((content) => content?.divisions[0].content),
  );

  constructor(
    private _pageContentSvc: PageContentService,
    private _logger: MonitoringService,
  ) { }

  ngOnInit(): void {
    this._pageContentSvc.getPageContents('home').pipe(
      first(),
      tap((contents) => this._contentsSubject$.next(contents)),
    ).subscribe();
  }
}
