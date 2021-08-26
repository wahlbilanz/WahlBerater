import { Score } from './score.model';
import { CandidatePersonalInfo, CandidatePoliticalInfo, PersonalCandidateMap } from './candidate.model';
import { PoliticalData } from './political.data.model';
import { getCandidatePersonalInfo } from '../functions/getCandidatePersonalInfo';
import { claimScore } from '../functions/score.function';
import { Votes } from './votes.mode';
import { StopClock } from '../../modules/helpers/utils/stop-clock';

export interface ClaimResult {
  claim: string;
  score: Score;
  // decisions: Record<string, number>;
}
export interface CategoryResult {
  category: string;
  score: Score;
  decisions: Record<string, number>;
  claims: Record<string, ClaimResult>;
}
export interface CandidateResult {
  personal: CandidatePersonalInfo;
  political: CandidatePoliticalInfo;
  id: string;
  scores: Record<string, CategoryResult>;
  score: Score;
  scorePercent: Score;
}
export interface PartyResult {
  party: string;
  candidates: Record<string, CandidateResult>;
  scores: Record<string, CategoryResult>;
  score: Score;
  scorePercent: Score;
}
export interface PartyScoreResult {
  partyScores: PartyResult[];
  maxValue: number;
  maxParty: number;
}
