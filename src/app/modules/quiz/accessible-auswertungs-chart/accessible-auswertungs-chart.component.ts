import { Component, Input, OnInit } from '@angular/core';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { CategoryMap } from '../../../definitions/models/category.model';
import { ClaimMap } from '../../../definitions/models/claim.model';
import { PartyScoreResult } from '../../../definitions/models/results.model';
import { Store } from '@ngrx/store';
import { AppPartialState } from '../../../+state/app.reducer';
import { candidateKeyValueSorter } from 'src/app/definitions/functions/candidate-sort.function';

@Component({
  selector: 'app-accessible-auswertungs-chart',
  templateUrl: './accessible-auswertungs-chart.component.html',
  styleUrls: ['./accessible-auswertungs-chart.component.scss'],
})
export class AccessibleAuswertungsChartComponent implements OnInit {
  @Input() votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() categories: CategoryMap;
  @Input() claims: ClaimMap;

  @Input() partyScoreResult: PartyScoreResult;
  @Input() showCandidates = false;

  candidateSorter = candidateKeyValueSorter;
  nCandidates: number[];
  displayCandidates: number[];

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {
    this.displayCandidates = this.partyScoreResult.partyScores.map((_) => 7);
    this.nCandidates = this.partyScoreResult.partyScores.map((s) => Object.keys(s.candidates).length);
  }

  showAll(i: number): void {
    this.displayCandidates[i] = this.nCandidates[i] + 1;
  }
}
