import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import {
  provideMockActions,
} from '@ngrx/effects/testing';
import {
  DefaultProjectorFn, MemoizedSelector,
} from '@ngrx/store';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import { PageContents } from '@shared/models';
import { ApiService } from '@shared/services';
import { pageActions } from '../actions';
import { fromPage } from '../selectors';
import {
  PageContentsEffects,
} from './page-contents.effects';

describe('PageContentsEffects', () => {
  let actions$: Observable<any>;
  let effects: PageContentsEffects;
  let apiSpy: jasmine.SpyObj<ApiService>;
  let mockStore: MockStore;
  let selectMockLoaded: MemoizedSelector<any, readonly string[], DefaultProjectorFn<readonly string[]>>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'getPageContents',
    ]);

    TestBed.configureTestingModule({
      providers: [
        PageContentsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ApiService, useValue: apiSpy },
      ],
    });

    mockStore = TestBed.inject(MockStore);
    selectMockLoaded = mockStore.overrideSelector(fromPage.selectLoadedPageSlugs, []);
    effects = TestBed.inject(PageContentsEffects);
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('onLoad$', () => {
    let apiResponse: PageContents;

    beforeEach(() => {
      apiResponse = {
        divisions: [],
        title: 'test page',
      };
    });

    it('should call api service and dispatch expected action', () => {
      apiSpy.getPageContents.and.returnValue(cold('-0|', [apiResponse]));
      actions$ = hot('-a-', {
        a: pageActions.loadPageContents({ slug: 'hello-world' }),
      });

      expect(effects.onLoad$).toBeObservable(hot('--a', {
        a: pageActions.loadPageContentsSuccess({ data: apiResponse, slug: 'hello-world' }),
      }));
      expect(apiSpy.getPageContents).toHaveBeenCalledWith('hello-world');
    });

    describe('when page slug is already loaded', () => {
      it('should dispatch expected action', () => {
        selectMockLoaded.setResult(['good-day']);
        mockStore.refreshState();
        actions$ = hot('-a-', {
          a: pageActions.loadPageContents({ slug: 'good-day' }),
        });

        expect(effects.onLoad$).toBeObservable(hot('-a-', {
          a: pageActions.pageContentsAlreadyLoaded({ slug: 'good-day' }),
        }));
        expect(apiSpy.getPageContents).not.toHaveBeenCalled();
      });
    });

    describe('when unexpected action emitted', () => {
      it('should do nothing', () => {
        actions$ = hot('-a-', {
          a: pageActions.pageContentsAlreadyLoaded({ slug: 'should be ignored' }),
        });

        expect(effects.onLoad$).toBeObservable(hot('---'));
      });
    });
  });
});
