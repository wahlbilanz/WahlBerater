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
import { first, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';
import { prepareResults } from '../../../../definitions/functions/score-result.function';

@Component({
  selector: 'app-thesis-prov-page',
  templateUrl: './claim-prov-page.component.html',
  styleUrls: ['./claim-prov-page.component.scss'],
})
export class ClaimProvPageComponent implements OnInit, OnChanges, OnDestroy {
  claimId: string;
  votes: Votes = {};
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  partyScoreResult: PartyScoreResult;
  showCandidates = false;

  prev: string;
  next: string;
  private subscriptions: Subscription[] = [];

  agreement = AGREEMENT;
  includeCandidates = IncludeCandidates;

  constructor(private route: ActivatedRoute, private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        this.claimId = params.get('claimId');
        this.store.pipe(select(AppSelectors.getNextQuestion, { id: this.claimId })).subscribe((c) => (this.next = c ? c : undefined));
        this.store
          .pipe(select(AppSelectors.getPrevQuestion, { id: this.claimId }))
          .subscribe((c) => (this.prev = c && c !== QuizFirstPage ? c : undefined));
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
        this.personalData = d;
        this.recalc();
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
        this.politicalData = d;
        this.recalc();
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getVotes)).subscribe((d) => {
        this.votes = d;
        this.recalc();
      }),
    );
  }

  recalc(): void {
    if (this.personalData && this.politicalData) {
      this.partyScoreResult = prepareResults(this.politicalData, this.personalData, this.votes);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalc();
  }
}
