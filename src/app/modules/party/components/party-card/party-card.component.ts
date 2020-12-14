import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { CandidateWithID } from '../../../../definitions/models/candidate.model';
import { Party } from '../../../../definitions/models/party.model';

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
  @Input()
  public showSocialLinks: boolean = true;

  public partyIdent: string;
  public partyData: Observable<Party>;
  public partyCandidates: Observable<Array<CandidateWithID>>;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}
}
