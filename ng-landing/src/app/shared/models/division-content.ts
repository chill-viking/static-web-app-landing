export type DivisionContentType = 'paragraph';

export interface DivisionContent {
  id?: string;
  type: DivisionContentType;
  class: string;
  content: string;
}
