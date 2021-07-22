import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CandidatePersonalInfo, CandidatePoliticalInfo } from '../../../../definitions/models/candidate.model';
import * as AppSelectors from '../../../../+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';
import { getCandidatePersonalInfo } from '../../../../definitions/functions/getCandidatePersonalInfo';
import { PoliticalData } from '../../../../definitions/models/political.data.model';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit, OnDestroy {
  politicalInfo: CandidatePoliticalInfo = undefined;
  personalInfo: CandidatePersonalInfo = undefined;

  @Input() candidateId: string;
  @Input() public showSocialLinks = true;
  private subscriptions: Subscription[] = [];

  public id: string;
  // public candidateData: Observable<CandidateWithID>;

  constructor(private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => {
        // console.log(d);
        this.personalInfo = getCandidatePersonalInfo(d, this.candidateId);
      }),
    );
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe((d) => {
        // console.log(d);
        if (d && d.candidates) {
          this.politicalInfo = d.candidates[this.candidateId];
        }
      }),
    );
  }
}
