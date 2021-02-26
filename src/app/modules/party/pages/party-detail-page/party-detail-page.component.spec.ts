import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailPageComponent } from './party-detail-page.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
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
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { testAccessibility } from '../../../helpers/test-helpers';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('PartyDetailPageComponent', () => {
  let component: PartyDetailPageComponent;
  let fixture: ComponentFixture<PartyDetailPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartyDetailPageComponent],
      imports: [
        RouterTestingModule,
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
    fixture = TestBed.createComponent(PartyDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    testAccessibility(fixture.debugElement, done);
  });
});
