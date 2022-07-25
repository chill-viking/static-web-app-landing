import { takeWhile, tap } from 'rxjs';
import {
  Injectable, NgModule,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  RouterModule, RouterStateSnapshot, Routes,
  TitleStrategy,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  LoadPageSlugGuard,
} from './load-page-slug.guard';
import {
  PageNotFoundComponent,
} from './page-not-found/page-not-found.component';
import { fromPage } from './state/selectors';

@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private _title$ = this._store$.select(fromPage.selectCurrentTitle);

  constructor(
    private _store$: Store,
    private readonly _title: Title,
  ) {
    super();
  }

  updateTitle(_snapshot: RouterStateSnapshot): void {
    this._title$.pipe(
      takeWhile((t) => t.includes("Loading..."), true),
      tap((title) => this._title.setTitle(title)),
    ).subscribe();
  }
}

const routes: Routes = [
  {
    path: 'home',
    data: { pageSlug: 'home' },
    canActivate: [LoadPageSlugGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'about-us',
    data: { pageSlug: 'about-us' },
    canActivate: [LoadPageSlugGuard],
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: TitleStrategy, useClass: PageTitleStrategy },
  ]
})
export class AppRoutingModule { }
