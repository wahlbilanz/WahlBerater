import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppPartialState } from '../../../../+state/app.reducer';
import * as AppSelectors from '../../../../+state/app.selectors';

@Component({
  selector: 'app-thesis-list-page',
  templateUrl: './claim-list-page.component.html',
  styleUrls: ['./claim-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimListPageComponent implements OnInit {
  sortedData = this.store.pipe(select(AppSelectors.getCategoriesWithClaims));

  constructor(private store: Store<AppPartialState>) {}

  ngOnInit(): void {}
}
