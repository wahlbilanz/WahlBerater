import { PartyDecisionThreshold } from '../../+state/app.models';

export function partyDecisionToWord(decision: number): string {
  if (decision < -1) {
    return 'auf keinen Fall';
  }
  if (decision < -PartyDecisionThreshold) {
    return 'nein';
  }
  if (decision > PartyDecisionThreshold) {
    return 'ja';
  }
  if (decision > 1) {
    return 'auf jeden Fall';
  }
  return '';
}

export function decisionToWord(decision: number, fav?: boolean): string {
  switch (decision) {
    case -2:
      return 'auf keinen Fall';
    case -1:
      if (fav) {
        return 'auf keinen Fall';
      }
      return 'nein';
    case 1:
      if (fav) {
        return 'auf jeden Fall';
      }
      return 'ja';
    case 2:
      return 'auf jeden Fall';
  }
  return 'übersprungen';
}
