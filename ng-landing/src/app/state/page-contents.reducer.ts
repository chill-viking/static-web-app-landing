import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { PageContents } from '@shared/models';
import * as actions from './actions/page-contents.actions';

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
  on(actions.loadPageContents, (state: State): State => {
    return { ...state, currentSlug: '' };
  }),
  on(actions.pageContentsAlreadyLoaded, (state: State, { slug }): State => {
    return {
      ...state,
      currentSlug: slug,
    };
  }),
  on(actions.loadPageContentsSuccess, (state: State, { data, slug }): State => {
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
