import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as AppSelectors from '../../../../+state/app.selectors';
import { Subject } from 'rxjs';
import { AccessibilityModes, AccessibleUrlFragment } from 'src/app/+state/app.models';
import { AppPartialState } from 'src/app/+state/app.reducer';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
})
export class PrivacyPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private fragment?: string;
  public accessibilityModes?: AccessibilityModes;
  public sAccessibleUrlFragment = AccessibleUrlFragment;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private store: Store<AppPartialState>, private route: ActivatedRoute) {
    this.store
      .pipe(select(AppSelectors.getAllAccessibilityModes), takeUntil(this.destroy$))
      .subscribe((am) => (this.accessibilityModes = am));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.fragment.pipe(takeUntil(this.destroy$)).subscribe((fragment) => {
      this.fragment = fragment;
    });
  }

  ngAfterViewInit(): void {
    if (this.fragment) {
      try {
        if (this.accessibilityModes?.reducedMotionMode) {
          document.querySelector('#' + this.fragment)?.scrollIntoView();
        } else {
          setTimeout(() => {
            document.querySelector('#' + this.fragment)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }, 100);
        }
      } catch (e) {}
    }
  }
}
