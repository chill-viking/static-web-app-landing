import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import { PageContents } from '@shared/models';
import {
  pageContentsFeatureKey, State,
} from '../page-contents.reducer';

const selectPageContentsState = createFeatureSelector<State>(pageContentsFeatureKey);

export const selectCurrentPageContents = createSelector(
  selectPageContentsState,
  (s: State) => s.pageContentsBySlug[s.currentSlug],
);

export const selectLoadedPageSlugs = createSelector(
  selectPageContentsState,
  (s: State): ReadonlyArray<string> => Object.keys(s.pageContentsBySlug),
);

export const selectCurrentTitle = createSelector(
  selectPageContentsState,
  selectCurrentPageContents,
  (_, pageContents?: PageContents) => pageContents?.title ?? 'ChillViking | Loading...',
);
