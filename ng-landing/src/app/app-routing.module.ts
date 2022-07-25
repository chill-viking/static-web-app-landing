import { NgModule } from '@angular/core';
import {
  RouterModule, Routes, TitleStrategy,
} from '@angular/router';
import {
  LoadPageSlugGuard,
} from './load-page-slug.guard';
import {
  PageNotFoundComponent,
} from './page-not-found/page-not-found.component';
import {
  PageTitleStrategy,
} from './page-title-strategy';

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
  ],
})
export class AppRoutingModule { }
