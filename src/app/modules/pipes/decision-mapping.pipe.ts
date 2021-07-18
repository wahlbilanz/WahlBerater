import { Pipe, PipeTransform } from '@angular/core';
import { decisionToWord, partyDecisionToWord } from '../../definitions/functions/decision-mapping.function';

@Pipe({
  name: 'decisionToWord',
  pure: true,
})
export class DecisionToWordPipe implements PipeTransform {
  transform(decision: number, fav?: boolean): string {
    return decisionToWord(decision, fav);
  }
}

@Pipe({
  name: 'candidateDecisionToWord',
  pure: true,
})
export class CandidateDecisionToWordPipe implements PipeTransform {
  transform(decision: number): string {
    return decisionToWord(decision, Math.abs(decision) > 1);
  }
}

@Pipe({
  name: 'partyDecisionToWord',
  pure: true,
})
export class PartyDecisionToWordPipe implements PipeTransform {
  transform(decision: number): string {
    return partyDecisionToWord(decision);
  }
}
