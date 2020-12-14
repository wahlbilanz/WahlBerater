import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AppSelectors from '../../../+state/app.selectors';
import {Category} from '../../../definitions/models/category.model';
import {AppPartialState} from '../../../+state/app.reducer';
import {PersonalCandidateMap, PoliticalCandidateMap} from '../../../definitions/models/candidate.model';

@Component({
  selector: 'app-auswertung-category-panel',
  templateUrl: './auswertung-category-panel.component.html',
  styleUrls: ['./auswertung-category-panel.component.scss']
})
export class AuswertungCategoryPanelComponent implements OnInit {

  @Input() categoryId: string;
  @Input() category: Category;
  @Input() votes;
  @Input() politicalCandidates: PoliticalCandidateMap;
  @Input() personalCandidates: PersonalCandidateMap;
  claims;

  constructor(private store: Store<AppPartialState>) { }

  ngOnInit(): void {
    // TODO is this necessary!?
    this.store.pipe(select(AppSelectors.getClaimsByCategory, { id: this.categoryId })).subscribe(c => {
      this.claims = c;
    });

  }

}
