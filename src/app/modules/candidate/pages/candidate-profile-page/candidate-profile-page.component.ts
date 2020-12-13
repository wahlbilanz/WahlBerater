import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { ActivatedRoute } from '@angular/router';
// import {decisionToWord, candidateDecisionToWord} from '../../../../definitions/functions/decision-mapping.function';

@Component({
  selector: 'app-candidate-profile-page',
  templateUrl: './candidate-profile-page.component.html',
  styleUrls: ['./candidate-profile-page.component.scss'],
})
export class CandidateProfilePageComponent implements OnInit {
  data = this.store.pipe(select(AppSelectors.getPoliticalData));
  candidateId: string;

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      this.candidateId = pm.get('candidate_id');
    });
  }
}
