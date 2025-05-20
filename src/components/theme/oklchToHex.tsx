import { formatHex, oklch, parse } from 'culori';

export function oklchToHex(oklchString: string): string {
  const match = oklchString.match(/oklch\(([^)]+)\)/);
  if (!match) return '#000000';

  const [l, c, h] = match[1].split(' ').map(Number);

  if ([l, c, h].some((value) => isNaN(value))) return '#000000';

  // Pastikan mode adalah literal string "oklch"
  const colorObj = { mode: 'oklch' as const, l, c, h };

  return formatHex(colorObj) ?? '#000000';
}

export function hexToOklch(hex: string): string | null {
  // parse hex jadi object warna
  const color = parse(hex);
  if (!color) return null;

  // konversi ke oklch
  const colorOklch = oklch(color);
  if (!colorOklch) return null;

  // format jadi string oklch, misal: "oklch(0.208 0.042 265.755)"
  // kita pakai 3 digit desimal untuk ketelitian
  const l = colorOklch.l?.toFixed(3) ?? '0';
  const c = colorOklch.c?.toFixed(3) ?? '0';
  const h = colorOklch.h?.toFixed(3) ?? '0';

  return `oklch(${l} ${c} ${h})`;
}
