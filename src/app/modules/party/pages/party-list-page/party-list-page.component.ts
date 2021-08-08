import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { Subject } from 'rxjs';
import { PartyScoreResult } from '../../../../definitions/models/results.model';
import { Votes } from '../../../../definitions/models/votes.mode';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-party-list-page',
  templateUrl: './party-list-page.component.html',
  styleUrls: ['./party-list-page.component.scss'],
})
export class PartyListPageComponent implements OnInit, OnDestroy {
  public partyIds = this.state.pipe(select(AppSelectors.getPartyIds));
  politicalData: PoliticalData;
  personalData: PersonalCandidateMap;
  private destroy$: Subject<void> = new Subject<void>();
  votes: Votes = undefined;
  partyScoreResult: PartyScoreResult;

  sortedParties = false;

  constructor(private state: Store<AppPartialState>, private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData), takeUntil(this.destroy$)).subscribe((d) => {
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData), takeUntil(this.destroy$)).subscribe((d) => {
      this.politicalData = d;
      if (d) {
        const parties = Object.values(d.parties);
        this.sortedParties = !parties.every((v) => v.order === parties[0].order);
      }
    });
    this.store.pipe(select(AppSelectors.getVotes), takeUntil(this.destroy$)).subscribe((votes) => {
      this.votes = votes;
    });
    this.store.pipe(select(AppSelectors.getPartyScoreResult), takeUntil(this.destroy$)).subscribe((r) => (this.partyScoreResult = r));
  }
}
