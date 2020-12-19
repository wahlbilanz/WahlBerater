import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { Router } from '@angular/router';
import { Claim } from '../../../definitions/models/claim.model';
import { Category } from '../../../definitions/models/category.model';
import { vote } from '../../../+state/app.actions';
import { first } from 'rxjs/operators';
import {
  QuizFirstPage,
  ResultUrl,
  QuizAnimationDelay,
  QuizAnimationDurationIn,
  QuizAnimationDurationOut,
} from '../../../+state/app.models';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  animations: [
    trigger('leaveLeft', [
      state(
        'there',
        style({
          opacity: 1,
        }),
      ),
      state(
        'gone',
        style({
          opacity: 0.1,
          transform: 'translateX(-' + window.innerWidth + 'px)',
        }),
      ),
      transition('there => gone', [animate(QuizAnimationDurationOut)]),
      transition('gone => there', [animate(QuizAnimationDurationIn)]),
    ]),
    trigger('leaveRight', [
      state(
        'there',
        style({
          opacity: 1,
        }),
      ),
      state(
        'gone',
        style({
          opacity: 0.1,
          transform: 'translateX(' + window.innerWidth + 'px)',
        }),
      ),
      transition('there => gone', [animate(QuizAnimationDurationOut)]),
      transition('gone => there', [animate(QuizAnimationDurationIn)]),
    ]),
    trigger('leaveTop', [
      state(
        'there',
        style({
          opacity: 1,
        }),
      ),
      state(
        'gone',
        style({
          opacity: 0.1,
          transform: 'translateY(-' + window.innerHeight + 'px)',
        }),
      ),
      transition('there => gone', [animate(QuizAnimationDurationOut)]),
      transition('gone => there', [animate(QuizAnimationDurationIn)]),
    ]),
  ],
})
export class QuizCardComponent implements OnInit, OnChanges {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  @Input() category: Category;
  @Input() claimId: string;
  @Input() claim: Claim;
  @Input() next: string;
  @Input() prev: string;
  ResultUrlPath = ResultUrl;
  fav: boolean;
  decision: number;
  leaveLeft = false;
  leaveRight = false;
  leaveTop = false;

  constructor(private store: Store<AppPartialState>, private router: Router) {}

  ngOnChanges(): void {
    this.leaveLeft = false;
    this.leaveRight = false;
    this.leaveTop = false;
    console.log('prev is ', this.prev);
    this.fav = false;
    this.decision = 0;
    this.votes.pipe(first()).subscribe((v) => {
      if (this.claimId in v) {
        this.fav = v[this.claimId].fav;
        this.decision = v[this.claimId].decision;
      }
    });
    if (this.claimId === QuizFirstPage) {
      this.category = {
        color: '#333',
        title: 'Howto',
      };
      this.claim = {
        category: 'howto',
        description: 'Hintergrundinformationen, um die These einordnen zu können. Bisschen Erklärung wie das Quiz funktioniert.',
        provenance: [],
        title: 'Thesen sollten relevant und kontrovers sein.',
      };
    }
  }

  ngOnInit(): void {
    // Todo: remove debug
    this.store.pipe(select(AppSelectors.getVotes)).subscribe((x) => {
      console.log(x);
    });
  }

  toggleFav(): void {
    this.fav = !this.fav;
    this.updateVote(false);
  }

  no(): void {
    if (this.decision === -1) {
      this.decision = 0;
    } else {
      this.decision = -1;
    }
    setTimeout(() => {
      this.leaveLeft = true;
    }, QuizAnimationDelay);
    this.updateVote(true);
  }

  yes(): void {
    if (this.decision === 1) {
      this.decision = 0;
    } else {
      this.decision = 1;
    }
    setTimeout(() => {
      this.leaveRight = true;
    }, QuizAnimationDelay);
    this.updateVote(true);
  }

  go(next: boolean) {
    setTimeout(() => {
      this.leaveTop = true;
    }, QuizAnimationDelay);
    setTimeout(() => {
      if (next && this.next) {
        this.router.navigate([this.next]);
      } else if (next) {
        this.router.navigate(['/quiz/' + ResultUrl]);
      } else {
        this.router.navigate([this.prev]);
      }
    }, QuizAnimationDelay + QuizAnimationDurationOut);
  }

  private updateVote(goahead: boolean): void {
    console.log('dispatching:');
    console.log({ claimId: this.claimId, decision: this.decision, fav: this.fav });
    this.store.dispatch(vote({ claimId: this.claimId, decision: this.decision, fav: this.fav }));
    if (goahead) {
      setTimeout(() => {
        if (this.next) {
          this.router.navigate([this.next]);
        } else {
          this.router.navigate(['/quiz/' + ResultUrl]);
        }
      }, QuizAnimationDelay + QuizAnimationDurationOut);
    }
  }
}
