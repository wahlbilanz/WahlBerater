import { Component, OnChanges, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AppActions from '../../../+state/app.actions';
import { QuizState, ResultUrl, QuizFirstPage, AccessibleUrl, AccessibilityModes, AccessibleUrlFragment } from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { Subscription } from 'rxjs';
import { saveVotes, vote } from '../../../+state/app.actions';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnDestroy {
  public QuizStateEnum = QuizState;
  public quizState = this.store.pipe(select(AppSelectors.getQuizState));

  public localStorageSupported = this.store.pipe(select(AppSelectors.isLocalStorageSupported));
  public localStorageAllowed = this.store.pipe(select(AppSelectors.isLocalDataStorageAllowed));
  public accessibilityModes?: AccessibilityModes;
  public data = this.store.pipe(select(AppSelectors.getPoliticalData));

  public ResultUrlPath = ResultUrl;
  public QuizFirstPagePath = QuizFirstPage;
  public AccessibleUrlPath = AccessibleUrl;
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  public lastQuizPage: string;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppPartialState>) {
    this.lastQuizPage = QuizFirstPage;
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getLastQuizPage)).subscribe((p) => {
        this.lastQuizPage = p;
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => {
        this.accessibilityModes = am;
      }),
    );
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  public updateLocalStorageOptIn(allow: boolean) {
    this.store.dispatch(AppActions.changeDataStorePreference({ allow }));
    this.store.dispatch(vote({ claimId: 'savetest', decision: 1, fav: true }));
  }

  public updateAccessibilityMode(active: boolean) {
    this.store.dispatch(AppActions.toggleAccessibilityMode({ active }));
  }

  public updateReducedMotionMode(active: boolean) {
    this.store.dispatch(AppActions.toggleReducedMotionMode({ active }));
  }
}
