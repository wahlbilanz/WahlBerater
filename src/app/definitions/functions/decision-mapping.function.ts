export function decisionToWord(decision: number, fav?: boolean): string {
  switch (decision) {
    case -2:
      return 'auf keinen fall';
    case -1:
      if (fav) {
        return 'auf keinen fall';
      }
      return 'nein';
    case 1:
      if (fav) {
        return 'auf jeden fall';
      }
      return 'ja';
    case 2:
      return 'auf jeden fall';
  }
  return 'übersprungen';
}
