export interface AccessibilityModeSettings {
  /** True, when the accessibility mode is active. Tri-State - null indicating that user did not make a choice yet or was not restored */
  accessibilityMode: boolean;
  /** True, when the reduced motion mode (no animations) is active. Tri-State - null indicating that user did not make a choice yet or was not restored */
  reducedMotionMode: boolean;
}
