import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  createConsoleSpy,
} from '@shared/mocks.spec';
import { pageActions } from './actions';
import { logReducer, reducers } from './reducers';

describe('Reducers', () => {
  let _store$: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers: [logReducer] }),
      ],
    });

    _store$ = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(_store$).toBeTruthy();
  });

  describe('dispatch', () => {
    it('should log state', () => {
      console = createConsoleSpy();

      _store$.dispatch(pageActions.pageContentsAlreadyLoaded({ slug: 'testing' }));

      expect(console.log).toHaveBeenCalledTimes(2);
    });
  });
});
