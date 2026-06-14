import duas from '../data/duas.json';

export const getAllDuas = () => duas;

export const getDuasByCategory = (category) =>
  duas.filter(d => d.category === category);

export const searchDuas = (query) => {
  const q = query.toLowerCase();
  return duas.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.translation_en.toLowerCase().includes(q) ||
    d.transliteration.toLowerCase().includes(q)
  );
};

export const getCategories = () => [...new Set(duas.map(d => d.category))];
