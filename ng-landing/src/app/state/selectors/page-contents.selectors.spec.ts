import { PageContents } from '@shared/models';
import * as reducer from '../page-contents.reducer';
import * as selectors from './page-contents.selectors';

describe('PageContents Selectors', () => {
  let basicState: { [reducer.pageContentsFeatureKey]: reducer.State };
  let slug1: PageContents;

  beforeEach(() => {
    slug1 = {
      title: 'hello world',
      divisions: [{
        class: 'class1',
        content: [],
        type: 'div',
        id: 'id1',
      }],
    };
    const state: reducer.State = {
      ...reducer.initialState,
      currentSlug: 'slug1',
      pageContentsBySlug: { slug1 },
    };

    basicState = { [reducer.pageContentsFeatureKey]: state };
  });

  const adjustCurrentSlug = (currentSlug: string): reducer.State => {
    return {
      ...basicState[reducer.pageContentsFeatureKey],
      currentSlug,
    };
  }

  describe('selecting current page contents', () => {
    it('should select the feature state', () => {
      const result = selectors.selectCurrentPageContents(basicState);
  
      expect(result).toEqual(slug1);
    });

    describe('when current slug is not available', () => {
      it('should return undefined', () => {
        const state = adjustCurrentSlug('slug2');

        const result = selectors.selectCurrentPageContents({ [reducer.pageContentsFeatureKey]: state });

        expect(result).toBeUndefined();
      });
    });

    describe('selecting current title', () => {
      it('should return current page contents title', () => {
        const result = selectors.selectCurrentTitle(basicState);

        expect(result).toEqual(slug1.title);
      });

      describe('when current slug is not available', () => {
        it('should return undefined', () => {
          const state = adjustCurrentSlug('slug2');

          const result = selectors.selectCurrentTitle({ [reducer.pageContentsFeatureKey]: state });

          expect(result).toBeUndefined();
        });
      });
    });
  });
});
