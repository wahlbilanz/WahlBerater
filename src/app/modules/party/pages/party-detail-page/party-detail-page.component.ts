import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { IncludeCandidates, PartyDecisionThreshold } from '../../../../+state/app.models';
import { asyncScheduler, combineLatest, scheduled, Subscription } from 'rxjs';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';
import { getAgreement } from '../../../../definitions/functions/agreement.function';
import { CategoryWithClaims } from '../../../../definitions/models/category.model';
import { Party } from '../../../../definitions/models/party.model';

@Component({
  selector: 'app-party-detail-page',
  templateUrl: './party-detail-page.component.html',
  styleUrls: ['./party-detail-page.component.scss'],
})
export class PartyDetailPageComponent implements OnInit, OnDestroy {
  public partyId = this.route.params.pipe(map((params) => params.partyId as string));
  // public partyData = this.partyId.pipe(switchMap((partyId) => this.state.pipe(select(AppSelectors.getPartyById, { id: partyId }))));
  // public partyCandidates = this.partyId.pipe(
  //   switchMap((partyId) => this.state.pipe(select(AppSelectors.getCandidateListByPartyId, { partyId }))),
  // );

  public data = this.partyId.pipe(
    switchMap((partyId) =>
      combineLatest([
        this.state.pipe(select(AppSelectors.getPartyById, { id: partyId })),
        this.state.pipe(select(AppSelectors.getCandidateListByPartyId, { partyId })),
        this.state.pipe(select(AppSelectors.getCategoriesWithClaims)),
        scheduled([partyId], asyncScheduler),
      ]),
    ),
    // tap (([party, candidates, categoriesWithClaims, partyId]) => console.log (party, candidates, categoriesWithClaims, partyId)),
    map(([party, candidates, categoriesWithClaims, partyId]: [Party, string[], CategoryWithClaims[], string]) => ({
      partyId,
      candidates,
      categoriesWithClaims,
      party,
    })),
  );
  public votes: Votes;
  public agreement = AGREEMENT;
  private subscriptions: Subscription[] = [];

  voteThreshold = PartyDecisionThreshold;

  includeCandidates = IncludeCandidates;

  constructor(private state: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.state.pipe(select(AppSelectors.getVotes)).subscribe((d: Votes) => {
        this.votes = d;
      }),
    );
    // this.route.params.subscribe((p) => console.log('params', p));
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  calcAgreement(party: number, user: Vote) {
    return getAgreement(party, user);
  }
}
