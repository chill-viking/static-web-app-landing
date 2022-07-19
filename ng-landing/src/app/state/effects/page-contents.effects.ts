import { Injectable } from '@angular/core';
import {
  Actions, createEffect,
} from '@ngrx/effects';

@Injectable()
export class PageContentsEffects {
  load$ = createEffect(() => {
    return this.actions$.pipe();
  });

  constructor(private actions$: Actions) {}
}
