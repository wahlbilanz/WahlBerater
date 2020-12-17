import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Position} from '../../../../definitions/models/position.model';
import {Claim} from '../../../../definitions/models/claim.model';
import {PersonalCandidateMap, PoliticalCandidateMap} from '../../../../definitions/models/candidate.model';
import {PoliticalData} from '../../../../definitions/models/political.data.model';
import {Votes} from '../../../../definitions/models/votes.mode';

@Component({
  selector: 'app-claim-candidate-viz',
  templateUrl: './claim-candidate-viz.component.html',
  styleUrls: ['./claim-candidate-viz.component.scss']
})
export class ClaimCandidateVizComponent implements OnInit {

  @ViewChild('nono', {static : true}) nonoTempleate: TemplateRef<any>;
  @ViewChild('no', {static : true}) noTempleate: TemplateRef<any>;
  @ViewChild('yes', {static : true}) yesTempleate: TemplateRef<any>;
  @ViewChild('yesyes', {static : true}) yesyesTempleate: TemplateRef<any>;
  @ViewChild('skip', {static : true}) skipTempleate: TemplateRef<any>;

  @Input() claimId: string;
  @Input() claim: Claim;
  @Input() votes: Votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;

  constructor() { }

  ngOnInit(): void {
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
