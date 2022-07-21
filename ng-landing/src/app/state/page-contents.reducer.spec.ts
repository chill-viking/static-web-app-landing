import { PageContents } from '@shared/models';
import { pageActions } from './actions';
import {
  initialState, reducer,
} from './page-contents.reducer';

describe('PageContents Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`on ${pageActions.loadPageContents.type}`, () => {
    it('should clear current slug', () => {
      const action = pageActions.loadPageContents({ slug: 'hi' });

      const result = reducer({ ...initialState, currentSlug: 'hello' }, action);

      expect(result).toEqual({ ...initialState, currentSlug: '' });
    });
  });

  describe(`on ${pageActions.pageContentsAlreadyLoaded.type}`, () => {
    it('should set current slug', () => {
      const action = pageActions.pageContentsAlreadyLoaded({ slug: 'hello' });

      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, currentSlug: 'hello' });
    });
  });

  describe(`on ${pageActions.loadPageContentsSuccess.type}`, () => {
    it('should set page contents and current slug', () => {
      const pageContents: PageContents = {
        title: '',
        divisions: []
      };
      const action = pageActions.loadPageContentsSuccess({ data: pageContents, slug: 'slug1' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        currentSlug: 'slug1',
        pageContentsBySlug: {
          slug1: pageContents,
        },
      });
    });
  });
});
