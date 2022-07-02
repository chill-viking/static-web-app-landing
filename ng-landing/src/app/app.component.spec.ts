import { cold } from 'jasmine-marbles';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  RouterTestingModule,
} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(waitForAsync(() => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getOpeningBlurb']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    apiSpy.getOpeningBlurb.and.returnValue(cold('-a|', { a: [{ content: 'hi', class: '' }]}));
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Hello world'`, () => {
    expect(component.title).toEqual('Hello world');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Hello world');
  });

  describe('OnInit', () => {
    it('should emit api response into paragraph subject', () => {
      component.ngOnInit();

      expect(apiSpy.getOpeningBlurb).toHaveBeenCalled();
      const expected$ = cold('ab', { a: [], b: [{ content: 'hi', class: '' }]});
      expect(component.paragraphs$).toBeObservable(expected$);
    });
  });
});
