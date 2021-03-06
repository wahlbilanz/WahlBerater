import { ClaimMap } from './claim.model';

export interface CategoryMap {
  [category: string]: Category;
}

export interface Category {
  order: number;
  title: string;
  color: string;
}
