import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
import * as AppActions from '../../../+state/app.actions';
import { QuizState, ResultUrl, QuizFirstPage, AccessibleUrl, AccessibilityModes, AccessibleUrlFragment } from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { Subject } from 'rxjs';
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
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppPartialState>) {
    this.lastQuizPage = QuizFirstPage;
    this.store.pipe(select(AppSelectors.getLastQuizPage), takeUntil(this.destroy$)).subscribe((p) => {
      this.lastQuizPage = p;
    });
    this.store.pipe(select(AppSelectors.getAllAccessibilityModes), takeUntil(this.destroy$)).subscribe((am) => {
      this.accessibilityModes = am;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
