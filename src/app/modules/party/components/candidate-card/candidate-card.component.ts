import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CandidatePersonalInfo, CandidatePoliticalInfo } from '../../../../definitions/models/candidate.model';
import * as AppSelectors from '../../../../+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppPartialState } from '../../../../+state/app.reducer';
import { getCandidatePersonalInfo } from '../../../../definitions/functions/getCandidatePersonalInfo';
import { takeUntil } from 'rxjs/operators';

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
  private destroy$: Subject<void> = new Subject<void>();

  public id: string;

  constructor(private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData), takeUntil(this.destroy$)).subscribe((d) => {
      // console.log(d);
      this.personalInfo = getCandidatePersonalInfo(d, this.candidateId);
    });
    this.store.pipe(select(AppSelectors.getPoliticalData), takeUntil(this.destroy$)).subscribe((d) => {
      // console.log(d);
      if (d && d.candidates) {
        this.politicalInfo = d.candidates[this.candidateId];
      }
    });
  }
}
