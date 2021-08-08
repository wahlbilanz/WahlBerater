import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { Votes } from '../../../../definitions/models/votes.mode';
import { PartyResult, PartyScoreResult } from '../../../../definitions/models/results.model';
import { IncludeCandidates, QuizFirstPage } from '../../../../+state/app.models';
import { first, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';

@Component({
  selector: 'app-thesis-prov-page',
  templateUrl: './claim-prov-page.component.html',
  styleUrls: ['./claim-prov-page.component.scss'],
})
export class ClaimProvPageComponent implements OnInit, OnDestroy {
  claimId: string;
  votes: Votes = {};
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  partyScoreResult: PartyScoreResult;
  showCandidates = false;

  prev: string;
  next: string;

  agreement = AGREEMENT;
  includeCandidates = IncludeCandidates;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private store: Store<AppPartialState>) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.claimId = params.get('claimId');
      this.store.pipe(select(AppSelectors.getNextQuestion, { id: this.claimId })).subscribe((c) => (this.next = c ? c : undefined));
      this.store
        .pipe(select(AppSelectors.getPrevQuestion, { id: this.claimId }))
        .subscribe((c) => (this.prev = c && c !== QuizFirstPage ? c : undefined));
    });
    this.store.pipe(select(AppSelectors.getPersonalData), takeUntil(this.destroy$)).subscribe((d) => {
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData), takeUntil(this.destroy$)).subscribe((d) => {
      this.politicalData = d;
    });
    this.store.pipe(select(AppSelectors.getVotes), takeUntil(this.destroy$)).subscribe((d) => {
      this.votes = d;
    });
    this.store.pipe(select(AppSelectors.getPartyScoreResult), takeUntil(this.destroy$)).subscribe((r) => (this.partyScoreResult = r));
  }
}
