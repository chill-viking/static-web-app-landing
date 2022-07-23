import * as reducer from '../navigation-menu.reducer';
import * as selectors from './navigation-menu.selectors';

describe('NavigationMenu Selectors', () => {
  it('should select the feature state', () => {
    const state = {
      [reducer.navigationMenuFeatureKey]: {
        ...reducer.initialState,
        menu: {
          items: [{
            id: 'x',
            title: 'title',
            route: 'route',
            type: 'routerLink',
          }],
          currentEnvironment: 'hello',
        },
      },
    };

    const result = selectors.selectNavigationMenu(state);

    expect(result).toEqual({
      items: [{
        id: 'x',
        title: 'title',
        route: 'route',
        type: 'routerLink',
      }],
      currentEnvironment: 'hello',
    });
  });
});
