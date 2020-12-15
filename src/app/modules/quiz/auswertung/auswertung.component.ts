import { Component, ViewChild, OnInit, Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import * as AppActions from '../../../+state/app.actions';
import { first } from 'rxjs/operators';
import { vote } from '../../../+state/app.actions';
import {PersonalData} from '../../../definitions/models/personal.data.model';
import {PersonalCandidateMap} from '../../../definitions/models/candidate.model';
import {PoliticalData} from '../../../definitions/models/political.data.model';
// import {DecisionToWord, CandidateDecisionToWord} from '../../../definitions/functions/decision-mapping.function';
import {ResultUrl} from '../../../+state/app.models';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss'],
})
export class AuswertungComponent implements OnInit {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.updateLastQuizPage({lastPage: ResultUrl}));
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe(d => {
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe(d => {
      this.politicalData = d;
    });
  }

  sampleVotes(): void {
    if (this.politicalData && this.politicalData.claims) {
      for (const claim in this.politicalData.claims) {
        if (this.politicalData.claims.hasOwnProperty(claim)) {
          this.store.dispatch(vote({claimId: claim, decision: Math.floor(Math.random() * 3) - 1, fav: Math.random() < 0.3}));
        }
      }
    }
  }
}
