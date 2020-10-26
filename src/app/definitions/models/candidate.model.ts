import { PositionsMap } from './position.model';

export interface CandidateMap {
    [candidate: string]: Candidate;
}

interface Link {
    [url: string]: string;
}

export interface Candidate {
  name: string;
  pic: string;
  oneliner: string;
  description: string;
  prose: string;
  party: string;
  positions: PositionsMap;
  links: Link;
}
