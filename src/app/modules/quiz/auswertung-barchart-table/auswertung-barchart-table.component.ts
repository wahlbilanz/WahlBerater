import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { claimScore } from '../../../definitions/functions/score.function';
import { CategoryMap } from '../../../definitions/models/category.model';
import {
  CandidatePersonalInfo,
  CandidatePoliticalInfo,
  PersonalCandidateMap,
  PoliticalCandidateMap
} from '../../../definitions/models/candidate.model';
import { Claim, ClaimMap } from '../../../definitions/models/claim.model';
import { getCandidatePersonalInfo } from '../../../definitions/functions/getCandidatePersonalInfo';
import {Score} from '../../../definitions/models/score.model';
import {PoliticalData} from '../../../definitions/models/political.data.model';


interface CategoryResult {
  category: string;
  score: Score;
}
interface CandidateResult {
  personal: CandidatePersonalInfo;
  political: CandidatePoliticalInfo;
  id: string;
  scores: Record<string, CategoryResult>;
  score: Score;
}
interface PartyResult {
  party: string;
  candidates: CandidateResult[];
  scores: Record<string, CategoryResult>;
  score: Score;
}

@Component({
  selector: 'app-auswertung-barchart-table',
  templateUrl: './auswertung-barchart-table.component.html',
  styleUrls: ['./auswertung-barchart-table.component.scss'],
})
export class AuswertungBarchartTableComponent implements OnInit, OnChanges {
  @Input() votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() categories: CategoryMap;
  @Input() claims: ClaimMap;

  // table = [];
  // partyScores: Record<string, PartyResult>;
  partyScores: PartyResult[];
  maxValue = 0;
  maxParty = 0;

  constructor(private store: Store<AppPartialState>) {}

  /**
   * this is just a hack to get an array with increasing numbers [0..maxValue) in frontend...
   */
  maxValueArray(): number[] {
    return [...Array(this.maxValue).keys()];
  }

  recalc(): void {
    // this.table = [];
    this.maxValue = 0;
    this.maxParty = 0;
    const partyScores: Record<string, PartyResult> = {};
    if (this.politicalData.candidates && this.votes) {
      for (const c in this.politicalData.candidates) {
        if (this.politicalData.candidates.hasOwnProperty(c)) {
          let partyScore: PartyResult = partyScores[this.politicalData.candidates[c].party];
          if (!partyScore) {
            partyScore = {
              party: this.politicalData.candidates[c].party,
              candidates: [],
              scores: {},
              score: new Score()
            };
            partyScores[this.politicalData.candidates[c].party] = partyScore;
          }

          const candidate: CandidateResult = { personal: getCandidatePersonalInfo(this.personalCandidates, c), political: this.politicalData.candidates[c], id: c, scores: {}, score: new Score() };
          partyScore.candidates.push (candidate);

          // const score = new Score();
          for (const v in this.politicalData.candidates[c].positions) {
            if (this.politicalData.candidates[c].positions.hasOwnProperty(v)) {
              if (this.votes[v] && this.politicalData.candidates[c].positions[v]) {
                const cat = this.claims[v].category;
                if (!candidate.scores[cat]) {
                  candidate.scores[cat] = { category: cat, score: new Score() };
                }
                if (!partyScore.scores[cat]) {
                  partyScore.scores[cat] = { category: cat, score: new Score() };
                }

                const s = claimScore(this.politicalData.candidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav);
                candidate.scores[cat].score.add(s);
                partyScore.scores[cat].score.add(s);

                candidate.score.add(s);
                partyScore.score.add(s);
              }
            }
          }
          // candidate.score = score;
          if (this.maxValue < candidate.score.score) {
            this.maxValue = candidate.score.score;
          }
          // this.table.push(partyScore);
        }
      }
    }
    this.partyScores = Object.values(partyScores);
    this.partyScores.forEach((party: PartyResult) => {
      party.score.normalise(party.candidates.length);
      if (party.score.score > this.maxParty) {
        this.maxParty = party.score.score;
      }
      for (const s of Object.keys(party.scores)) {
        party.scores[s].score.normalise(party.candidates.length);
      }
    });
    this.partyScores.sort((a: PartyResult, b: PartyResult): number => {
      if (a.score.score === b.score.score) {
        return b.score.stars - a.score.stars;
      }
      return b.score.score - a.score.score;
    });
    console.log (this.partyScores);
    // this.table.sort((a, b) => (a.score < b.score ? 1 : -1));
    /*this.partyScores.sort((a:PartyResult, b:PartyResult): number => {
      if (a.score.score === b.score.score) {
        return a.score.stars - b.score.stars;
      }
      return a.score.score - b.score.score;
    })*/
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recalc();
  }

  ngOnInit(): void {
    this.recalc();
  }
}
