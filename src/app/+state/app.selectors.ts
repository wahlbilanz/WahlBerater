import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './app.models';
import { STATE_FEATURE_KEY, AppPartialState } from './app.reducer';

const getAppState = createFeatureSelector<AppPartialState, State>(STATE_FEATURE_KEY);

export const isMenuOpen = createSelector(getAppState, (state: State) => state.menuOpen);
export const isBreakpointActive = createSelector(getAppState, (state: State, props) => !!state.activeBreakpoints[props.breakpoint]);

export const getData = createSelector(getAppState, (state: State) => (state.dataLoaded ? state.data : state.data));
export const isDataLoaded = createSelector(getAppState, (state: State) => state.dataLoaded);
