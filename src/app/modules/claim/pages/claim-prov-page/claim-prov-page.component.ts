import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { Votes } from '../../../../definitions/models/votes.mode';

@Component({
  selector: 'app-thesis-prov-page',
  templateUrl: './claim-prov-page.component.html',
  styleUrls: ['./claim-prov-page.component.scss'],
})
export class ClaimProvPageComponent implements OnInit {
  claimId: string;
  votes: Votes = {};
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  constructor(private route: ActivatedRoute, private store: Store<AppPartialState>) {
    this.claimId = this.route.snapshot.params.claimId;
  }

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
      this.politicalData = d;
    });
    this.store.pipe(select(AppSelectors.getVotes)).subscribe((d) => {
      this.votes = d;
    });
  }
}
