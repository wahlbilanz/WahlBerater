import { createAction, props } from '@ngrx/store';
import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { Data } from '../definitions/models/data.model';

export const toggleMenu = createAction('[app] Toggle Menu', props<{ open?: boolean }>());
export const updateActiveBreakpoints = createAction(
  '[app] Update Active Break Points',
  props<{ activeBreakpoints: BreakpointBooleanMap }>(),
);

export const loadData = createAction('[app] Load Data JSON');
export const loadDataSuccess = createAction('[app] Load Data JSON Success', props<{ data: Data; wasCached: boolean }>());
export const loadDataError = createAction('[app] Load Data JSON Error', props<{ error: Error }>());

export const vote = createAction('[app] Vote', props<{ claimId: string; decision: number; fav: boolean }>());
