import { createAction, props } from '@ngrx/store';
import { NavigationMenu } from '@shared/models';

export const loadNavigationMenus = createAction(
  '[NavigationMenu] Load NavigationMenus',
);

export const loadNavigationMenusSuccess = createAction(
  '[NavigationMenu] Load NavigationMenus Success',
  props<{ data: NavigationMenu }>(),
);
