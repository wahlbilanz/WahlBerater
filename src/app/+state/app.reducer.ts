import { createReducer } from '@ngrx/store';
import { State } from './app.models';


export const initialState: State = {

};

export const appReducer = createReducer(
  initialState,
);
