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

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {}

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
}
