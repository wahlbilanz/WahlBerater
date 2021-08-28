// export function prepareResults(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): Record<string, PartyResult>  {
import { PoliticalData } from '../models/political.data.model';
import { PersonalCandidateMap } from '../models/candidate.model';
import { Votes } from '../models/votes.mode';
import { Score } from '../models/score.model';
import { getCandidatePersonalInfo } from './getCandidatePersonalInfo';
import { claimScore } from './score.function';
import { CandidateResult, PartyResult, PartyScoreResult } from '../models/results.model';
import { IncludeCandidates } from '../../+state/app.models';
import { ClaimMap } from '../models/claim.model';

/**
 * get the divisor to scale the scores to percent
 *
 * basically it's the number of votes by the user plus the number of favs
 *
 * @param claims all the claims
 * @param votes the decisions by the user
 */
function getScoreScaler(
  claims: ClaimMap,
  votes: Votes,
): {
  overall: number;
  categories: {};
  favs: number;
} {
  const scoreScaler = {
    overall: 0,
    categories: {},
    favs: 0,
  };
  for (const claim of Object.keys(claims)) {
    if (votes[claim]?.decision) {
      scoreScaler.overall++;
      scoreScaler.categories[claims[claim].category]++;
      if (votes[claim]?.fav) {
        scoreScaler.overall++;
        scoreScaler.favs++;
        scoreScaler.categories[claims[claim].category]++;
      }
    }
  }
  return scoreScaler;
}

function calcUsingCandidates(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  const partyResults: Record<string, PartyResult> = {};
  let maxValue = 0;
  // let maxParty = 0;
  let partyScores: PartyResult[];
  const scoreScaler = getScoreScaler(politicalData.claims, votes);
  const normaliser: {
    [party: string]: {
      categories: { [category: string]: number };
      claims: { [claim: string]: number };
      decisions: { [claim: string]: number };
      overall: number;
    };
  } = {};
  const categorySize: {
    [category: string]: number;
  } = {};
  for (const claim of Object.keys(politicalData.claims)) {
    const category = politicalData.claims[claim].category;
    if (!categorySize[category]) {
      categorySize[category] = 0;
    }
    if (votes[claim]?.decision) {
      categorySize[category]++;
    }
  }

  // iterate all candidates
  for (const candidate of Object.keys(politicalData.candidates)) {
    const partyId = politicalData.candidates[candidate].party;
    // get the result of the party
    let partyResult: PartyResult = partyResults[partyId];
    if (!partyResult) {
      partyResult = {
        party: partyId,
        candidates: {},
        scores: {},
        score: new Score(),
        scorePercent: new Score(),
      };
      partyResults[partyId] = partyResult;
    }
    if (!normaliser[partyId]) {
      normaliser[partyId] = {
        categories: {},
        claims: {},
        overall: 0,
        decisions: {},
      };
    }

    // result of the current candidate
    const candidateResult: CandidateResult = {
      personal: getCandidatePersonalInfo(personalData, candidate),
      political: politicalData.candidates[candidate],
      id: candidate,
      scores: {},
      score: new Score(),
      scorePercent: new Score(),
    };
    partyResult.candidates[candidate] = candidateResult;

    for (const claim of Object.keys(politicalData.claims)) {
      const category = politicalData.claims[claim].category;
      const s = claimScore(politicalData.candidates[candidate]?.positions[claim]?.vote, votes[claim]?.decision, votes[claim]?.fav);

      if (!candidateResult.scores[category]) {
        candidateResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }
      candidateResult.scores[category].claims[claim] = { claim, score: s };
      if (!partyResult.scores[category]) {
        partyResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }
      if (!partyResult.scores[category].decisions[claim]) {
        partyResult.scores[category].decisions[claim] = 0;
      }
      if (!partyResult.scores[category].claims[claim]) {
        partyResult.scores[category].claims[claim] = { claim, score: new Score() };
      }
      if (!normaliser[partyId].categories[category]) {
        normaliser[partyId].categories[category] = 0;
      }
      if (!normaliser[partyId].claims[claim]) {
        normaliser[partyId].claims[claim] = 0;
      }
      if (!normaliser[partyId].decisions[claim]) {
        normaliser[partyId].decisions[claim] = 0;
      }

      candidateResult.scores[category].decisions[claim] = politicalData.candidates[candidate].positions[claim]?.vote || 0;
      candidateResult.scores[category].score.add(s);
      candidateResult.score.add(s);

      partyResult.scores[category].decisions[claim] += politicalData.candidates[candidate].positions[claim]?.vote || 0;
      partyResult.scores[category].score.add(s);
      partyResult.scores[category].claims[claim].score.add(s);
      partyResult.score.add(s);

      if (politicalData.candidates[candidate].positions[claim]?.vote !== undefined) {
        normaliser[partyId].decisions[claim]++;
        if (votes[claim]?.decision) {
          normaliser[partyId].claims[claim]++;
          normaliser[partyId].categories[category]++;
          normaliser[partyId].overall++;
        }
      }
    }
    if (maxValue < candidateResult.score.score) {
      maxValue = candidateResult.score.score;
    }
  }

  for (const party of Object.keys(partyResults)) {
    for (const category of Object.keys(partyResults[party].scores)) {
      for (const claim of Object.keys(partyResults[party].scores[category].decisions)) {
        if (normaliser[party].decisions[claim] > 0) {
          partyResults[party].scores[category].decisions[claim] /= normaliser[party].decisions[claim];
        }
      }
    }
  }

  let maxPercent = 0;

  for (const party of Object.keys(partyResults)) {
    for (const category of Object.keys(partyResults[party].scores)) {
      for (const claim of Object.keys(partyResults[party].scores[category].decisions)) {
        partyResults[party].scores[category].claims[claim].score.normalise(normaliser[party].claims[claim]);
      }
      partyResults[party].scores[category].score.normalise(normaliser[party].categories[category]);
    }
    partyResults[party].score.normalise(normaliser[party].overall);
    partyResults[party].scorePercent.score =
      (partyResults[party].score.score * 100 * (scoreScaler.overall - scoreScaler.favs)) / scoreScaler.overall;
    if (maxPercent < partyResults[party].scorePercent.score) {
      maxPercent = partyResults[party].scorePercent.score;
    }

    for (const candidate of Object.keys(partyResults[party].candidates)) {
      partyResults[party].candidates[candidate].scorePercent.score =
        (100 * partyResults[party].candidates[candidate].score.score) / scoreScaler.overall;
      if (maxPercent < partyResults[party].candidates[candidate].scorePercent.score) {
        maxPercent = partyResults[party].candidates[candidate].scorePercent.score;
      }
    }
  }

  partyScores = Object.values(partyResults);
  partyScores.sort((a: PartyResult, b: PartyResult): number => {
    /*if (a.score.score === b.score.score) {
      return b.score.stars - a.score.stars;
    }*/
    return b.score.score - a.score.score;
  });

  return {
    partyScores,
    maxPercent,
  };
}

function calcUsingParties(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  const partyResults: Record<string, PartyResult> = {};
  let maxParty = 0;
  let partyScores;
  const scoreScaler = getScoreScaler(politicalData.claims, votes);
  let maxPercent = 0;

  // only check for parties
  for (const party of Object.keys(politicalData.parties)) {
    let partyResult: PartyResult = partyResults[party];
    if (!partyResult) {
      partyResult = {
        party,
        candidates: {},
        scores: {},
        score: new Score(),
        scorePercent: new Score(),
      };
      partyResults[party] = partyResult;
    }

    for (const claim of Object.keys(politicalData.claims)) {
      const category = politicalData.claims[claim].category;
      const s = claimScore(politicalData.parties[party].positions[claim]?.vote, votes[claim]?.decision, votes[claim]?.fav);

      if (!partyResult.scores[category]) {
        partyResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }

      if (!partyResult.scores[category].decisions[claim]) {
        partyResult.scores[category].decisions[claim] = 0;
      }

      partyResult.scores[category].score.add(s);
      partyResult.scores[category].claims[claim] = { claim, score: s };

      partyResult.score.add(s);

      partyResult.scores[category].decisions[claim] = politicalData.parties[party].positions[claim]?.vote || 0;

      if (maxParty < partyResult.score.score) {
        maxParty = partyResult.score.score;
      }
    }

    if (scoreScaler.overall > 0) {
      partyResult.score.score = partyResult.score.score / scoreScaler.overall;
      if (maxPercent < partyResult.score.score) {
        maxPercent = partyResult.score.score;
      }
    }
  }

  partyScores = Object.values(partyResults);

  partyScores.sort((a: PartyResult, b: PartyResult): number => {
    /*if (a.score.score === b.score.score) {
      return b.score.stars - a.score.stars;
    }*/
    return b.score.score - a.score.score;
  });
  // console.log(partyScores);

  return {
    partyScores,
    maxPercent,
  };
}

export function preparePartyResults(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  if (!politicalData || !personalData || !votes) {
    console.log('not enough data to prepare restuls');
    return;
  }
  console.log('preparing results...');
  if (IncludeCandidates) {
    return calcUsingCandidates(politicalData, personalData, votes);
  } else {
    return calcUsingParties(politicalData, personalData, votes);
  }
}
