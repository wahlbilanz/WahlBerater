import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppPartialState} from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import {claimScore} from '../../../definitions/functions/score.function';
import {CategoryMap} from '../../../definitions/models/category.model';
import {CandidateMap} from '../../../definitions/models/candidate.model';

@Component({
  selector: 'app-auswertung-heatmap',
  templateUrl: './auswertung-heatmap.component.html',
  styleUrls: ['./auswertung-heatmap.component.scss']
})
export class AuswertungHeatmapComponent implements OnInit {

  votes = this.store.pipe(select(AppSelectors.getVotes));
  data = this.store.pipe(select(AppSelectors.getData));

  decisions = {};
  candidates: CandidateMap;
  categories: CategoryMap;

  table = [];
  maxValue = [0, 0, 0];

  constructor(private store: Store<AppPartialState>) { }


  recalc(): void {
    this.table = [];
    this.maxValue = [0, 0, 0];
    if (this.candidates && this.decisions) {

      // const scoreArray = [];

      for (const c in this.candidates) {
        if (this.candidates.hasOwnProperty(c)) {
          console.log (c);
          const candidate = {name: this.candidates[c].name, id: c, scores: {}, score: 0};
          let scoresum = 0;
          // let score = 0;
          for (const v in this.candidates[c].positions) {
            if (this.candidates[c].positions.hasOwnProperty(v)) {
              if (this.decisions[v]) {
                console.log (c, v);
                const s = claimScore(this.candidates[c].positions[v].vote, this.decisions[v].decision, this.decisions[v].fav);
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
    this.table.sort ((a, b)  => a.score < b.score ? 1 : -1);
    console.log (this.table);
  }

  ngOnInit(): void {
    this.data.subscribe(d => {
      this.candidates = d.candidates;
      this.categories = d.categories;
      this.recalc();
    });
    this.votes.subscribe(v => {
      this.decisions = v;
      this.recalc();
    });
  }

}
