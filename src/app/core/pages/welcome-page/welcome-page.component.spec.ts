import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { WelcomePageComponent } from './welcome-page.component';
import { StoreModule } from '@ngrx/store';
import { appReducer, STATE_FEATURE_KEY } from '../../../+state/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from '../../core-routing.module';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

describe('WelcomePageComponent', () => {
  let router: Router;

  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
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
    fixture = TestBed.createComponent(WelcomePageComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('certain elements should have alt texts', () => {
    const debug: DebugElement = fixture.debugElement;

    let elements = debug.queryAll(By.css('i'));
    for (const element of elements) {
      expect(element.nativeElement.getAttribute('alt')).toBeTruthy(element);
    }
    // or there should be a span around..?
    // https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility

    elements = debug.queryAll(By.css('img'));
    for (const element of elements) {
      expect(element.nativeElement.getAttribute('alt')).toBeTruthy(element);
    }
  });

  it('inputs should be aria-labelledby', () => {
    const debug: DebugElement = fixture.debugElement;

    const elements = debug.queryAll(By.css('input'));
    for (const element of elements) {
      expect(element.nativeElement.getAttribute('aria-labelledby')).toBeTruthy(element);
      expect(debug.queryAll(By.css('#' + element.nativeElement.getAttribute('aria-labelledby'))).length).toBe(1);
    }
  });

  it('should react to keyboard events', () => {
    const debug: DebugElement = fixture.debugElement;
    const navigateSpy = spyOn(router, 'navigate');

    const element = debug.query(By.css('.quiz-link'));
    element.nativeElement.click();

    /*const event1 = new KeyboardEvent('keydown', { key: 'q' });
    window.dispatchEvent(event1);*/
    fixture.detectChanges();
    // tick();
    expect(navigateSpy).toHaveBeenCalledWith(['/quiz']);
  });
});
