import { useQuery } from '@tanstack/react-query';
import { getAllSurahs, getSurahArabic, getSurahTranslation } from '../services/quranService';

export function useSurahs() {
  return useQuery({ queryKey: ['surahs'], queryFn: getAllSurahs, staleTime: Infinity });
}

export function useSurah(num) {
  const arabic = useQuery({
    queryKey: ['surah', num, 'ar'],
    queryFn: () => getSurahArabic(num),
    staleTime: Infinity,
  });
  const transEn = useQuery({
    queryKey: ['surah', num, 'en.sahih'],
    queryFn: () => getSurahTranslation(num, 'en.sahih'),
    staleTime: Infinity,
  });
  const transUr = useQuery({
    queryKey: ['surah', num, 'ur.jalandhry'],
    queryFn: () => getSurahTranslation(num, 'ur.jalandhry'),
    staleTime: Infinity,
  });
  return { arabic, transEn, transUr };
}
