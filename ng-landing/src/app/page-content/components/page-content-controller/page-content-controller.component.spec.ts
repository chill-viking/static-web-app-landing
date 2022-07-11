import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
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
