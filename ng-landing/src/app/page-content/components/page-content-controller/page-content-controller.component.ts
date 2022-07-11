import {
  BehaviorSubject, combineLatest, filter, first,
  map, Observable, ReplaySubject, shareReplay,
  startWith, tap,
} from 'rxjs';
import {
  AfterContentInit, ChangeDetectionStrategy,
  Component, ContentChild, Input, OnInit,
} from '@angular/core';
import { PageContents } from '@shared/models';
import { LoggerService } from '@shared/services';
import {
  DivTemplateDirective,
} from '../../directives';
import {
  PageContentsCallback,
} from '../../models';

@Component({
  selector: 'app-page-content-controller',
  templateUrl: './page-content-controller.component.html',
  styleUrls: ['./page-content-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContentControllerComponent implements OnInit, AfterContentInit {
  private readonly _name = PageContentControllerComponent.name;
  private _pageContentsSubject$ = new ReplaySubject<PageContents>(1);
  private _contentInitSubject$ = new BehaviorSubject(false);

  pageContent$: Observable<PageContents | null> = combineLatest([
    this._pageContentsSubject$.asObservable(),
    this._contentInitSubject$.asObservable(),
  ]).pipe(
    filter(([_, hasInit]) => hasInit),
    map(([content, _]) => content),
    startWith(null),
    tap((value) => {
      this._logger.logDebug({
        className: this._name,
        funcOrPropName: 'pageContent$',
        message: 'value emitted',
        properties: { value }});
    }),
    shareReplay(1),
  );

  @ContentChild(DivTemplateDirective)
  divTemplate: DivTemplateDirective | undefined;

  @Input()
  pageSlug!: string;

  @Input()
  fetchFunc!: PageContentsCallback;

  constructor(
    private _logger: LoggerService,
  ) { }

  ngAfterContentInit(): void {
    this._logger.logDebug({
      className: this._name,
      funcOrPropName: 'ngAfterContentInit',
      message: 'check if content children are visible',
      properties: {
        divTemplate: this.divTemplate,
        paragraphTemplate: this.divTemplate?.paragraphTemplate,
      },
    });

    this._contentInitSubject$.next(true);
  }

  ngOnInit(): void {
    this._logger.logDebug({
      className: this._name,
      funcOrPropName: 'ngOnInit',
      message: 'initialized',
      properties: { slug: this.pageSlug, func: this.fetchFunc },
    });

    this.fetchFunc(this.pageSlug).pipe(
      first(),
      tap((content) => this._pageContentsSubject$.next(content)),
    ).subscribe();
  }
}
