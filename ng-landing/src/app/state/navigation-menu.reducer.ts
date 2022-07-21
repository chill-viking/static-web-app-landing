import { createReducer, on } from '@ngrx/store';
import { NavigationMenu } from '@shared/models';
import { navActions } from './actions';

export const navigationMenuFeatureKey = 'navigationMenu';

export interface State {
  menu: NavigationMenu | undefined;
  environment: string;
  loaded: boolean;
}

export const initialState: State = {
  menu: undefined,
  environment: '',
  loaded: false,
};

export const reducer = createReducer(
  initialState,
  on(navActions.loadNavigationMenusSuccess, (state: State, { data }): State => {
    return {
      ...state,
      environment: data.currentEnvironment,
      menu: data,
    };
  })
);
