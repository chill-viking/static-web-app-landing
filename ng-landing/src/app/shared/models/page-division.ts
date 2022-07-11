import {
  DivisionContent,
} from './division-content';

export type DivisionType = 'div' | undefined;

export interface PageDivision {
  id?: string;
  type: DivisionType;
  class: string;
  content: DivisionContent[];
}
