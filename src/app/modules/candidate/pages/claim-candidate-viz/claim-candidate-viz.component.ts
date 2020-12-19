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

  constructor() {}

  ngOnInit(): void {
    if (!this.partySeq) {
      this.partySeq = Object.keys(this.politicalData.parties);
      console.log(this.partySeq);
    }
    console.log(this.partySeq);
  }

  getPartyTemplate(direction: number, userDecision: Vote): TemplateRef<any> {
    if (direction > 1 && userDecision && userDecision.decision > 0 && userDecision.fav) {
      return this.decisionTemplates.yesyesTempleate;
    } else if (direction > 1 / 3) {
      return this.decisionTemplates.yesTempleate;
    } else if (direction < -1 && userDecision && userDecision.decision < 0 && userDecision.fav) {
      return this.decisionTemplates.nonoTempleate;
    } else if (direction < -1 / 3) {
      return this.decisionTemplates.noTempleate;
    } else {
      return this.decisionTemplates.skipTempleate;
    }
  }

  getCandidateTemplate(candidateDecision: Position, candidateScore: Score, userDecision: Vote): TemplateRef<any> {
    if (!candidateScore || candidateScore.score === 0) {
      if (candidateDecision.vote > 0) {
        return this.decisionTemplates.yesTempleate;
      } else if (candidateDecision.vote < 0) {
        return this.decisionTemplates.noTempleate;
      }
      return this.decisionTemplates.skipTempleate;
    }

    if (candidateDecision.vote > 0) {
      if (userDecision && candidateDecision.vote > 1 && userDecision.decision > 0 && userDecision.fav) {
        return this.decisionTemplates.yesyesTempleate;
      }
      return this.decisionTemplates.yesTempleate;
    } else {
      if (userDecision && candidateDecision.vote < -1 && userDecision.decision < 0 && userDecision.fav) {
        return this.decisionTemplates.nonoTempleate;
      }
      return this.decisionTemplates.noTempleate;
    }
  }

  getStarTemplate(): TemplateRef<any> {
    return this.decisionTemplates.starTempleate;
  }
}
