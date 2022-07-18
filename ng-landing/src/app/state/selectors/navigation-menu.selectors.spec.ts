import * as reducer from '../navigation-menu.reducer';
import * as selectors from './navigation-menu.selectors';

describe('NavigationMenu Selectors', () => {
  it('should select the feature state', () => {
    const state = {
      [reducer.navigationMenuFeatureKey]: {
        ...reducer.initialState,
        menus: [
          {
            id: 'x',
            title: 'title',
            route: 'route',
            type: 'routerLink',
          },
        ],
      },
    };

    const result = selectors.selectNavigationMenus(state);

    expect(result).toEqual([
      {
        id: 'x',
        title: 'title',
        route: 'route',
        type: 'routerLink',
      },
    ]);
  });
});
