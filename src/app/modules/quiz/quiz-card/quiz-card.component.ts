import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import { Router } from '@angular/router';
import { Claim } from '../../../definitions/models/claim.model';
import { Category } from '../../../definitions/models/category.model';
import { vote } from '../../../+state/app.actions';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss'],
})
export class QuizCardComponent implements OnInit, OnChanges {
  votes = this.store.pipe(select(AppSelectors.getVotes));
  @Input() category: Category;
  @Input() claimId: string;
  @Input() claim: Claim;
  @Input() next: string;
  @Input() prev: string;

  fav: boolean;
  decision: number;

  constructor(private store: Store<AppPartialState>, private router: Router) {
  }

  ngOnChanges(): void {
    console.log ('prev is ', this.prev);
    this.fav = false;
    this.decision = 0;
    this.votes.pipe(first()).subscribe((v) => {
      if (this.claimId in v) {
        this.fav = v[this.claimId].fav;
        this.decision = v[this.claimId].decision;
      }
    });
    if (this.claimId === 'howto') {
      this.category = {
        color: '#333',
        title: 'Howto'
      };
      this.claim = {
        category: 'howto',
        description: 'Hintergrundinformationen, um die These einordnen zu können. Bisschen Erklärung wie das Quiz funktioniert.',
        provenance: [],
        title: 'Thesen sollten relevant und kontrovers sein.'
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
    this.updateVote(true);
  }

  yes(): void {
    if (this.decision === 1) {
      this.decision = 0;
    } else {
      this.decision = 1;
    }
    this.updateVote(true);
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
          this.router.navigate(['/quiz/auswertung']);
        }
      }, 300);
    }
  }
}
