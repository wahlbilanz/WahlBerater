import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AppPartialState } from '../../../+state/app.reducer';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import * as AppSelectors from '../../../+state/app.selectors';
import { Votes } from '../../../definitions/models/votes.mode';
import { vote } from '../../../+state/app.actions';
import { AccessibilityModes, AccessibleUrlFragment, ResultUrl } from '../../../+state/app.models';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-accessible-quiz',
  templateUrl: './accessible-quiz.component.html',
  styleUrls: ['./accessible-quiz.component.scss'],
})
export class AccessibleQuizComponent implements OnInit, AfterViewInit, OnDestroy {
  categoryData = this.store.pipe(select(AppSelectors.getCategoriesWithClaims));

  votes: Votes;
  ResultUrlPath = ResultUrl;
  private fragment?: string;
  public accessibilityModes?: AccessibilityModes;
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {
    this.store
      .pipe(select(AppSelectors.getAllAccessibilityModes), takeUntil(this.destroy$))
      .subscribe((am) => (this.accessibilityModes = am));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe((fragment) => {
      this.fragment = fragment;
    });
    this.store.pipe(select(AppSelectors.getVotes), takeUntil(this.destroy$)).subscribe((v) => {
      this.votes = v;
    });
  }

  ngAfterViewInit(): void {
    if (this.fragment) {
      try {
        if (this.accessibilityModes?.reducedMotionMode) {
          document.querySelector('#' + this.fragment)?.scrollIntoView();
        } else {
          setTimeout(() => {
            document.querySelector('#' + this.fragment)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }, 100);
        }
      } catch (e) {}
    }
  }

  fav(claimId: string): void {
    let fav = true;
    if (this.votes[claimId] && this.votes[claimId].fav) {
      fav = false;
    }
    this.store.dispatch(vote({ claimId, decision: this.votes[claimId] ? this.votes[claimId].decision : 0, fav }));
    this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: claimId }));
  }
  vote(claimId: string, direction: number): void {
    let decision = 0;
    switch (direction) {
      case 1:
        if (!this.votes[claimId] || this.votes[claimId].decision !== 1) {
          decision = 1;
        }
        break;
      case -1:
        if (!this.votes[claimId] || this.votes[claimId].decision !== -1) {
          decision = -1;
        }
        break;
    }
    this.store.dispatch(vote({ claimId, decision, fav: this.votes[claimId] ? this.votes[claimId].fav : false }));
    this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: claimId }));
  }
}
