import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import {
  provideMockActions,
} from '@ngrx/effects/testing';
import {
  NavigationMenuEffects,
} from './navigation-menu.effects';

describe('NavigationMenuEffects', () => {
  let actions$: Observable<any>;
  let effects: NavigationMenuEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavigationMenuEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(NavigationMenuEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
