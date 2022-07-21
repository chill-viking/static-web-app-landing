import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import {
  navigationMenuFeatureKey, State,
} from '../navigation-menu.reducer';

const selectNavigationMenuState = createFeatureSelector<State>(navigationMenuFeatureKey);

export const selectNavigationMenu = createSelector(
  selectNavigationMenuState,
  (s: State) => s.menu,
);
