import { first, Observable } from 'rxjs';
import {
  distinctUntilChanged, map, shareReplay,
  startWith,
} from 'rxjs/operators';
import {
  BreakpointObserver, Breakpoints,
} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnInit,
} from '@angular/core';
import {
  OnPushComponent,
} from '@shared/components';
import {
  LoggerService, PageContentService,
} from '@shared/services';

@Component({
  selector: 'app-primary-navigation',
  templateUrl: './primary-navigation.component.html',
  styleUrls: ['./primary-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryNavigationComponent extends OnPushComponent implements OnInit {
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  pageTitle$ = this._pageContents.currentPageContents$.pipe(
    startWith(null),
    map(contents => contents?.title ?? 'ChillViking | ...'),
    distinctUntilChanged(),
  );

  menu$ = this._pageContents.menu$;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _pageContents: PageContentService,
    change: ChangeDetectorRef,
    logger: LoggerService,
  ) {
    super(change, logger);
  }

  protected getChanges(): Observable<any>[] {
    return [
      this.pageTitle$,
      this.isHandset$,
      this.menu$,
    ];
  }

  override ngOnInit(): void {
      super.ngOnInit();
      this._pageContents.getNavigationMenu().pipe(
        first(),
      ).subscribe();
  }
}
