
import { Component } from '@angular/core';
import { HasSlug } from '@shared/components';
import {
  LoggerService, PageContentService,
} from '@shared/services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent extends HasSlug {
  slug = 'about-us';

  constructor(
    pageContentsSvc: PageContentService,
    private _logger: LoggerService,
  ) {
    super(pageContentsSvc);
  }
}
