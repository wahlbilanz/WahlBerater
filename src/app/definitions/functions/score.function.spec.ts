import { claimScore } from './score.function';

describe('claimScore', () => {
  it('test none score', () => {
    expect(claimScore(0, undefined, undefined).score).toBe(0);
    expect(claimScore(1, undefined, undefined).score).toBe(0);
    expect(claimScore(-1, undefined, undefined).score).toBe(0);

    expect(claimScore(undefined, 0, false).score).toBe(0);
    expect(claimScore(undefined, 0, true).score).toBe(0);
    expect(claimScore(undefined, -1, false).score).toBe(0);
    expect(claimScore(undefined, -1, true).score).toBe(0);
    expect(claimScore(undefined, 1, false).score).toBe(0);
    expect(claimScore(undefined, 1, true).score).toBe(0);
  });

  it('test score meh', () => {
    expect(claimScore(0, 0, false).score).toBe(0);
    expect(claimScore(0, 0, true).score).toBe(0);

    expect(claimScore(1, 0, false).score).toBe(0);
    expect(claimScore(1, 0, true).score).toBe(0);

    expect(claimScore(-1, 0, false).score).toBe(0);
    expect(claimScore(-1, 0, true).score).toBe(0);
  });

  it('test score negative', () => {
    expect(claimScore(0, -1, false).score).toBe(0.5);
    expect(claimScore(0, -1, true).score).toBe(0);

    expect(claimScore(1, -1, false).score).toBe(0);
    expect(claimScore(1, -1, true).score).toBe(0);

    expect(claimScore(-1, -1, false).score).toBe(1);
    expect(claimScore(-1, -1, true).score).toBe(2);
  });

  it('test score positive', () => {
    expect(claimScore(0, 1, false).score).toBe(0.5);
    expect(claimScore(0, 1, true).score).toBe(0);

    expect(claimScore(1, 1, false).score).toBe(1);
    expect(claimScore(1, 1, true).score).toBe(2);

    expect(claimScore(-1, 1, false).score).toBe(0);
    expect(claimScore(-1, 1, true).score).toBe(0);
  });
});
