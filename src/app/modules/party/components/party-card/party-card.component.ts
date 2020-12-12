import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppPartialState } from '../../../../+state/app.reducer';
import { Party } from '../../../../definitions/models/party.model';
import * as AppSelectors from '../../../../+state/app.selectors';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
})
export class PartyCardComponent implements OnInit {
  @Input()
  set partyId(id: number) {
    this.partyData = this.store.pipe(select(AppSelectors.getPartyById, { id }));
  }

  public partyData: Observable<Party>;
  public baseUrl = environment.dataUrl;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}
}
