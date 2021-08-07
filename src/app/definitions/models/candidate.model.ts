import { PositionsMap } from './position.model';
import { LinkMap } from './link.model';

export interface PersonalCandidateMap {
  [candidate: string]: CandidatePersonalInfo;
}

export interface PoliticalCandidateMap {
  [candidate: string]: CandidatePoliticalInfo;
}

export interface CandidatePersonalInfo {
  name: string;
  picture: string;
  shortDescription: string;
  description: string;
  links: LinkMap;
  color1: string;
  color2: string;
}

export interface CandidatePoliticalInfo {
  party: string;
  listOrder: number;
  positions: PositionsMap;
}

/*export interface CandidateWithID extends Candidate {
  candidateId: string;
  hasPersonalData: boolean;
}*/
