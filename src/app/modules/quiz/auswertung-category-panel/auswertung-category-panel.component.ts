import { Component, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { Category } from '../../../definitions/models/category.model';
import { ClaimMap, ClaimWithId } from '../../../definitions/models/claim.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { PartyScoreResult } from '../../../definitions/models/results.model';
import { Vote, Votes } from '../../../definitions/models/votes.mode';
import { DecisionTemplatesComponent } from '../../helpers/decision-templates/decision-templates.component';
import * as AppSelectors from '../../../+state/app.selectors';
import { AccessibilityModes, AccessibleUrl, AccessibleUrlFragment } from '../../../+state/app.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auswertung-category-panel',
  templateUrl: './auswertung-category-panel.component.html',
  styleUrls: ['./auswertung-category-panel.component.scss'],
})
export class AuswertungCategoryPanelComponent implements OnInit, OnDestroy {
  @ViewChild('decisionTemplates', { static: true }) decisionTemplates: DecisionTemplatesComponent;
  @Input() categoryId: string;
  @Input() category: Category;
  @Input() votes: Votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() claims: ClaimWithId[];

  @Input() partyScoreResult: PartyScoreResult;
  @Input() showCandidates = false;
  public accessibilityModes?: AccessibilityModes;
  public AccessibleUrlPath = AccessibleUrl;
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  private subscriptions: Subscription[] = [];

  activePanels: boolean[];

  constructor(private store: Store<AppPartialState>) {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => (this.accessibilityModes = am)),
    );
  }

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  ngOnInit(): void {
    // TODO is this necessary!?
    /*this.store.pipe(select(AppSelectors.getClaimsByCategory, { id: this.categoryId })).subscribe(c => {
      this.claims = c;
    });*/
    this.activePanels = [];
    for (const c in this.claims) {
      if (this.claims.hasOwnProperty(c)) {
        this.activePanels.push(false);
      }
    }
    // this.activePanels = this.claims
  }

  activate(i: number): void {
    this.activePanels[i] = true;
  }

  /*getClaimLink(claimId: string): string {
    if (this.accessibilityModes?.accessibilityMode) {
      return '/quiz/' + AccessibleUrl + '#accessible-' + claimId;
    } else {
      return '/quiz/' + claimId;
    }
  }*/
}
