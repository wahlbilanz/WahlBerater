import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import * as AppActions from '../../../+state/app.actions';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../definitions/models/category.model';
import { QuizFirstPage } from '../../../+state/app.models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  data = this.store.pipe(select(AppSelectors.getPoliticalData));
  category: Category;
  claimId: string;

  prev: string;
  next: string;

  // categories: string[];
  // curClaims: string[];
  //
  // prev: string;
  // next: string;

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {
    // this.store.pipe(select(AppSelectors.getNextQuestion, { id: '00ea1133-94d5-5a32-af57-96a322d64285' })).subscribe(c => console.log (c));
    // this.store.pipe(select(AppSelectors.getNextQuestion, { id: '00ea1133-94d5-5a32-af57-96a322d64285' })).subscribe(c => console.log (c));
    // this.testNext(undefined);
    // this.testNext2('2d669678-2d4d-5d5b-9214-ad908f6cbbe9');
    // this.testPrev2('2d669678-2d4d-5d5b-9214-ad908f6cbbe9');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pm) => {
      this.claimId = pm.get('claim');
      this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: this.claimId }));
      this.store
        .pipe(select(AppSelectors.getNextQuestion, { id: this.claimId }))
        .subscribe((c) => (this.next = c ? '/quiz/' + c : undefined));
      this.store.pipe(select(AppSelectors.getPrevQuestion, { id: this.claimId })).subscribe((c) => {
        if (c) {
          this.prev = '/quiz/' + c;
        } else {
          if (this.claimId !== QuizFirstPage) {
            this.prev = '/quiz/' + QuizFirstPage;
          } else {
            this.prev = undefined;
          }
        }
      });
      this.store.pipe(select(AppSelectors.getCategoryByClaimId, { id: this.claimId })).subscribe((c) => (this.category = c));
    });
  }

  /*testNext(id: string): void {
    this.store.pipe(select(AppSelectors.getNextQuestion, { id })).subscribe(c => {
      console.log ('found', c, 'after', id);
      if (c) {
        this.testNext (c);
      }
      this.testPrev2(c);
    });

  }*/

  // testNext2(id: string): void {
  //   this.store.pipe(select(AppSelectors.getNextQuestion, { id })).subscribe(c => {
  //     console.log ('found', c, 'after', id);
  //     /*if (c) {
  //       this.testNext (c);
  //     }*/
  //   });
  //
  // }
  //
  // testPrev2(id: string): void {
  //   this.store.pipe(select(AppSelectors.getPrevQuestion, { id })).subscribe(c => {
  //     console.log ('found', c, 'before', id);
  //     /*if (c) {
  //       this.testNext (c);
  //     }*/
  //   });
  //
  // }

  // getNext(d: Data): string {
  // TODO move this into effect/selector combi

  // return '';
  /*let returnNext = false;
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
    }*/
  // }
  //
  // getPrev(d: Data): string {
  //   TODO move this into effect/selector combi
  // return '';
  /*let prev: string;
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
    }*/
  // }
}
