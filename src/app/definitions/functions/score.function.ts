import { CandidatePoliticalInfo } from '../models/candidate.model';

export function candidateScore(candidate: CandidatePoliticalInfo, decisions: any): void {}

export function claimScore(candidate: number, user: number, fav: boolean): number {
  if (candidate === 0 || user === 0 || (candidate > 0 && user < 0) || (candidate < 0 && user > 0)) {
    return 0;
  }

  if (candidate === 2) {
    if (user === 1 && fav) {
      return 2;
    }
    if (user === 1) {
      return 1;
    }
  }

  if (candidate === 1) {
    if (user === 1 || user === 0) {
      return 1;
    }
  }

  if (candidate === -1) {
    if (user === -1 || user === 0) {
      return 1;
    }
  }

  if (candidate === -2) {
    if (user === -1 && fav) {
      return 2;
    }
    if (user === -1) {
      return 1;
    }
  }

  return 0;
}
