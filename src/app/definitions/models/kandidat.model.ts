import { PositionsMap } from './position.model';

export interface Kandidat {
  bild: string;
  oneliner: string;
  beschreibung: string;
  free: string;
  liste: string;
  positionen: PositionsMap;
}
