import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Position } from '../../../../definitions/models/position.model';
import { Claim } from '../../../../definitions/models/claim.model';
import { PersonalCandidateMap, PoliticalCandidateMap } from '../../../../definitions/models/candidate.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { Votes } from '../../../../definitions/models/votes.mode';
import { DecisionTemplatesComponent } from '../../../helpers/decision-templates/decision-templates.component';

@Component({
  selector: 'app-claim-candidate-viz',
  templateUrl: './claim-candidate-viz.component.html',
  styleUrls: ['./claim-candidate-viz.component.scss'],
})
export class ClaimCandidateVizComponent implements OnInit {
  @ViewChild('decisionTemplates', { static: true }) decisionTemplates: DecisionTemplatesComponent;

  @Input() claimId: string;
  @Input() claim: Claim;
  @Input() votes: Votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;

  constructor() {}

  ngOnInit(): void {}

  getCandidateTemplate(candidateDecision: Position, userDecision: any): TemplateRef<any> {
    if (!candidateDecision || candidateDecision.vote === 0) {
      return this.decisionTemplates.skipTempleate;
    }

    if (candidateDecision.vote > 0) {
      if (candidateDecision.vote === 2 && userDecision && userDecision.decision > 0 && userDecision.fav) {
        return this.decisionTemplates.yesyesTempleate;
      }
      return this.decisionTemplates.yesTempleate;
    } else {
      if (candidateDecision.vote === -2 && userDecision && userDecision.decision < 0 && userDecision.fav) {
        return this.decisionTemplates.nonoTempleate;
      }
      return this.decisionTemplates.noTempleate;
    }
  }
}
