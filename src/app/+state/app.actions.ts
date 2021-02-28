import { createAction, props } from '@ngrx/store';
import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';
// import { Data } from '../definitions/models/data.model';
import { PoliticalData } from '../definitions/models/political.data.model';
import { PersonalData } from '../definitions/models/personal.data.model';
import { PersonalCandidateMap } from '../definitions/models/candidate.model';
import { Votes } from '../definitions/models/votes.mode';

export const toggleMenu = createAction('[app] Toggle Menu', props<{ open?: boolean }>());
export const updateActiveBreakpoints = createAction(
  '[app] Update Active Break Points',
  props<{ activeBreakpoints: BreakpointBooleanMap }>(),
);

export const loadData = createAction('[app] Load Data JSON');
export const loadPoliticalDataSuccess = createAction(
  '[app] Load Political Data JSON Success',
  props<{ data: PoliticalData; wasCached: boolean }>(),
);
export const loadPoliticalDataError = createAction('[app] Load Political Data JSON Error', props<{ error: Error }>());
export const loadPersonalDataSuccess = createAction(
  '[app] Load Personal Data JSON Success',
  props<{ data: PersonalCandidateMap; wasCached: boolean }>(),
);
export const loadPersonalDataError = createAction('[app] Load Personal Data JSON Error', props<{ error: Error }>());

export const vote = createAction('[app] Vote', props<{ claimId: string; decision: number; fav: boolean }>());

export const updateLocalStorageSupport = createAction('[app] Set support flag of local storage', props<{ isSupported: boolean }>());
export const changeDataStorePreference = createAction('[app] User changed data store preference', props<{ allow: boolean }>());
export const restoreDataStorePreference = createAction("[app] Restored user's data store preference", props<{ allow: boolean }>());

export const updateLastQuizPage = createAction('[app] updating last quiz page', props<{ lastPage?: string }>());

export const saveVotes = createAction('[app] User saved votes', props<{ votes: Votes }>());
export const restoreVotes = createAction('[app] Restored saved votes');
export const restoreVotesSuccess = createAction('[app] Successfully restored saved votes', props<{ votes: Votes }>());

// Accessibility Modes
export const restoreAccessibilityModeChoices = createAction(
  '[app] Restore accessibility mode choices',
  props<{ reducedMotionMode: boolean; accessibilityMode: boolean }>(),
);
export const toggleAccessibilityMode = createAction('[app] Toggle accessibility mode', props<{ active: boolean }>());
export const toggleReducedMotionMode = createAction('[app] Toggle reduced motion mode', props<{ active: boolean }>());
