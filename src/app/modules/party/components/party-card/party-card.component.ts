import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';
import { Party } from '../../../../definitions/models/party.model';
import { PoliticalData } from '../../../../definitions/models/political.data.model';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { PartyResult } from '../../../../definitions/models/results.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-party-card',
  templateUrl: './party-card.component.html',
  styleUrls: ['./party-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyCardComponent implements OnInit, OnDestroy {
  @Input() partyId: string;
  @Input() public showSocialLinks = true;
  @Input() partyData: Party;
  @Input() politicalData: PoliticalData;
  @Input() personalData: PersonalCandidateMap;
  @Input('scores') set scores(s: PartyResult[]) {
    this.score = s?.find((p) => p.party === this.partyId);
    this.recalcAxes();
  }
  @Input() set maxParty(mp: number) {
    this.maxPartyValue = mp;
    this.recalcAxes();
  }

  axeTiksWidth: number;
  tiksPadding: number;
  partyCandidates: string[];
  score: PartyResult;
  maxPartyValue: number;
  maxValueArray: number[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppPartialState>) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store
      .pipe(select(AppSelectors.getCandidateListByPartyId, { partyId: this.partyId }), takeUntil(this.destroy$))
      .subscribe((candidates) => (this.partyCandidates = candidates));
  }

  recalcAxes() {
    // console.log(this.maxPartyValue);
    if (this.maxPartyValue) {
      this.maxValueArray = [];
      const max = Math.floor(this.maxPartyValue / 10) * 10;
      for (let i = 0; i < max; i += max / 10) {
        this.maxValueArray.push(i + max / 10);
      }
      this.axeTiksWidth = (100 * (max / this.maxPartyValue)) / 10; // 100 * ((max - (mp % 10)) / 10) / mp;
      this.tiksPadding = (100 * (this.maxPartyValue - max)) / this.maxPartyValue;
      // console.log(max, this.maxValueArray, this.axeTiksWidth, this.tiksPadding);
    }
  }
}
