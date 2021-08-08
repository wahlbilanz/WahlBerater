// export function prepareResults(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): Record<string, PartyResult>  {
import { PoliticalData } from '../models/political.data.model';
import { PersonalCandidateMap } from '../models/candidate.model';
import { Votes } from '../models/votes.mode';
import { Score } from '../models/score.model';
import { getCandidatePersonalInfo } from './getCandidatePersonalInfo';
import { claimScore } from './score.function';
import { CandidateResult, PartyResult, PartyScoreResult } from '../models/results.model';
import { IncludeCandidates } from '../../+state/app.models';

function calcUsingCandidates(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  const partyResults: Record<string, PartyResult> = {};
  let maxValue = 0;
  let maxParty = 0;
  let partyScores: PartyResult[];
  const normaliser: {
    [party: string]: {
      categories: { [category: string]: number };
      claims: { [claim: string]: number };
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
    categorySize[category]++;
  }

  // iterate all candidates
  for (const candidate of Object.keys(politicalData.candidates)) {
    // get the result of the party
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
    if (!normaliser[politicalData.candidates[candidate].party]) {
      normaliser[politicalData.candidates[candidate].party] = {
        categories: {},
        claims: {},
        overall: 0,
      };
    }

    // result of the current candidate
    const candidateResult: CandidateResult = {
      personal: getCandidatePersonalInfo(personalData, candidate),
      political: politicalData.candidates[candidate],
      id: candidate,
      scores: {},
      score: new Score(),
    };
    partyResult.candidates[candidate] = candidateResult;

    for (const claim of Object.keys(politicalData.claims)) {
      const category = politicalData.claims[claim].category;
      const s = claimScore(politicalData.candidates[candidate]?.positions[claim]?.vote, votes[claim]?.decision, votes[claim]?.fav);

      if (!candidateResult.scores[category]) {
        candidateResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }
      if (!partyResult.scores[category]) {
        partyResult.scores[category] = { category, score: new Score(), claims: {}, decisions: {} };
      }
      if (!normaliser[politicalData.candidates[candidate].party].categories[category]) {
        normaliser[politicalData.candidates[candidate].party].categories[category] = 0;
      }
      if (!normaliser[politicalData.candidates[candidate].party].claims[claim]) {
        normaliser[politicalData.candidates[candidate].party].claims[claim] = 0;
      }
      if (politicalData.candidates[candidate].positions[claim]?.vote != null) {
        normaliser[politicalData.candidates[candidate].party].claims[claim]++;
        normaliser[politicalData.candidates[candidate].party].categories[category]++;
      }

      candidateResult.scores[category].decisions[claim] = politicalData.candidates[candidate].positions[claim]?.vote || 0;

      if (!partyResult.scores[category].decisions[claim]) {
        partyResult.scores[category].decisions[claim] = 0;
      }
      partyResult.scores[category].decisions[claim] += politicalData.candidates[candidate].positions[claim]?.vote || 0;

      candidateResult.scores[category].score.add(s);
      candidateResult.scores[category].claims[claim] = { claim, score: s };

      partyResult.scores[category].score.add(s);
      partyResult.scores[category].claims[claim] = { claim, score: s };

      candidateResult.score.add(s);
      // partyResult.score.add(s);
      normaliser[politicalData.candidates[candidate].party].overall++;
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

  partyScores = Object.values(partyResults);
  partyScores.forEach((party: PartyResult) => {
    /*const nCandidates = Object.keys(party.candidates).length;
    party.score.normalise(nCandidates);*/
    party.score = new Score(0);
    for (const cat of Object.keys(party.scores)) {
      // console.log(party.party, party.scores[cat].score.score, normaliser[party.party].categories[cat])
      party.scores[cat].score.normalise(normaliser[party.party].categories[cat] / categorySize[cat]);
      // console.log(party.party, party.scores[cat].score.score)
      party.score.add(party.scores[cat].score);
      for (const claim of Object.keys(party.scores[cat].claims)) {
        party.scores[cat].claims[claim].score.normalise(normaliser[party.party].claims[claim]);
      }
    }
    if (party.score.score > maxParty) {
      maxParty = party.score.score;
    }
  });

  partyScores.sort((a: PartyResult, b: PartyResult): number => {
    /*if (a.score.score === b.score.score) {
      return b.score.stars - a.score.stars;
    }*/
    return b.score.score - a.score.score;
  });
  // console.log(partyScores);

  return {
    partyScores,
    maxValue,
    maxParty,
  };
}

function calcUsingParties(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  const partyResults: Record<string, PartyResult> = {};
  let maxParty = 0;
  let partyScores;

  // only check for parties
  for (const party of Object.keys(politicalData.parties)) {
    let partyResult: PartyResult = partyResults[party];
    if (!partyResult) {
      partyResult = {
        party,
        candidates: {},
        scores: {},
        score: new Score(),
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
    maxValue: maxParty,
    maxParty,
  };
}

export function prepareResults(politicalData: PoliticalData, personalData: PersonalCandidateMap, votes: Votes): PartyScoreResult {
  console.log('preparing results...');
  if (IncludeCandidates) {
    return calcUsingCandidates(politicalData, personalData, votes);
  } else {
    return calcUsingParties(politicalData, personalData, votes);
  }
}
