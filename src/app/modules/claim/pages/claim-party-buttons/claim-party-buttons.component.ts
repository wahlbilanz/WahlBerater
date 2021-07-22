import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DecisionTemplatesComponent } from '../../../helpers/decision-templates/decision-templates.component';
import { Claim } from '../../../../definitions/models/claim.model';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { PartyScoreResult } from '../../../../definitions/models/results.model';
import { candidateKeyValueSorter } from '../../../../definitions/functions/candidate-sort.function';
import { Position } from '../../../../definitions/models/position.model';
import { Score } from '../../../../definitions/models/score.model';
import { PartyDecisionThreshold } from '../../../../+state/app.models';

@Component({
  selector: 'app-claim-party-buttons',
  templateUrl: './claim-party-buttons.component.html',
  styleUrls: ['./claim-party-buttons.component.scss'],
})
export class ClaimPartyButtonsComponent implements OnInit {
  @ViewChild('decisionTemplates', { static: true }) decisionTemplates: DecisionTemplatesComponent;

  @Input() claimId: string;
  @Input() claim: Claim;
  @Input() votes: Votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() partySeq: string[];

  @Input() partyScoreResult: PartyScoreResult;
  @Input() showCandidates = false;

  candidateSorter = candidateKeyValueSorter;

  constructor() {}

  ngOnInit(): void {
    if (!this.partySeq && this.politicalData) {
      this.partySeq = Object.keys(this.politicalData.parties);
    }
  }

  getPartyAlignment(direction: number, userDecision: Vote): number {
    if (direction > 1 && userDecision && userDecision.decision > 0 && userDecision.fav) {
      return 2;
    } else if (direction > PartyDecisionThreshold) {
      if (userDecision?.decision > 0) {
        return 2;
      } else {
        return 1;
      }
    } else if (direction < -1 && userDecision && userDecision.decision < 0 && userDecision.fav) {
      return -2;
    } else if (direction < -PartyDecisionThreshold) {
      if (userDecision?.decision < 0) {
        return -2;
      } else {
        return -1;
      }
    } else {
      return 0;
    }
  }

  getPartyTemplate(direction: number, userDecision: Vote): TemplateRef<any> {
    if (direction > 1 && userDecision && userDecision.decision > 0 && userDecision.fav) {
      return this.decisionTemplates.yesyesTempleate;
    } else if (direction > 0.5) {
      if (userDecision?.decision > 0) {
        return this.decisionTemplates.yesTempleate;
      } else {
        return this.decisionTemplates.yesDisagreeTempleate;
      }
    } else if (direction < -1 && userDecision && userDecision.decision < 0 && userDecision.fav) {
      return this.decisionTemplates.nonoTempleate;
    } else if (direction < 0.5) {
      if (userDecision?.decision < 0) {
        return this.decisionTemplates.noTempleate;
      } else {
        return this.decisionTemplates.noDisagreeTempleate;
      }
    } else {
      return this.decisionTemplates.skipTempleate;
    }
  }

  getCandidateTemplate(candidateDecision: Position, candidateScore: Score, userDecision: Vote): TemplateRef<any> {
    if (!candidateScore || candidateScore.score === 0) {
      if (candidateDecision?.vote > 0) {
        return this.decisionTemplates.yesDisagreeTempleate;
      } else if (candidateDecision?.vote < 0) {
        return this.decisionTemplates.noDisagreeTempleate;
      }
      return this.decisionTemplates.skipTempleate;
    }

    if (candidateDecision.vote > 0) {
      if (userDecision && candidateDecision.vote > 1 && userDecision.decision > 0 && userDecision.fav) {
        return this.decisionTemplates.yesyesTempleate;
      }
      if (userDecision?.decision > 0) {
        return this.decisionTemplates.yesTempleate;
      }
      return this.decisionTemplates.yesDisagreeTempleate;
    } else {
      if (userDecision && candidateDecision.vote < -1 && userDecision.decision < 0 && userDecision.fav) {
        return this.decisionTemplates.nonoTempleate;
      }
      if (userDecision?.decision < 0) {
        return this.decisionTemplates.noTempleate;
      }
      return this.decisionTemplates.noDisagreeTempleate;
    }
  }

  getStarTemplate(): TemplateRef<any> {
    return this.decisionTemplates.starTempleate;
  }
}
