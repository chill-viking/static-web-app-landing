import { cold } from 'jasmine-marbles';
import {
  LayoutModule,
} from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
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
import { loggerSpy } from '@shared/mocks.spec';
import { NavigationMenu } from '@shared/models';
import {
  LoggerService, PageContentService,
} from '@shared/services';
import {
  spyPropertyGetter,
} from '@shared/utils.spec';
import {
  PrimaryNavigationComponent,
} from './primary-navigation.component';

describe('PrimaryNavigationComponent', () => {
  let component: PrimaryNavigationComponent;
  let fixture: ComponentFixture<PrimaryNavigationComponent>;
  let pageContentsSpy: jasmine.SpyObj<PageContentService>;
  let changeDetectorSpy: jasmine.SpyObj<ChangeDetectorRef>;
  let navigationMenu: NavigationMenu;

  beforeEach(waitForAsync(() => {
    pageContentsSpy = jasmine.createSpyObj<PageContentService>(
      'PageContentService',
      ['getNavigationMenu'],
      [
        'currentPageContents$',
        'menu$',
      ],
    );
    navigationMenu = {
      currentEnvironment: 'testing',
      items: [{
        id: 'nav-1',
        route: '/nav-1',
        title: 'Nav',
        type: 'routerLink',
      }],
    };
    spyPropertyGetter(pageContentsSpy, 'currentPageContents$').and.returnValue(cold('-0-', [null]));
    spyPropertyGetter(pageContentsSpy, 'menu$').and.returnValue(cold('-0-', [navigationMenu]));

    pageContentsSpy.publishNavigationMenu.and.returnValues(cold('-0-', [navigationMenu]));

    changeDetectorSpy = jasmine.createSpyObj<ChangeDetectorRef>('ChangeDetectorRef', ['detectChanges']);

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
        { provide: ChangeDetectorRef, useValue: changeDetectorSpy },
        { provide: LoggerService, useValue: loggerSpy },
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
    expect(component.pageTitle$).toBeObservable(cold('0-', ['ChillViking | ...']));
    expect(pageContentsSpy.publishNavigationMenu).toHaveBeenCalled();
  });
});
