
import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import {
  PageContentService,
} from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  menu$ = this._pageContents.menu$;
  title$ = this._pageContents.currentTitle$;

  constructor(
    private _pageContents: PageContentService,
  ) { }

  ngOnInit(): void {
    this._pageContents.publishNavigationMenu();
  }
}
