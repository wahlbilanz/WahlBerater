import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import { vote } from '../../../+state/app.actions';
import { ResultUrl } from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { PartyScoreResult, prepareResults } from '../../../definitions/models/results.model';
import { Votes } from '../../../definitions/models/votes.mode';
import { Observable, Subscription } from 'rxjs';
import { CategoryWithClaims } from '../../../definitions/models/category.model';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss'],
})
export class AuswertungComponent implements OnInit, OnChanges, OnDestroy {
  votes: Votes = undefined;
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  partyScoreResult: PartyScoreResult;
  maxValue = 0;
  maxParty = 0;
  showCandidates = false;
  sortedCategroies: Observable<CategoryWithClaims[]> = this.store.pipe(select(AppSelectors.getCategoriesWithClaims));

  public accessibilityModes = this.store.pipe(select(AppSelectors.getAllAccessibilityModes));
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppPartialState>) {
    this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: ResultUrl }));
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
        this.personalData = d;
        this.recalc();
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
        this.politicalData = d;
        this.recalc();
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getVotes)).subscribe((votes) => {
        this.votes = votes;
        this.recalc();
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recalc();
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

  recalc(): void {
    if (this.personalData && this.politicalData && this.votes) {
      this.partyScoreResult = prepareResults(this.politicalData, this.personalData, this.votes);
    }
  }
  toggleShowCandidates() {
    this.showCandidates = !this.showCandidates;
  }
}
