import { CandidatePoliticalInfo } from '../models/candidate.model';
import { Score } from '../models/score.model';

// export function candidateScore(candidate: CandidatePoliticalInfo, decisions: any): void {}

export function claimScore(candidate: number, user: number, fav: boolean): Score {
  if ((candidate > 0 && user > 0) || (candidate < 0 && user < 0)) {
    if (fav) {
      return new Score(2);
    }
    return new Score(1);
  }
  return new Score(0);
}
