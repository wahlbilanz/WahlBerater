import { Component, Input, OnInit } from '@angular/core';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { Vote, Votes } from '../../../../definitions/models/votes.mode';
import { getAgreement } from '../../../../definitions/functions/agreement.function';

@Component({
  selector: 'app-party-candidates-decision-table',
  templateUrl: './party-candidates-decision-table.component.html',
  styleUrls: ['./party-candidates-decision-table.component.scss'],
})
export class PartyCandidatesDecisionTableComponent implements OnInit {
  @Input() candidates: string[];
  @Input() partyId: string;
  @Input() personalData: PersonalCandidateMap;
  @Input() politicalData: PoliticalData;
  @Input() claimId: string;
  @Input() votes: Votes;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.candidates);
  }

  calcAgreement(party: number, user: Vote) {
    return getAgreement(party, user);
  }
}
