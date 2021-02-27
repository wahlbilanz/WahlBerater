import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';

@Component({
  selector: 'app-party-detail-page',
  templateUrl: './party-detail-page.component.html',
  styleUrls: ['./party-detail-page.component.scss'],
})
export class PartyDetailPageComponent implements OnInit {
  public partyId = this.route.params.pipe(map((params) => params.partyId as string));
  public partyData = this.partyId.pipe(switchMap((partyId) => this.state.pipe(select(AppSelectors.getPartyById, { id: partyId }))));
  public partyCandidates = this.partyId.pipe(
    switchMap((partyId) => this.state.pipe(select(AppSelectors.getCandidateListByPartyId, { partyId }))),
  );

  constructor(private state: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.params.subscribe((p) => console.log('params', p));
  }
}
