import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';

@Component({
  selector: 'app-party-list-page',
  templateUrl: './party-list-page.component.html',
  styleUrls: ['./party-list-page.component.scss'],
})
export class PartyListPageComponent implements OnInit {
  public partyIds = this.state.pipe(select(AppSelectors.getPartyIds));

  constructor(private state: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.partyIds.subscribe((data) => console.log('party ids', data));
  }
}
