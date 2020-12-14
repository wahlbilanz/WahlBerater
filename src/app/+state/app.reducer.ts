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
  politicalData: null,
  personalData: null,
  politicalDataLoaded: false,
  personalDataLoaded: false,
  usedCachedData: false,
  votes: {},
  allowLocalDataStorage: null,
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

  on(AppActions.loadPoliticalDataSuccess, (state: State, { data, wasCached }) => ({
    ...state,
    politicalData: data,
    politicalDataLoaded: true,
    usedCachedData: state.usedCachedData || wasCached,
  })),
  on(AppActions.loadPoliticalDataError, (state: State) => ({
    ...state,
    politicalData: null,
    politicalDataLoaded: false,
  })),
  on(AppActions.loadPersonalDataSuccess, (state: State, { data, wasCached }) => ({
    ...state,
    personalData: data,
    personalDataLoaded: true,
    usedCachedData: state.usedCachedData || wasCached,
  })),
  on(AppActions.loadPersonalDataError, (state: State) => ({
    ...state,
    personalData: null,
    personalDataLoaded: false,
  })),
  on(AppActions.vote, (state: State, { claimId, decision, fav }) => ({
    ...state,
    votes: {
      ...state.votes,
      [claimId]: {
        decision,
        fav,
      },
    },
  })),
  on(AppActions.changeDataStorePreference, (state, { allow }) => ({
    ...state,
    allowLocalDataStorage: allow,
  })),
  on(AppActions.restoreDataStorePreference, (state, { allow }) => ({
    ...state,
    allowLocalDataStorage: allow,
  })),
);
