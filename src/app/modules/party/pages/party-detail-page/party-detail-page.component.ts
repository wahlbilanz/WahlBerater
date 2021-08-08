import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { IncludeCandidates, PartyDecisionThreshold } from '../../../../+state/app.models';
import { asyncScheduler, combineLatest, Observable, scheduled, Subscription } from 'rxjs';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';
import { getAgreement } from '../../../../definitions/functions/agreement.function';
import { CategoryWithClaims } from '../../../../definitions/models/category.model';
import { Party } from '../../../../definitions/models/party.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { PartyResult, PartyScoreResult } from '../../../../definitions/models/results.model';

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
  private party = '';
  public data = this.partyId.pipe(
    switchMap((partyId) =>
      combineLatest([
        this.state.pipe(select(AppSelectors.getPartyById, { id: partyId })),
        this.state.pipe(select(AppSelectors.getCandidateListByPartyId, { partyId })),
        this.state.pipe(select(AppSelectors.getCategoriesWithClaims)),
        scheduled([partyId], asyncScheduler),
      ]),
    ),
    map(([party, candidates, categoriesWithClaims, partyId]: [Party, string[], CategoryWithClaims[], string]) => ({
      partyId,
      candidates,
      categoriesWithClaims,
      party,
    })),
    tap((d) => {
      this.party = d.partyId;
      this.getPartyResult();
    }),
  );
  public votes: Votes;
  public agreement = AGREEMENT;
  private subscriptions: Subscription[] = [];
  politicalData: PoliticalData;
  personalData: PersonalCandidateMap;
  partyScoreResult: PartyScoreResult;
  partyResult: PartyResult;
  sortedCategroies: Observable<CategoryWithClaims[]> = this.state.pipe(select(AppSelectors.getCategoriesWithClaims));

  voteThreshold = PartyDecisionThreshold;

  includeCandidates = IncludeCandidates;

  activePanels: boolean[];

  constructor(private state: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.params.subscribe((p) => console.log('params', p));
    this.subscriptions.push(
      this.state.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
        // console.log('getPersonalData', d);
        this.personalData = d;
      }),
    );
    this.subscriptions.push(
      this.state.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
        // console.log('getPoliticalData', d);
        this.politicalData = d;
        this.activePanels = [];
        if (d) {
          for (const c in d.claims) {
            if (d.hasOwnProperty(c)) {
              this.activePanels.push(false);
            }
          }
        }
      }),
    );
    this.subscriptions.push(
      this.state.pipe(select(AppSelectors.getVotes)).subscribe((votes: Votes) => {
        this.votes = votes;
      }),
    );
    this.subscriptions.push(
      this.state.pipe(select(AppSelectors.getPartyScoreResult)).subscribe((partyScoreResult) => {
        this.partyScoreResult = partyScoreResult;
        this.getPartyResult();
      }),
    );
  }

  getPartyResult() {
    if (this.partyScoreResult && this.party) {
      for (const p of Object.values(this.partyScoreResult)) {
        if (p.party === this.party) {
          this.partyResult = p;
        }
      }
    }
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  calcAgreement(party: number, user: Vote) {
    return getAgreement(party, user);
  }

  activate(i: number): void {
    this.activePanels[i] = true;
  }
}
