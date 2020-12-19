import {Score} from './score.model';
import {CandidatePersonalInfo, CandidatePoliticalInfo, PersonalCandidateMap} from './candidate.model';
import {PoliticalData} from './political.data.model';
import {getCandidatePersonalInfo} from '../functions/getCandidatePersonalInfo';

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
}
export interface PartyResult {
  party: string;
  candidates: Record<string, CandidateResult>;
  scores: Record<string, CategoryResult>;
  score: Score;
}

export function prepareResults(politicalData: PoliticalData, personalData: PersonalCandidateMap): Record<string, PartyResult>  {
  const partyResults: Record<string, PartyResult> = {};

  for (const candidate of Object.keys(politicalData.candidates)) {
    let partyResult: PartyResult = partyResults[politicalData.candidates[candidate].party];
    if (!partyResult) {
      partyResult = {
        party: politicalData.candidates[candidate].party,
        candidates: {},
        scores: {},
        score: new Score()
      };
      partyResults[politicalData.candidates[candidate].party] = partyResult;
    }

    const candidateResult: CandidateResult = {
      personal: getCandidatePersonalInfo(personalData, candidate),
      political: politicalData.candidates[candidate],
      id: candidate,
      scores: {},
      score: new Score()
    };
    partyResult.candidates[candidate] = candidateResult;

    for (const claim of Object.keys(politicalData.candidates[candidate].positions)) {
      const category = politicalData.claims[claim].category;
      if (!candidateResult.scores[category]) {
        candidateResult.scores[category] = {category, score: new Score(), claims: {}, decisions: {}};
      }
      if (!partyResult.scores[category]) {
        partyResult.scores[category] = {category, score: new Score(), claims: {}, decisions: {}};
      }

      candidateResult.scores[category].decisions[claim] = politicalData.candidates[candidate].positions[claim].vote;

      if (!partyResult.scores[category].decisions[claim]) {
        partyResult.scores[category].decisions[claim] = 0;
      }
      partyResult.scores[category].decisions[claim] += politicalData.candidates[candidate].positions[claim].vote;
    }
  }

  for (const party of Object.keys(partyResults)) {
    for (const category of Object.keys(partyResults[party].scores)) {
      for (const claim of Object.keys(partyResults[party].scores[category].decisions)) {
        partyResults[party].scores[category].decisions[claim] /= Object.keys(partyResults[party].candidates).length;
      }
    }
  }

  return partyResults;
}

