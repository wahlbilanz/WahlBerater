import { Component, ViewChild, OnInit, Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { first } from 'rxjs/operators';
import { vote } from '../../../+state/app.actions';
// import {DecisionToWord, CandidateDecisionToWord} from '../../../definitions/functions/decision-mapping.function';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss'],
})
export class AuswertungComponent implements OnInit {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  data = this.store.pipe(select(AppSelectors.getPoliticalData));

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}

  sampleVotes(): void {
    this.data.pipe(first()).subscribe((d) => {
      for (const claim in d.claims) {
        if (d.claims.hasOwnProperty(claim)) {
          this.store.dispatch(vote({ claimId: claim, decision: Math.floor(Math.random() * 3) - 1, fav: Math.random() < 0.3 }));
        }
      }
    });
  }
}
