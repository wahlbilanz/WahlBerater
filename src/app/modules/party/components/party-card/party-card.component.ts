import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
// import { CandidateWithID } from '../../../../definitions/models/candidate.model';
import { Party } from '../../../../definitions/models/party.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';

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
  partyCandidates: string[];
  @Input() politicalData: PoliticalData;
  @Input() personalData: PersonalCandidateMap;
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
