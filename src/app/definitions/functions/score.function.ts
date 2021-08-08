import { CandidatePoliticalInfo } from '../models/candidate.model';
import { Score } from '../models/score.model';
import { PartyDecisionThreshold } from '../../+state/app.models';

// export function candidateScore(candidate: CandidatePoliticalInfo, decisions: any): void {}

export function claimScore(candidate: number, user: number, fav: boolean): Score {
  if (candidate === undefined || user === undefined) {
    return new Score(0);
  }
  if (user > PartyDecisionThreshold) {
    // user said thumbs up
    if (candidate > PartyDecisionThreshold) {
      return new Score(fav ? 2 : 1);
    } else if (candidate > -PartyDecisionThreshold) {
      return new Score(fav ? 0 : 0.5);
    }
  } else if (user < -PartyDecisionThreshold) {
    // user said thumbs down
    if (candidate < -PartyDecisionThreshold) {
      return new Score(fav ? 2 : 1);
    } else if (candidate < PartyDecisionThreshold) {
      return new Score(fav ? 0 : 0.5);
    }
  } else {
    // user said no thumbs
    if (candidate < -PartyDecisionThreshold || candidate > PartyDecisionThreshold) {
      return new Score(fav ? 0 : 0.5);
    } else {
      return new Score(fav ? 2 : 1);
    }
  }
  return new Score(0);
}
