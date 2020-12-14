import { Component, Input, OnInit } from '@angular/core';
import { CandidateWithID } from '../../../../definitions/models/candidate.model';
import * as AppSelectors from '../../../../+state/app.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPartialState } from '../../../../+state/app.reducer';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit {
  @Input()
  set candidateId(id: string) {
    this.id = id;
    this.candidateData = this.store.pipe(select(AppSelectors.getCandidateById, { id }));
  }
  @Input()
  public showSocialLinks: boolean = true;

  public id: string;
  public candidateData: Observable<CandidateWithID>;

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}
}
