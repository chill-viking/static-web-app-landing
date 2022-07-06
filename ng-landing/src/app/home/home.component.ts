
import { Component } from '@angular/core';
import { HasSlug } from '@shared/components';
import {
  MonitoringService,
} from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends HasSlug {
  slug = 'home';

  constructor(
    private _logger: MonitoringService,
  ) {
    super();
  }
}
