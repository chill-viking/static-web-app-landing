import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionDivContainerComponent } from './division-div-container.component';

describe('DivisionDivContainerComponent', () => {
  let component: DivisionDivContainerComponent;
  let fixture: ComponentFixture<DivisionDivContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionDivContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionDivContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
