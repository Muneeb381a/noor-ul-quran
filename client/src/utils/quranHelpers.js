export const SURAH_COUNT = 114;

export function formatSurahAyah(surah, ayah) {
  return `${surah}:${ayah}`;
}

export function parseSurahAyah(str) {
  const [surah, ayah] = str.split(':').map(Number);
  return { surah, ayah };
}

export function getGlobalAyahNumber(surahNum, ayahNum, surahMeta) {
  const offset = surahMeta.slice(0, surahNum - 1).reduce((acc, s) => acc + s.numberOfAyahs, 0);
  return offset + ayahNum;
}
