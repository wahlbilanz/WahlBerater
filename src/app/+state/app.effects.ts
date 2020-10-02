import { Injectable } from '@angular/core';
import { State } from './app.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { routerNavigatedAction } from '@ngrx/router-store';
import { mergeMap, map } from 'rxjs/operators';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  closeMenuAfterNavigation = createEffect(() =>
    this.actions.pipe(
      ofType(routerNavigatedAction),
      map(() => AppActions.toggleMenu({ open: false })),
    ),
  );

  constructor(private actions: Actions, private store: Store<State>) {}
}
