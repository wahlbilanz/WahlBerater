import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyListPageComponent } from './party-list-page.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from '../../../quiz/quiz-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PipesModule } from '../../../pipes/pipes.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CandidateModule } from '../../../candidate/candidate.module';
import { HelpersModule } from '../../../helpers/helpers.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';
import { PartyRoutingModule } from '../../party-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('PartyListPageComponent', () => {
  let component: PartyListPageComponent;
  let fixture: ComponentFixture<PartyListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartyListPageComponent],
      imports: [
        CommonModule,
        PartyRoutingModule,
        NzIconModule.forRoot(icons),
        NzToolTipModule,
        PipesModule,
        NzBreadCrumbModule,
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
    fixture = TestBed.createComponent(PartyListPageComponent);
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
