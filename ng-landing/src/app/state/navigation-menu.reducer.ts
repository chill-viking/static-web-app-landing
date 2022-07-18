import { createReducer, on } from '@ngrx/store';
import {
  NavigationElement,
} from '@shared/models';
import * as actions from './actions/navigation-menu.actions';

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
  on(actions.loadNavigationMenusSuccess, (state: State, { data }): State => {
    return {
      ...state,
      environment: data.currentEnvironment,
      menus: data.items,
    };
  })
);
