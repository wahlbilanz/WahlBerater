import { Injectable } from '@angular/core';
import { State } from './app.models';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {

  constructor(
    private actions: Actions,
    private store: Store<State>,
  ) {}
}
