export type DivisionContentType = 'paragraph' | undefined;

export interface DivisionContent {
  id?: string;
  type: DivisionContentType;
  class: string;
  content: string;
}
