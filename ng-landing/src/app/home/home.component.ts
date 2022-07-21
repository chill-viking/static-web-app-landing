
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HasSlug } from '@shared/components';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends HasSlug {
  slug = 'home';

  constructor(
    _store$: Store,
    private _logger: LoggerService,
  ) {
    super(_store$);
  }
}
