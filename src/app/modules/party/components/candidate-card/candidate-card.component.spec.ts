import { getCandidatePersonalInfo } from '../../../../definitions/functions/getCandidatePersonalInfo';

declare var require: any;
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CandidateCardComponent } from './candidate-card.component';
import { CommonModule } from '@angular/common';
import { PartyRoutingModule } from '../../party-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PipesModule } from '../../../pipes/pipes.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PartyModule } from '../../party.module';
import { testAccessibility } from '../../../helpers/test-helpers';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);
const personalData: any = require('../../../../../assets/data/personal.json');
const politicalData: any = require('../../../../../assets/data/political.json');

describe('CandidateCardComponent', () => {
  let component: CandidateCardComponent;
  let fixture: ComponentFixture<CandidateCardComponent>;

  beforeEach(async () => {
    console.log('TEST');
    await TestBed.configureTestingModule({
      declarations: [CandidateCardComponent],
      imports: [
        PartyModule,
        RouterTestingModule,
        HttpClientTestingModule,
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
    console.log('TEST');
    fixture = TestBed.createComponent(CandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have personal data', (done) => {
    component.candidateId = 'cac2449a-f880-5404-8c85-755caea144a6';
    component.personalInfo = getCandidatePersonalInfo(personalData, component.candidateId);
    component.politicalInfo = politicalData.candidates[component.candidateId];
    fixture.detectChanges();

    testAccessibility(fixture.debugElement, done);
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    testAccessibility(fixture.debugElement, done);
  });
});
