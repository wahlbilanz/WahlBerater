import { LinkMap } from './link.model';
import { PositionsMap } from './position.model';

export interface PartyMap {
  [party: string]: Party;
}

export interface Party {
  id: string;
  name: string;
  color: string;
  links: LinkMap;
  picture?: string;
  description?: string;
  shortDescription?: string;
  order?: number;
  positions: PositionsMap;
}
