import { createReducer, on } from '@ngrx/store';
import { PageContents } from '@shared/models';
import { pageActions } from './actions';

export const pageContentsFeatureKey = 'pageContents';

export interface State {
  currentSlug: string;
  pageContentsBySlug: { [slug: string]: PageContents };
}

export const initialState: State = {
  currentSlug: '',
  pageContentsBySlug: {}
};

export const reducer = createReducer(
  initialState,
  on(pageActions.loadPageContents, (state: State): State => {
    return {
      ...state,
      currentSlug: '',
    };
  }),
  on(pageActions.pageContentsAlreadyLoaded, (state: State, { slug }): State => {
    return {
      ...state,
      currentSlug: slug,
    };
  }),
  on(pageActions.loadPageContentsSuccess, (state: State, { data, slug }): State => {
    return {
      ...state,
      currentSlug: slug,
      pageContentsBySlug: {
        ...state.pageContentsBySlug,
        [slug]: data,
      },
    };
  }),
);
