import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';

@Component({
  selector: 'app-party-list-page',
  templateUrl: './party-list-page.component.html',
  styleUrls: ['./party-list-page.component.scss'],
})
export class PartyListPageComponent implements OnInit {
  public partyIds = this.state.pipe(select(AppSelectors.getPartyIds));
  politicalData: PoliticalData;
  personalData: PersonalCandidateMap;

  constructor(private state: Store<AppPartialState>, private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
      console.log('getPersonalData', d);
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
      console.log('getPoliticalData', d);
      this.politicalData = d;
    });
  }
}
