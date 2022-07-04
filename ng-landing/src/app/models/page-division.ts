import {
  DivisionContent,
} from './division-content';

export interface PageDivision {
  id?: string;
  type: 'div' | undefined;
  class: string;
  content: DivisionContent[];
}
