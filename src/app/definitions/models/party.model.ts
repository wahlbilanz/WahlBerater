import { LinkMap } from './link.model';

export interface PartyMap {
  [party: string]: Party;
}

export interface Party {
  name: string;
  color: string;
  links: LinkMap;
  description?: string;
}
