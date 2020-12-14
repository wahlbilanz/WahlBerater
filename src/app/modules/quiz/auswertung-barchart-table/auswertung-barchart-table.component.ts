import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { claimScore } from '../../../definitions/functions/score.function';
import { CandidatePoliticalInfoMap } from '../../../definitions/models/candidate.model';
import { CategoryMap } from '../../../definitions/models/category.model';
import { PoliticalCandidateMap } from '../../../definitions/models/candidate.model';
import { Claim, ClaimMap } from '../../../definitions/models/claim.model';

@Component({
  selector: 'app-auswertung-barchart-table',
  templateUrl: './auswertung-barchart-table.component.html',
  styleUrls: ['./auswertung-barchart-table.component.scss'],
})
export class AuswertungBarchartTableComponent implements OnInit {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  data = this.store.pipe(select(AppSelectors.getPoliticalData));

  decisions = {};
  candidates: PoliticalCandidateMap;
  categories: CategoryMap;
  claims: ClaimMap;

  table = [];
  maxValue = 0;

  constructor(private store: Store<AppPartialState>) {}

  getCategory(claim: string): string {
    for (const category in this.categories) {
      const claimIds = Object.getOwnPropertyNames(this.claims).filter((claimId) => this.claims[claimId].category === category);

      if (this.categories.hasOwnProperty(category) && claimIds.includes(claim)) {
        return category;
      }
    }
    return 'unknown';
  }

  maxValueArray(): number[] {
    return [...Array(this.maxValue).keys()];
  }

  recalc(): void {
    /*this.table = [];
    this.maxValue = 0;
    if (this.candidates && this.decisions) {
      // const scoreArray = [];

      for (const c in this.candidates) {
        if (this.candidates.hasOwnProperty(c)) {
          console.log(c);
          const candidate = { name: c, id: c, scores: {}, score: 0 };
          let scoresum = 0;
          // let score = 0;
          for (const v in this.candidates[c].positions) {
            if (this.candidates[c].positions.hasOwnProperty(v)) {
              if (this.decisions[v]) {
                console.log(c, v);
                const cat = this.getCategory(v);
                if (!candidate.scores[cat]) {
                  candidate.scores[cat] = { title: this.categories[cat].title, color: this.categories[cat].color, score: 0 };
                }
                const s = claimScore(this.candidates[c].positions[v].vote, this.decisions[v].decision, this.decisions[v].fav);
                candidate.scores[cat].score += s;
                scoresum += s;
              }
            }
          }
          candidate.score = scoresum;
          if (this.maxValue < scoresum) {
            this.maxValue = scoresum;
          }
          this.table.push(candidate);
        }
      }
    }
    this.table.sort((a, b) => (a.score < b.score ? 1 : -1));
    console.log(this.table);*/
  }

  ngOnInit(): void {
    this.data.subscribe((d) => {
      this.candidates = d.candidates;
      this.categories = d.categories;
      this.claims = d.claims;
      this.recalc();
    });
    this.votes.subscribe((v) => {
      this.decisions = v;
      this.recalc();
    });
  }
}
