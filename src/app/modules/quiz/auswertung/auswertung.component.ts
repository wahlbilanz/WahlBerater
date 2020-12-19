import {Component, ViewChild, OnInit, Pipe, PipeTransform, SimpleChanges, OnChanges} from '@angular/core';
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
import {CandidateResult, PartyResult, PartyScoreResult, prepareResults} from '../../../definitions/models/results.model';
import {Score} from '../../../definitions/models/score.model';
import {getCandidatePersonalInfo} from '../../../definitions/functions/getCandidatePersonalInfo';
import {claimScore} from '../../../definitions/functions/score.function';
import {Votes} from '../../../definitions/models/votes.mode';

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
      this.partyScoreResult = prepareResults (this.politicalData, this.personalData, this.votes);
      // // this.table = [];
      // this.maxValue = 0;
      // this.maxParty = 0;
      // const partyScores: Record<string, PartyResult> = prepareResults (this.politicalData, this.personalData, this.votes);
      // console.log (partyScores);
      // if (this.politicalData.candidates && this.votes) {
      //   for (const c in this.politicalData.candidates) {
      //     if (this.politicalData.candidates.hasOwnProperty(c)) {
      //       const partyScore: PartyResult = partyScores[this.politicalData.candidates[c].party];
      //       /*if (!partyScore) {
      //         partyScore = {
      //           party: this.politicalData.candidates[c].party,
      //           candidates: [],
      //           scores: {},
      //           score: new Score()
      //         };
      //         partyScores[this.politicalData.candidates[c].party] = partyScore;
      //       }*/
      //
      //       const candidate = partyScore.candidates[c];
      //         /*: CandidateResult = {
      //         personal: getCandidatePersonalInfo(this.personalData, c),
      //         political: this.politicalData.candidates[c],
      //         id: c,
      //         scores: {},
      //         score: new Score()
      //       };
      //       partyScore.candidates.push(candidate);*/
      //
      //       // const score = new Score();
      //       for (const v in this.politicalData.candidates[c].positions) {
      //         if (this.politicalData.candidates[c].positions.hasOwnProperty(v)) {
      //           if (this.votes[v] && this.politicalData.candidates[c].positions[v]) {
      //             const cat = this.politicalData.claims[v].category;
      //             console.log (cat);
      //             /*if (!candidate.scores[cat]) {
      //               candidate.scores[cat] = {category: cat, score: new Score(), claims: {}};
      //             }
      //             if (!partyScore.scores[cat]) {
      //               partyScore.scores[cat] = {category: cat, score: new Score(), claims: {}};
      //             }*/
      //
      //             const s = claimScore(this.politicalData.candidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav);
      //
      //             candidate.scores[cat].score.add(s);
      //             candidate.scores[cat].claims[v] = {claim: v, score: s};
      //
      //             partyScore.scores[cat].score.add(s);
      //             partyScore.scores[cat].claims[v] = {claim: v, score: s};
      //
      //             candidate.score.add(s);
      //             partyScore.score.add(s);
      //           }
      //         }
      //       }
      //       // candidate.score = score;
      //       if (this.maxValue < candidate.score.score) {
      //         this.maxValue = candidate.score.score;
      //       }
      //       // this.table.push(partyScore);
      //     }
      //   }
      // }
      // this.partyScores = Object.values(partyScores);
      // this.partyScores.forEach((party: PartyResult) => {
      //   const nCandidates = Object.keys(party.candidates).length;
      //   party.score.normalise(nCandidates);
      //   if (party.score.score > this.maxParty) {
      //     this.maxParty = party.score.score;
      //   }
      //   for (const cat of Object.keys(party.scores)) {
      //     party.scores[cat].score.normalise(nCandidates);
      //     for (const claim of Object.keys(party.scores[cat].claims)){
      //       party.scores[cat].claims[claim].score.normalise(nCandidates);
      //     }
      //   }
      // });
      // this.partyScores.sort((a: PartyResult, b: PartyResult): number => {
      //   if (a.score.score === b.score.score) {
      //     return b.score.stars - a.score.stars;
      //   }
      //   return b.score.score - a.score.score;
      // });
      // console.log(this.partyScores);
      // // this.table.sort((a, b) => (a.score < b.score ? 1 : -1));
      // /*this.partyScores.sort((a:PartyResult, b:PartyResult): number => {
      //   if (a.score.score === b.score.score) {
      //     return a.score.stars - b.score.stars;
      //   }
      //   return a.score.score - b.score.score;
      // })*/
    }
  }
  toggleShowCandidates(){
    this.showCandidates = !this.showCandidates;
  }
}
