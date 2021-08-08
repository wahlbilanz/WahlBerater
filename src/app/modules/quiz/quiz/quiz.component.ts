import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import { QuizFirstPage } from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { Category } from '../../../definitions/models/category.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  data = this.store.pipe(select(AppSelectors.getPoliticalData));
  category: Category;
  claimId: string;

  progress = 0;

  prev: string;
  next: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((pm) => {
      this.claimId = pm.get('claim');
      this.store.dispatch(AppActions.updateLastQuizPage({ lastPage: this.claimId }));
      this.store
        .pipe(select(AppSelectors.getNextQuestion, { id: this.claimId }), takeUntil(this.destroy$))
        .subscribe((c) => (this.next = c ? '/quiz/' + c : undefined));
      this.store.pipe(select(AppSelectors.getPrevQuestion, { id: this.claimId }), takeUntil(this.destroy$)).subscribe((c) => {
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
      this.store.pipe(select(AppSelectors.getClaimProgress, { id: this.claimId }), takeUntil(this.destroy$)).subscribe((c) => {
        console.log(c);
        this.progress = c ? 100 * c : 0;
      });
      this.store
        .pipe(select(AppSelectors.getCategoryByClaimId, { id: this.claimId }), takeUntil(this.destroy$))
        .subscribe((c) => (this.category = c));
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
