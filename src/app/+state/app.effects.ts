import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction, routerRequestAction } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, EMPTY, merge, scheduled } from 'rxjs';
import { catchError, map, mergeMap, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { DataPersistanceService } from '../core/services/data-persistance.service';
import { DataService } from '../core/services/data.service';
import { AccessibilityModeSettings } from '../definitions/interfaces/accessibility-mode-settings.interface';
import * as AppActions from './app.actions';
import { State } from './app.models';
import { AppPartialState } from './app.reducer';
import * as AppSelectors from './app.selectors';

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

  // pushes the user consent for local storage into the state
  restoreLocalStorageOptIn = createEffect(() =>
    scheduled([AppActions.restoreDataStorePreference({ allow: this.dataPersistanceService.getUserOptInStatus() })], asyncScheduler),
  );

  // pushes the flag, wether the browser supports local Storage or not, into the state
  flagBrowserLocalStorageSupport = createEffect(() =>
    scheduled([AppActions.updateLocalStorageSupport({ isSupported: this.dataPersistanceService.getBrowserSupport() })], asyncScheduler),
  );

  persistAccessibilityModeChoice = createEffect(
    () =>
      this.actions.pipe(
        ofType(AppActions.toggleReducedMotionMode, AppActions.toggleAccessibilityMode),
        withLatestFrom(
          this.store.pipe(select(AppSelectors.getAllAccessibilityModes), startWith([null])),
          this.store.pipe(select(AppSelectors.isLocalDataStorageAllowed)),
        ),
        map(([{}, modes, localStorageAllowed]: [any, AccessibilityModeSettings, boolean]) => {
          if (!localStorageAllowed) {
            // do nothing when storage is disabled
            return;
          }

          // effects run after reducers, so the state is already patched
          this.dataPersistanceService.updateAccessibilityMode(modes);
        }),
      ),
    { dispatch: false },
  );

  restoreAccessibilityModeChoice = createEffect(() =>
    scheduled([true], asyncScheduler).pipe(
      map(() => {
        const restored = this.dataPersistanceService.getUserAccessibilityModeChoice();
        // when user has not made a choice yet try to read browser flag
        if (restored.reducedMotionMode == null && !!window.matchMedia) {
          // browser supports JavaScript media queries, now check for reduced motion system preference
          const mediaQueryReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
          if (!!mediaQueryReduceMotion && mediaQueryReduceMotion.matches) {
            restored.reducedMotionMode = true;
          }
        }

        return AppActions.restoreAccessibilityModeChoices(restored);
      }),
    ),
  );

  constructor(
    private actions: Actions,
    private store: Store<AppPartialState>,
    private dataService: DataService,
    private dataPersistanceService: DataPersistanceService,
    private viewportScroller: ViewportScroller,
  ) {}
}
