import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import {CandidatePersonalInfo, PersonalCandidateMap} from '../../../../definitions/models/candidate.model';
import {PoliticalData} from '../../../../definitions/models/political.data.model';
import {getCandidatePersonalInfo} from '../../../../definitions/functions/getCandidatePersonalInfo';
// import {decisionToWord, candidateDecisionToWord} from '../../../../definitions/functions/decision-mapping.function';

@Component({
  selector: 'app-candidate-profile-page',
  templateUrl: './candidate-profile-page.component.html',
  styleUrls: ['./candidate-profile-page.component.scss'],
})
export class CandidateProfilePageComponent implements OnInit {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  // personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;
  personalInfo: CandidatePersonalInfo = undefined;
  candidateId: string;

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      this.candidateId = pm.get('candidate_id');
    });
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe(d => {
      // this.personalData = d;
      this.personalInfo = getCandidatePersonalInfo(d, this.candidateId);
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe(d => {
      this.politicalData = d;
    });
  }
}
