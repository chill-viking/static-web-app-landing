import {
  NavigationElement,
} from './navigation-element';

export interface NavigationMenu {
  items: NavigationElement[];
  currentEnvironment: string;
}
