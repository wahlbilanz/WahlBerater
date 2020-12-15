import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { first } from 'rxjs/operators';
import { vote } from '../../../../+state/app.actions';
import {PersonalCandidateMap} from '../../../../definitions/models/candidate.model';
import {PoliticalData} from '../../../../definitions/models/political.data.model';

@Component({
  selector: 'app-candidate-list-page',
  templateUrl: './candidate-list-page.component.html',
  styleUrls: ['./candidate-list-page.component.scss'],
})
export class CandidateListPageComponent implements OnInit {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  personalData: PersonalCandidateMap = undefined;
  politicalData: PoliticalData = undefined;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getPersonalData)).subscribe(d => {
      this.personalData = d;
    });
    this.store.pipe(select(AppSelectors.getPoliticalData)).subscribe(d => {
      this.politicalData = d;
    });
  }
}
