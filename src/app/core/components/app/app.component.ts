import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Host, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as AppActions from '../../../+state/app.actions';
import { QuizFirstPage, ResultUrl } from '../../../+state/app.models';
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
  public navRightOffset = 16;

  public ResultUrlPath = ResultUrl;
  public QuizFirstPagePath = QuizFirstPage;
  public lastQuizPage = this.store.pipe(select(AppSelectors.getLastQuizPage));

  @ViewChild('navToggle', { read: ElementRef, static: true }) navToggleElement: ElementRef;

  @HostBinding('class.accessible')
  public accessibilityModeActive = false;

  @HostBinding('@.disabled')
  @HostBinding('nzNoAnimation')
  @HostBinding('class.no-animation')
  @HostBinding('class.nz-animate-disabled')
  public reducedMotionModeActive = false;

  private accessibilityModeSubscription: Subscription;

  constructor(private store: Store<AppPartialState>, private breakpointService: NzBreakpointService) {
    this.breakpointService.subscribe(siderResponsiveMap, true).subscribe((activeBreakpoints) => {
      this.store.dispatch(AppActions.updateActiveBreakpoints({ activeBreakpoints }));
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.calculateNavOffset();
  }

  ngOnInit() {
    // first things first! Let's load some data.
    this.store.dispatch(AppActions.loadData());
    // initially calculate offset for nav container
    this.calculateNavOffset();
    // enable NgRx pipeline for global accessibility annotations
    this.accessibilityModePipe();
  }

  toggleMenu(event: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    this.store.dispatch(AppActions.toggleMenu({}));
  }

  /** Hides menu, when main container received click */
  @HostListener('click')
  mainClicked(event: MouseEvent) {
    this.store.dispatch(AppActions.toggleMenu({ open: false }));
  }

  private calculateNavOffset() {
    // check for breakpoint (max-width: $wb-breakpoint-small) must kept in sync with scss!
    if (document.body.clientWidth <= 576) {
      this.navRightOffset = 0;
    } else if (!!this.navToggleElement && !!this.navToggleElement.nativeElement) {
      const el: HTMLElement = this.navToggleElement.nativeElement;
      this.navRightOffset = document.body.clientWidth - (el.offsetLeft + el.clientWidth) + 6;
    }
  }

  private accessibilityModePipe() {
    if (!!this.accessibilityModeSubscription) {
      this.accessibilityModeSubscription.unsubscribe();
    }

    this.accessibilityModeSubscription = this.store
      .pipe(select(AppSelectors.getAllAccessibilityModes), debounceTime(100))
      .subscribe((modes) => {
        this.reducedMotionModeActive = modes.reducedMotionMode;
        this.accessibilityModeActive = modes.accessibilityMode;
      });
  }
}
