import { ClaimMap } from './claim.model';

export interface CategoryMap {
  [category: string]: Category;
}

export interface Category {
  title: string;
  color: string;
}
