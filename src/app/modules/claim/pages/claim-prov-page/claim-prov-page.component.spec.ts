import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProvPageComponent } from './claim-prov-page.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from '../../../documentation/documentation-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';
import { ClaimRoutingModule } from '../../claim-routing.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { CandidateModule } from '../../../candidate/candidate.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PipesModule } from '../../../pipes/pipes.module';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { RouterTestingModule } from '@angular/router/testing';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('ThesisProvPageComponent', () => {
  let component: ClaimProvPageComponent;
  let fixture: ComponentFixture<ClaimProvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimProvPageComponent],
      imports: [
        CommonModule,
        ClaimRoutingModule,
        NzListModule,
        CandidateModule,
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
    fixture = TestBed.createComponent(ClaimProvPageComponent);
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
