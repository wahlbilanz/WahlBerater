import { PositionsMap } from './position.model';

export interface CandidateMap {
  [candidate: string]: Candidate;
}

interface LinkMap {
  [url: string]: string;
  twitter?: string;
  blog?: string;
  facebook?: string;
  instagram?: string;
}

export interface CandidatePersonalInfo {
  name: string;
  picture: string;
  shortDescription: string;
  description: string;
  links: LinkMap;
}

export interface CandidatePoliticalInfo {
  party: string;
  positions: PositionsMap;
}

export interface Candidate extends CandidatePersonalInfo, CandidatePoliticalInfo {}
