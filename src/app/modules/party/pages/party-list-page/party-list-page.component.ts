import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { Subscription } from 'rxjs';
import { PartyScoreResult } from '../../../../definitions/models/results.model';
import { Votes } from '../../../../definitions/models/votes.mode';

@Component({
  selector: 'app-party-list-page',
  templateUrl: './party-list-page.component.html',
  styleUrls: ['./party-list-page.component.scss'],
})
export class PartyListPageComponent implements OnInit, OnDestroy {
  public partyIds = this.state.pipe(select(AppSelectors.getPartyIds));
  politicalData: PoliticalData;
  personalData: PersonalCandidateMap;
  private subscriptions: Subscription[] = [];
  votes: Votes = undefined;
  partyScoreResult: PartyScoreResult;

  sortedParties = false;

  constructor(private state: Store<AppPartialState>, private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
        this.personalData = d;
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
        this.politicalData = d;
        if (d) {
          const parties = Object.values(d.parties);
          this.sortedParties = !parties.every((v) => v.order === parties[0].order);
        }
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getVotes)).subscribe((votes) => {
        this.votes = votes;
      }),
    );
    this.subscriptions.push(this.store.pipe(select(AppSelectors.getPartyScoreResult)).subscribe((r) => (this.partyScoreResult = r)));
  }
}
