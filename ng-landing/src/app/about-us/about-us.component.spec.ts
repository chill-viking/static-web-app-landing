import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import {
  PageContentControllerComponent,
} from '../page-content/components';
import {
  AboutUsComponent,
} from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let mockStore: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutUsComponent,
        MockComponent(PageContentControllerComponent),
      ],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.slug).toEqual('about-us');
  });
});
