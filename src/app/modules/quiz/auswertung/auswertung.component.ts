import { Component, ViewChild, OnInit, Pipe, PipeTransform, SimpleChanges, OnChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import * as AppActions from '../../../+state/app.actions';
import { first } from 'rxjs/operators';
import { vote } from '../../../+state/app.actions';
import { PersonalData } from '../../../definitions/models/personal.data.model';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
// import {DecisionToWord, CandidateDecisionToWord} from '../../../definitions/functions/decision-mapping.function';
import { ResultUrl } from '../../../+state/app.models';
import { CandidateResult, PartyResult, PartyScoreResult, prepareResults } from '../../../definitions/models/results.model';
import { Score } from '../../../definitions/models/score.model';
import { getCandidatePersonalInfo } from '../../../definitions/functions/getCandidatePersonalInfo';
import { claimScore } from '../../../definitions/functions/score.function';
import { Votes } from '../../../definitions/models/votes.mode';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss'],
})
export class AuswertungComponent implements OnInit, OnChanges {
  votes: Votes = undefined;
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  partyScoreResult: PartyScoreResult;
  maxValue = 0;
  maxParty = 0;
  showCandidates = false;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: ResultUrl }));
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
      this.personalData = d;
      this.recalc();
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
      this.politicalData = d;
      this.recalc();
    });
    this.store.pipe(select(AppSelectors.getVotes)).subscribe((votes) => {
      this.votes = votes;
      this.recalc();
    });
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
    if (this.personalData && this.politicalData) {
      this.partyScoreResult = prepareResults(this.politicalData, this.personalData, this.votes);
    }
  }
  toggleShowCandidates() {
    this.showCandidates = !this.showCandidates;
  }
}
