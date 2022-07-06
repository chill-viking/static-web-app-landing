import {
  BehaviorSubject, first, map, tap,
} from 'rxjs';
import {
  Component, Input, OnInit,
} from '@angular/core';
import { PageContents } from '@shared/models';
import {
  MonitoringService, PageContentService,
} from '@shared/services';

@Component({
  selector: 'app-page-contents',
  templateUrl: './page-contents.component.html',
  styleUrls: ['./page-contents.component.scss']
})
export class PageContentsComponent implements OnInit {
  private _contentsSubject$ = new BehaviorSubject<PageContents | null>(null);
  private _content$ = this._contentsSubject$.asObservable();

  @Input() pageSlug: string = '';

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
    if (!this.pageSlug) {
      this._logger.logException({
        message: 'No slug set, unable to fetch page contents',
        name: '',
      });
      return;
    }
    this._pageContentSvc.getPageContents(this.pageSlug).pipe(
      first(),
      tap((contents) => this._contentsSubject$.next(contents)),
    ).subscribe();
  }
}
