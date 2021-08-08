import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, combineLatest, scheduled, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppPartialState } from 'src/app/+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { getAgreement } from '../../../../definitions/functions/agreement.function';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';
import { IncludeCandidates, PartyDecisionThreshold } from '../../../../+state/app.models';

@Component({
  selector: 'app-candidate-detail-page',
  templateUrl: './candidate-detail-page.component.html',
  styleUrls: ['./candidate-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateDetailPageComponent implements OnInit, OnDestroy {
  public candidateAndPartyId = this.route.params.pipe(
    map((params) => ({
      partyId: params.partyId as string,
      candidateId: params.candidateId as string,
    })),
  );
  public data = this.candidateAndPartyId.pipe(
    switchMap(({ partyId, candidateId }) =>
      combineLatest([
        this.state.pipe(select(AppSelectors.getCandidatePersonalDataById, { id: candidateId })),
        this.state.pipe(select(AppSelectors.getPartyById, { id: partyId })),
        this.state.pipe(select(AppSelectors.getCandidateClaimDecisions, { id: candidateId })),
        scheduled([{ partyId, candidateId }], asyncScheduler),
      ]),
    ),
    map(([candidate, party, claimPositions, { partyId, candidateId }]) => ({ candidateId, candidate, claimPositions, partyId, party })),
  );

  public votes: Votes;
  private subscriptions: Subscription[] = [];
  public agreement = AGREEMENT;

  voteThreshold = PartyDecisionThreshold;

  includeCandidates = IncludeCandidates;

  constructor(private state: Store<AppPartialState>, private route: ActivatedRoute, private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getVotes)).subscribe((d: Votes) => {
        this.votes = d;
      }),
    );
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
