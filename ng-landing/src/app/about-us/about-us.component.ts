import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HasSlug } from '@shared/components';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent extends HasSlug {
  slug = 'about-us';

  constructor(
    _store$: Store,
    private _logger: LoggerService,
  ) {
    super(_store$);
  }
}
