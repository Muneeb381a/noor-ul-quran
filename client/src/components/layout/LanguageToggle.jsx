import { useLang } from '../../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <button onClick={toggleLang} style={{ background: 'var(--green-light)', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600 }}>
      {lang === 'en' ? 'اردو' : 'English'}
    </button>
  );
}
