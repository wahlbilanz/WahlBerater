import { Component, Input, OnInit } from '@angular/core';
import { CandidatePersonalInfo, CandidatePoliticalInfo } from '../../../../definitions/models/candidate.model';
import * as AppSelectors from '../../../../+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import { getCandidatePersonalInfo } from '../../../../definitions/functions/getCandidatePersonalInfo';
import { PoliticalData } from '../../../../definitions/models/political.data.model';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  politicalInfo: CandidatePoliticalInfo = undefined;
  personalInfo: CandidatePersonalInfo = undefined;

  @Input() candidateId: string;
  @Input() public showSocialLinks = true;

  public id: string;
  // public candidateData: Observable<CandidateWithID>;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
      this.personalInfo = getCandidatePersonalInfo(d, this.candidateId);
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
      this.politicalInfo = d.candidates[this.candidateId];
    });
  }
}
