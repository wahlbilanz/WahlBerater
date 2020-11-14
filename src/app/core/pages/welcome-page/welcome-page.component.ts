import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import { QuizState } from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public QuizStateEnum = QuizState;
  public quizState = this.store.pipe(select(AppSelectors.getQuizState));
  public localStorageAllowed = this.store.pipe(select(AppSelectors.isLocalDataStorageAllowed));
  public data = this.store.pipe(select(AppSelectors.getData));

  constructor(private store: Store<AppPartialState>) {}

  public updateLocalStorageOptIn(allow: boolean) {
    this.store.dispatch(AppActions.changeDataStorePreference({ allow }));
  }
}
