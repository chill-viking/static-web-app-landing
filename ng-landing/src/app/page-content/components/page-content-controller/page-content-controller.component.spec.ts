import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  PageContentContainerComponent,
} from '../page-content-container/page-content-container.component';
import {
  PageContentControllerComponent,
} from './page-content-controller.component';

describe('PageContentControllerComponent', () => {
  let component: PageContentControllerComponent;
  let fixture: ComponentFixture<PageContentControllerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageContentControllerComponent,
        MockComponent(PageContentContainerComponent),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContentControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
