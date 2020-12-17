export interface Votes {
  [vote: string]: Vote;
}

export interface Vote {
  decision: number;
  fav: boolean;
}
