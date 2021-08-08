import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AccessibilityModes, AccessibleUrl, AccessibleUrlFragment, IncludeCandidates } from '../../../../+state/app.models';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../../+state/app.selectors';
import { Subject } from 'rxjs';
import { AppPartialState } from '../../../../+state/app.reducer';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-claim-links',
  templateUrl: './claim-links.component.html',
  styleUrls: ['./claim-links.component.scss'],
})
export class ClaimLinksComponent implements OnInit, OnDestroy {
  @Input() showMoreInfoLink = true;
  @Input() showQuizLink = true;
  @Input() claimId: string;
  includeCandidates = IncludeCandidates;
  public accessibilityModes?: AccessibilityModes;
  private destroy$: Subject<void> = new Subject<void>();
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  public AccessibleUrlPath = AccessibleUrl;

  constructor(private store: Store<AppPartialState>) {
    this.store
      .pipe(select(AppSelectors.getAllAccessibilityModes), takeUntil(this.destroy$))
      .subscribe((am) => (this.accessibilityModes = am));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
