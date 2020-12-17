import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { claimScore } from '../../../definitions/functions/score.function';
import { CategoryMap } from '../../../definitions/models/category.model';
import { PersonalCandidateMap, PoliticalCandidateMap } from '../../../definitions/models/candidate.model';
import { Claim, ClaimMap } from '../../../definitions/models/claim.model';
import { getCandidatePersonalInfo } from '../../../definitions/functions/getCandidatePersonalInfo';

@Component({
  selector: 'app-auswertung-barchart-table',
  templateUrl: './auswertung-barchart-table.component.html',
  styleUrls: ['./auswertung-barchart-table.component.scss'],
})
export class AuswertungBarchartTableComponent implements OnInit, OnChanges {
  @Input() votes;
  @Input() politicalCandidates: PoliticalCandidateMap;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() categories: CategoryMap;
  @Input() claims: ClaimMap;

  table = [];
  maxValue = 0;

  constructor(private store: Store<AppPartialState>) {}

  /**
   * this is just a hack to get an array with increasing numbers [0..maxValue) in frontend...
   */
  maxValueArray(): number[] {
    return [...Array(this.maxValue).keys()];
  }

  recalc(): void {
    this.table = [];
    this.maxValue = 0;
    if (this.politicalCandidates && this.votes) {
      for (const c in this.politicalCandidates) {
        if (this.politicalCandidates.hasOwnProperty(c)) {
          const candidate = { personal: getCandidatePersonalInfo(this.personalCandidates, c), id: c, scores: {}, score: 0 };
          let scoresum = 0;
          for (const v in this.politicalCandidates[c].positions) {
            if (this.politicalCandidates[c].positions.hasOwnProperty(v)) {
              if (this.votes[v] && this.politicalCandidates[c].positions[v]) {
                const cat = this.claims[v].category;
                if (!candidate.scores[cat]) {
                  candidate.scores[cat] = { title: this.categories[cat].title, color: this.categories[cat].color, score: 0 };
                }
                const s = claimScore(this.politicalCandidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav);
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
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recalc();
  }

  ngOnInit(): void {
    this.recalc();
  }
}
