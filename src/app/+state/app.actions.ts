import { createAction, props } from '@ngrx/store';

export const testAction = createAction('[app] Test Action', props<{ test: boolean }>());
