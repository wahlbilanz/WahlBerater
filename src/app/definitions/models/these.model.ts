
export interface ThesenMap {
    [these: string]: These;
}

export interface These {
  these: string;
  background: string;
  provenance: [These];
}
