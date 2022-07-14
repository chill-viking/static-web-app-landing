import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  DivisionDivContainerComponent,
} from './division-div-container.component';

describe('DivisionDivContainerComponent', () => {
  let component: DivisionDivContainerComponent;
  let fixture: ComponentFixture<DivisionDivContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionDivContainerComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionDivContainerComponent);
    component = fixture.componentInstance;
    component.division = {
      class: '',
      content: [],
      type: 'div',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
