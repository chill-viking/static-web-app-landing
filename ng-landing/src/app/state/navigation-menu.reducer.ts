import { createReducer, on } from '@ngrx/store';
import {
  NavigationElement,
} from '@shared/models';
import { navActions } from './actions';

export const navigationMenuFeatureKey = 'navigationMenu';

export interface State {
  menus: Array<NavigationElement>;
  environment: string;
  loaded: boolean;
}

export const initialState: State = {
  menus: [],
  environment: '',
  loaded: false,
};

export const reducer = createReducer(
  initialState,
  on(navActions.loadNavigationMenusSuccess, (state: State, { data }): State => {
    return {
      ...state,
      environment: data.currentEnvironment,
      menus: data.items,
    };
  })
);
