import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { asyncScheduler, combineLatest, scheduled, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AppPartialState } from 'src/app/+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { getAgreement } from '../../../../definitions/functions/agreement.function';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';
import { IncludeCandidates, PartyDecisionThreshold, RenderingDelay } from '../../../../+state/app.models';

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
    tap((d) => {
      this.activePanels = [];
      if (d?.claimPositions) {
        for (const cp of d.claimPositions) {
          for (const c of cp.claims) {
            this.activePanels.push(false);
          }
        }
      }
    }),
  );

  public votes: Votes;
  private destroy$: Subject<void> = new Subject<void>();
  public agreement = AGREEMENT;
  activePanels: boolean[];
  renderRows = 7;

  voteThreshold = PartyDecisionThreshold;

  includeCandidates = IncludeCandidates;

  constructor(
    private state: Store<AppPartialState>,
    private route: ActivatedRoute,
    private store: Store<AppPartialState>,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getVotes), takeUntil(this.destroy$)).subscribe((d: Votes) => {
      this.votes = d;
    });
    setTimeout(() => {
      this.renderRows = 1000;
      this.ref.markForCheck();
    }, RenderingDelay);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  calcAgreement(party: number, user: Vote) {
    return getAgreement(party, user);
  }

  activate(i: number): void {
    this.activePanels[i] = true;
  }
}
