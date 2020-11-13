import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import {runInThisContext} from 'vm';

@Component({
  selector: 'app-auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.scss']
})
export class AuswertungComponent implements OnInit {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  data = this.store.pipe(select(AppSelectors.getData));

  constructor(private store: Store<AppPartialState>) { }

  ngOnInit(): void {

  }
  candidateDecisionToWord (decision: number): string {
    return this.decisionToWord (decision,Math.abs(decision) > 1);
  }

  decisionToWord(decision: number, fav: boolean): string {
    switch (decision) {
      case -2:
      case -1:
        if (fav) {
          return 'auf keinen fall';
        }
        return 'nein';
      case 1:
      case 2:
        if (fav) {
          return 'auf jeden fall';
        }
        return 'ja';
    }
    return 'übersprungen';
  }

}
