import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimListPageComponent } from './claim-list-page.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { appReducer, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PipesModule } from '../../../pipes/pipes.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { testAccessibility } from '../../../helpers/test-helpers';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('ThesisListPageComponent', () => {
  let component: ClaimListPageComponent;
  let fixture: ComponentFixture<ClaimListPageComponent>;

  beforeEach(async () => {
    // @ts-ignore
    await TestBed.configureTestingModule({
      declarations: [ClaimListPageComponent],
      imports: [
        CommonModule,
        NzListModule,
        NzIconModule.forRoot(icons),
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(ClaimListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    testAccessibility(fixture.debugElement, done);
  });
});
