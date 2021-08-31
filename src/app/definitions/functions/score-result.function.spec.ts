import { PoliticalData } from '../models/political.data.model';
import { PersonalCandidateMap } from '../models/candidate.model';
import { Votes } from '../models/votes.mode';
import { Party } from '../models/party.model';
import { preparePartyResults } from './score-result.function';
import { PartyResult } from '../models/results.model';

const partyTemplate: Party = {
  id: '',
  name: '',
  links: {},
  order: 0,
  color: '',
  all_same: false,
  description: '',
  positions: {},
};

function expectResult(results: PartyResult[], p1: number, p2: number) {
  for (const result of results) {
    if (result.party === 'p1') {
      expect(Math.round(100 * result.scorePercent.score) / 100).toBe(Math.round(100 * p1) / 100);
    } else {
      expect(Math.round(100 * result.scorePercent.score) / 100).toBe(Math.round(100 * p2) / 100);
    }
  }

  if (p1 > p2) {
    expect(results[0].party === 'p1');
    expect(results[1].party === 'p2');
  }
  if (p1 < p2) {
    expect(results[0].party === 'p2');
    expect(results[1].party === 'p1');
  }
}

describe('prepareResults', () => {
  it('test score calculation', () => {
    const politicalData: PoliticalData = {
      parties: {
        p1: {
          ...partyTemplate,
          id: 'p1',
        },
        p2: {
          ...partyTemplate,
          id: 'p2',
        },
      },
      candidates: {
        can1: {
          party: 'p1',
          listOrder: 1,
          positions: {
            c1: {
              vote: 1,
            },
            c2: {
              vote: 1,
            },
            c3: {
              vote: 1,
            },
          },
        },
        can2: {
          party: 'p2',
          listOrder: 1,
          positions: {
            c1: {
              vote: 1,
            },
            c2: {
              vote: 0,
            },
            c3: {
              vote: -1,
            },
          },
        },
        can3: {
          party: 'p2',
          listOrder: 1,
          positions: {
            c1: {
              vote: -1,
            },
            c2: {
              vote: -1,
            },
            c3: {
              vote: -1,
            },
          },
        },
      },
      categories: {
        c1: {
          id: 'c1',
          color: '',
          title: '',
          order: 1,
        },
        c2: {
          id: 'c2',
          color: '',
          title: '',
          order: 1,
        },
      },
      claims: {
        c1: {
          title: '',
          order: 1,
          category: 'c1',
          description: '',
          provenance: [],
        },
        c2: {
          title: '',
          order: 3,
          category: 'c1',
          description: '',
          provenance: [],
        },
        c3: {
          title: '',
          order: 3,
          category: 'c3',
          description: '',
          provenance: [],
        },
      },
    };
    const personalData: PersonalCandidateMap = {};
    const votes: Votes = {
      c1: {
        fav: false,
        decision: 1,
      },
    };

    votes.c1.decision = 1;
    votes.c1.fav = false;
    let result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 100, 50);

    votes.c1.fav = true;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 100, 50);

    votes.c1.decision = -1;
    votes.c1.fav = true;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 0, 50);

    votes.c1.decision = -1;
    votes.c1.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 0, 50);

    votes.c1.decision = 0;
    votes.c1.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 0, 0);

    votes.c2 = {
      fav: false,
      decision: 1,
    };

    votes.c1.decision = 1;
    votes.c1.fav = false;
    votes.c2.decision = 1;
    votes.c2.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 100, 37.5);

    votes.c1.decision = -1;
    votes.c1.fav = false;
    votes.c2.decision = -1;
    votes.c2.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 0, 62.5);

    votes.c1.decision = 1;
    votes.c1.fav = false;
    votes.c2.decision = -1;
    votes.c2.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 50, 62.5);

    votes.c1.decision = 1;
    votes.c1.fav = true;
    votes.c2.decision = -1;
    votes.c2.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, (100 * 2) / 3, (100 * (0.5 + 0.5 + 0.75)) / 3);

    votes.c3 = {
      fav: false,
      decision: 1,
    };

    votes.c1.decision = 1;
    votes.c1.fav = true;
    votes.c2.decision = 1;
    votes.c2.fav = false;
    votes.c3.decision = 1;
    votes.c3.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 100, (100 * (0.5 + 0.5 + 0.25)) / 4);

    votes.c1.decision = -1;
    votes.c1.fav = true;
    votes.c2.decision = -1;
    votes.c2.fav = false;
    votes.c3.decision = -1;
    votes.c3.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, 0, (100 * (0.5 + 0.5 + 0.75 + 1)) / 4);

    votes.c1.decision = -1;
    votes.c1.fav = true;
    votes.c2.decision = 0;
    votes.c2.fav = true;
    votes.c3.decision = 1;
    votes.c3.fav = true;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, (100 * 1) / 2, (100 * 0.5) / 2);

    votes.c1.decision = -1;
    votes.c1.fav = false;
    votes.c2.decision = 0;
    votes.c2.fav = false;
    votes.c3.decision = 1;
    votes.c3.fav = false;
    result = preparePartyResults(politicalData, personalData, votes);
    expectResult(result.partyScores, (100 * 1) / 2, (100 * 0.5) / 2);
  });
});
