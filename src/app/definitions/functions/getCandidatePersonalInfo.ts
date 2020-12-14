import {PersonalCandidateMap} from '../models/candidate.model';

export function getCandidatePersonalInfo(candidateMap: PersonalCandidateMap, candidateId: string) {
  if (candidateMap && candidateMap[candidateId]) {
    return candidateMap[candidateId];
  }
  return {
    description: 'Unbekannt', links: undefined, name: 'Unbekannt', picture: 'default.jpg', shortDescription: 'Unbekannt'
  };
}
