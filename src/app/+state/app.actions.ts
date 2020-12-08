import { createAction, props } from '@ngrx/store';
import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
import { Data } from '../definitions/models/data.model';

export const toggleMenu = createAction('[app] Toggle Menu', props<{ open?: boolean }>());
export const updateActiveBreakpoints = createAction(
  '[app] Update Active Break Points',
  props<{ activeBreakpoints: BreakpointBooleanMap }>(),
);

export const loadData = createAction('[app] Load Data JSON');
export const loadPoliticalDataSuccess = createAction('[app] Load Political Data JSON Success', props<{ data: Data; wasCached: boolean }>());
export const loadPoliticalDataError = createAction('[app] Load Political Data JSON Error', props<{ error: Error }>());
export const loadPersonalDataSuccess = createAction('[app] Load Personal Data JSON Success', props<{ data: Data; wasCached: boolean }>());
export const loadPersonalDataError = createAction('[app] Load Personal Data JSON Error', props<{ error: Error }>());

export const vote = createAction('[app] Vote', props<{ claimId: string; decision: number; fav: boolean }>());

export const changeDataStorePreference = createAction('[app] User changed data store preference', props<{ allow: boolean }>());
export const restoreDataStorePreference = createAction("[app] Restored user's data store preference", props<{ allow: boolean }>());
