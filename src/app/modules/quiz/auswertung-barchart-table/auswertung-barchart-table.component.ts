import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { candidateKeyValueSorter } from 'src/app/definitions/functions/candidate-sort.function';
import { AppPartialState } from '../../../+state/app.reducer';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { CategoryMap } from '../../../definitions/models/category.model';
import { ClaimMap } from '../../../definitions/models/claim.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { CandidateResult, PartyScoreResult } from '../../../definitions/models/results.model';

@Component({
  selector: 'app-auswertung-barchart-table',
  templateUrl: './auswertung-barchart-table.component.html',
  styleUrls: ['./auswertung-barchart-table.component.scss'],
})
export class AuswertungBarchartTableComponent implements OnInit {
  @Input() votes;
  @Input() politicalData: PoliticalData;
  @Input() personalCandidates: PersonalCandidateMap;
  @Input() categories: CategoryMap;
  @Input() claims: ClaimMap;

  @Input('scoreResult') set score(psr: PartyScoreResult) {
    this.partyScoreResult = psr;
    this.recalcAxes();
  }

  partyScoreResult: PartyScoreResult;
  @Input() showCandidates = false;

  candidateSorter = candidateKeyValueSorter;
  displayCandidates: number[];
  nCandidates: number[];
  maxValueArray: number[];

  axeTiksWidth: number;
  tiksPadding: number;

  constructor(private store: Store<AppPartialState>) {}

  /**
   * this is just a hack to get an array with increasing numbers [0..maxValue) in frontend...
   */
  /*maxValueArray(): number[] {
    const a = [...Array(this.partyScoreResult.maxValue).keys()];
    return a;
  }*/

  ngOnInit(): void {
    this.recalcAxes();
    // this.maxValueArray = [...Array(Math.ceil(Math.max(this.partyScoreResult.maxValue, this.partyScoreResult.maxParty))).keys()];
    this.displayCandidates = this.partyScoreResult.partyScores.map((_) => 7);
    this.nCandidates = this.partyScoreResult.partyScores.map((s) => Object.keys(s.candidates).length);
  }

  recalcAxes() {
    this.maxValueArray = [];
    const maxValue = Math.max(this.partyScoreResult.maxValue, this.partyScoreResult.maxParty);
    const max = Math.floor(Math.ceil(maxValue) / 10) * 10;
    for (let i = 0; i < max; i += max / 10) {
      this.maxValueArray.push(i + max / 10);
    }
    this.axeTiksWidth = (100 * (max / maxValue)) / 10; // 100 * ((max - (mp % 10)) / 10) / mp;
    this.tiksPadding = (100 * (maxValue - max)) / maxValue;
    console.log(max, this.maxValueArray, this.axeTiksWidth, this.tiksPadding);
  }

  showAll(i: number): void {
    this.displayCandidates[i] = this.nCandidates[i] + 1;
  }
}
