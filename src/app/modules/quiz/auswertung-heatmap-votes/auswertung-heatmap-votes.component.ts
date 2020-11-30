import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AppSelectors from '../../../+state/app.selectors';
import {CandidateMap} from '../../../definitions/models/candidate.model';
import {CategoryMap} from '../../../definitions/models/category.model';
import {AppPartialState} from '../../../+state/app.reducer';
import {claimScore} from '../../../definitions/functions/score.function';

@Component({
  selector: 'app-auswertung-heatmap-votes',
  templateUrl: './auswertung-heatmap-votes.component.html',
  styleUrls: ['./auswertung-heatmap-votes.component.scss']
})
export class AuswertungHeatmapVotesComponent implements OnInit {

  votes = this.store.pipe(select(AppSelectors.getVotes));
  data = this.store.pipe(select(AppSelectors.getData));

  decisions = {};
  candidates: CandidateMap;
  categories: CategoryMap;

  table = [];
  maxValue = 0;

  constructor(private store: Store<AppPartialState>) { }


  recalc(): void {
    this.table = [];
    this.maxValue = 0;
    if (this.candidates && this.decisions) {

      // const scoreArray = [];

      for (const c in this.candidates) {
        if (this.candidates.hasOwnProperty(c)) {
          console.log (c);
          const candidate = {name: this.candidates[c].name, id: c, scores: {
            yesyes: 0,
              yes: 0,
              no: 0,
              nono: 0
            }, score: 0};
          let scoresum = 0;
          // let score = 0;
          for (const v in this.candidates[c].positions) {
            if (this.candidates[c].positions.hasOwnProperty(v)) {
              if (this.decisions[v]) {
                console.log (c, v);
                const s = claimScore(this.candidates[c].positions[v].vote, this.decisions[v].decision, this.decisions[v].fav);
                /*if (!candidate.scores[s]) {
                  candidate.scores[s] = 0;
                }
                candidate.scores[s]++;*/

                switch (this.candidates[c].positions[v].vote) {
                  case 2:
                    if (this.decisions[v].decision === 1) {
                      if (this.decisions[v].fav) {
                        candidate.scores.yesyes++;
                      } else {
                        candidate.scores.yes += .5;
                        candidate.scores.yesyes += .5;
                      }
                    }
                    break;
                  case 1:
                    if (this.decisions[v].decision === 1) {
                      if (!this.decisions[v].fav) {
                        candidate.scores.yes++;
                      } else {
                        candidate.scores.yes += .5;
                        candidate.scores.yesyes += .5;
                      }
                    }
                    break;
                  case -1:
                    if (this.decisions[v].decision === -1) {
                      if (!this.decisions[v].fav) {
                        candidate.scores.no++;
                      } else {
                        candidate.scores.no += .5;
                        candidate.scores.nono += .5;
                      }
                    }
                    break;
                  case -2:
                    if (this.decisions[v].decision === -1) {
                      if (this.decisions[v].fav) {
                        candidate.scores.nono++;
                      } else {
                        candidate.scores.no += .5;
                        candidate.scores.nono += .5;

                      }
                    }
                    break;
                }

                scoresum += s;
                this.maxValue = Math.max(this.maxValue, candidate.scores.nono, candidate.scores.no, candidate.scores.yes, candidate.scores.yesyes);
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
