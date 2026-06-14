import { createContext, useContext, useState } from 'react';
import i18n from 'i18next';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('nq_lang') || 'en');

  const toggleLang = () => {
    const next = lang === 'en' ? 'ur' : 'en';
    setLang(next);
    i18n.changeLanguage(next);
    localStorage.setItem('nq_lang', next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
