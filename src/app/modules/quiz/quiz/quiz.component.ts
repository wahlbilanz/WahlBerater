import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import {ActivatedRoute} from '@angular/router';
import { Data } from '../../../definitions/models/data.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  data = this.store.pipe(select(AppSelectors.getData));
  category: string;
  claimId: string;

  // categories: string[];
  // curClaims: string[];
  //
  // prev: string;
  // next: string;


  constructor(private store: Store<AppPartialState>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      this.claimId = pm.get('claim');
      this.category = pm.get('category');
    });
  }

  getNext(d: Data): string {
    let returnNext = false;
    for (const c in d.categories) {
      if (d.categories.hasOwnProperty(c)) {
        if (returnNext) {
          return '/quiz/' + c + '/' + d.categories[c].claims[0];
        }
        if (c === this.category) {
          const curClaim = d.categories[c].claims.indexOf(this.claimId);
          if (curClaim === d.categories[c].claims.length - 1) {
            returnNext = true;
          } else {
            return '/quiz/' + c + '/' + d.categories[c].claims[curClaim + 1];
          }
        }
      }
    }
  }

  getPrev(d: Data): string {
    let prev: string;
    for (const c in d.categories) {
      if (d.categories.hasOwnProperty(c)) {
        for (const claim of d.categories[c].claims) {
          if (c === this.category && claim === this.claimId) {
            return prev;
          }
          prev = '/quiz/' + c + '/' + claim;
        }
      }
    }
  }

}
