import { useState, useMemo, useRef } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import duasData from '../../data/duas.json';
import { API_BASE } from '../../config';

/* ── helpers ── */
const dayIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000) % duasData.length;
};

const CATEGORIES = ['All', ...Array.from(new Set(duasData.map((d) => d.category)))];

const CAT_META = {
  'All':               { icon: '📿', color: '#14532D' },
  'Daily Life':        { icon: '🌿', color: '#2E7D32' },
  'Morning & Evening': { icon: '🌅', color: '#E65100' },
  'Prayer & Worship':  { icon: '🕌', color: '#14532D' },
  'Distress & Healing':{ icon: '💙', color: '#1565C0' },
  'Forgiveness':       { icon: '🤲', color: '#6A1B9A' },
  'Travel':            { icon: '🚗', color: '#0277BD' },
  'Family':            { icon: '👨‍👩‍👦', color: '#880E4F' },
  'Knowledge & Wisdom':{ icon: '📚', color: '#1565C0' },
  'Protection':        { icon: '🛡️', color: '#37474F' },
  'Nature & Weather':  { icon: '🌧️', color: '#0277BD' },
  'Dhikr & Gratitude': { icon: '🌸', color: '#00838F' },
  'Special Occasions': { icon: '⭐', color: '#4527A0' },
  'Hereafter':         { icon: '🌺', color: '#2E7D32' },
};

/* ── audio ── */
async function speakArabic(text) {
  try {
    const res = await fetch(`${API_BASE}/api/tts?text=${encodeURIComponent(text)}&lang=ar`);
    if (!res.ok) throw new Error();
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    new Audio(url).play();
  } catch {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ar-SA';
    speechSynthesis.speak(utt);
  }
}

/* ── DuaCard ── */
function DuaCard({ dua, isFav, onFav }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const meta = CAT_META[dua.category] || { icon: '✨', color: '#14532D' };

  const copy = async () => {
    await navigator.clipboard.writeText(
      dua.arabic + '\n\n' + dua.transliteration + '\n\n' + dua.translation_en
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 20,
        border: '1px solid rgba(28,25,23,0.09)',
        overflow: 'hidden',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px ${meta.color}30`;
        e.currentTarget.style.background = `${meta.color}08`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.background = '#ffffff';
      }}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg, ${meta.color}, ${meta.color}80)` }} />

      <div style={{ padding: '1rem 1.2rem 0.6rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 18 }}>{dua.icon}</span>
          <span style={{
            padding: '0.2rem 0.65rem', borderRadius: 99,
            background: meta.color + '15', color: meta.color,
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>{dua.category}</span>
          {dua.subcategory && (
            <span style={{ fontSize: '0.65rem', color: '#999', fontStyle: 'italic' }}>{dua.subcategory}</span>
          )}
        </div>
        <button onClick={() => onFav(dua.id)} style={{
          background: 'none', border: 'none', fontSize: 18, lineHeight: 1,
          color: isFav ? '#e53935' : '#E7E5E4', cursor: 'pointer',
          transition: 'transform 0.2s', transform: isFav ? 'scale(1.2)' : 'scale(1)',
        }} title={isFav ? 'Remove favorite' : 'Add to favorites'}>
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div style={{ padding: '0 1.2rem 0.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1C1917', margin: 0 }}>{dua.title}</h3>
      </div>

      <div style={{
        margin: '0 1.2rem',
        padding: '1.2rem',
        background: `${meta.color}0A`,
        borderRadius: 14,
        border: `1px solid ${meta.color}20`,
        textAlign: 'right',
      }}>
        <p style={{
          fontFamily: '"Noto Naskh Arabic", "Amiri Quran", serif',
          fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
          lineHeight: 2.2,
          color: '#1C1917',
          margin: 0,
          direction: 'rtl',
        }}>{dua.arabic}</p>
      </div>

      <div style={{ padding: '0.8rem 1.2rem 0.2rem' }}>
        <p style={{ fontStyle: 'italic', color: '#A8A29E', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
          {dua.transliteration}
        </p>
      </div>

      <div style={{ padding: '0.5rem 1.2rem 0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ background: 'rgba(46,125,50,0.1)', borderRadius: 10, padding: '0.6rem 0.9rem', borderLeft: '3px solid #22C55E' }}>
          <p style={{ margin: 0, fontSize: '0.83rem', color: '#44403C', lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700, color: '#22C55E', marginRight: 4 }}>EN:</span>{dua.translation_en}
          </p>
        </div>
        {expanded && dua.translation_ur && (
          <div style={{ background: 'rgba(106,27,154,0.1)', borderRadius: 10, padding: '0.6rem 0.9rem', borderRight: '3px solid #B39DDB', textAlign: 'right' }}>
            <p style={{
              margin: 0, fontSize: '0.88rem', color: '#44403C', lineHeight: 3.4,
              fontFamily: '"Noto Nastaliq Urdu", serif', direction: 'rtl', wordSpacing: '3px',
            }}>
              <span style={{ fontWeight: 700, color: '#B39DDB', marginLeft: 4 }}>اردو:</span>{dua.translation_ur}
            </p>
          </div>
        )}
        {dua.explanation && (
          <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: 10, padding: '0.65rem 0.9rem', borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(245,158,11,0.8)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>📖 Explanation</p>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#78716C', lineHeight: 1.7 }}>{dua.explanation}</p>
          </div>
        )}
        {dua.benefit && (
          <div style={{ background: 'rgba(142,36,170,0.1)', borderRadius: 10, padding: '0.5rem 0.9rem', borderLeft: '3px solid #BA68C8', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.78rem', flexShrink: 0, marginTop: '0.1rem' }}>⭐</span>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(186,104,200,0.85)', lineHeight: 1.6, fontWeight: 600 }}>{dua.benefit}</p>
          </div>
        )}
      </div>

      <div style={{
        padding: '0.65rem 1.2rem',
        borderTop: '1px solid rgba(28,25,23,0.07)',
        background: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
        flexWrap: 'wrap',
      }}>
        <span style={{
          padding: '0.2rem 0.65rem', borderRadius: 99,
          background: 'rgba(82,183,136,0.1)', color: 'rgba(82,183,136,0.75)',
          fontSize: '0.68rem', fontWeight: 600,
        }}>📖 {dua.source}</span>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button onClick={() => setExpanded(v => !v)} style={{
            background: expanded ? 'rgba(245,158,11,0.12)' : 'none',
            border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8,
            padding: '0.3rem 0.6rem', fontSize: '0.7rem', fontWeight: 600,
            color: 'rgba(245,158,11,0.8)', cursor: 'pointer', transition: 'background 0.18s',
          }}>{expanded ? 'اردو ✕' : 'اردو'}</button>
          <button onClick={() => speakArabic(dua.arabic)} style={{
            background: 'none', border: '1px solid rgba(28,25,23,0.12)', borderRadius: 8,
            padding: '0.3rem 0.55rem', cursor: 'pointer', fontSize: '0.78rem',
            color: '#78716C', transition: 'background 0.18s',
          }} title="Listen">🔊</button>
          <button onClick={copy} style={{
            background: copied ? 'rgba(82,183,136,0.1)' : 'none',
            border: `1px solid ${copied ? 'rgba(82,183,136,0.4)' : 'rgba(28,25,23,0.12)'}`,
            borderRadius: 8, padding: '0.3rem 0.55rem', cursor: 'pointer',
            fontSize: '0.78rem', color: copied ? '#22C55E' : '#78716C', transition: 'all 0.18s',
          }} title="Copy">{copied ? '✓' : '📋'}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Notification Settings Panel ── */
function NotifPanel({ duas }) {
  const { permission, settings, enableNotifications, disableNotifications, updateTime, isSupported } = useNotifications();
  const [time, setTime] = useState(settings.time);
  const daily = duas[dayIndex()];

  if (!isSupported) return (
    <p style={{ padding: '0.5rem', color: '#999', fontSize: '0.82rem', textAlign: 'center' }}>
      آپ کا براؤزر نوٹیفکیشن سپورٹ نہیں کرتا
    </p>
  );

  const toggle = async () => {
    if (settings.enabled) {
      disableNotifications();
    } else {
      const ok = await enableNotifications(time, daily?.title || 'Daily Dua', daily?.arabic || '');
      if (!ok) alert('نوٹیفکیشن کی اجازت درکار ہے۔ براہ کرم براؤزر سیٹنگز میں اجازت دیں۔');
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    updateTime(e.target.value, daily?.title || 'Daily Dua', daily?.arabic || '');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: '#1C1917', fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl', lineHeight: 3 }}>روزانہ دعا یاددہانی</p>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: '#A8A29E' }}>
            {permission === 'denied'
              ? '⚠️ نوٹیفکیشن بند ہیں — براؤزر سیٹنگز میں اجازت دیں'
              : settings.enabled
                ? `✅ ${settings.time} بجے یاددہانی فعال ہے`
                : 'غیر فعال'}
          </p>
        </div>
        <button onClick={toggle} disabled={permission === 'denied'} style={{
          padding: '0.5rem 1.1rem', borderRadius: 99,
          background: settings.enabled ? 'rgba(229,57,53,0.2)' : 'linear-gradient(135deg,#14532D,#15803D)',
          color: settings.enabled ? '#ef5350' : '#fff', border: `1px solid ${settings.enabled ? 'rgba(229,57,53,0.4)' : 'transparent'}`,
          fontSize: '0.78rem', fontWeight: 700,
          cursor: permission === 'denied' ? 'not-allowed' : 'pointer',
          opacity: permission === 'denied' ? 0.5 : 1, transition: 'all 0.2s', fontFamily: '"Noto Nastaliq Urdu",serif',
        }}>{settings.enabled ? 'بند کریں' : 'فعال کریں'}</button>
      </div>
      {settings.enabled && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '0.8rem', color: '#A8A29E', whiteSpace: 'nowrap', fontFamily: '"Noto Nastaliq Urdu",serif', lineHeight: 3 }}>وقت منتخب کریں:</label>
          <input type="time" value={time} onChange={handleTimeChange} style={{
            padding: '0.4rem 0.7rem', borderRadius: 8,
            border: '1px solid rgba(28,25,23,0.12)', fontSize: '0.85rem',
            background: 'rgba(28,25,23,0.07)', color: '#1C1917', fontWeight: 600,
            outline: 'none', cursor: 'pointer',
          }} />
        </div>
      )}
    </div>
  );
}

/* ── Main Page ── */
export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dua_favorites') || '[]'); } catch { return []; }
  });
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const filterRef = useRef(null);

  const dailyDua = duasData[dayIndex()];

  const filtered = useMemo(() => {
    let list = duasData;
    if (showFavOnly) list = list.filter(d => favorites.includes(d.id));
    if (activeCategory !== 'All') list = list.filter(d => d.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.arabic.includes(q) ||
        d.transliteration.toLowerCase().includes(q) ||
        d.translation_en.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, query, showFavOnly, favorites]);

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('dua_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleCatClick = (cat) => {
    setActiveCategory(cat);
    setShowFavOnly(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* HERO */}
      <div style={{
        background: 'linear-gradient(150deg, #052e16 0%, #14532D 55%, #14532D 100%)',
        padding: '5rem 1.5rem 3.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', width: 4, height: 4, borderRadius: '50%',
            background: 'rgba(245,158,11,0.5)',
            top: `${10 + Math.sin(i * 1.3) * 30}%`,
            left: `${5 + (i * 12.5)}%`,
            animation: `floatY ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}

        <p style={{ color: 'rgba(245,158,11,0.8)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          ✨ مسنون دعائیں
        </p>
        <h1 style={{
          fontFamily: '"Noto Naskh Arabic", serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#fff', lineHeight: 1.4, marginBottom: '0.75rem',
        }}>ادعية مأثورة</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 520, margin: '0 auto 0.5rem' }}>
          Authentic duas from the Quran and Sunnah for every moment of your day
        </p>
        <p style={{ color: 'rgba(245,158,11,0.6)', fontSize: '0.82rem', marginBottom: '2rem' }}>
          {duasData.length} دعائیں · {CATEGORIES.length - 1} موضوعات
        </p>

        <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18, opacity: 0.5 }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search duas by title, category, or translation..."
            style={{
              width: '100%', padding: '0.9rem 1rem 0.9rem 2.8rem',
              borderRadius: 50, border: '1px solid rgba(245,158,11,0.3)',
              background: '#ffffff',
              color: '#1C1917', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* DAILY DUA FEATURED */}
      {!query && activeCategory === 'All' && !showFavOnly && dailyDua && (
        <div style={{ maxWidth: 860, margin: '-1.5rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <div style={{
            background: 'linear-gradient(135deg, #14532D 0%, #14532D 60%, #2E7D32 100%)',
            borderRadius: 24, padding: '2rem',
            border: '1px solid rgba(245,158,11,0.25)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
            position: 'relative', overflow: 'hidden',
          }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.06 }}>
              <polygon points="60,5 70,40 105,40 78,62 88,98 60,78 32,98 42,62 15,40 50,40" fill="#F59E0B" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 99, padding: '0.25rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, color: '#F59E0B', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ⭐ آج کی دعا
              </span>
              <span style={{ fontSize: '0.7rem', color: '#A8A29E' }}>{dailyDua.category}</span>
            </div>
            <h2 style={{ color: '#F59E0B', fontFamily: '"Playfair Display",serif', fontSize: '1.1rem', marginBottom: '1rem' }}>{dailyDua.title}</h2>
            <p style={{
              fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              lineHeight: 2.2, color: '#fff', textAlign: 'right', direction: 'rtl', marginBottom: '1rem',
            }}>{dailyDua.arabic}</p>
            <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>{dailyDua.transliteration}</p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', lineHeight: 1.6 }}>{dailyDua.translation_en}</p>
            <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={() => speakArabic(dailyDua.arabic)} style={{
                background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)',
                borderRadius: 99, padding: '0.45rem 1rem', color: '#F59E0B',
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
              }}>🔊 سنیں</button>
              <button onClick={() => toggleFav(dailyDua.id)} style={{
                background: favorites.includes(dailyDua.id) ? 'rgba(229,57,53,0.15)' : 'rgba(255,255,255,0.1)',
                border: `1px solid ${favorites.includes(dailyDua.id) ? 'rgba(229,57,53,0.4)' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: 99, padding: '0.45rem 1rem',
                color: favorites.includes(dailyDua.id) ? '#ef5350' : 'rgba(255,255,255,0.7)',
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
              }}>{favorites.includes(dailyDua.id) ? '❤️ محفوظ' : '🤍 محفوظ کریں'}</button>
              <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '0.45rem 0.9rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>
                📖 {dailyDua.source}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATION PANEL */}
      <div style={{ maxWidth: 860, margin: '1.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          background: '#ffffff', borderRadius: 16,
          border: '1px solid rgba(245,158,11,0.15)',
          overflow: 'hidden',
        }}>
          <button onClick={() => setShowNotifPanel(v => !v)} style={{
            width: '100%', padding: '0.9rem 1.3rem', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: 20 }}>🔔</span>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'rgba(245,158,11,0.85)', fontFamily: '"Noto Nastaliq Urdu",serif', lineHeight: 3 }}>یاددہانی ترتیبات</span>
            </div>
            <span style={{ color: '#78716C', fontSize: '0.8rem' }}>{showNotifPanel ? '▲' : '▼'}</span>
          </button>
          {showNotifPanel && (
            <div style={{ padding: '0 1.3rem 1.3rem', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
              <div style={{ paddingTop: '1rem' }}>
                <NotifPanel duas={duasData} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FILTER BAR */}
      <div ref={filterRef} style={{
        position: 'sticky', top: 68, zIndex: 10,
        background: 'rgba(255,251,235,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245,158,11,0.12)',
        padding: '0.75rem 1.5rem', marginTop: '1.5rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 2 }}>
          <button onClick={() => { setShowFavOnly(v => !v); setActiveCategory('All'); }} style={{
            padding: '0.42rem 0.9rem', borderRadius: 99, border: '1px solid',
            borderColor: showFavOnly ? 'rgba(229,57,53,0.5)' : 'rgba(28,25,23,0.1)',
            background: showFavOnly ? 'rgba(229,57,53,0.12)' : 'transparent',
            color: showFavOnly ? '#ef5350' : '#78716C',
            fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s',
          }}>❤️ Favorites {favorites.length > 0 && `(${favorites.length})`}</button>
          {CATEGORIES.map(cat => {
            const meta = CAT_META[cat] || { icon: '✨', color: '#14532D' };
            const active = activeCategory === cat && !showFavOnly;
            return (
              <button key={cat} onClick={() => handleCatClick(cat)} style={{
                padding: '0.42rem 0.9rem', borderRadius: 99, border: '1px solid',
                borderColor: active ? `${meta.color}80` : 'rgba(28,25,23,0.1)',
                background: active ? `${meta.color}1A` : 'transparent',
                color: active ? meta.color : '#78716C',
                fontSize: '0.75rem', fontWeight: active ? 700 : 500,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s',
              }}>{meta.icon} {cat}</button>
            );
          })}
        </div>
      </div>

      {/* DUAS GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#78716C' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
            <p style={{ fontSize: '1rem', fontWeight: 600, fontFamily: '"Noto Nastaliq Urdu",serif', lineHeight: 3 }}>کوئی دعا نہیں ملی</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', fontFamily: '"Noto Nastaliq Urdu",serif', lineHeight: 3 }}>کوئی اور تلاش کریں یا فلٹر صاف کریں</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map(dua => (
              <DuaCard key={dua.id} dua={dua} isFav={favorites.includes(dua.id)} onFav={toggleFav} />
            ))}
          </div>
        )}
      </div>

      {/* FOOTER BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #052e16, #14532D)',
        padding: '3rem 2rem', textAlign: 'center', marginTop: '2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <p style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: '1.3rem', color: '#F59E0B', marginBottom: '0.5rem', direction: 'rtl' }}>
          وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
          "And when My servants ask you concerning Me — indeed I am near." — Quran 2:186
        </p>
      </div>

      <style>{`
        input[type="search"]::placeholder,
        input[placeholder]::placeholder { color: #A8A29E; }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 600px) {
          div[style*="minmax(340px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
