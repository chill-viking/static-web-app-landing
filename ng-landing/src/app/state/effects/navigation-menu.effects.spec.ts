import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import {
  provideMockActions,
} from '@ngrx/effects/testing';
import { NavigationMenu } from '@shared/models';
import { ApiService } from '@shared/services';
import * as actions from '../actions/navigation-menu.actions';
import {
  NavigationMenuEffects,
} from './navigation-menu.effects';

describe('NavigationMenuEffects', () => {
  let actions$: Observable<any>;
  let effects: NavigationMenuEffects;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'getNavigationMenu',
    ]);

    TestBed.configureTestingModule({
      providers: [
        NavigationMenuEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: apiSpy },
      ]
    });

    effects = TestBed.inject(NavigationMenuEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('onLoad$', () => {
    let apiResult: NavigationMenu;

    beforeEach(() => {
      apiResult = {
        items: [],
        currentEnvironment: 'testing',
      };
    });

    it('should fetch menu and dispatch loaded action', () => {
      apiSpy.getNavigationMenu.and.returnValue(cold('-0|', [apiResult]));
      actions$ = hot('-a-', {
        a: actions.loadNavigationMenus(),
      });

      expect(effects.onLoad$).toBeObservable(hot('--a', {
        a: actions.loadNavigationMenusSuccess({ data: apiResult }),
      }));
      expect(apiSpy.getNavigationMenu).toHaveBeenCalled();
    });

    describe('when other action emitted', () => {
      it('should do nothing', () => {
        actions$ = hot('-a-', { a: actions.loadNavigationMenusSuccess({ data: apiResult })});

        expect(effects.onLoad$).toBeObservable(hot('---'));
      });
    });
  });
});
