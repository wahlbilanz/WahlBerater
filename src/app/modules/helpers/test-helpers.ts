import * as axe from 'axe-core';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export function testAccessibility(element: DebugElement, done: DoneFn) {
  let elements = element.queryAll(By.css('i'));
  for (const e of elements) {
    expect(e.nativeElement.getAttribute('alt')).toBeTruthy();
  }
  // or there should be a span around..?
  // https://fontawesome.com/how-to-use/on-the-web/other-topics/accessibility

  elements = element.queryAll(By.css('img'));
  for (const e of elements) {
    expect(e.nativeElement.getAttribute('alt')).toBeTruthy();
  }

  axe.run(element.nativeElement, (err, result) => {
    expect(err).toBe(null);
    console.log(result.violations);
    expect(result.violations.length).toBe(0);
    done();
  });
}
