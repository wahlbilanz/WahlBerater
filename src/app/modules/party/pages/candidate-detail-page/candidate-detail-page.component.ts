import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, combineLatest, scheduled } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppPartialState } from 'src/app/+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';

@Component({
  selector: 'app-candidate-detail-page',
  templateUrl: './candidate-detail-page.component.html',
  styleUrls: ['./candidate-detail-page.component.scss'],
})
export class CandidateDetailPageComponent implements OnInit {
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

  constructor(private state: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
