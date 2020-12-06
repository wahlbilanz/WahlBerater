import { CategoryMap } from './category.model';
import { CandidateMap } from './candidate.model';
import { PartyMap } from './party.model';
import { ClaimMap } from './claim.model';

export interface Data {
  claims: ClaimMap;
  categories: CategoryMap;
  candidates: CandidateMap;
  parties: PartyMap;
}
