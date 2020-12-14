import { PositionsMap } from './position.model';

export interface PersonalCandidateMap {
  [candidate: string]: CandidatePersonalInfo;
}

export interface PoliticalCandidateMap {
  [candidate: string]: CandidatePoliticalInfo;
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
