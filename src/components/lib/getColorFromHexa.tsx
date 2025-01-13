function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1)); // X value
  const m = l - c / 2; // Match value for RGB

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const hex = (x: number) => x.toString(16).padStart(2, '0');

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

// Fungsi untuk mendapatkan nilai primary color dari variabel CSS --primary dalam .theme-orange
export function getPrimaryColorFromTheme(): string | null {
  // Ambil elemen root atau elemen yang memiliki kelas theme-orange
  const bodyElement = document.body;

  //   console.log(bodyElement.classList[0]);
  const themeElement = document.querySelector(`.${bodyElement.classList[0]}`);

  if (!themeElement) {
    console.log('Element with class .theme-orange not found');
    return null;
  }

  // Ambil nilai variabel CSS --primary dari elemen tersebut
  const primaryHsl = getComputedStyle(themeElement)
    .getPropertyValue('--primary')
    .trim();

  // Cek jika nilai tidak ditemukan
  if (!primaryHsl) return null;

  // Mengambil HSL value yang ada di dalam string "hsl(h,s%,l%)"
  const match = primaryHsl.match(/^(\d+\.?\d*)\s*(\d+\.?\d*)%\s*(\d+\.?\d*)%$/);
  if (match) {
    const h = parseFloat(match[1]); // Hue
    const s = parseFloat(match[2]); // Saturation
    const l = parseFloat(match[3]); // Lightness

    // Konversi ke HEX
    return hslToHex(h, s, l);
  }

  return null; // Return null jika format tidak cocok
}
