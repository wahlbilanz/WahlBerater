import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Position } from '../../../../definitions/models/position.model';
import { Claim } from '../../../../definitions/models/claim.model';
import {
  CandidatePersonalInfo,
  CandidatePoliticalInfo,
  PersonalCandidateMap,
  PoliticalCandidateMap,
} from '../../../../definitions/models/candidate.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { DecisionTemplatesComponent } from '../../../helpers/decision-templates/decision-templates.component';
import { PartyResult, PartyScoreResult } from '../../../../definitions/models/results.model';
import { Score } from '../../../../definitions/models/score.model';
import { getCandidatePersonalInfo } from '../../../../definitions/functions/getCandidatePersonalInfo';
import { candidateKeyValueSorter } from 'src/app/definitions/functions/candidate-sort.function';

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

  getPartyTemplate(direction: number, userDecision: Vote): TemplateRef<any> {
    if (direction > 1 && userDecision && userDecision.decision > 0 && userDecision.fav) {
      return this.decisionTemplates.yesyesTempleate;
    } else if (direction > 1 / 3) {
      if (userDecision?.decision > 0) {
        return this.decisionTemplates.yesTempleate;
      } else {
        return this.decisionTemplates.yesDisagreeTempleate;
      }
    } else if (direction < -1 && userDecision && userDecision.decision < 0 && userDecision.fav) {
      return this.decisionTemplates.nonoTempleate;
    } else if (direction < -1 / 3) {
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
      if (candidateDecision.vote > 0) {
        return this.decisionTemplates.yesDisagreeTempleate;
      } else if (candidateDecision.vote < 0) {
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
