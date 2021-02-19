import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionTemplatesComponent } from './decision-templates.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { PartyRoutingModule } from '../../party/party-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PipesModule } from '../../pipes/pipes.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../+state/app.reducer';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('DecisionTemplatesComponent', () => {
  let component: DecisionTemplatesComponent;
  let fixture: ComponentFixture<DecisionTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecisionTemplatesComponent],
      imports: [
        CommonModule,
        NzBadgeModule,
        NzIconModule.forRoot(icons),
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
    fixture = TestBed.createComponent(DecisionTemplatesComponent);
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
