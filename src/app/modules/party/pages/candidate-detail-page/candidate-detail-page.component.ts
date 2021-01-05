import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AppPartialState } from 'src/app/+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';

@Component({
  selector: 'app-candidate-detail-page',
  templateUrl: './candidate-detail-page.component.html',
  styleUrls: ['./candidate-detail-page.component.scss'],
})
export class CandidateDetailPageComponent implements OnInit {
  public candidateAndPartyId = this.route.params.pipe(
    map((params) => ({
      partyId: params.partyId as string,
      candidateId: params.candidateId as string,
    })),
  );
  public partyData = this.candidateAndPartyId.pipe(
    switchMap(({ partyId }) => this.state.pipe(select(AppSelectors.getPartyById, { id: partyId }))),
  );
  public candidateData = this.candidateAndPartyId.pipe(
    switchMap(({ candidateId }) => this.state.pipe(select(AppSelectors.getCandidatePersonalDataById, { id: candidateId }))),
  );

  constructor(private state: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
