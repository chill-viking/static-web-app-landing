
import { Component } from '@angular/core';
import { HasSlug } from '@shared/components';
import {
  MonitoringService,
} from '@shared/services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent extends HasSlug {
  slug = 'about-us';

  constructor(
    private _logger: MonitoringService,
  ) {
    super();
  }
}
