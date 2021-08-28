import { Claim, ClaimMap, ClaimProvenanceEntry, ClaimWithId } from './claim.model';

export interface CategoryMap {
  [category: string]: Category;
}

export interface Category {
  id: string;
  order: number;
  title: string;
  color: string;
}

export interface CategoryWithClaims {
  categoryId: string;
  category: Category;
  claims: ClaimWithId[];
}
