import {
  ActionReducer, ActionReducerMap, MetaReducer,
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

export function logReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('%c New action to be emitted', 'background: #222; color: #bada55', { state, action });

    const newState = reducer(state, action);

    console.log('%c New action emitted', 'background: #222; color: #bada55', { state: newState });

    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logReducer] : [];
