import axios from 'axios';

const BASE = 'https://api.alquran.cloud/v1';

export const getAllSurahs = () => axios.get(`${BASE}/surah`).then(r => r.data.data);

export const getSurahArabic = (num) => axios.get(`${BASE}/surah/${num}`).then(r => r.data.data);

export const getSurahTranslation = (num, edition = 'en.sahih') =>
  axios.get(`${BASE}/surah/${num}/${edition}`).then(r => r.data.data);

export const getAyah = (ref) => axios.get(`${BASE}/ayah/${ref}`).then(r => r.data.data);

export const getWordByWord = (surahNum) =>
  axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${surahNum}?words=true`).then(r => r.data.verses);

export const audioUrl = (ayahNum, reciter = 'ar.alafasy') =>
  `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayahNum}.mp3`;
