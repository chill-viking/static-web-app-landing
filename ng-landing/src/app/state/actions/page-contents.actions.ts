import { createAction, props } from '@ngrx/store';
import { PageContents } from '@shared/models';

export const loadPageContents = createAction(
  '[PageContents] Load PageContentss',
  props<{ slug: string }>(),
);

export const loadPageContentsSuccess = createAction(
  '[PageContents] Load PageContentss Success',
  props<{ data: PageContents, slug: string }>(),
);
