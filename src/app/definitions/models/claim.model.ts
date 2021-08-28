export interface ClaimMap {
  [claim: string]: Claim;
}

export interface ClaimProvenanceEntry {
  claim: string;
  description?: string;
}

export interface Claim {
  order: number;
  title: string;
  category: string;
  description: string;
  provenance: ClaimProvenanceEntry[];
  moreinfo: string[];
}

export interface ClaimWithId extends Claim {
  claimId: string;
}
