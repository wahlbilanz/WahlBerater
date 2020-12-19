import { Score } from './score.model';
import { CandidatePersonalInfo, CandidatePoliticalInfo, PersonalCandidateMap } from './candidate.model';
import { PoliticalData } from './political.data.model';
import { getCandidatePersonalInfo } from '../functions/getCandidatePersonalInfo';
import { claimScore } from '../functions/score.function';
import { Votes } from './votes.mode';

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
export interface PartyScoreResult {
  partyScores: PartyResult[];
  maxValue: number;
  maxParty: number;
}

// export function prepareResults(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): Record<string, PartyResult>  {
export function prepareResults(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  const partyResults: Record<string, PartyResult> = {};
  let maxValue = 0;
  let maxParty = 0;

  for (const candidate of Object.keys(politicalData.candidates)) {
    let partyResult: PartyResult = partyResults[politicalData.candidates[candidate].party];
    if (!partyResult) {
      partyResult = {
        party: politicalData.candidates[candidate].party,
        candidates: {},
        scores: {},
        score: new Score(),
      };
      partyResults[politicalData.candidates[candidate].party] = partyResult;
    }

    const candidateResult: CandidateResult = {
      personal: getCandidatePersonalInfo(personalData, candidate),
      political: politicalData.candidates[candidate],
      id: candidate,
      scores: {},
      score: new Score(),
    };
    partyResult.candidates[candidate] = candidateResult;

    for (const claim of Object.keys(politicalData.candidates[candidate].positions)) {
      const category = politicalData.claims[claim].category;

      if (!candidateResult.scores[category]) {
        candidateResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }
      if (!partyResult.scores[category]) {
        partyResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }

      candidateResult.scores[category].decisions[claim] = politicalData.candidates[candidate].positions[claim].vote;

      if (!partyResult.scores[category].decisions[claim]) {
        partyResult.scores[category].decisions[claim] = 0;
      }
      partyResult.scores[category].decisions[claim] += politicalData.candidates[candidate].positions[claim].vote;

      if (votes && votes[claim]) {
        const s = claimScore(politicalData.candidates[candidate].positions[claim].vote, votes[claim].decision, votes[claim].fav);

        candidateResult.scores[category].score.add(s);
        candidateResult.scores[category].claims[claim] = { claim, score: s };

        partyResult.scores[category].score.add(s);
        partyResult.scores[category].claims[claim] = { claim, score: s };

        candidateResult.score.add(s);
        partyResult.score.add(s);
      }
    }
    if (maxValue < candidateResult.score.score) {
      maxValue = candidateResult.score.score;
    }
  }

  for (const party of Object.keys(partyResults)) {
    for (const category of Object.keys(partyResults[party].scores)) {
      for (const claim of Object.keys(partyResults[party].scores[category].decisions)) {
        partyResults[party].scores[category].decisions[claim] /= Object.keys(partyResults[party].candidates).length;
      }
    }
  }
  const partyScores = Object.values(partyResults);
  partyScores.forEach((party: PartyResult) => {
    const nCandidates = Object.keys(party.candidates).length;
    party.score.normalise(nCandidates);
    if (party.score.score > maxParty) {
      maxParty = party.score.score;
    }
    for (const cat of Object.keys(party.scores)) {
      party.scores[cat].score.normalise(nCandidates);
      for (const claim of Object.keys(party.scores[cat].claims)) {
        party.scores[cat].claims[claim].score.normalise(nCandidates);
      }
    }
  });
  partyScores.sort((a: PartyResult, b: PartyResult): number => {
    if (a.score.score === b.score.score) {
      return b.score.stars - a.score.stars;
    }
    return b.score.score - a.score.score;
  });
  // console.log(partyScores);

  return {
    partyScores,
    maxValue,
    maxParty,
  };
}
