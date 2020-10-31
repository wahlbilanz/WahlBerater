import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import * as AppActions from '../../../+state/app.actions';
import { AppPartialState } from '../../../+state/app.reducer';
import * as AppSelectors from '../../../+state/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('100ms ease-in', style({ opacity: 0.5, transform: 'translateY(0px)' })),
        animate('100ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0px)' }),
        animate('100ms ease-in', style({ opacity: 0.5, transform: 'translateY(0px)' })),
        animate('100ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public isMenuOpen = this.store.pipe(select(AppSelectors.isMenuOpen));

  constructor(private store: Store<AppPartialState>, private breakpointService: NzBreakpointService) {
    this.breakpointService.subscribe(siderResponsiveMap, true).subscribe((activeBreakpoints) => {
      this.store.dispatch(AppActions.updateActiveBreakpoints({ activeBreakpoints }));
    });
  }

  ngOnInit() {
    // first things first! Let's load some data.
    this.store.dispatch(AppActions.loadData());
  }

  toggleMenu(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    this.store.dispatch(AppActions.toggleMenu({}));
  }
}
