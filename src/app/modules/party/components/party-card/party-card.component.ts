import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
// import { CandidateWithID } from '../../../../definitions/models/candidate.model';
import { Party } from '../../../../definitions/models/party.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { PartyResult } from '../../../../definitions/models/results.model';

@Component({
  selector: 'app-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyCardComponent implements OnInit, OnDestroy {
  @Input() partyId: string;
  @Input() public showSocialLinks = true;
  @Input() partyData: Party;
  @Input() politicalData: PoliticalData;
  @Input() personalData: PersonalCandidateMap;
  @Input() set scores(s: PartyResult[]) {
    this.score = s?.find((p) => p.party === this.partyId);
  }
  @Input() set maxParty(mp: number) {
    this.maxPartyValue = mp;
    this.maxValueArray = [...Array(mp).keys()];
  }
  partyCandidates: string[];
  score: PartyResult;
  maxPartyValue: number;
  maxValueArray: number[];

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .pipe(select(AppSelectors.getCandidateListByPartyId, { partyId: this.partyId }))
        .subscribe((candidates) => (this.partyCandidates = candidates)),
    );
  }
}
