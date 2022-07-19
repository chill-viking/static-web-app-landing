import { PageContents } from '@shared/models';
import * as actions from './actions/page-contents.actions';
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

  describe(`on ${actions.loadPageContents.type}`, () => {
    it('should clear current slug', () => {
      const action = actions.loadPageContents();

      const result = reducer({ ...initialState, currentSlug: 'hello' }, action);

      expect(result).toBe({ ...initialState, currentSlug: '' });
    });
  });

  describe(`on ${actions.pageContentsAlreadyLoaded.type}`, () => {
    it('should set current slug', () => {
      const action = actions.pageContentsAlreadyLoaded({ slug: 'hello' });

      const result = reducer(initialState, action);

      expect(result).toEqual({ ...initialState, currentSlug: 'hello' });
    });
  });

  describe(`on ${actions.loadPageContentsSuccess.type}`, () => {
    it('should set page contents and current slug', () => {
      const pageContents: PageContents = {
        title: '',
        divisions: []
      };
      const action = actions.loadPageContentsSuccess({ data: pageContents, slug: 'slug1' });

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
