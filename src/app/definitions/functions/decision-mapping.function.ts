

export function decisionToWord(decision: number, fav?: boolean): string {
  switch (decision) {
    case -2:
    case -1:
      if (fav) {
        return 'auf keinen fall';
      }
      return 'nein';
    case 1:
    case 2:
      if (fav) {
        return 'auf jeden fall';
      }
      return 'ja';
  }
  return 'übersprungen';

}
