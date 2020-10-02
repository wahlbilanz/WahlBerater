import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { map } from 'rxjs/operators';
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
  public fixMenu = this.store.pipe(
    select(AppSelectors.isBreakpointActive, { breakpoint: 'lg' }),
    map((active) => !active),
  );

  constructor(private store: Store<AppPartialState>, private breakpointService: NzBreakpointService) {
    this.breakpointService.subscribe(siderResponsiveMap, true).subscribe((activeBreakpoints) => {
      this.store.dispatch(AppActions.updateActiveBreakpoints({ activeBreakpoints }));
    });
  }

  public toggleMenu(event) {
    this.store.dispatch(AppActions.toggleMenu({ open: event }));
  }
}
