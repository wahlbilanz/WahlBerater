import { Claim, ClaimMap, ClaimProvenanceEntry, ClaimWithId, NamedLink } from './claim.model';

export interface CategoryMap {
  [category: string]: Category;
}

export interface Category {
  order: number;
  title: string;
  color: string;
}

export interface CategoryWithClaims {
  categoryId: string;
  category: Category;
  claims: ClaimWithId[];
}
