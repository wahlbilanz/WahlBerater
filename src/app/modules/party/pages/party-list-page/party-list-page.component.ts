import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { Subject } from 'rxjs';
import { PartyScoreResult } from '../../../../definitions/models/results.model';
import { Votes } from '../../../../definitions/models/votes.mode';
import { takeUntil } from 'rxjs/operators';
import { RenderingDelay } from '../../../../+state/app.models';

@Component({
  selector: 'app-party-list-page',
  templateUrl: './party-list-page.component.html',
  styleUrls: ['./party-list-page.component.scss'],
})
export class PartyListPageComponent implements OnInit, OnDestroy {
  public partyIds: string[];
  politicalData: PoliticalData;
  personalData: PersonalCandidateMap;
  private destroy$: Subject<void> = new Subject<void>();
  votes: Votes = undefined;
  partyScoreResult: PartyScoreResult;
  defaultSort = true;

  sortedParties = false;
  renderRows = 3;

  constructor(private state: Store<AppPartialState>, private store: Store<AppPartialState>, private ref: ChangeDetectorRef) {}

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
    setTimeout(() => {
      this.renderRows = 1000;
      this.ref.markForCheck();
    }, 2 * RenderingDelay);
    this.state
      .pipe(select(AppSelectors.getPartyIds))
      .pipe(takeUntil(this.destroy$))
      .subscribe((ids) => {
        this.partyIds = ids;
        this.partiesDefaultSorted();
      });
  }

  private partiesDefaultSorted() {
    this.defaultSort = true;
    if (this.partyIds && this.politicalData) {
      for (let i = 1; i < this.partyIds.length; i++) {
        if (this.politicalData.parties[this.partyIds[i]].order < this.politicalData.parties[this.partyIds[i - 1]].order) {
          this.defaultSort = false;
        }
      }
    }
  }
}
