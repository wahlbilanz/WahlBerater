import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { State } from './app.models';

export const STATE_FEATURE_KEY = 'app';

export interface AppPartialState {
  readonly [STATE_FEATURE_KEY]: State;
}

export const initialState: State = {
  menuOpen: false,
  activeBreakpoints: { xs: false, sm: false, md: false, lg: false, xl: false, xxl: false },
  data: null,
  dataLoaded: false,
  usedCachedData: false,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.toggleMenu, (state: State, { open }) => ({
    ...state,
    menuOpen: open != null ? open : !state.menuOpen,
  })),
  on(AppActions.updateActiveBreakpoints, (state: State, { activeBreakpoints }) => ({
    ...state,
    activeBreakpoints,
  })),

  on(AppActions.loadDataSuccess, (state: State, { data, wasCached }) => ({
    ...state,
    data,
    dataLoaded: true,
    usedCachedData: wasCached,
  })),
  on(AppActions.loadDataError, (state: State) => ({
    ...state,
    data: null,
    dataLoaded: false,
    usedCachedData: false,
  })),
);
