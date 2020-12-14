import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppPartialState } from '../../../../+state/app.reducer';
import { Party } from '../../../../definitions/models/party.model';
import * as AppSelectors from '../../../../+state/app.selectors';
import { environment } from '../../../../../environments/environment';
import { Candidate, CandidateWithID } from '../../../../definitions/models/candidate.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyCardComponent implements OnInit {
  @Input()
  set partyId(id: string) {
    this.partyIdent = id;
    this.partyData = this.store.pipe(select(AppSelectors.getPartyById, { id }));
    this.partyCandidates = this.store.pipe(
      select(AppSelectors.getCandidateListByPartyId, { partyId: id }),
      map((candidateList) => (!candidateList ? null : candidateList.filter((candidate) => !!candidate.hasPersonalData))),
    );
  }

  public partyIdent: string;
  public partyData: Observable<Party>;
  public partyCandidates: Observable<Array<CandidateWithID>>;
  public baseUrl = environment.dataUrl;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}
}
