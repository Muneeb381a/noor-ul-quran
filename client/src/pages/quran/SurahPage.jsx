import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSurah } from '../../hooks/useQuran';
import { useAudio } from '../../hooks/useAudio';
import { useLang } from '../../context/LanguageContext';

const STORAGE_KEY = (num) => `quran_progress_${num}`;

// ── Helpers ───────────────────────────────────────────────────────────────
function toArabicNum(n) {
  return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

// Ornamental end-of-ayah marker:  ﴿١﴾
function AyahMarker({ n }) {
  return (
    <span style={{
      fontFamily: 'var(--font-quran)',
      color: 'var(--gold)',
      fontSize: '0.75em',
      padding: '0 0.3em',
      direction: 'rtl',
      unicodeBidi: 'embed',
      userSelect: 'none',
    }}>
      ﴿{toArabicNum(n)}﴾
    </span>
  );
}

// Loading skeleton
function ReaderSkeleton() {
  return (
    <div style={{ padding: '2rem', maxWidth: 860, margin: '0 auto' }}>
      <div className="skeleton" style={{ height: 60, borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }} />
      <div className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ height: 120, borderRadius: 'var(--radius-lg)' }} />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function SurahPage() {
  const { surahNum } = useParams();
  const num = Number(surahNum);
  const { lang } = useLang();
  const { arabic, transEn, transUr } = useSurah(num);
  const { play, pause, playing, currentAyah } = useAudio();

  const [showTrans, setShowTrans] = useState(true);
  const [fontSize, setFontSize] = useState(30);
  const [playingAll, setPlayingAll] = useState(false);
  const playAllRef = useRef(false);

  // ── Resume reading ───────────────────────────────────────────────────────
  const ayahRefs = useRef({});               // { ayahNumber: DOMElement }
  const lastVisibleRef = useRef(null);       // continuously updated, no re-render
  const [resumeAyah, setResumeAyah] = useState(null);   // saved ayah to offer resume
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const [resumeFlash, setResumeFlash] = useState(null);  // ayah number briefly highlighted

  // On mount: read saved position (only if > ayah 1)
  useEffect(() => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY(num)) || '0', 10);
    if (saved > 1) setResumeAyah(saved);
  }, [num]);

  // IntersectionObserver: track last visible ayah & persist it
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const ayahN = Number(entry.target.dataset.ayah);
            if (ayahN && (!lastVisibleRef.current || ayahN > lastVisibleRef.current)) {
              lastVisibleRef.current = ayahN;
              localStorage.setItem(STORAGE_KEY(num), ayahN);
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    const refs = ayahRefs.current;
    Object.values(refs).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [num, ayahRefs.current]);  // eslint-disable-line

  const scrollToAyah = useCallback((ayahInSurah) => {
    const el = ayahRefs.current[ayahInSurah];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setResumeFlash(ayahInSurah);
      setTimeout(() => setResumeFlash(null), 2000);
    }
    setResumeDismissed(true);
  }, []);

  const surah = arabic.data;
  const ayahs = surah?.ayahs || [];
  const enAyahs = transEn.data?.ayahs || [];
  const urAyahs = transUr.data?.ayahs || [];

  // Al-Fatiha (1) and At-Tawbah (9) don't show separate Bismillah
  const showBismillah = num !== 1 && num !== 9;

  const handlePlayAll = () => {
    if (playingAll) { pause(); setPlayingAll(false); playAllRef.current = false; return; }
    if (!ayahs.length) return;
    setPlayingAll(true);
    playAllRef.current = true;
    let i = 0;
    const playNext = () => {
      if (!playAllRef.current || i >= ayahs.length) { setPlayingAll(false); playAllRef.current = false; return; }
      const a = ayahs[i++];
      const audio = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.numberInQuran}.mp3`);
      audio.play();
      audio.onended = playNext;
      audio.onerror = playNext;
    };
    playNext();
  };

  useEffect(() => () => { playAllRef.current = false; }, []);

  if (arabic.isLoading) return <ReaderSkeleton />;
  if (arabic.isError) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--danger)' }}>
      Failed to load surah. Please check your connection.
    </div>
  );

  return (
    <div style={{ minHeight: '80vh', background: 'var(--parchment)' }}>
      {/* ── Surah Header ── */}
      <div style={{
        background: 'linear-gradient(160deg, var(--green-deep) 0%, #0D2B1D 100%)',
        padding: '2.5rem 1.5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,168,76,1) 20px, rgba(201,168,76,1) 21px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative' }}>
          {/* Back link */}
          <Link to="/quran" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            ← Surahs
          </Link>

          {/* Surah number */}
          <div style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Surah {num}
          </div>

          {/* Arabic name */}
          <h1 style={{ fontFamily: 'var(--font-arabic)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--gold-light)', direction: 'rtl', lineHeight: 1.3, marginBottom: '0.25rem' }}>
            {surah?.name}
          </h1>

          {/* English */}
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
            {surah?.englishName}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1rem' }}>
            {surah?.englishNameTranslation}
          </p>

          {/* Meta badges */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[
              surah?.revelationType === 'Meccan' ? 'Makki' : 'Madani',
              `${surah?.numberOfAyahs} Ayahs`,
            ].map(t => (
              <span key={t} style={{ padding: '0.25rem 0.75rem', background: 'rgba(201,168,76,0.15)', color: 'var(--gold-light)', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', border: '1px solid rgba(201,168,76,0.3)' }}>
                {t}
              </span>
            ))}
          </div>

          {/* Ornament */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
            <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>❖</span>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid rgba(27,67,50,0.08)', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', position: 'sticky', top: 64, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {/* Play all */}
        <button onClick={handlePlayAll} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.45rem 1rem',
          background: playingAll ? 'var(--green-deep)' : 'transparent',
          color: playingAll ? '#fff' : 'var(--green-deep)',
          border: '1.5px solid var(--green-deep)',
          borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
        }}>
          {playingAll ? '⏸ Stop' : '▶ Play All'}
        </button>

        {/* Translation toggle */}
        <button onClick={() => setShowTrans(p => !p)} style={{
          padding: '0.45rem 1rem',
          background: showTrans ? 'var(--green-pale)' : 'transparent',
          color: showTrans ? 'var(--green-mid)' : 'var(--text-mid)',
          border: `1.5px solid ${showTrans ? 'var(--green-light)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
        }}>
          Translation {showTrans ? 'On' : 'Off'} (EN + UR)
        </button>

        {/* Font size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: 'auto' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginRight: '0.15rem', whiteSpace: 'nowrap' }}>خط کا سائز</span>
          {[
            { sz: 24, label: 'A', display: '0.72rem', title: 'Small' },
            { sz: 28, label: 'A', display: '0.85rem', title: 'Medium' },
            { sz: 32, label: 'A', display: '1rem',    title: 'Large' },
            { sz: 38, label: 'A', display: '1.2rem',  title: 'Extra Large' },
          ].map(({ sz, label, display, title }) => {
            const active = fontSize === sz;
            return (
              <button key={sz} onClick={() => setFontSize(sz)} title={title} style={{
                width: 34, height: 34, borderRadius: 8,
                background: active ? 'var(--green-deep)' : 'var(--cream-dark)',
                color: active ? '#fff' : 'var(--text-mid)',
                border: active ? '1.5px solid var(--green-mid)' : '1.5px solid transparent',
                fontSize: display, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.18s', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{label}</button>
            );
          })}
        </div>
      </div>

      {/* ── Resume Banner ── */}
      {resumeAyah && !resumeDismissed && (
        <div style={{
          background: 'linear-gradient(90deg, #0D2818, #1B4332)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '0.65rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '0.75rem', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1rem' }}>📍</span>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>
              آپ نے آخری بار <strong style={{ color: '#C9A84C' }}>آیت {resumeAyah}</strong> پر پڑھنا چھوڑا تھا
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => scrollToAyah(resumeAyah)}
              style={{
                padding: '0.38rem 0.95rem',
                background: 'linear-gradient(135deg, #E2B84E, #C9A84C)',
                color: '#050E08', fontWeight: 700, fontSize: '0.78rem',
                border: 'none', borderRadius: 99, cursor: 'pointer',
              }}
            >
              ▶ وہاں سے شروع کریں
            </button>
            <button
              onClick={() => setResumeDismissed(true)}
              style={{
                padding: '0.38rem 0.75rem',
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Reader ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Bismillah */}
        {showBismillah && (
          <div style={{
            textAlign: 'center', marginBottom: '2rem',
            padding: '1.5rem',
            background: 'var(--white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: 'var(--shadow-gold)',
          }}>
            <p className="bismillah">
              بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Ayahs — each with translation below */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(201,168,76,0.15)',
          overflow: 'hidden',
        }}>
          {/* Translation label */}
          {showTrans && (
            <div style={{ background: 'linear-gradient(90deg, var(--green-deep), var(--green-mid))', padding: '0.5rem 1.5rem', display: 'flex', gap: '1.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                English — Sahih International
              </span>
              <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                اردو — جالندھری
              </span>
            </div>
          )}

          {ayahs.map((ayah, i) => {
            const isPlaying = playing && currentAyah === ayah.numberInQuran;
            const isFlashing = resumeFlash === ayah.numberInSurah;
            return (
              <div
                key={ayah.number}
                ref={el => { ayahRefs.current[ayah.numberInSurah] = el; }}
                data-ayah={ayah.numberInSurah}
                style={{
                  padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 4vw, 2.5rem)',
                  borderBottom: i < ayahs.length - 1 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                  borderLeft: isPlaying ? '4px solid var(--green-light)' : isFlashing ? '4px solid var(--gold)' : '4px solid transparent',
                  background: isPlaying ? 'rgba(82,183,136,0.04)' : isFlashing ? 'rgba(201,168,76,0.06)' : 'transparent',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onClick={() => play(ayah.numberInQuran)}
              >
                {/* Arabic text + ayah marker */}
                <p style={{
                  fontFamily: 'var(--font-quran)',
                  fontSize: fontSize,
                  direction: 'rtl',
                  textAlign: 'justify',
                  lineHeight: 2.6,
                  color: 'var(--text-dark)',
                  wordSpacing: '4px',
                  marginBottom: showTrans && (enAyahs[i]?.text || urAyahs[i]?.text) ? '1rem' : 0,
                }}>
                  {ayah.text}
                  {' '}
                  <AyahMarker n={ayah.numberInSurah} />
                </p>

                {/* Translations — English + Urdu both below Arabic */}
                {showTrans && (enAyahs[i]?.text || urAyahs[i]?.text) && (
                  <div style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px dashed rgba(201,168,76,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}>
                    {/* Ayah number badge — shared */}
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 28, height: 28, flexShrink: 0,
                        background: isPlaying ? 'var(--green-deep)' : 'linear-gradient(135deg, var(--cream-dark), var(--cream-mid))',
                        borderRadius: '50%',
                        border: `1px solid ${isPlaying ? 'var(--green-light)' : 'rgba(201,168,76,0.3)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-arabic)',
                        fontSize: '0.72rem',
                        color: isPlaying ? '#fff' : 'var(--text-gold)',
                        fontWeight: 700,
                        transition: 'all 0.3s',
                        marginTop: '0.15rem',
                      }}>
                        {toArabicNum(ayah.numberInSurah)}
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {/* English */}
                        {enAyahs[i]?.text && (
                          <p style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-mid)',
                            lineHeight: 1.75,
                            fontFamily: 'var(--font-body)',
                            fontStyle: 'italic',
                          }}>
                            {enAyahs[i].text}
                          </p>
                        )}

                        {/* Urdu — right aligned, Arabic font */}
                        {urAyahs[i]?.text && (
                          <p style={{
                            fontSize: '1.05rem',
                            color: 'var(--green-mid)',
                            lineHeight: 2.2,
                            fontFamily: 'var(--font-urdu)',
                            direction: 'rtl',
                            textAlign: 'right',
                          }}>
                            {urAyahs[i].text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation between surahs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
          {num > 1 && (
            <Link to={`/quran/${num - 1}`} style={{
              padding: '0.7rem 1.25rem',
              background: 'var(--white)',
              border: '1px solid rgba(27,67,50,0.12)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--green-deep)',
              fontWeight: 600,
              fontSize: '0.85rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              ← Previous Surah
            </Link>
          )}
          {num < 114 && (
            <Link to={`/quran/${num + 1}`} style={{
              padding: '0.7rem 1.25rem',
              background: 'var(--green-deep)',
              borderRadius: 'var(--radius-lg)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginLeft: 'auto',
              boxShadow: 'var(--shadow-md)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              Next Surah →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
