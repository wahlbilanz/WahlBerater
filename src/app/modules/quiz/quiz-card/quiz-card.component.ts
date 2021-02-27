import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { vote } from '../../../+state/app.actions';
import {
  AccessibilityModes,
  AccessibleUrl,
  AccessibleUrlFragment,
  QuizAnimationDelay,
  QuizAnimationDurationIn,
  QuizAnimationDurationOut,
  QuizFirstPage,
  ResultUrl,
} from '../../../+state/app.models';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { Category } from '../../../definitions/models/category.model';
import { Claim } from '../../../definitions/models/claim.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
  animations: [
    trigger('swipeAnimation', [
      state(
        'there',
        style({
          opacity: 1,
        }),
      ),
      state(
        'leavingLeft',
        style({
          opacity: 0,
          transform: 'translateX(-' + window.innerWidth + 'px) rotate(-45deg)',
        }),
      ),
      state(
        'leavingRight',
        style({
          opacity: 0,
          transform: 'translateX(' + window.innerWidth + 'px) rotate(45deg)',
        }),
      ),
      state(
        'leavingTop',
        style({
          opacity: 0,
          transform: 'translateY(-' + window.innerHeight + 'px)',
        }),
      ),
      state(
        'gone',
        style({
          opacity: 1,
          transform: 'scale(0.8)',
        }),
      ),
      transition('there => *', [animate(QuizAnimationDurationOut + 'ms ease-out')]),
      transition('* => gone', [animate(0)]),
      transition('gone => there', [animate(QuizAnimationDurationIn + 'ms ease-in')]),
    ]),
  ],
})
export class QuizCardComponent implements OnInit, OnChanges, OnDestroy {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  @Input() category: Category;
  @Input() claimId: string;
  @Input() claim: Claim;
  @Input() next: string;
  @Input() prev: string;
  ResultUrlPath = ResultUrl;
  fav: boolean;
  decision: number;
  swipeAnimation = 'gone';
  // leaveRight = false;
  // leaveTop = false;

  swipeCoord?: [number, number];
  swipeTime?: number;

  containerHeight: number;
  public accessibilityModes: AccessibilityModes;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppPartialState>, private router: Router) {}

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnChanges(): void {
    // 100 = 46 of top menu plus padding/margin of surrounding containers
    this.containerHeight = window.innerHeight - 100;
    this.swipeAnimation = 'gone';
    // this.leaveRight = false;
    // this.leaveTop = false;
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
    setTimeout(() => {
      this.swipeAnimation = 'there';
    }, 100);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => {
        this.accessibilityModes = am;
        if (am.accessibilityMode) {
          this.router.navigate(['quiz', AccessibleUrl], { fragment: AccessibleUrlFragment + this.claimId });
        }
      }),
    );
  }

  swipe(e: TouchEvent, start: boolean): void {
    if (start) {
      this.swipeCoord = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
      this.swipeTime = new Date().getTime();
    } else {
      if (new Date().getTime() - this.swipeTime < 1000) {
        const direction = [e.changedTouches[0].clientX - this.swipeCoord[0], e.changedTouches[0].clientY - this.swipeCoord[1]];
        if (Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
          if (direction[0] < 0) {
            this.no();
          } else {
            this.yes();
          }
        }
        if (Math.abs(direction[1]) > 30 && Math.abs(direction[1]) > Math.abs(direction[0] * 3)) {
          if (direction[1] < 0) {
            this.go(true);
          } else {
            this.go(false);
          }
        }
      }
    }
  }
  toggleFav(): void {
    this.fav = !this.fav;
    this.updateVote(false, true, 'noanimation');
  }

  no(): void {
    if (this.decision === -1) {
      this.decision = 0;
    } else {
      this.decision = -1;
    }
    // this.animateCardChange('leavingLeft');
    this.updateVote(true, true, 'leavingLeft');
  }

  yes(): void {
    if (this.decision === 1) {
      this.decision = 0;
    } else {
      this.decision = 1;
    }
    // this.animateCardChange('leavingRight');
    this.updateVote(true, true, 'leavingRight');
  }

  go(next: boolean) {
    // this.animateCardChange('leavingTop');
    this.updateVote(true, next, 'leavingTop');
    // this.changePage(next);
  }

  private updateVote(goahead: boolean, forward: boolean, animation: string): void {
    console.log('dispatching:');
    console.log({ claimId: this.claimId, decision: this.decision, fav: this.fav });
    this.store.dispatch(vote({ claimId: this.claimId, decision: this.decision, fav: this.fav }));
    if (goahead) {
      this.animateCardChange(animation);
      this.changePage(forward);
    }
  }

  private animateCardChange(animation: string) {
    setTimeout(() => {
      this.swipeAnimation = 'gone';
    }, QuizAnimationDurationOut + QuizAnimationDelay);
    setTimeout(() => {
      this.swipeAnimation = animation;
    }, QuizAnimationDelay);
  }

  private changePage(forward: boolean) {
    setTimeout(() => {
      if (forward && this.next) {
        this.router.navigate([this.next]);
      } else if (forward) {
        this.router.navigate(['/quiz/' + ResultUrl]);
      } else {
        this.router.navigate([this.prev]);
      }
    }, QuizAnimationDelay + QuizAnimationDurationOut - 20);
  }
}
