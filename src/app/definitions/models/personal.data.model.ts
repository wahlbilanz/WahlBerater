import { CategoryMap } from './category.model';
import { PersonalCandidateMap } from './candidate.model';
import { PartyMap } from './party.model';
import { ClaimMap } from './claim.model';

export interface PersonalData {
  candidates: PersonalCandidateMap;
}
