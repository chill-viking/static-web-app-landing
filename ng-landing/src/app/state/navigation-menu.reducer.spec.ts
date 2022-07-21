import { NavigationMenu } from '@shared/models';
import { navActions } from './actions';
import {
  initialState, reducer, State,
} from './navigation-menu.reducer';

describe('NavigationMenu Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`on ${navActions.loadNavigationMenus.type}`, () => {
    it('should return current state', () => {
      const action = navActions.loadNavigationMenus();

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe(`on ${navActions.loadNavigationMenusSuccess.type}`, () => {
    it('should populate state', () => {
      const data: NavigationMenu = {
        items: [
          {
            id: 'x',
            route: 'route1',
            title: 'title1',
            type: 'routerLink',
          },
          {
            id: 'x',
            route: 'route2',
            title: 'title2',
            type: 'externalLink',
          }
        ],
        currentEnvironment: 'test',
      };
      const action = navActions.loadNavigationMenusSuccess({ data });

      const result = reducer(initialState, action);

      const expectedState: State = {
        ...initialState,
        environment: 'test',
        menu: data,
      };
      expect(result).toEqual(expectedState);
    });
  });
});
