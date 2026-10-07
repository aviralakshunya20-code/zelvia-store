// js/fit.js - Pure fit calculation (Chapter 6.9, 9.3)

export function fitCheck(itemMm, spaceMm, gapMm = 0){
  const a = [...itemMm].sort((x, y) => x - y);
  const b = [...spaceMm].sort((x, y) => x - y);
  const short = a.map((v, i) => Math.max(0, v + gapMm - b[i]));
  const spare = a.map((v, i) => Math.max(0, b[i] - v - gapMm));
  return { fits: short.every(s => s === 0), short, spare, itemSorted: a, spaceSorted: b };
}
