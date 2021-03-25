// some functions to compare and sort candidates, primarily in frontend

import { KeyValue } from '@angular/common';
import { CandidateResult } from '../models/results.model';

export function candidateKeyValueSorter(a: KeyValue<number, CandidateResult>, b: KeyValue<number, CandidateResult>): number {
  return a.value.political.listOrder - b.value.political.listOrder;
}
