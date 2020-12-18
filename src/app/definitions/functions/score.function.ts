import { CandidatePoliticalInfo } from '../models/candidate.model';
import {Score} from '../models/score.model';

export function candidateScore(candidate: CandidatePoliticalInfo, decisions: any): void {}

export function claimScore(candidate: number, user: number, fav: boolean): Score {
  if ((candidate > 0 && user > 0) || (candidate < 0 && user < 0)) {
    if ((candidate === -2 || candidate === 2) && fav) {
      return new Score(1, 1);
    }
    return new Score(1, 0);
  }
  return new Score(0, 0);
}
