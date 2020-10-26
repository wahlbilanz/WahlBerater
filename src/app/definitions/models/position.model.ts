export interface PositionsMap {
    [claim: string]: Position;
}

export interface Position {
  vote: number;
  reason: string;
}
