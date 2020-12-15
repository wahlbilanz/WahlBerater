import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { claimScore } from '../../../definitions/functions/score.function';
import { CategoryMap } from '../../../definitions/models/category.model';
import {PersonalCandidateMap, PoliticalCandidateMap} from '../../../definitions/models/candidate.model';
import {getCandidatePersonalInfo} from '../../../definitions/functions/getCandidatePersonalInfo';

@Component({
  selector: 'app-auswertung-heatmap',
  templateUrl: './auswertung-heatmap.component.html',
  styleUrls: ['./auswertung-heatmap.component.scss'],
})
export class AuswertungHeatmapComponent implements OnInit, OnChanges {
  @Input() votes;
  @Input() politicalCandidates: PoliticalCandidateMap;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() categories: CategoryMap;

  table = [];
  maxValue = [0, 0, 0];

  constructor(private store: Store<AppPartialState>) {}

  recalc(): void {
    this.table = [];
    this.maxValue = [0, 0, 0];
    if (this.politicalCandidates && this.votes) {
      for (const c in this.politicalCandidates) {
        if (this.politicalCandidates.hasOwnProperty(c)) {
          const candidate = { personal: getCandidatePersonalInfo(this.personalCandidates, c), id: c, scores: {}, score: 0 };
          let scoresum = 0;
          for (const v in this.politicalCandidates[c].positions) {
            if (this.politicalCandidates[c].positions.hasOwnProperty(v)) {
              if (this.votes[v]) {
                const s = claimScore(this.politicalCandidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav);
                if (!candidate.scores[s]) {
                  candidate.scores[s] = 0;
                }
                candidate.scores[s]++;
                scoresum += s;
                if (this.maxValue[s] < candidate.scores[s]) {
                  this.maxValue[s] = candidate.scores[s];
                }
              }
            }
          }
          candidate.score = scoresum;
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
