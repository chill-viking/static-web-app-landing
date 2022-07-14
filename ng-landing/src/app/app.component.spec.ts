import { cold } from 'jasmine-marbles';
import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  createPageContentSpy,
} from '@shared/mocks.spec';
import { NavigationMenu } from '@shared/models';
import {
  PageContentService,
} from '@shared/services';
import {
  spyPropertyGetter,
} from '@shared/utils.spec';
import { AppComponent } from './app.component';
import {
  PrimaryNavigationComponent,
} from './primary-navigation/primary-navigation.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let pageContentSvcSpy: jasmine.SpyObj<PageContentService>;
  let navigationMenu: NavigationMenu;

  beforeEach(waitForAsync(() => {
    pageContentSvcSpy = createPageContentSpy();
    navigationMenu = {
      currentEnvironment: 'testing',
      items: [{
        id: 'nav-1',
        route: '/nav-1',
        title: 'Nav',
        type: 'routerLink',
      }],
    };
    spyPropertyGetter(pageContentSvcSpy, 'currentTitle$').and.returnValue(cold('0-', ['ChillViking | ...']));
    spyPropertyGetter(pageContentSvcSpy, 'menu$').and.returnValue(cold('-0-', [navigationMenu]));

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
        MockComponent(PrimaryNavigationComponent),
      ],
      providers: [
        { provide: PageContentService, useValue: pageContentSvcSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component.title$).toBeObservable(cold('0-', ['ChillViking | ...']));
    expect(pageContentSvcSpy.publishNavigationMenu).toHaveBeenCalled();
  });
});
