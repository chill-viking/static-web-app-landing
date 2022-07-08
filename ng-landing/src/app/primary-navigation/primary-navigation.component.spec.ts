import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import {
  LayoutModule,
} from '@angular/cdk/layout';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  MatButtonModule,
} from '@angular/material/button';
import {
  MatIconModule,
} from '@angular/material/icon';
import {
  MatListModule,
} from '@angular/material/list';
import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  MatToolbarModule,
} from '@angular/material/toolbar';
import {
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  RouterTestingModule,
} from '@angular/router/testing';
import { PageContents } from '@shared/models';
import {
  PageContentService,
} from '@shared/services';
import {
  PrimaryNavigationComponent,
} from './primary-navigation.component';

describe('PrimaryNavigationComponent', () => {
  let component: PrimaryNavigationComponent;
  let fixture: ComponentFixture<PrimaryNavigationComponent>;
  let pageContentsSpy: jasmine.SpyObj<PageContentService>;

  beforeEach(waitForAsync(() => {
    pageContentsSpy = jasmine.createSpyObj<PageContentService>('PageContentService', [], ['currentPageContents$']);
    (Object.getOwnPropertyDescriptor(
      pageContentsSpy,
      'currentPageContents$',
    )?.get as jasmine.Spy<() => Observable<PageContents>>).and.returnValue(cold('-0-', [null]));

    TestBed.configureTestingModule({
      declarations: [PrimaryNavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: PageContentService, useValue: pageContentsSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
    expect(component.pageTitle$).toBeObservable(cold('0-', ['ChillViking | ...']))
  });
});
