import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import { NavigationMenu } from '@shared/models';
import { AppComponent } from './app.component';
import {
  PrimaryNavigationComponent,
} from './primary-navigation/primary-navigation.component';
import { navActions } from './state/actions';
import {
  fromNav, fromPage,
} from './state/selectors';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let navigationMenu: NavigationMenu;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() => {
    navigationMenu = {
      currentEnvironment: 'testing',
      items: [{
        id: 'nav-1',
        route: '/nav-1',
        title: 'Nav',
        type: 'routerLink',
      }],
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
        MockComponent(PrimaryNavigationComponent),
      ],
      providers: [
        provideMockStore({
          selectors: [{
            selector: fromNav.selectNavigationMenu,
            value: navigationMenu,
          }, {
            selector: fromPage.selectCurrentTitle,
            value: '',
          }]
        })
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create the app', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(dispatchSpy).toHaveBeenCalledWith(navActions.loadNavigationMenus());
  });
});
