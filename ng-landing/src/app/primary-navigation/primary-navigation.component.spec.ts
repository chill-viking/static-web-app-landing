
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
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [],
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
