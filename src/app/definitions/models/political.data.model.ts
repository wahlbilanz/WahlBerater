import { ClaimMap } from './claim.model';
import { CategoryMap } from './category.model';
import { PoliticalCandidateMap } from './candidate.model';
import { PartyMap } from './party.model';

export interface PoliticalData {
  claims: ClaimMap;
  categories: CategoryMap;
  candidates: PoliticalCandidateMap;
  parties: PartyMap;
}
