// some functions to compare and sort candidates, primarily in frontend

import { KeyValue } from '@angular/common';
import { CandidateResult } from '../models/results.model';

export function candidateValueSorter(a: CandidateResult, b: CandidateResult): number {
  if (a.political.listOrder === b.political.listOrder) {
    if (b.score.score === a.score.score) {
      return a.personal.name.localeCompare(b.personal.name);
    }
    return b.score.score - a.score.score;
  }
  return a.political.listOrder - b.political.listOrder;
}

export function candidateKeyValueSorter(a: KeyValue<number, CandidateResult>, b: KeyValue<number, CandidateResult>): number {
  return candidateValueSorter(a.value, b.value);
}
