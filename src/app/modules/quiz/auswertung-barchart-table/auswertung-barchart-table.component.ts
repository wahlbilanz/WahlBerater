import { KeyValue } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { candidateKeyValueSorter } from 'src/app/definitions/functions/candidate-sort.function';
import { AppPartialState } from '../../../+state/app.reducer';
import { PersonalCandidateMap } from '../../../definitions/models/candidate.model';
import { CategoryMap, CategoryWithClaims } from '../../../definitions/models/category.model';
import { ClaimMap } from '../../../definitions/models/claim.model';
import { PoliticalData } from '../../../definitions/models/political.data.model';
import { CandidateResult, PartyScoreResult } from '../../../definitions/models/results.model';
import { RenderingDelay } from '../../../+state/app.models';
import { Observable } from 'rxjs';
import * as AppSelectors from '../../../+state/app.selectors';

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
  @Input() set showCandidates(b: boolean) {
    this.showCandidateBars = b;
    if (b) {
      this.showCandidatesNum = 0;
      this.showMoreCandidates();
    }
  }

  // sortedCategroies: Observable<CategoryWithClaims[]> = this.store.pipe(select(AppSelectors.getCategoriesWithClaims));

  showCandidateBars = false;
  showCandidatesNum = 0;
  showCandidatesNumInterval;

  candidateSorter = candidateKeyValueSorter;
  displayCandidates: number[];
  nCandidates: number[];
  maxValueArray: number[];

  axeTiksWidth: number;
  tiksPadding: number;

  constructor(private store: Store<AppPartialState>, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.recalcAxes();
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

  private showMoreCandidates() {
    this.showCandidatesNumInterval = setInterval(() => {
      if (this.showCandidatesNum++ > this.partyScoreResult?.partyScores?.length) {
        clearInterval(this.showCandidatesNumInterval);
      }
      this.ref.markForCheck();
    }, RenderingDelay);
  }

  public getBackground(partyColor: string, index: number): string {
    if (index % 2) {
      return partyColor;
    } else {
      const otherColor =
        partyColor === '#000000' || partyColor === '#000' ? '#555' : AuswertungBarchartTableComponent.shadeColor(partyColor, -20);
      const direction = '-45deg';
      return (
        'repeating-linear-gradient(' +
        direction +
        ',' +
        partyColor +
        ',' +
        partyColor +
        ' 5px,' +
        otherColor +
        ' 5px,' +
        otherColor +
        ' 10px)'
      );
    }
  }

  static shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.round((R * (100 + percent)) / 100);
    G = Math.round((G * (100 + percent)) / 100);
    B = Math.round((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16);
    const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16);
    const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16);

    return '#' + RR + GG + BB;
  }
}
