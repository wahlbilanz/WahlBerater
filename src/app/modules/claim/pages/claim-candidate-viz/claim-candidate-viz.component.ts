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
import { candidateValueSorter } from 'src/app/definitions/functions/candidate-sort.function';
import { IncludeCandidates, PartyDecisionThreshold } from '../../../../+state/app.models';
import { getAgreement } from '../../../../definitions/functions/agreement.function';
import { AGREEMENT } from '../../../../definitions/enums/agreement.enum';

@Component({
  selector: 'app-claim-candidate-viz',
  templateUrl: './claim-candidate-viz.component.html',
  styleUrls: ['./claim-candidate-viz.component.scss'],
})
export class ClaimCandidateVizComponent implements OnInit {
  @ViewChild('decisionTemplates', { static: true }) decisionTemplates: DecisionTemplatesComponent;

  @Input() claimId: string;
  @Input('claim') set currentClaim(c: Claim) {
    this.claim = c;
  }
  @Input('votes') set voteData(v: Votes) {
    this.votes = v;
  }
  @Input('politicalData') set politicalDataSet(pds: PoliticalData) {
    this.politicalData = pds;
  }
  @Input('personalCandidates') set personalCandidatesSet(pcs: PersonalCandidateMap) {
    this.personalCandidates = pcs;
  }
  @Input('partySeq') set partySequence(ps: string[]) {
    this.partySeq = ps;
  }

  @Input('partyScoreResult') set partyScoreResults(psr: PartyScoreResult) {
    this.partyScoreResult = psr;
    this.init();
  }
  @Input() showCandidates = IncludeCandidates;

  partyScoreResult: PartyScoreResult;
  partySeq: string[];
  politicalData: PoliticalData;
  personalCandidates: PersonalCandidateMap;
  votes: Votes;
  claim: Claim;

  public agreement = AGREEMENT;
  voteThreshold = PartyDecisionThreshold;

  // candidateSorter = candidateKeyValueSorter;
  PartyDecisionThreshold = PartyDecisionThreshold;

  activePanels: boolean[];
  candidates: { [party: string]: string[] } = {};

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (!this.partySeq && this.politicalData) {
      this.partySeq = Object.keys(this.politicalData.parties);
    }
    this.activePanels = [];
    if (this.partyScoreResult) {
      for (const c in this.partyScoreResult?.partyScores) {
        if (this.partyScoreResult.partyScores.hasOwnProperty(c)) {
          this.activePanels.push(false);
          this.candidates[this.partyScoreResult?.partyScores[c].party] = Object.values(this.partyScoreResult.partyScores[c].candidates)
            .sort(candidateValueSorter)
            .map((candidate) => candidate.id);
        }
      }
    }
  }

  calcAgreement(party: number, user: Vote): AGREEMENT {
    return getAgreement(party, user);
  }
  /*
  getPartyTemplate(direction: number, userDecision: Vote): TemplateRef<any> {
    if (direction > 1 && userDecision && userDecision.decision > 0 && userDecision.fav) {
      return this.decisionTemplates.yesyesTempleate;
    } else if (direction > PartyDecisionThreshold) {
      if (userDecision?.decision > 0) {
        return this.decisionTemplates.yesTempleate;
      } else {
        return this.decisionTemplates.yesDisagreeTempleate;
      }
    } else if (direction < -1 && userDecision && userDecision.decision < 0 && userDecision.fav) {
      return this.decisionTemplates.nonoTempleate;
    } else if (direction < -PartyDecisionThreshold) {
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
  }*/

  activate(i: number): void {
    this.activePanels[i] = true;
  }
}
