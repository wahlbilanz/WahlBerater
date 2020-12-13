import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AppSelectors from '../../../+state/app.selectors';
import {Category} from '../../../definitions/models/category.model';
import {AppPartialState} from '../../../+state/app.reducer';
import {PoliticalCandidateMap} from '../../../definitions/models/candidate.model';

@Component({
  selector: 'app-auswertung-category-panel',
  templateUrl: './auswertung-category-panel.component.html',
  styleUrls: ['./auswertung-category-panel.component.scss']
})
export class AuswertungCategoryPanelComponent implements OnInit {

  @Input() categoryId: string;
  @Input() category: Category;
  @Input() votes;
  @Input() candidates: PoliticalCandidateMap;
  claims;

  constructor(private store: Store<AppPartialState>) { }

  ngOnInit(): void {
    this.store.pipe(select(AppSelectors.getClaimsByCategory, { id: this.categoryId })).subscribe(c => {
      // console.log (this.categoryId);
      // console.log (this.category);
      console.log (this.candidates);
      this.claims = c;
    });

  }

}
