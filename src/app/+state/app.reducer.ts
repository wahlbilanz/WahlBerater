import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { QuizFirstPage, State } from './app.models';

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
  usedCachedPoliticalData: false,
  usedCachedPersonalData: false,
  votes: {},
  allowLocalDataStorage: null,
  quizLastPage: QuizFirstPage,
  accessibilityMode: null,
  reducedMotionMode: null,
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
    usedCachedPoliticalData: state.usedCachedPoliticalData || wasCached,
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
    usedCachedPersonalData: state.usedCachedPersonalData || wasCached,
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

  on(AppActions.updateLastQuizPage, (state: State, { lastPage }) => ({
    ...state,
    quizLastPage: lastPage ? lastPage : QuizFirstPage,
  })),

  // Accessibility and Reduced Motion Modes
  on(AppActions.toggleAccessibilityMode, (state: State, { active }) => ({
    ...state,
    accessibilityMode: !!active,
  })),
  on(AppActions.toggleReducedMotionMode, (state: State, { active }) => ({
    ...state,
    reducedMotionMode: !!active,
  })),
  on(AppActions.restoreAccessibilityModeChoices, (state: State, { reducedMotionMode, accessibilityMode }) => ({
    ...state,
    // only restore state, but do not override user choice
    accessibilityMode: state.accessibilityMode == null ? accessibilityMode : state.accessibilityMode,
    reducedMotionMode: state.reducedMotionMode == null ? reducedMotionMode : state.reducedMotionMode,
  })),
);
