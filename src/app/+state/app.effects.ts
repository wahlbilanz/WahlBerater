import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction, routerRequestAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { asyncScheduler, merge, scheduled } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DataPersistanceService } from '../core/services/data-persistance.service';
import { DataService } from '../core/services/data.service';
import * as AppActions from './app.actions';
import { State } from './app.models';

@Injectable()
export class AppEffects {
  closeMenuAfterNavigation = createEffect(() =>
    this.actions.pipe(
      ofType(routerNavigatedAction),
      map(() => AppActions.toggleMenu({ open: false })),
    ),
  );

  private readonly scrollLevelStore: { [navigationId: number]: [number, number] } = {};
  private lastScrollId = 0;
  private restoredScrollId: number;
  restoreScrollStateAfterNavigation = createEffect(
    () =>
      this.actions.pipe(
        ofType(routerNavigatedAction, routerRequestAction),
        tap(({ type, payload }) => {
          if (type === '@ngrx/router-store/request') {
            // store scroll position before navigating off
            this.scrollLevelStore[this.lastScrollId] = this.viewportScroller.getScrollPosition();
            this.lastScrollId = payload.event.id;
            // when routing state is restored (cf. RouteReuseStrategy), the scroll state is restored
            this.restoredScrollId = (payload.event as NavigationStart).restoredState
              ? (payload.event as NavigationStart).restoredState.navigationId
              : undefined;
          } else if (type === '@ngrx/router-store/navigated') {
            // scroll either to the saved scroll state, or the to top of the page
            this.viewportScroller.scrollToPosition(
              this.restoredScrollId != null ? this.scrollLevelStore[this.restoredScrollId] || [0, 0] : [0, 0],
            );
          }
        }),
      ),
    { dispatch: false },
  );

  loadData = createEffect(
    () =>
      this.actions.pipe(
        ofType(AppActions.loadData),
        mergeMap(() =>
          merge(
            this.dataService.getPoliticalData().pipe(
              // TODO detect if offline and then try to deliver cached Variant?
              // TODO we should create a ticket for that..?
              map((data) => AppActions.loadPoliticalDataSuccess({ data, wasCached: false })),
              catchError((error) => scheduled([AppActions.loadPoliticalDataError({ error })], asyncScheduler)),
            ),
            this.dataService.getPersonalData().pipe(
              // TODO detect if offline and then try to deliver cached Variant?
              // TODO we should create a ticket for that..?
              map((data) => AppActions.loadPersonalDataSuccess({ data, wasCached: false })),
              catchError((error) => scheduled([AppActions.loadPersonalDataError({ error })], asyncScheduler)),
            ),
          ),
        ),
      ),
    { useEffectsErrorHandler: true },
  );

  persistLocalStorageOptIn = createEffect(
    () =>
      this.actions.pipe(
        ofType(AppActions.changeDataStorePreference),
        map(({ allow }) => this.dataPersistanceService.updateUserOptIn(allow)),
      ),
    { dispatch: false },
  );

  restoreLocalStorageOptIn = createEffect(() =>
    scheduled([AppActions.restoreDataStorePreference({ allow: this.dataPersistanceService.getUserOptInStatus() })], asyncScheduler),
  );

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private dataService: DataService,
    private dataPersistanceService: DataPersistanceService,
    private viewportScroller: ViewportScroller,
  ) {}
}
