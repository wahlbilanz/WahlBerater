import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../../../definitions/models/data.model';
import { Claim } from '../../../definitions/models/claim.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
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

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      this.claimId = pm.get('claim');
      this.category = pm.get('category');
    });
  }

  getNext(d: Data): string {
    // TODO move this into effect/selector combi
    let returnNext = false;
    for (const c in d.categories) {
      if (d.categories.hasOwnProperty(c)) {
        const claims: Array<[string, Claim]> = Object.getOwnPropertyNames(d.claims)
          .map((claimId) => [claimId, d.claims[c]] as [string, Claim])
          .filter(([claimId, claim]: [string, Claim]) => claim.category === c);
        const claimIds = claims.map(([claimId, _]) => claimId);

        if (returnNext) {
          return '/quiz/' + c + '/' + claims[0][0];
        }
        if (c === this.category) {
          const curClaim = claimIds.indexOf(this.claimId);
          // const curClaim = d.categories[c].claims.indexOf(this.claimId);
          if (curClaim === claimIds.length - 1) {
            returnNext = true;
          } else {
            return '/quiz/' + c + '/' + claimIds[curClaim + 1];
          }
        }
      }
    }
  }

  getPrev(d: Data): string {
    // TODO move this into effect/selector combi
    let prev: string;
    for (const c in d.categories) {
      if (d.categories.hasOwnProperty(c)) {
        const claimIds = Object.getOwnPropertyNames(d.claims).filter((claimId) => d.claims[claimId].category === c);
        for (const claimId of claimIds) {
          if (c === this.category && claimId === this.claimId) {
            return prev;
          }
          prev = '/quiz/' + c + '/' + claimId;
        }
      }
    }
  }
}
