/**
 * tiny implementation of a stop clock
 *
 * start: `const clock = new StopClock();`
 * print elapsed time since start or last `stop()`-call: console.log (clock.stop ())`
 */
export class StopClock {
  start: number;
  end: number;
  last: number;
  constructor() {
    this.start = performance.now();
    this.end = 0;
    this.last = 0;
  }
  reset(): void {
    this.start = performance.now();
    this.end = 0;
    this.last = 0;
  }
  stop(): string {
    this.end = performance.now();
    let s = 'took ';
    if (this.last > 0) {
      s +=
        (this.end - this.last).toLocaleString() + ' milliseconds (' + (this.end - this.start).toLocaleString() + ' milliseconds in total)';
    } else {
      s += (this.end - this.start).toLocaleString() + ' milliseconds';
    }
    this.last = performance.now();
    return s;
  }
}
