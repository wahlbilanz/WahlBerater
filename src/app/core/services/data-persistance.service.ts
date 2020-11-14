import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppPartialState } from '../../+state/app.reducer';

const STORE_PREFIX = 'walberater_';
export const OPTIN_STORE_KEY = `${STORE_PREFIX}user_storage_optin`;
export const QUIZ_ANSWER_STORE_KEY = `${STORE_PREFIX}quiz_answers`;

@Injectable({
  providedIn: 'root',
})
export class DataPersistanceService {
  constructor(private store: Store<AppPartialState>) {}

  public getUserOptInStatus(): boolean {
    return localStorage.getItem(OPTIN_STORE_KEY) === 'true' ? true : false;
  }

  public updateUserOptIn(allow: boolean): void {
    if (allow) {
      localStorage.setItem(OPTIN_STORE_KEY, 'true');
    } else {
      localStorage.removeItem(OPTIN_STORE_KEY);
      localStorage.removeItem(QUIZ_ANSWER_STORE_KEY);
    }
  }

  // TODO provide methods to store stuff in `QUIZ_ANSWER_STORE_KEY`
}
