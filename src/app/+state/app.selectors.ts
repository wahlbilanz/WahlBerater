import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './app.models';
import { STATE_FEATURE_KEY, AppPartialState } from './app.reducer';

const getAppState = createFeatureSelector<AppPartialState, State>(STATE_FEATURE_KEY);

export const isMenuOpen = createSelector(getAppState, (state: State) => state.menuOpen);
export const isBreakpointActive = createSelector(getAppState, (state: State, props) => !!state.activeBreakpoints[props.breakpoint]);
