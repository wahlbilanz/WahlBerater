import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AppSelectors from '../../../+state/app.selectors';
import {Category} from '../../../definitions/models/category.model';
import {AppPartialState} from '../../../+state/app.reducer';
import {PersonalCandidateMap, PoliticalCandidateMap} from '../../../definitions/models/candidate.model';
import {Position} from '../../../definitions/models/position.model';
import {ClaimMap} from '../../../definitions/models/claim.model';
import {PoliticalData} from '../../../definitions/models/political.data.model';
import {DecisionTemplatesComponent} from '../../helpers/decision-templates/decision-templates.component';

@Component({
  selector: 'app-auswertung-category-panel',
  templateUrl: './auswertung-category-panel.component.html',
  styleUrls: ['./auswertung-category-panel.component.scss']
})
export class AuswertungCategoryPanelComponent implements OnInit {

  @Input() categoryId: string;
  @Input() category: Category;
  @Input() votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() claims: ClaimMap;

  @ViewChild('decisionTemplates', {static : true}) decisionTemplates: DecisionTemplatesComponent;

  constructor(private store: Store<AppPartialState>) { }

  ngOnInit(): void {
    // TODO is this necessary!?
    /*this.store.pipe(select(AppSelectors.getClaimsByCategory, { id: this.categoryId })).subscribe(c => {
      this.claims = c;
    });*/

  }

  getUserTemplate(userDecision: any): TemplateRef<any> {
    if (!userDecision || userDecision === 0) {
      return this.decisionTemplates.skipTempleate;
    }

    if (userDecision.decision > 0) {
      if (userDecision.fav) {
        return this.decisionTemplates.yesyesTempleate;
      }
      return this.decisionTemplates.yesTempleate;
    } else {
      if (userDecision.fav) {
        return this.decisionTemplates.nonoTempleate;
      }
      return this.decisionTemplates.noTempleate;
    }
  }
}
