import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuizState, State } from './app.models';
import { STATE_FEATURE_KEY, AppPartialState } from './app.reducer';

const getAppState = createFeatureSelector<AppPartialState, State>(STATE_FEATURE_KEY);

export const isMenuOpen = createSelector(getAppState, (state: State) => state.menuOpen);
export const isBreakpointActive = createSelector(getAppState, (state: State, props) => !!state.activeBreakpoints[props.breakpoint]);

export const getData = createSelector(getAppState, (state: State) =>
  state.politicalDataLoaded ? state.politicalData : state.politicalData,
);
export const isDataLoaded = createSelector(getAppState, (state: State) => state.politicalDataLoaded && state.personalDataLoaded);

export const getVotes = createSelector(getAppState, (state: State) => state.votes);

export const isLocalDataStorageAllowed = createSelector(getAppState, (state: State) => state.allowLocalDataStorage);
export const getQuizState = createSelector(getAppState, (state: State) => QuizState.STARTED);
