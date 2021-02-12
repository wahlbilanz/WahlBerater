import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppPartialState } from '../../+state/app.reducer';
import { AccessibilityModeSettings } from '../../definitions/interfaces/accessibility-mode-settings.interface';

const STORE_PREFIX = 'walberater_';
export const OPTIN_STORE_KEY = `${STORE_PREFIX}user_storage_optin`;
export const QUIZ_ANSWER_STORE_KEY = `${STORE_PREFIX}quiz_answers`;
export const ACCESSIBILITY_MODE_STORE_KEY = `${STORE_PREFIX}accessibility_mode`;

@Injectable({
  providedIn: 'root',
})
export class DataPersistanceService {
  private browserSupport = this.checkBrowserSupport();

  constructor() {}

  public getBrowserSupport(): boolean {
    return this.browserSupport;
  }

  public getUserOptInStatus(): boolean {
    if (!this.browserSupport) {
      return false;
    }

    return localStorage.getItem(OPTIN_STORE_KEY) === 'true' ? true : false;
  }

  public updateUserOptIn(allow: boolean): void {
    if (!this.browserSupport) {
      return;
    }

    if (allow) {
      localStorage.setItem(OPTIN_STORE_KEY, 'true');
    } else {
      localStorage.removeItem(OPTIN_STORE_KEY);
      localStorage.removeItem(QUIZ_ANSWER_STORE_KEY);
      localStorage.removeItem(ACCESSIBILITY_MODE_STORE_KEY);
    }
  }

  public getUserAccessibilityModeChoice(): AccessibilityModeSettings {
    if (!this.browserSupport) {
      return {
        reducedMotionMode: null,
        accessibilityMode: null,
      };
    }

    const data = JSON.parse(localStorage.getItem(ACCESSIBILITY_MODE_STORE_KEY) || '{}');
    return {
      reducedMotionMode: this.toTriState(data.reducedMotionMode),
      accessibilityMode: this.toTriState(data.accessibilityMode),
    };
  }

  public updateAccessibilityMode(modes: AccessibilityModeSettings): void {
    if (!this.browserSupport) {
      return;
    }

    localStorage.setItem(
      ACCESSIBILITY_MODE_STORE_KEY,
      JSON.stringify({
        reducedMotionMode: this.toTriState(modes.reducedMotionMode),
        accessibilityMode: this.toTriState(modes.accessibilityMode),
      }),
    );
  }

  // TODO provide methods to store stuff in `QUIZ_ANSWER_STORE_KEY`

  /**
   * Checks if the browser supports local storage
   */
  private checkBrowserSupport(): boolean {
    const mod = '__browser_capability_test__';
    if (localStorage == null) {
      return false;
    }
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }

  private toTriState(value: boolean | null): boolean | null {
    return value == null ? null : !!value ? true : false;
  }
}
