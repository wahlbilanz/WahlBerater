import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibleQuizComponent } from './accessible-quiz.component';
import { testAccessibility } from '../../helpers/test-helpers';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from '../quiz-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzListModule } from 'ng-zorro-antd/list';
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
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('AccessibleQuizComponent', () => {
  let component: AccessibleQuizComponent;
  let fixture: ComponentFixture<AccessibleQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessibleQuizComponent],
      imports: [
        CommonModule,
        QuizRoutingModule,
        RouterTestingModule.withRoutes([]),

        NzIconModule.forRoot(icons),
        NzCollapseModule,
        NzListModule,
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
    fixture = TestBed.createComponent(AccessibleQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    expect(component).toBeTruthy();

    testAccessibility(fixture.debugElement, done);
  });
});
