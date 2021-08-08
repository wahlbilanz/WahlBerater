import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { first, take, tap } from 'rxjs/operators';
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
import * as introJs from 'intro.js/intro.js';
import { Votes } from '../../../definitions/models/votes.mode';

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
export class QuizCardComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
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

  introJS = introJs();

  containerHeight: number;
  public accessibilityModes: AccessibilityModes = {
    reducedMotionMode: true,
    accessibilityMode: false,
  };
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppPartialState>, private router: Router) {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => {
        this.accessibilityModes = am;
        // we cannot do this in oninit as we would then play an animation even if the user doesn't want it
        if (am.reducedMotionMode) {
          this.swipeAnimation = 'there';
        }
      }),
    );
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnChanges(): void {
    // 100 = 46 of top menu plus padding/margin of surrounding containers
    this.containerHeight = window.innerHeight - 100;
    if (!this.accessibilityModes?.reducedMotionMode) {
      this.swipeAnimation = 'gone';
    }
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
        order: -9001,
        color: '#333',
        title: 'Howto',
      };
      this.claim = {
        order: -9001,
        category: 'howto',
        description: 'Hier finden Sie Hintergrundinformationen, um die These besser einordnen zu können.',
        provenance: [],
        title: 'Eine These steht immer prominent in der Mitte der Quizkarte.',
        links: [],
      };
    }
    setTimeout(() => {
      this.swipeAnimation = 'there';
    }, 100);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => {
        // we cannot do this in constructor, as the routes won't be ready
        if (am.accessibilityMode) {
          this.router.navigate(['quiz', AccessibleUrl], { fragment: AccessibleUrlFragment + this.claimId });
        }
      }),
    );
    this.setupIntroJS();
  }

  ngAfterViewInit(): void {
    // only start intro if the user did not vote yet..
    this.votes.pipe(take(1)).subscribe((v: Votes) => {
      if (Object.keys(v).length < 1) {
        this.startIntro();
      }
    });
  }

  private setupIntroJS(): void {
    this.introJS.setOptions({
      nextLabel: 'Weiter',
      prevLabel: 'Zurück',
      doneLabel: 'Fertig',
      hidePrev: true,
      // skipLabel: 'Beenden',
      steps: [
        {
          title: 'Quiz Einführung',
          intro:
            'Du bekommst nun eine kleine Einführung in die Benutzung des Quiz.' +
            'Solltest du schon wissen, wie das Quiz funktioniert, klick einfach auf das × oben rechts.',
        },
        {
          element: '#card-category',
          intro: 'Jede These gehört zu einer Kategorie.',
          position: 'left',
        },
        {
          element: '#claim-background',
          intro: 'Manche Thesen benötigen Hintergrundinformationen. Der Hintergrund erscheint dann im oberen Teil der Quizkarte.',
          position: 'right',
        },
        {
          element: '#claim',
          intro: 'Die eigentliche These steht prominent in der Mitte der Quizkarte.',
          position: 'right',
        },
        {
          element: '#decision-center',
          intro:
            'Klicke auf das Herz, um eine These als besonders wichtig zu markieren. Kandidierende, die die gleiche Position beziehen, bekommen dann doppelte Punktzahl.',
          position: 'top',
        },
        {
          element: '#decision-left',
          intro: 'Bist du gegen die These? Klicke dann auf den Daumen nach unten oder wische auf mobilen Geräten nach links.',
          position: 'top',
        },
        {
          element: '#decision-right',
          intro: 'Stimmst du dieser These zu? Klicke dann auf den Daumen nach oben oder wische auf mobilen Geräten nach rechts.',
          position: 'top',
        },
        {
          element: '#claim-back',
          intro:
            'Wenn es sich nicht um die erste These im Quiz handelt erscheint hier ein Feld mit dem du zur vorherigen These springen kannst.',
          position: 'top',
        },
        {
          element: '#claim-next',
          intro:
            'Mit diesem Knopf kannst du zur nächsten These springen. Du musst nicht alle Thesen beantworten, sondern kannst Thesen überspringen wenn du keine starke Meinung zum Thema hast!',
          position: 'top',
        },
        {
          element: '#quiz-progress',
          intro: 'Am unteren Bildschirmrand zeigt ein Ladebalken wie viele Thesen noch vor dir liegen.',
          position: 'top',
        },
        {
          element: '#forward-auswertung',
          intro: 'Du kannst jederzeit alle weiteren Thesen überspringen und mit diesem Knopf direkt zur Auswertung gelangen.',
          position: 'top',
        },
        {
          element: '#introjs-start',
          intro: 'Diese Einführung kann jederzeit über den Info-Knopf noch einmal gestartet werden.',
          position: 'top',
        },
      ],
    });
  }

  startIntro(): void {
    this.introJS.start();
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
        /*if (Math.abs(direction[1]) > 30 && Math.abs(direction[1]) > Math.abs(direction[0] * 3)) {
          if (direction[1] < 0) {
            this.go(true);
          } else {
            this.go(false);
          }
        }*/
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
    if (!this.accessibilityModes?.reducedMotionMode) {
      setTimeout(() => {
        this.swipeAnimation = 'gone';
      }, QuizAnimationDurationOut + QuizAnimationDelay);
      setTimeout(() => {
        this.swipeAnimation = animation;
      }, QuizAnimationDelay);
    }
  }

  private changePage(forward: boolean) {
    const timeout = this.accessibilityModes?.reducedMotionMode ? QuizAnimationDelay : QuizAnimationDelay + QuizAnimationDurationOut - 20;
    setTimeout(() => {
      if (forward && this.next) {
        this.router.navigate([this.next]);
      } else if (forward) {
        this.router.navigate(['/quiz/' + ResultUrl]);
      } else {
        this.router.navigate([this.prev]);
      }
    }, timeout);
  }
}
