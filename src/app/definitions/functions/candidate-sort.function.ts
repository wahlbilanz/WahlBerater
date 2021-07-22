// some functions to compare and sort candidates, primarily in frontend

import { KeyValue } from '@angular/common';
import { CandidateResult } from '../models/results.model';

export function candidateKeyValueSorter(a: KeyValue<number, CandidateResult>, b: KeyValue<number, CandidateResult>): number {
  if (a.value.political.listOrder === b.value.political.listOrder) {
    if (b.value.score.score === a.value.score.score) {
      return a.value.personal.name.localeCompare(b.value.personal.name);
    }
    return b.value.score.score - a.value.score.score;
  }
  return a.value.political.listOrder - b.value.political.listOrder;
}
