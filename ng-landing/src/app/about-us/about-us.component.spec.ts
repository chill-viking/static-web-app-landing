import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  PageContentsComponent,
} from '@shared/components';
import { loggerSpy } from '@shared/mocks.spec';
import {
  MonitoringService,
} from '@shared/services';
import {
  AboutUsComponent,
} from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutUsComponent,
        MockComponent(PageContentsComponent),
      ],
      providers: [
        { provide: MonitoringService, useValue: loggerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.slug).toEqual('about-us');
  });
});
