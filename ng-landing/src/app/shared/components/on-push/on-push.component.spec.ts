import {
  debounceTime, first, Observable, ReplaySubject,
  tap,
} from 'rxjs';
import {
  ChangeDetectorRef, Component,
} from '@angular/core';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import { loggerSpy } from '@shared/mocks.spec';
import { LoggerService } from '@shared/services';
import {
  OnPushComponent,
} from './on-push.component';

@Component({
  selector: 'app-test-child',
  template: `<p>Hello world</p>`,
})
class ChildComponent extends OnPushComponent {
  subject$ = new ReplaySubject(1);
  subs = this._subs;

  constructor(
    change: ChangeDetectorRef,
    logger: LoggerService,
  ) {
    super(change, logger);
  }

  protected getChanges(): Observable<any>[] {
    return [this.subject$.asObservable()];
  }
}

describe('OnPushComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildComponent ],
      providers: [
        { provide: LoggerService, useValue: loggerSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('observable(s) emit', () => {
    it('should call detectChanges', (done) => {
      fixture.detectChanges();
      const changeDetector = fixture.debugElement.injector.get(ChangeDetectorRef);
      const detectChangesSpy = spyOn(changeDetector.constructor.prototype, 'detectChanges');

      component.subject$.pipe(
        debounceTime(110),
        first(),
        tap((v) => {
          expect(v).toEqual('value'); // confirm seeing expected emit.
          expect(detectChangesSpy).toHaveBeenCalled();
          done();
        }),
      ).subscribe();

      component.subject$.next('value');
    });
  });

  describe('OnDestroy', () => {
    it('should unsubscribe', () => {
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(component.subs[0].closed).toBeTruthy();
    });
  });
});
