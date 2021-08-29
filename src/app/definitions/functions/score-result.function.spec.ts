import { PoliticalData } from '../models/political.data.model';
import { PersonalCandidateMap } from '../models/candidate.model';
import { Votes } from '../models/votes.mode';
import { Party } from '../models/party.model';
import { preparePartyResults } from './score-result.function';

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

    let result = preparePartyResults(politicalData, personalData, votes);
    // expect(result.maxParty).toBe(1);
    // expect(result.maxValue).toBe(1);
    expect(result.partyScores[0].party).toBe('p1');
    expect(result.partyScores[0].scorePercent.score).toBe(100);
    expect(result.partyScores[1].scorePercent.score).toBe(50);

    votes.c1.fav = true;
    result = preparePartyResults(politicalData, personalData, votes);
    console.log(JSON.stringify(result.partyScores[1], null, 4));
    // expect(result.maxParty).toBe(2);
    // expect(result.maxValue).toBe(2);
    expect(result.partyScores[0].party).toBe('p1');
    expect(result.partyScores[0].scorePercent.score).toBe(100);
    expect(result.partyScores[1].scorePercent.score).toBe(50);
    /*
    votes.c2 = {
      fav: true,
      decision: 1,
    };
    result = preparePartyResults(politicalData, personalData, votes);
    // expect(result.maxParty).toBe(2);
    // expect(result.maxValue).toBe(2);
    expect(result.partyScores[0].party).toBe('p1');
    expect(result.partyScores[0].scorePercent.score).toBe(100);
    expect(result.partyScores[1].party).toBe('p2');
    expect(result.partyScores[1].scorePercent.score).toBe(2);*/
  });
});
