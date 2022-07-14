import { first, Subject, tap } from 'rxjs';
import { Directive, OnInit } from '@angular/core';
import { PageContents } from '@shared/models';
import {
  PageContentService,
} from '@shared/services';

@Directive()
export abstract class HasSlug implements OnInit {
  private _pageContentsSubject$ = new Subject<PageContents>();

  abstract slug: string;

  pageContents$ = this._pageContentsSubject$.asObservable();

  constructor(
    private _pageContentsSvc: PageContentService,
  ) { }

  ngOnInit(): void {
    this._pageContentsSvc.getPageContents(this.slug).pipe(
      first(),
      tap((contents) => this._pageContentsSubject$.next(contents)),
    ).subscribe();
  }
}
