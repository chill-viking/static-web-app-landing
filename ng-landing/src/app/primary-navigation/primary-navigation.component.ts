import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  BreakpointObserver, Breakpoints,
} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy, Component, Input,
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
    shareReplay()
  );

  @Input() pageTitle$!: Observable<string | undefined>;

  @Input() menu$!: Observable<NavigationMenu | undefined>;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _logger: LoggerService,
  ) { }
}
