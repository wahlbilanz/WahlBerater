import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
// import { CandidateWithID } from '../../../../definitions/models/candidate.model';
import { Party } from '../../../../definitions/models/party.model';
import {PoliticalData} from '../../../../definitions/models/political.data.model';
import {PersonalCandidateMap} from '../../../../definitions/models/candidate.model';

@Component({
  selector: 'app-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyCardComponent implements OnInit {
  @Input() partyId: string;

  /*set partyId(id: string) {
    this.partyIdent = id;
    this.partyData = this.store.pipe(select(AppSelectors.getPartyById, { id }));
    this.partyCandidates = this.store.pipe(
      select(AppSelectors.getCandidateListByPartyId, { partyId: id }),
      map((candidateList) => (!candidateList ? null : candidateList.filter((candidate) => !!candidate.hasPersonalData))),
    );
  }*/
  @Input() public showSocialLinks = true;

  // public partyIdent: string;
  @Input() partyData: Party;
  partyCandidates: string[];
  @Input() politicalData: PoliticalData;
  @Input() personalData: PersonalCandidateMap;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    /*this.store.pipe(select(AppSelectors.getPersonalData)).subscribe(d => {
      console.log ('getPersonalData', d);
      this.ngZone.run( () => {
      this.candidatePersonalData = d;
      });
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe(d => {
      console.log ('getPoliticalData', d);
      this.candidatePoliticalData = d;
      // this.partyData = d.parties[this.partyId];
    });*/
    this.store.pipe(select(AppSelectors.getCandidateListByPartyId, { partyId: this.partyId }))
      .subscribe(candidates => this.partyCandidates = candidates);
  }
}
