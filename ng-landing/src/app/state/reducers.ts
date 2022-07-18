import {
  ActionReducerMap, MetaReducer,
} from '@ngrx/store';
import {
  environment,
} from '../../environments/environment';
import * as fromNavigationMenu from './navigation-menu.reducer';
import * as fromPageContents from './page-contents.reducer';

export interface State {
  [fromPageContents.pageContentsFeatureKey]: fromPageContents.State;
  [fromNavigationMenu.navigationMenuFeatureKey]: fromNavigationMenu.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromPageContents.pageContentsFeatureKey]: fromPageContents.reducer,
  [fromNavigationMenu.navigationMenuFeatureKey]: fromNavigationMenu.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
