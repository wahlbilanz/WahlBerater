import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AppActions from '../../../+state/app.actions';
import { QuizState, ResultUrl, QuizFirstPage } from '../../../+state/app.models';
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

  public localStorageSupported = this.store.pipe(select(AppSelectors.isLocalStorageSupported));
  public localStorageAllowed = this.store.pipe(select(AppSelectors.isLocalDataStorageAllowed));
  public accessibilityModes = this.store.pipe(select(AppSelectors.getAllAccessibilityModes));
  public data = this.store.pipe(select(AppSelectors.getPoliticalData));

  public ResultUrlPath = ResultUrl;
  public QuizFirstPagePath = QuizFirstPage;
  public lastQuizPage: string;

  constructor(private store: Store<AppPartialState>) {
    this.lastQuizPage = QuizFirstPage;
    this.store.pipe(select(AppSelectors.getLastQuizPage)).subscribe((p) => (this.lastQuizPage = p));
  }

  public updateLocalStorageOptIn(allow: boolean) {
    this.store.dispatch(AppActions.changeDataStorePreference({ allow }));
  }

  public updateAccessibilityMode(active: boolean) {
    this.store.dispatch(AppActions.toggleAccessibilityMode({ active }));
  }

  public updateReducedMotionMode(active: boolean) {
    this.store.dispatch(AppActions.toggleReducedMotionMode({ active }));
  }
}
