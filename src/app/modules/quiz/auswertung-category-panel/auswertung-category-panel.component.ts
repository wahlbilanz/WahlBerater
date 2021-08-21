import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { AccessibilityModes, AccessibleUrl, AccessibleUrlFragment, IncludeCandidates, RenderingDelay } from '../../../+state/app.models';
import { Subject } from 'rxjs';
import { AGREEMENT } from '../../../definitions/enums/agreement.enum';
import { takeUntil } from 'rxjs/operators';

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

  includeCandidates = IncludeCandidates;

  public agreement = AGREEMENT;

  public accessibilityModes?: AccessibilityModes;
  public AccessibleUrlPath = AccessibleUrl;
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  private destroy$: Subject<void> = new Subject<void>();

  activePanels: boolean[];
  renderRows = 2;

  constructor(private store: Store<AppPartialState>, private ref: ChangeDetectorRef) {
    this.store
      .pipe(select(AppSelectors.getAllAccessibilityModes), takeUntil(this.destroy$))
      .subscribe((am) => (this.accessibilityModes = am));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    setTimeout(() => {
      this.renderRows = 1000;
      this.ref.markForCheck();
    }, RenderingDelay);
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
