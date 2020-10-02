import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as AppActions from '../../../+state/app.actions';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isMenuOpen = this.store.pipe(select(AppSelectors.isMenuOpen));

  constructor(private store: Store<AppPartialState>) {}

  public toggleMenu(event) {
    this.store.dispatch(AppActions.toggleMenu({ open: event }));
  }
}
