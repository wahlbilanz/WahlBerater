export interface ClaimMap {
  [claim: string]: Claim;
}

export interface Claim {
  claim: string;
  background: string;
  provenance: [Claim];
}
