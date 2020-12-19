import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../+state/app.selectors';
import { PersonalCandidateMap, PoliticalCandidateMap } from '../../../definitions/models/candidate.model';
import { CategoryMap } from '../../../definitions/models/category.model';
import { AppPartialState } from '../../../+state/app.reducer';
import { claimScore } from '../../../definitions/functions/score.function';
import { getCandidatePersonalInfo } from '../../../definitions/functions/getCandidatePersonalInfo';
import { Score } from '../../../definitions/models/score.model';

@Component({
  selector: 'app-auswertung-heatmap-votes',
  templateUrl: './auswertung-heatmap-votes.component.html',
  styleUrls: ['./auswertung-heatmap-votes.component.scss'],
})
export class AuswertungHeatmapVotesComponent implements OnInit, OnChanges {
  @Input() votes;
  @Input() politicalCandidates: PoliticalCandidateMap;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() categories: CategoryMap;

  table = [];
  maxValue = 0;

  constructor(private store: Store<AppPartialState>) {}

  recalc(): void {
    this.table = [];
    this.maxValue = 0;
    if (this.politicalCandidates && this.votes) {
      for (const c in this.politicalCandidates) {
        if (this.politicalCandidates.hasOwnProperty(c)) {
          const candidate = {
            personal: getCandidatePersonalInfo(this.personalCandidates, c),
            id: c,
            scores: {
              yesyes: 0,
              yes: 0,
              no: 0,
              nono: 0,
            },
            score: new Score(),
          };
          // let scoresum = 0;
          for (const v in this.politicalCandidates[c].positions) {
            if (this.politicalCandidates[c].positions.hasOwnProperty(v)) {
              if (this.votes[v] && this.politicalCandidates[c].positions[v]) {
                const s = claimScore(this.politicalCandidates[c].positions[v].vote, this.votes[v].decision, this.votes[v].fav);
                switch (this.politicalCandidates[c].positions[v].vote) {
                  case 2:
                    if (this.votes[v].decision === 1) {
                      if (this.votes[v].fav) {
                        candidate.scores.yesyes++;
                      } else {
                        candidate.scores.yes += 0.5;
                        candidate.scores.yesyes += 0.5;
                      }
                    }
                    break;
                  case 1:
                    if (this.votes[v].decision === 1) {
                      if (!this.votes[v].fav) {
                        candidate.scores.yes++;
                      } else {
                        candidate.scores.yes += 0.5;
                        candidate.scores.yesyes += 0.5;
                      }
                    }
                    break;
                  case -1:
                    if (this.votes[v].decision === -1) {
                      if (!this.votes[v].fav) {
                        candidate.scores.no++;
                      } else {
                        candidate.scores.no += 0.5;
                        candidate.scores.nono += 0.5;
                      }
                    }
                    break;
                  case -2:
                    if (this.votes[v].decision === -1) {
                      if (this.votes[v].fav) {
                        candidate.scores.nono++;
                      } else {
                        candidate.scores.no += 0.5;
                        candidate.scores.nono += 0.5;
                      }
                    }
                    break;
                }

                candidate.score.add(s);
                this.maxValue = Math.max(
                  this.maxValue,
                  candidate.scores.nono,
                  candidate.scores.no,
                  candidate.scores.yes,
                  candidate.scores.yesyes,
                );
              }
            }
          }
          // candidate.score = scoresum;
          this.table.push(candidate);
        }
      }
    }
    this.table.sort((a, b) => (a.score < b.score ? 1 : -1));
  }

  ngOnInit(): void {
    this.recalc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalc();
  }
}
