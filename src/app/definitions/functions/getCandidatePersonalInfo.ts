import { CandidatePersonalInfo, PersonalCandidateMap } from '../models/candidate.model';

export function getCandidatePersonalInfo(candidateMap: PersonalCandidateMap, candidateId: string): CandidatePersonalInfo {
  if (candidateMap && candidateMap[candidateId]) {
    return candidateMap[candidateId];
  }
  return {
    description: 'Diese Person hat entweder keine persönlichen Informationen angebeben oder diese in der Zwischenzeit löschen lassen.',
    links: undefined,
    name: 'Unbekannt',
    picture: undefined,
    shortDescription: 'Diese Person hat entweder keine persönlichen Informationen angebeben oder diese in der Zwischenzeit löschen lassen.',
    color1: '#888',
    color2: '#888',
  };
}
