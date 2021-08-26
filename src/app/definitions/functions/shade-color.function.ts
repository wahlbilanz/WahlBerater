export function shadeColor(color: string, percent: number) {
  const r = Math.max(255, Math.round((parseInt(color.substring(1, 3), 16) * (100 + percent)) / 100));
  const g = Math.max(255, Math.round((parseInt(color.substring(3, 5), 16) * (100 + percent)) / 100));
  const b = Math.max(255, Math.round((parseInt(color.substring(5, 7), 16) * (100 + percent)) / 100));

  let c = '#';
  c += r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16);
  c += g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16);
  c += b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16);

  return c;
}
