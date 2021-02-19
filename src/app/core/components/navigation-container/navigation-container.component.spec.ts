import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContainerComponent } from './navigation-container.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../+state/app.reducer';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterTestingModule } from '@angular/router/testing';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { testAccessibility } from '../../../modules/helpers/test-helpers';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('NavigationContainerComponent', () => {
  let component: NavigationContainerComponent;
  let fixture: ComponentFixture<NavigationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationContainerComponent],
      imports: [
        BrowserModule,
        // CoreRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
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
        // NzIconModule,
        NzMenuModule,
        NzDividerModule,
        NzCheckboxModule,
        NzIconModule.forRoot(icons),
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
    testAccessibility(fixture.debugElement, done);
  });
});
