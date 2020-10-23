export interface PositionsMap {
    [these: string]: Position;
}

export interface Position {
  vote: number;
  reason: string;
}
