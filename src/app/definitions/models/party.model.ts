export interface PartyMap {
  [party: string]: Party;
}

export interface Party {
  name: string;
  color: string;
  link: string;
  description: string;
}
