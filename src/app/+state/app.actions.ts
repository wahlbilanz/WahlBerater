import { createAction, props } from '@ngrx/store';
import { BreakpointBooleanMap } from 'ng-zorro-antd/core/services';

export const toggleMenu = createAction('[app] Toggle Menu', props<{ open?: boolean }>());
export const updateActiveBreakpoints = createAction(
  '[app] Update Active Break Points',
  props<{ activeBreakpoints: BreakpointBooleanMap }>(),
);
