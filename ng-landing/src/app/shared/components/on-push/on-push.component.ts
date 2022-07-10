import {
  combineLatest, debounceTime, Observable,
  Subscription, tap,
} from 'rxjs';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, OnDestroy, OnInit,
} from '@angular/core';
import { LoggerService } from '@shared/services';

@Component({
  template: `<div>expect this to be overridden by child classes</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class OnPushComponent implements OnDestroy, OnInit {
  protected _subs: Subscription[] = [];

  constructor(
    protected _change: ChangeDetectorRef,
    protected _logger: LoggerService,
  ) { }
 
  protected abstract getChanges(): Observable<any>[];

  ngOnInit(): void {
    this._subs.push(
      combineLatest(this.getChanges()).pipe(
        debounceTime(100),
        tap(() => this._change.detectChanges()),
      ).subscribe(),
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
