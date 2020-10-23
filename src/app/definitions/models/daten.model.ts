import {KategorienMap} from './kategorie.model';
import {Kandidat} from './kandidat.model';
import {ListenMap} from './liste.model';

export interface Daten {
  kategorien: KategorienMap;
  kandidaten: [Kandidat];
  listen: ListenMap;
}

