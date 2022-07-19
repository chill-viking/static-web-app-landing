import { createAction, props } from '@ngrx/store';
import { PageContents } from '@shared/models';

export const loadPageContents = createAction(
  '[PageContents] Load PageContents',
);

export const pageContentsAlreadyLoaded = createAction(
  '[PageContents] Load PageContents',
  props<{ slug: string }>(),
);

export const loadPageContentsSuccess = createAction(
  '[PageContents] Load PageContents Success',
  props<{ data: PageContents, slug: string }>(),
);
