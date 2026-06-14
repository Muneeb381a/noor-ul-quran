import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStreak } from '../../hooks/useStreak';
import { useQuery } from '@tanstack/react-query';
import { getLogs, getProgress } from '../../services/hifzService';
import letters from '../../data/arabic-letters.json';
import tajweedRules from '../../data/tajweed-rules.json';

/* ── Utilities ──────────────────────────────────────────────────────────── */
const greeting = () => {
  const h = new Date().getHours();
  if (h < 5)  return ['السَّلامُ عَلَيْكُم', 'Assalamu Alaikum'];
  if (h < 12) return ['صَبَاحُ الخَيْر', 'Good Morning'];
  if (h < 17) return ['مَرْحَبًا', 'Good Afternoon'];
  return ['مَسَاءُ الخَيْر', 'Good Evening'];
};

const dayIndex = () => Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);

const VERSES = [
  { arabic: 'وَرَتِّلِ ٱلۡقُرۡءَانَ تَرۡتِيلٗا', trans: 'Recite the Quran with measured recitation.', ref: 'Al-Muzzammil 73:4' },
  { arabic: 'وَلَقَدۡ يَسَّرۡنَا ٱلۡقُرۡءَانَ لِلذِّكۡرِ', trans: 'We have certainly made the Quran easy to remember.', ref: 'Al-Qamar 54:17' },
  { arabic: 'إِنَّ هَـٰذَا ٱلۡقُرۡءَانَ يَهۡدِي لِلَّتِي هِيَ أَقۡوَمُ', trans: 'This Quran guides to what is most upright.', ref: 'Al-Isra 17:9' },
  { arabic: 'أَفَلَا يَتَدَبَّرُونَ ٱلۡقُرۡءَانَ', trans: 'Do they not reflect upon the Quran?', ref: 'An-Nisa 4:82' },
  { arabic: 'ٱقۡرَأۡ بِٱسۡمِ رَبِّكَ ٱلَّذِي خَلَقَ', trans: 'Read in the name of your Lord who created.', ref: 'Al-Alaq 96:1' },
  { arabic: 'خَيۡرُكُمۡ مَنۡ تَعَلَّمَ ٱلۡقُرۡءَانَ وَعَلَّمَهُ', trans: 'The best of you are those who learn the Quran and teach it.', ref: 'Hadith — Bukhari' },
];

const TIPS = [
  { icon: '🌅', tip: 'Memorize after Fajr — the mind is clearest and retention is strongest at dawn.' },
  { icon: '🔁', tip: 'Repeat each ayah at least 7 times before moving on. Repetition cements memory.' },
  { icon: '👂', tip: 'Listen to a reciter before memorizing — let the sound settle in your mind first.' },
  { icon: '✍️', tip: 'Write difficult ayahs by hand. Physical writing reinforces memory pathways.' },
  { icon: '🤲', tip: 'Begin every session with a dua. Ask Allah to open your heart to His words.' },
  { icon: '⏱️', tip: '20 minutes daily beats 2 hours once a week. Consistency is everything in Hifz.' },
  { icon: '🎯', tip: 'Fix yesterday\'s mistakes before adding new verses — quality over quantity.' },
];

const QUICK_SURAHS = [
  { n: 112, name: 'Al-Ikhlas', ay: 4 }, { n: 113, name: 'Al-Falaq', ay: 5 },
  { n: 114, name: 'An-Nas', ay: 6 },   { n: 1,   name: 'Al-Fatiha', ay: 7 },
  { n: 110, name: 'An-Nasr', ay: 3 },  { n: 103, name: 'Al-Asr', ay: 3 },
];

/* ── Primitive card shell ────────────────────────────────────────────────── */
function Card({ children, style }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 20,
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(20,83,45,0.07)',
      overflow: 'hidden', ...style,
    }}>{children}</div>
  );
}

function CardHead({ icon, title, link, linkTo, accent = 'var(--green-deep)' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.9rem 1.4rem',
      background: `linear-gradient(to right, ${accent}08, transparent)`,
      borderBottom: `1px solid ${accent}12`,
      borderLeft: `3px solid ${accent}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, color: accent }}>{title}</span>
      </div>
      {link && linkTo && (
        <Link to={linkTo} style={{ fontSize: '0.75rem', color: accent, opacity: 0.7, fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
        >{link} →</Link>
      )}
    </div>
  );
}

/* ── Stat pill ────────────────────────────────────────────────────────────── */
function StatPill({ icon, label, value, sub, color, bg }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.9rem',
      padding: '1rem 1.2rem', background: bg || '#fff', borderRadius: 16,
      border: `1px solid ${color}20`,
      boxShadow: `0 2px 12px ${color}12, 0 1px 3px rgba(0,0,0,0.04)`,
      transition: 'all 0.22s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${color}25`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 2px 12px ${color}12, 0 1px 3px rgba(0,0,0,0.04)`; }}
    >
      <div style={{ width: 46, height: 46, borderRadius: 13, background: `${color}12`, border: `1.5px solid ${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: '1.55rem', fontWeight: 800, color, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.78rem', color: '#555', fontWeight: 600, marginTop: '0.18rem' }}>{label}</div>
        {sub && <div style={{ fontSize: '0.68rem', color: '#aaa', marginTop: '0.08rem' }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ── Quick Actions ────────────────────────────────────────────────────────── */
const ACTIONS = [
  { to: '/hifz/new-log',  icon: '📝', label: 'Log Session', sub: 'Sabaq · Sabaqi · Manzil', from: '#14532D', via: '#15803D' },
  { to: '/quran',         icon: '📖', label: 'Read Quran',  sub: '114 Surahs',              from: '#0D47A1', via: '#1565C0' },
  { to: '/learn/qaida',   icon: '✏️', label: 'Qaida',       sub: '10 Lessons',              from: '#1B5E20', via: '#2E7D32' },
  { to: '/learn/tajweed', icon: '🎨', label: 'Tajweed',     sub: '13 Rules',                from: '#880E4F', via: '#AD1457' },
  { to: '/learn/duas',    icon: '🤲', label: 'Duas',        sub: '200+ Prayers',            from: '#4A148C', via: '#6A1B9A' },
  { to: '/hifz/mistakes', icon: '⚠️', label: 'Mistakes',   sub: 'Review & Fix',            from: '#BF360C', via: '#E64A19' },
];

function QuickActions() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.6rem' }}>
      {ACTIONS.map(a => (
        <Link key={a.to} to={a.to} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '1rem 0.5rem', borderRadius: 14, textDecoration: 'none',
          background: `linear-gradient(145deg, ${a.from}, ${a.via})`,
          boxShadow: `0 3px 14px ${a.from}40`,
          transition: 'all 0.24s cubic-bezier(0.22,1,0.36,1)',
          gap: '0.3rem',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 28px ${a.from}55`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 3px 14px ${a.from}40`; }}
        >
          <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{a.label}</span>
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.55)', textAlign: 'center' }}>{a.sub}</span>
        </Link>
      ))}
    </div>
  );
}

/* ── Daily Verse ─────────────────────────────────────────────────────────── */
function DailyVerse() {
  const v = VERSES[dayIndex() % VERSES.length];
  return (
    <Card>
      <CardHead icon="✨" title="Verse of the Day" link="Open Quran" linkTo="/quran" accent="#14532D" />
      <div style={{ padding: '1.25rem 1.4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #14532D, #14532D)',
          borderRadius: 14, padding: '1.4rem',
          position: 'relative', overflow: 'hidden', marginBottom: '1rem',
        }}>
          <div style={{ position: 'absolute', bottom: -15, right: -10, opacity: 0.08 }}>
            <svg viewBox="0 0 200 200" width="110" height="110">
              <polygon points="100,4 116,66 180,66 130,102 148,164 100,128 52,164 70,102 20,66 84,66" fill="rgba(245,158,11,1)" />
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-quran)', fontSize: '1.55rem', direction: 'rtl', color: '#FCD34D', lineHeight: 2.2, margin: 0, position: 'relative' }}>{v.arabic}</p>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#444', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '0.3rem' }}>"{v.trans}"</p>
        <p style={{ fontSize: '0.72rem', color: '#aaa' }}>— {v.ref}</p>
      </div>
    </Card>
  );
}

/* ── Letter of Day ───────────────────────────────────────────────────────── */
function LetterOfDay() {
  const letter = letters[dayIndex() % letters.length];
  return (
    <Card>
      <CardHead icon="✏️" title="Letter of the Day" link="Open Qaida" linkTo="/learn/qaida" accent="#2E7D32" />
      <div style={{ padding: '1.25rem 1.4rem', display: 'flex', gap: '1.1rem', alignItems: 'center' }}>
        <div style={{
          width: 82, height: 82, borderRadius: 20, flexShrink: 0,
          background: 'linear-gradient(145deg, #14532D, #15803D)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-arabic)', fontSize: '3rem', color: '#FCD34D',
          boxShadow: '0 6px 24px rgba(20,83,45,0.4)',
        }}>{letter.arabic}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.05rem', color: 'var(--green-deep)', marginBottom: '0.2rem' }}>{letter.arabic_name}</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#222', marginBottom: '0.15rem' }}>{letter.name} — <span style={{ color: 'var(--green-mid)' }}>"{letter.sound}"</span></div>
          <div style={{ fontFamily: 'var(--font-urdu)', fontSize: '0.88rem', color: '#888', direction: 'rtl', marginBottom: '0.4rem' }}>{letter.urdu_name}</div>
          <div style={{ fontSize: '0.76rem', color: '#aaa', lineHeight: 1.55 }}>{letter.makhraj_desc}</div>
        </div>
      </div>
    </Card>
  );
}

/* ── Daily Tip ───────────────────────────────────────────────────────────── */
function DailyTip() {
  const tip = TIPS[dayIndex() % TIPS.length];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '1rem',
      padding: '1.1rem 1.3rem',
      background: 'linear-gradient(135deg, #FFF8E1, #FFFDF5)',
      borderRadius: 16, border: '1px solid rgba(245,158,11,0.25)',
      boxShadow: '0 2px 12px rgba(245,158,11,0.08)',
    }}>
      <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{tip.icon}</span>
      <div>
        <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', color: '#8B6914', textTransform: 'uppercase', marginBottom: '0.3rem' }}>💡 Daily Memorization Tip</div>
        <p style={{ fontSize: '0.88rem', color: '#5A4210', lineHeight: 1.72, margin: 0 }}>{tip.tip}</p>
      </div>
    </div>
  );
}

/* ── Weekly bar chart ────────────────────────────────────────────────────── */
function WeeklyChart({ logs = [] }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split('T')[0];
    const count = logs.filter(l => l.logged_at?.startsWith(ds)).length;
    return { label: d.toLocaleDateString('en', { weekday: 'short' }), ds, count, isToday: i === 6 };
  });
  const max = Math.max(...days.map(d => d.count), 1);

  return (
    <Card>
      <CardHead icon="📅" title="7-Day Activity" accent="#0277BD" />
      <div style={{ padding: '1.1rem 1.4rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', height: 80 }}>
          {days.map(day => {
            const h = Math.max((day.count / max) * 68, day.count > 0 ? 12 : 4);
            return (
              <div key={day.ds} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{
                  width: '100%', height: h, borderRadius: 6,
                  background: day.count > 0
                    ? (day.isToday ? 'linear-gradient(to top, #F59E0B, #FCD34D)' : 'linear-gradient(to top, var(--green-deep), var(--green-light))')
                    : '#F0EDE6',
                  border: day.isToday ? '1.5px solid rgba(245,158,11,0.6)' : '1px solid transparent',
                  transition: 'height 0.4s ease',
                  position: 'relative',
                }} title={`${day.count} session${day.count !== 1 ? 's' : ''}`}>
                  {day.count > 0 && (
                    <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', fontWeight: 800, color: day.isToday ? 'var(--gold)' : 'var(--green-mid)', whiteSpace: 'nowrap' }}>{day.count}</span>
                  )}
                </div>
                <span style={{ fontSize: '0.62rem', color: day.isToday ? 'var(--gold)' : '#bbb', fontWeight: day.isToday ? 700 : 400 }}>
                  {day.isToday ? 'Today' : day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* ── Qaida tracker ───────────────────────────────────────────────────────── */
function QaidaTracker() {
  const [prog, setProg] = useState({});
  useEffect(() => { try { setProg(JSON.parse(localStorage.getItem('qaida_progress') || '{}')); } catch {} }, []);

  const NAMES = ['Alphabet','Forms','Connected','Groups','Harakat','Tanween','Sukoon','Shaddah','Madd','Words'];
  const done = NAMES.filter((_, i) => prog[`lesson_${i + 1}_complete`]).length;
  const pct = Math.round((done / NAMES.length) * 100);

  return (
    <Card>
      <CardHead icon="✏️" title="Qaida Progress" link="Continue" linkTo="/learn/qaida" accent="#2E7D32" />
      <div style={{ padding: '1.1rem 1.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#777' }}>{done}/{NAMES.length} lessons</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2E7D32' }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: '#F0EDE6', borderRadius: 99, overflow: 'hidden', marginBottom: '0.9rem' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #14532D, #22C55E)', borderRadius: 99, transition: 'width 0.7s ease' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.4rem' }}>
          {NAMES.map((n, i) => {
            const ok = prog[`lesson_${i + 1}_complete`];
            return (
              <div key={i} title={`Lesson ${i+1}: ${n}`} style={{
                height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 700, cursor: 'default',
                background: ok ? 'linear-gradient(135deg, #14532D, #15803D)' : '#F5F0E8',
                color: ok ? '#FCD34D' : '#CCC',
                border: `1px solid ${ok ? 'transparent' : '#E8E2D8'}`,
                boxShadow: ok ? '0 2px 8px rgba(20,83,45,0.3)' : 'none',
                transition: 'all 0.2s',
              }}>{ok ? '✓' : i + 1}</div>
            );
          })}
        </div>
        <p style={{ fontSize: '0.71rem', color: '#bbb', marginTop: '0.65rem' }}>
          {done === 0 ? '✨ Start your first lesson today!' : done === NAMES.length ? '🎉 All lessons complete!' : `Next: L${done + 1} — ${NAMES[done]}`}
        </p>
      </div>
    </Card>
  );
}

/* ── Tajweed tracker ─────────────────────────────────────────────────────── */
function TajweedTracker() {
  const [learned, setLearned] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tajweed_learned') || '[]'); } catch { return []; }
  });

  const toggle = (id) => setLearned(prev => {
    const n = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
    localStorage.setItem('tajweed_learned', JSON.stringify(n)); return n;
  });

  const pct = Math.round((learned.length / tajweedRules.length) * 100);

  return (
    <Card>
      <CardHead icon="🎨" title="Tajweed Tracker" link="Study" linkTo="/learn/tajweed" accent="#AD1457" />
      <div style={{ padding: '1.1rem 1.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#777' }}>{learned.length}/{tajweedRules.length} rules</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#AD1457' }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: '#F0EDE6', borderRadius: 99, overflow: 'hidden', marginBottom: '0.85rem' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #880E4F, #E91E63)', borderRadius: 99, transition: 'width 0.4s' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: 200, overflowY: 'auto' }}>
          {tajweedRules.map(r => {
            const done = learned.includes(r.id);
            return (
              <div key={r.id} onClick={() => toggle(r.id)} style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                padding: '0.5rem 0.65rem', borderRadius: 10, cursor: 'pointer',
                background: done ? `${r.color}08` : '#FAFAF7',
                border: `1px solid ${done ? r.color + '28' : '#EEE'}`,
                transition: 'all 0.15s',
              }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, background: done ? r.color : 'transparent', border: `2px solid ${done ? r.color : '#DDD'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.65rem' }}>{done ? '✓' : ''}</div>
                <span style={{ fontSize: '0.82rem' }}>{r.icon}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: done ? r.color : '#666', flex: 1 }}>{r.name}</span>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.88rem', color: r.color }}>{r.arabic_name}</span>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: '0.68rem', color: '#ccc', marginTop: '0.45rem' }}>Tap to mark as learned</p>
      </div>
    </Card>
  );
}

/* ── Hifz Surah Map ──────────────────────────────────────────────────────── */
function SurahMap({ progress = [] }) {
  const map = useMemo(() => { const m = {}; progress.forEach(p => m[p.surah_num] = p); return m; }, [progress]);
  const complete = progress.filter(p => p.status === 'complete').length;

  return (
    <Card>
      <CardHead icon="🗺️" title="Hifz Surah Map" link="Manage" linkTo="/hifz" accent="#6A1B9A" />
      <div style={{ padding: '1.1rem 1.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--green-deep)' }}>{complete}</span>
            <span style={{ fontSize: '0.78rem', color: '#aaa' }}> / 114 surahs</span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.68rem', color: '#aaa' }}>
            {[['#14532D','Done'], ['#F57C00','Progress'], ['#EEE','Pending']].map(([c,l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: c, display: 'inline-block' }} />{l}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(19,1fr)', gap: '2px' }}>
          {Array.from({ length: 114 }, (_, i) => {
            const p = map[i + 1];
            return (
              <div key={i} title={`Surah ${i+1}`} style={{
                aspectRatio: '1', borderRadius: 3,
                background: p?.status === 'complete' ? 'linear-gradient(135deg,#14532D,#15803D)' : p?.status === 'in_progress' ? '#F57C00' : '#F0EDE6',
                border: p?.status === 'complete' ? '1px solid rgba(82,183,136,0.3)' : p?.status === 'in_progress' ? '1px solid #E65100' : '1px solid #E8E2D8',
                cursor: 'default',
              }} />
            );
          })}
        </div>
        <p style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '0.6rem' }}>
          {complete === 0 ? 'Log your first Hifz session to start tracking.' : `${114 - complete} surahs left — keep going! 💪`}
        </p>
      </div>
    </Card>
  );
}

/* ── Quick Surahs ────────────────────────────────────────────────────────── */
function QuickSurahs() {
  return (
    <Card>
      <CardHead icon="⭐" title="Start Here" link="Browse All" linkTo="/quran" accent="#E65100" />
      <div style={{ padding: '0.9rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {QUICK_SURAHS.map(s => (
          <Link key={s.n} to={`/quran/${s.n}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.6rem 0.85rem', borderRadius: 10, textDecoration: 'none',
            background: '#FAFAF7', border: '1px solid #F0EDE6', transition: 'all 0.16s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#F0FFF4'; e.currentTarget.style.borderColor = '#B7EBC8'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FAFAF7'; e.currentTarget.style.borderColor = '#F0EDE6'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--green-pale)', border: '1px solid var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 800, color: 'var(--green-deep)' }}>{s.n}</div>
              <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--green-deep)' }}>Surah {s.name}</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#bbb' }}>{s.ay} ayahs →</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}

/* ── Recent Logs ─────────────────────────────────────────────────────────── */
function RecentLogs({ logs = [] }) {
  const TYPE_COLOR = { sabaq: '#14532D', sabaqi: '#0277BD', manzil: '#6A1B9A' };
  const TYPE_LABEL = { sabaq: 'Sabaq', sabaqi: 'Sabaqi', manzil: 'Manzil' };

  return (
    <Card>
      <CardHead icon="📋" title="Recent Hifz Sessions" link="All Logs" linkTo="/hifz" accent="#0277BD" />
      <div style={{ padding: '1rem 1.4rem' }}>
        {logs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#ccc' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>📝</div>
            <p style={{ fontSize: '0.88rem', color: '#aaa', marginBottom: '0.75rem' }}>No sessions yet — start tracking your Hifz!</p>
            <Link to="/hifz/new-log" style={{ display: 'inline-block', padding: '0.5rem 1.3rem', background: 'var(--green-deep)', color: '#fff', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>+ Log Today</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.65rem 0.9rem', background: '#FAFAF7', borderRadius: 10, border: '1px solid #F0EDE6' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: TYPE_COLOR[log.log_type] || '#aaa', flexShrink: 0 }} />
                <span style={{ fontSize: '0.73rem', fontWeight: 700, color: TYPE_COLOR[log.log_type], background: `${TYPE_COLOR[log.log_type]}12`, borderRadius: 99, padding: '0.12rem 0.55rem', flexShrink: 0 }}>{TYPE_LABEL[log.log_type]}</span>
                <span style={{ fontSize: '0.83rem', color: '#444', flex: 1 }}>Surah {log.surah_num}{log.ayah_from ? ` · ${log.ayah_from}–${log.ayah_to}` : ''}</span>
                {log.quality_rating && (
                  <span style={{ fontSize: '0.65rem', color: '#F57C00', letterSpacing: 1 }}>{'★'.repeat(log.quality_rating)}{'☆'.repeat(5 - log.quality_rating)}</span>
                )}
                <span style={{ fontSize: '0.7rem', color: '#ccc', flexShrink: 0 }}>{new Date(log.logged_at).toLocaleDateString('en', { month:'short', day:'numeric' })}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════════════════ */
export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: streak } = useStreak();
  const { data: logsData } = useQuery({ queryKey: ['hifz-logs'], queryFn: () => getLogs(1), retry: false });
  const { data: progressData } = useQuery({ queryKey: ['hifz-progress'], queryFn: getProgress, retry: false });

  const [ar, en] = greeting();
  const logs = logsData?.logs?.slice(0, 6) || [];
  const progress = progressData || [];
  const completedSurahs = progress.filter(p => p.status === 'complete').length;

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* ── Hero Header ── */}
      <div style={{
        background: 'linear-gradient(150deg, #052e16 0%, #14532D 55%, #14532D 100%)',
        padding: '2.5rem 1.5rem 4.5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <svg aria-hidden style={{ position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%) rotate(15deg)', opacity: 0.04, width: 320, height: 320 }}>
          <polygon points="160,6 186,106 286,106 208,162 236,262 160,206 84,262 112,162 34,106 134,106" fill="rgba(245,158,11,1)" />
        </svg>

        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.15rem', color: 'rgba(245,158,11,0.65)', marginBottom: '0.35rem' }}>{ar}</p>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: '#fff', fontWeight: 700, marginBottom: '0.3rem' }}>
              {en}, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>
              {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            </p>
          </div>

          <Link to="/hifz/new-log" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.8rem 1.6rem',
            background: 'linear-gradient(135deg, #E2B84E, #F59E0B)',
            color: '#050E08', borderRadius: 99, fontWeight: 800, fontSize: '0.88rem',
            textDecoration: 'none', boxShadow: '0 4px 20px rgba(245,158,11,0.45)',
            transition: 'all 0.22s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(245,158,11,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.45)'; }}
          >
            📝 Log Today's Session
          </Link>
        </div>
      </div>

      {/* ── Stats Row (overlapping hero bottom) ── */}
      <div style={{ maxWidth: 1140, margin: '-2rem auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(175px,1fr))', gap: '0.85rem' }}>
          <StatPill icon="🔥" label="Day Streak" value={streak?.current_streak || 0} sub={`Best: ${streak?.longest_streak || 0}`} color="#E65100" />
          <StatPill icon="📖" label="Surahs Done" value={completedSurahs} sub="of 114" color="#14532D" />
          <StatPill icon="📝" label="Sessions" value={logsData?.total || 0} sub="total logged" color="#0277BD" />
          <StatPill icon="✏️" label="Letters" value="28" sub="Arabic alphabet" color="#2E7D32" />
          <StatPill icon="🎨" label="Tajweed" value="13" sub="rules to master" color="#AD1457" />
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{ maxWidth: 1140, margin: '1.5rem auto 4rem', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Daily tip */}
        <DailyTip />

        {/* Row 1: Quick Actions | Daily Verse */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: '1.25rem' }}>
          <Card>
            <CardHead icon="⚡" title="Quick Actions" accent="var(--green-deep)" />
            <div style={{ padding: '1.1rem 1.4rem' }}>
              <QuickActions />
            </div>
          </Card>
          <DailyVerse />
        </div>

        {/* Row 2: Letter of Day | Weekly chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <LetterOfDay />
          <WeeklyChart logs={logsData?.logs || []} />
        </div>

        {/* Row 3: Qaida | Tajweed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <QaidaTracker />
          <TajweedTracker />
        </div>

        {/* Row 4: Surah Map | Quick Surahs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '1.25rem' }}>
          <SurahMap progress={progress} />
          <QuickSurahs />
        </div>

        {/* Row 5: Recent Logs */}
        <RecentLogs logs={logs} />

        {/* Hadith banner */}
        <div style={{
          borderRadius: 20, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #052e16 0%, #14532D 55%, #14532D 100%)',
          border: '1px solid rgba(245,158,11,0.14)',
          padding: '2.25rem 2rem', textAlign: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(45deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-45deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
          <p style={{ fontFamily: 'var(--font-arabic)', fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', color: 'rgba(245,158,11,0.72)', direction: 'rtl', lineHeight: 2.2, marginBottom: '0.6rem', position: 'relative' }}>
            مَنۡ قَرَأَ حَرۡفًا مِنۡ كِتَابِ ٱللَّهِ فَلَهُۥ بِهِ حَسَنَةٌ وَٱلۡحَسَنَةُ بِعَشۡرِ أَمۡثَالِهَا
          </p>
          <p style={{ color: '#78716C', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.25rem', position: 'relative' }}>
            "Whoever reads one letter from the Book of Allah will receive one good deed worth ten like it"
          </p>
          <p style={{ color: 'rgba(245,158,11,0.38)', fontSize: '0.72rem', position: 'relative' }}>— Tirmidhi</p>
        </div>
      </div>
    </div>
  );
}
