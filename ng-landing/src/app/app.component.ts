
import { Component, OnInit } from '@angular/core';
import { NavigationMenu } from '@shared/models';
import {
  PageContentService,
} from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  defaultMenu: NavigationMenu = {
    currentEnvironment: '',
    items: [],
  };
  menu$ = this._pageContents.menu$;
  title$ = this._pageContents.currentTitle$;

  constructor(
    private _pageContents: PageContentService,
  ) { }

  ngOnInit(): void {
    this._pageContents.publishNavigationMenu();
  }
}
