import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  RouterTestingModule,
} from '@angular/router/testing';
import {
  provideMockStore,
} from '@ngrx/store/testing';
import {
  MaterialModule,
} from '../material/material.module';
import {
  PrimaryNavigationComponent,
} from './primary-navigation.component';

describe('PrimaryNavigationComponent', () => {
  let component: PrimaryNavigationComponent;
  let fixture: ComponentFixture<PrimaryNavigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PrimaryNavigationComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore(),
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
  });
});
