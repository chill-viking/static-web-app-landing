import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  RouterTestingModule,
} from '@angular/router/testing';
import { loggerSpy } from '@shared/mocks.spec';
import {
  MonitoringService,
} from '@shared/services';
import {
  PageNotFoundComponent,
} from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ PageNotFoundComponent ],
      providers: [
        { provide: MonitoringService, useValue: loggerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
