import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AccessibilityModes, AccessibleUrl, AccessibleUrlFragment, IncludeCandidates } from '../../../../+state/app.models';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../../+state/app.selectors';
import { Subscription } from 'rxjs';
import { AppPartialState } from '../../../../+state/app.reducer';

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
  private subscriptions: Subscription[] = [];
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  public AccessibleUrlPath = AccessibleUrl;

  constructor(private store: Store<AppPartialState>) {
    this.subscriptions.push(
      this.store.pipe(select(AppSelectors.getAllAccessibilityModes)).subscribe((am) => (this.accessibilityModes = am)),
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }
}
