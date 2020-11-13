import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';
import {ActivatedRoute} from '@angular/router';
import {Claim} from '../../../definitions/models/claim.model';
import {Category} from '../../../definitions/models/category.model';
import {vote} from '../../../+state/app.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
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

  constructor(private store: Store<AppPartialState>) { }

  ngOnChanges(): void {
    this.fav = false;
    this.decision = 0;
    this.votes.subscribe(v => {
      if (this.claimId in v) {
        this.fav = v[this.claimId].fav;
        this.decision = v[this.claimId].decision;
      }
    }).unsubscribe();
  }

  ngOnInit(): void {
    // Todo: remove debug
    this.store.pipe(select(AppSelectors.getVotes)).subscribe(x => { console.log(x); });
  }

  toggleFav(): void {
    this.fav = !this.fav;
    this.updateVote();
  }

  no(): void {
    if (this.decision === -1) {
      this.decision = 0;
    } else {
      this.decision = -1;
    }
    this.updateVote();
  }

  yes(): void {
    if (this.decision === 1) {
      this.decision = 0;
    } else {
      this.decision = 1;
    }
    this.updateVote();
  }


  private updateVote(): void {
    this.store.dispatch(vote ({claimId: this.claimId, decision: this.decision, fav: this.fav}));
  }
}
