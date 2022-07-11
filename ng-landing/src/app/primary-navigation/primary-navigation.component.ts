import { Observable, tap } from 'rxjs';
import {
  distinctUntilChanged, map, shareReplay,
} from 'rxjs/operators';
import {
  BreakpointObserver, Breakpoints,
} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Input,
} from '@angular/core';
import { NavigationMenu } from '@shared/models';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-primary-navigation',
  templateUrl: './primary-navigation.component.html',
  styleUrls: ['./primary-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryNavigationComponent {
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    distinctUntilChanged(),
    tap(() => this._change.detectChanges()),
    shareReplay()
  );

  @Input() pageTitle: string = '';

  @Input() menu?: NavigationMenu;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _change: ChangeDetectorRef,
    private _logger: LoggerService,
  ) { }
}
