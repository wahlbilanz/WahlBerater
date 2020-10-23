import {ThesenMap} from './these.model';

export interface KategorienMap {
    [kategorie: string]: Kategorie;
}

export interface Kategorie {
  titel: string;
  color: string;
  thesen: ThesenMap;
}
