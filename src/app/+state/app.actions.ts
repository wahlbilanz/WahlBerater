import { createAction, props } from '@ngrx/store';

export const toggleMenu = createAction('[app] Toggle Menu', props<{ open?: boolean }>());
