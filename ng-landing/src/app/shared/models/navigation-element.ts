export interface NavigationElement {
  id: string;
  type: 'routerLink' | 'externalLink' | 'popoutLink';
  route: string;
  title: string;
}
