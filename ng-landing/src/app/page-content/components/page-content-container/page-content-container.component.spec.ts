import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  PageContentContainerComponent,
} from './page-content-container.component';

describe('PageContentContainerComponent', () => {
  let component: PageContentContainerComponent;
  let fixture: ComponentFixture<PageContentContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContentContainerComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.defaultDivTemplate).toBeTruthy();
  });
});
