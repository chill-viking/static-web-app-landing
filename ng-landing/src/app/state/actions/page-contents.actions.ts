import { createAction, props } from '@ngrx/store';
import { PageContents } from '@shared/models';

export const loadPageContents = createAction(
  '[PageContents] Load PageContents',
  props<{ slug: string }>(),
);

export const pageContentsAlreadyLoaded = createAction(
  '[PageContents] PageContents found in cache',
  props<{ slug: string }>(),
);

export const loadPageContentsSuccess = createAction(
  '[PageContents] Load PageContents Success',
  props<{ data: PageContents, slug: string }>(),
);

export const loadPageContentsFailed = createAction(
  '[PageContents] Load PageContents Success',
  props<{ error: Error, slug: string }>(),
);
