import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  PrimaryNavigationComponent,
} from './primary-navigation/primary-navigation.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
        MockComponent(PrimaryNavigationComponent),
      ],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
