import { Injectable } from '@angular/core';
import { State } from './app.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { routerNavigatedAction } from '@ngrx/router-store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as AppActions from './app.actions';
import { DatenServiceService } from '../core/services/daten-service.service';
import { asyncScheduler, scheduled } from 'rxjs';

@Injectable()
export class AppEffects {
  closeMenuAfterNavigation = createEffect(() =>
    this.actions.pipe(
      ofType(routerNavigatedAction),
      map(() => AppActions.toggleMenu({ open: false })),
    ),
  );

  loadData = createEffect(
    () =>
      this.actions.pipe(
        ofType(AppActions.loadData),
        mergeMap(() =>
          this.dataService.getData().pipe(
            // TODO detect if offline and the try to deliver cached Variant?
            map((data) => AppActions.loadDataSuccess({ data, wasCached: false })),
            catchError((error) => scheduled([AppActions.loadDataError({ error })], asyncScheduler)),
          ),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  constructor(private actions: Actions, private store: Store<State>, private dataService: DatenServiceService) {}
}
