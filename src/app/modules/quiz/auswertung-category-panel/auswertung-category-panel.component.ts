import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AppSelectors from '../../../+state/app.selectors';
import {Category} from '../../../definitions/models/category.model';
import {AppPartialState} from '../../../+state/app.reducer';
import {PersonalCandidateMap, PoliticalCandidateMap} from '../../../definitions/models/candidate.model';
import {Position} from '../../../definitions/models/position.model';
import {ClaimMap} from '../../../definitions/models/claim.model';

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
  @Input() claims: ClaimMap;

  @ViewChild('nono', {static : true}) nonoTempleate: TemplateRef<any>;
  @ViewChild('no', {static : true}) noTempleate: TemplateRef<any>;
  @ViewChild('yes', {static : true}) yesTempleate: TemplateRef<any>;
  @ViewChild('yesyes', {static : true}) yesyesTempleate: TemplateRef<any>;
  @ViewChild('skip', {static : true}) skipTempleate: TemplateRef<any>;

  constructor(private store: Store<AppPartialState>) { }

  ngOnInit(): void {
    // TODO is this necessary!?
    /*this.store.pipe(select(AppSelectors.getClaimsByCategory, { id: this.categoryId })).subscribe(c => {
      this.claims = c;
    });*/

  }

  getUserTemplate(userDecision: any): TemplateRef<any> {
    if (!userDecision || userDecision === 0) {
      return this.skipTempleate;
    }

    if (userDecision.decision > 0) {
      if (userDecision.fav) {
        return this.yesyesTempleate;
      }
      return this.yesTempleate;
    } else {
      if (userDecision.fav) {
        return this.nonoTempleate;
      }
      return this.noTempleate;
    }
  }

  getCandidateTemplate(candidateDecision: Position, userDecision: any): TemplateRef<any> {
    if (!candidateDecision || candidateDecision.vote === 0)  {
      return this.skipTempleate;
    }

    if (candidateDecision.vote > 0) {
      if (candidateDecision.vote === 2 && userDecision && userDecision.decision > 0 && userDecision.fav) {
        return this.yesyesTempleate;
      }
      return this.yesTempleate;
    } else {
      if (candidateDecision.vote === -2 && userDecision && userDecision.decision < 0 && userDecision.fav) {
        return this.nonoTempleate;
      }
      return this.noTempleate;
    }
  }
}
