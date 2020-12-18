export class Score {
  score: number;
  stars: number;

  constructor(score: number = 0, stars: number = 0) {
    this.score = score;
    this.stars = stars;
  }

  add(score: Score) {
    this.score += score.score;
    this.stars += score.stars;
  }

  normalise(n: number) {
    this.score /= n;
    this.stars /= n;
  }
}
