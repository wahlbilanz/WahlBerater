import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppActions from '../../../+state/app.actions';
import * as AppSelectors from '../../../+state/app.selectors';
import { QuizState, ResultUrl } from '../../../+state/app.models';

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss'],
})
export class NavigationContainerComponent implements OnInit {
  // TODO kann weg?
  public QuizStateEnum = QuizState;
  public quizState = this.store.pipe(select(AppSelectors.getQuizState));


  public ResultUrlPath = ResultUrl;
  public lastQuizPage = this.store.pipe(select(AppSelectors.getLastQuizPage));

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}
}
