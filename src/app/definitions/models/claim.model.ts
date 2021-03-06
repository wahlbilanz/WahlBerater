export interface ClaimMap {
  [claim: string]: Claim;
}

export interface ClaimProvenanceEntry {
  claim: string;
  description?: string;
}

export interface NamedLink {
  title: string;
  url: string;
}

export interface Claim {
  title: string;
  category: string;
  description: string;
  provenance: ClaimProvenanceEntry[];
  links: NamedLink[];
}
