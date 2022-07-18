import { PageContents } from '@shared/models';
import {
  loadPageContents, loadPageContentsSuccess,
} from './actions';
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

  describe(`on ${loadPageContents.type}`, () => {
    it('should set current slug', () => {
      const action = loadPageContents({ slug: 'new slug' });

      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        currentSlug: 'new slug',
      });
    });
  });

  describe(`on ${loadPageContentsSuccess.type}`, () => {
    it('should set page contents and current slug', () => {
      const pageContents: PageContents = {
        title: '',
        divisions: []
      };
      const action = loadPageContentsSuccess({ data: pageContents, slug: 'slug1' });

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
