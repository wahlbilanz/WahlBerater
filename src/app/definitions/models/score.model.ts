export class Score {
  score: number;

  constructor(score: number = 0) {
    this.score = score;
  }

  add(score: Score) {
    this.score += score.score;
  }

  normalise(n: number) {
    if (this.score !== 0) {
      this.score /= n;
    }
  }
}
