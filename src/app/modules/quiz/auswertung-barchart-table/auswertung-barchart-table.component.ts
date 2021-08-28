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
import { shadeColor } from '../../../definitions/functions/shade-color.function';

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
  public partyIds = this.store.pipe(select(AppSelectors.getPartyIds));

  @Input('scoreResult') set score(psr: PartyScoreResult) {
    this.partyScoreResult = psr;
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
  tiksPadding: number;

  axeAnnotations: number[] = [...Array(10).keys()].map((x) => (x + 1) * 10);

  constructor(private store: Store<AppPartialState>, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.displayCandidates = this.partyScoreResult.partyScores.map((_) => 7);
    this.nCandidates = this.partyScoreResult.partyScores.map((s) => Object.keys(s.candidates).length);
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
      return partyColor === '#000000' || partyColor === '#000' ? '#555' : shadeColor(partyColor, -20);
    }
  }
}
