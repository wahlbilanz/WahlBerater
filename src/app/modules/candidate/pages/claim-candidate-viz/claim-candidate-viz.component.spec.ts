import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCandidateVizComponent } from './claim-candidate-viz.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { ClaimRoutingModule } from '../../../claim/claim-routing.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { CandidateModule } from '../../candidate.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PipesModule } from '../../../pipes/pipes.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';
import { CandidateRoutingModule } from '../../candidate-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { HelpersModule } from '../../../helpers/helpers.module';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { RouterTestingModule } from '@angular/router/testing';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('ClaimCandidateVizComponent', () => {
  let component: ClaimCandidateVizComponent;
  let fixture: ComponentFixture<ClaimCandidateVizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimCandidateVizComponent],
      imports: [
        CommonModule,
        CandidateRoutingModule,
        NzIconModule.forRoot(icons),
        RouterTestingModule.withRoutes([]),
        NzGridModule,
        NzCardModule,
        NzDescriptionsModule,
        NzDividerModule,
        NzCollapseModule,
        NgApexchartsModule,
        PipesModule,
        NzBadgeModule,
        HelpersModule,
        StoreModule.forRoot(
          {
            [STATE_FEATURE_KEY]: appReducer,
          },
          {
            metaReducers: [],
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true,
            },
          },
        ),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimCandidateVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    const debug: DebugElement = fixture.debugElement;

    axe.run(debug.nativeElement, (err, result) => {
      expect(err).toBe(null);
      console.log(result.violations);
      expect(result.violations.length).toBe(0);
      done();
    });
  });
});
