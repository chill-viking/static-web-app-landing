import { BehaviorSubject, map } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { PageContents } from '../models';
import {
  MonitoringService, PageContentService,
} from '../services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
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
    this._pageContentSvc.getPageContents('about-us').pipe(
      first(),
      tap((contents) => this._contentsSubject$.next(contents)),
    ).subscribe();
  }
}
