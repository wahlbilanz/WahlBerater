import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import { vote } from '../../../+state/app.actions';
import { IncludeCandidates, ResultUrl } from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { PartyScoreResult } from '../../../definitions/models/results.model';
import { Votes } from '../../../definitions/models/votes.mode';
import { Observable, Subject } from 'rxjs';
import { CategoryWithClaims } from '../../../definitions/models/category.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss'],
})
export class AuswertungComponent implements OnInit, OnDestroy {
  includeCandidates = IncludeCandidates;

  votes: Votes = undefined;
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  partyScoreResult: PartyScoreResult;
  maxValue = 0;
  maxParty = 0;
  showCandidates = false;
  sortedCategroies: Observable<CategoryWithClaims[]> = this.store.pipe(select(AppSelectors.getCategoriesWithClaims));

  public accessibilityModes = this.store.pipe(select(AppSelectors.getAllAccessibilityModes));
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppPartialState>) {
    this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: ResultUrl }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData), takeUntil(this.destroy$)).subscribe((d) => {
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData), takeUntil(this.destroy$)).subscribe((d) => {
      this.politicalData = d;
    });
    this.store.pipe(select(AppSelectors.getVotes), takeUntil(this.destroy$)).subscribe((votes) => {
      this.votes = votes;
    });
    this.store.pipe(select(AppSelectors.getPartyScoreResult), takeUntil(this.destroy$)).subscribe((r) => (this.partyScoreResult = r));
  }

  sampleVotes(): void {
    if (this.politicalData && this.politicalData.claims) {
      for (const claim in this.politicalData.claims) {
        if (this.politicalData.claims.hasOwnProperty(claim)) {
          this.store.dispatch(vote({ claimId: claim, decision: Math.floor(Math.random() * 3) - 1, fav: Math.random() < 0.3 }));
        }
      }
    }
  }

  toggleShowCandidates() {
    this.showCandidates = !this.showCandidates;
  }
}
