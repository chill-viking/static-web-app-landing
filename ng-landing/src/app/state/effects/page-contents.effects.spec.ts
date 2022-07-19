import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import {
  provideMockActions,
} from '@ngrx/effects/testing';
import {
  PageContentsEffects,
} from './page-contents.effects';

describe('PageContentsEffects', () => {
  let actions$: Observable<any>;
  let effects: PageContentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageContentsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PageContentsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
