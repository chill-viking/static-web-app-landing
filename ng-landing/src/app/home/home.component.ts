import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HasPageContent,
} from '@shared/components';
import { LoggerService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends HasPageContent {
  constructor(
    _store$: Store,
    logger: LoggerService,
  ) {
    super(_store$, logger);
  }
}
