import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswertungBarchartComponent } from './auswertung-barchart.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from '../quiz-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PipesModule } from '../../pipes/pipes.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { HelpersModule } from '../../helpers/helpers.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../+state/app.reducer';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { RouterTestingModule } from '@angular/router/testing';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('AuswertungBarchartComponent', () => {
  let component: AuswertungBarchartComponent;
  let fixture: ComponentFixture<AuswertungBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuswertungBarchartComponent],
      imports: [
        CommonModule,
        QuizRoutingModule,
        RouterTestingModule.withRoutes([]),

        NzIconModule.forRoot(icons),
        NzCollapseModule,
        NzListModule,
        NgApexchartsModule,
        PipesModule,
        NzTabsModule,
        NzToolTipModule,
        NzBadgeModule,
        HelpersModule,
        NzSwitchModule,
        FormsModule,
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
    fixture = TestBed.createComponent(AuswertungBarchartComponent);
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
