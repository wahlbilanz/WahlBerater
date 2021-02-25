import { Component, OnInit } from '@angular/core';
import { AppPartialState } from '../../../+state/app.reducer';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import * as AppSelectors from '../../../+state/app.selectors';
import { Votes } from '../../../definitions/models/votes.mode';
import { vote } from '../../../+state/app.actions';
import { ResultUrl } from '../../../+state/app.models';

@Component({
  selector: 'app-accessible-quiz',
  templateUrl: './accessible-quiz.component.html',
  styleUrls: ['./accessible-quiz.component.scss'],
})
export class AccessibleQuizComponent implements OnInit {
  data = this.store.pipe(select(AppSelectors.getPoliticalData));
  votes: Votes;
  ResultUrlPath = ResultUrl;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: 'accessible' }));
    this.store.pipe(select(AppSelectors.getVotes)).subscribe((v) => {
      this.votes = v;
    });
  }
  fav(claimId: string): void {
    let fav = true;
    if (this.votes[claimId] && this.votes[claimId].fav) {
      fav = false;
    }
    this.store.dispatch(vote({ claimId, decision: this.votes[claimId] ? this.votes[claimId].decision : 0, fav }));
  }
  vote(claimId: string, direction: number): void {
    let decision = 0;
    switch (direction) {
      case 1:
        if (!this.votes[claimId] || this.votes[claimId].decision !== 1) {
          decision = 1;
        }
        break;
      case -1:
        if (!this.votes[claimId] || this.votes[claimId].decision !== -1) {
          decision = -1;
        }
        break;
    }
    this.store.dispatch(vote({ claimId, decision, fav: this.votes[claimId] ? this.votes[claimId].fav : false }));
  }
}
