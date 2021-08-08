import { PoliticalData } from '../models/political.data.model';
import { PersonalCandidateMap } from '../models/candidate.model';
import { Votes } from '../models/votes.mode';
import { prepareResults } from './score-result.function';

describe('prepareResults', () => {
  it('test score calculation', () => {
    const politicalData: PoliticalData = {
      parties: {
        p1: {
          name: '',
          color: '',
          links: {},
          positions: {
            c1: {
              vote: 1,
            },
          },
        },
        p2: {
          name: '',
          color: '',
          links: {},
          positions: {
            c1: {
              vote: -1,
            },
          },
        },
        p3: {
          name: '',
          color: '',
          links: {},
          positions: {
            c2: {
              vote: -1,
            },
            c25: {
              vote: -1,
            },
          },
        },
      },
      candidates: {},
      categories: {
        c1: {
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
          links: [],
          provenance: [],
        },
        c2: {
          title: '',
          order: 3,
          category: 'c1',
          description: '',
          links: [],
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

    let result = prepareResults(politicalData, personalData, votes);
    expect(result.maxParty).toBe(1);
    expect(result.maxValue).toBe(1);
    expect(result.partyScores[0].party).toBe('p1');
    expect(result.partyScores[0].score.score).toBe(1);
    expect(result.partyScores[1].score.score).toBe(0);
    expect(result.partyScores[2].score.score).toBe(0);

    votes.c1.fav = true;
    result = prepareResults(politicalData, personalData, votes);
    expect(result.maxParty).toBe(2);
    expect(result.maxValue).toBe(2);
    expect(result.partyScores[0].party).toBe('p1');
    expect(result.partyScores[0].score.score).toBe(2);
    expect(result.partyScores[1].score.score).toBe(0);
    expect(result.partyScores[2].score.score).toBe(0);

    votes.c2 = {
      fav: true,
      decision: -1,
    };
    result = prepareResults(politicalData, personalData, votes);
    expect(result.maxParty).toBe(2);
    expect(result.maxValue).toBe(2);
    expect(result.partyScores[0].party).toBe('p1');
    expect(result.partyScores[0].score.score).toBe(2);
    expect(result.partyScores[1].party).toBe('p3');
    expect(result.partyScores[1].score.score).toBe(2);
    expect(result.partyScores[2].party).toBe('p2');
    expect(result.partyScores[2].score.score).toBe(0);
  });
});
