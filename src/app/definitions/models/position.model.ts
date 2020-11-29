export interface PositionsMap {
  [claim: string]: Position;
}

export interface Position {
  vote: -2 | -1 | 0 | 1 | 2;
  reason: string;
}
