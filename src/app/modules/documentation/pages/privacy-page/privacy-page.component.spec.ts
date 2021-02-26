import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPageComponent } from './privacy-page.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';
import { DocumentationRoutingModule } from '../../documentation-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { testAccessibility } from '../../../helpers/test-helpers';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('PrivacyPageComponent', () => {
  let component: PrivacyPageComponent;
  let fixture: ComponentFixture<PrivacyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyPageComponent],
      imports: [
        CommonModule,
        DocumentationRoutingModule,
        NzBreadCrumbModule,
        NzIconModule.forRoot(icons),
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(PrivacyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    testAccessibility(fixture.debugElement, done);
  });
});
