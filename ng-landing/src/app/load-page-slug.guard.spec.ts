import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Action } from '@ngrx/store';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import {
  LoadPageSlugGuard,
} from './load-page-slug.guard';
import { pageActions } from './state/actions';

describe('LoadPageSlugGuard', () => {
  let guard: LoadPageSlugGuard;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ],
    });

    mockStore = TestBed.inject(MockStore);
    guard = TestBed.inject(LoadPageSlugGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    let dispatchSpy: jasmine.Spy<(<V extends Action = Action>(action: V) => void)>;
    let route: ActivatedRouteSnapshot;

    beforeEach(() => {
      dispatchSpy = spyOn(mockStore, 'dispatch');
      route = new ActivatedRouteSnapshot();
    });

    describe('when route has pageSlug', () => {
      it('should dispatch load action for page slug', () => {
        route.data = { pageSlug: 'slug' };
        const result = guard.canActivate(route);

        expect(result).toBeTrue();
        expect(dispatchSpy).toHaveBeenCalledWith(pageActions.loadPageContents({ slug: 'slug' }));
      });
    });

    describe('when route has no data', () => {
      it('should no dispatch action and return true', () => {
        route.data = { notASlug: 'not a slug' };
        const result = guard.canActivate(route);

        expect(result).toBeTrue();
        expect(dispatchSpy).not.toHaveBeenCalled();
      });
    });
  });
});
