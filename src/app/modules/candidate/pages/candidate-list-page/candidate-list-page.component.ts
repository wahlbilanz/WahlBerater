import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';

@Component({
  selector: 'app-candidate-list-page',
  templateUrl: './candidate-list-page.component.html',
  styleUrls: ['./candidate-list-page.component.scss']
})
export class CandidateListPageComponent implements OnInit {
  data = this.store.pipe(select(AppSelectors.getData));
  votes = this.store.pipe(select(AppSelectors.getVotes));

  constructor(private store: Store<AppPartialState>) { }

  ngOnInit(): void {
  }

}
