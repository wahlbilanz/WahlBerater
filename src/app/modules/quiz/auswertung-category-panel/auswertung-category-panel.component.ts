import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { Category } from '../../../definitions/models/category.model';
import { ClaimMap } from '../../../definitions/models/claim.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { PartyScoreResult } from '../../../definitions/models/results.model';
import { Vote, Votes } from '../../../definitions/models/votes.mode';
import { DecisionTemplatesComponent } from '../../helpers/decision-templates/decision-templates.component';
import * as AppSelectors from '../../../+state/app.selectors';
import { AccessibilityModes, AccessibleUrl, AccessibleUrlFragment } from '../../../+state/app.models';

@Component({
  selector: 'app-auswertung-category-panel',
  templateUrl: './auswertung-category-panel.component.html',
  styleUrls: ['./auswertung-category-panel.component.scss'],
})
export class AuswertungCategoryPanelComponent implements OnInit {
  @ViewChild('decisionTemplates', { static: true }) decisionTemplates: DecisionTemplatesComponent;
  @Input() categoryId: string;
  @Input() category: Category;
  @Input() votes: Votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() claims: ClaimMap;

  @Input() partyScoreResult: PartyScoreResult;
  @Input() showCandidates = false;
  public accessibilityModes?: AccessibilityModes;
  public AccessibleUrlPath = AccessibleUrl;
  public sAccessibleUrlFragment = AccessibleUrlFragment;

  constructor(private store: Store<AppPartialState>) {
    this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => (this.accessibilityModes = am));
  }

  ngOnInit(): void {
    // TODO is this necessary!?
    /*this.store.pipe(select(AppSelectors.getClaimsByCategory, { id: this.categoryId })).subscribe(c => {
      this.claims = c;
    });*/
  }

  /*getClaimLink(claimId: string): string {
    if (this.accessibilityModes?.accessibilityMode) {
      return '/quiz/' + AccessibleUrl + '#accessible-' + claimId;
    } else {
      return '/quiz/' + claimId;
    }
  }*/

  getUserTemplate(userDecision: Vote): TemplateRef<any> | undefined {
    if (this.decisionTemplates) {
      if (!userDecision || userDecision.decision === 0) {
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
    return undefined;
  }
}
