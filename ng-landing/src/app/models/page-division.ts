import {
  DivisionContent,
} from './division-content';

export interface PageDivision {
  id?: string;
  class: string;
  content: DivisionContent[];
}
