import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

/* ── Rotating Islamic star SVG ─────────────────────────────────────────── */
function StarBg({ size = 400, opacity = 0.04, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden>
      {[0,30,60].map(r => (
        <polygon key={r}
          points="100,4 116,66 180,66 130,102 148,164 100,128 52,164 70,102 20,66 84,66"
          fill="none" stroke="rgba(201,168,76,1)" strokeWidth="0.6"
          style={{ transform: `rotate(${r}deg)`, transformOrigin: '100px 100px', opacity }}
        />
      ))}
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(201,168,76,1)" strokeWidth="0.4" opacity={opacity * 1.5} />
      <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(201,168,76,1)" strokeWidth="0.3" opacity={opacity} />
    </svg>
  );
}

/* ── Count-up hook ─────────────────────────────────────────────────────── */
function useCountUp(end, duration = 1600) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setV(Math.round((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return [v, ref];
}

/* ── Modules data ──────────────────────────────────────────────────────── */
const MODULES = [
  {
    href: '/quran', icon: '📖', arabic: 'القرآن الكريم', title: 'Quran Reader',
    desc: 'Mushaf-style layout with Tajweed text, dual translation (English + Urdu), ayah markers, and bookmarks.',
    badge: '114 Surahs', tag: 'Read',
    gradFrom: '#061A0F', gradTo: '#0F3020', accent: '#52B788',
  },
  {
    href: '/learn/qaida', icon: '✏️', arabic: 'القاعدة النورانية', title: 'Qaida',
    desc: 'Interactive Arabic alphabet with audio pronunciation, makhraj anatomy diagrams, and 10 progressive lessons.',
    badge: '10 Lessons', tag: 'Learn',
    gradFrom: '#0A1B10', gradTo: '#173A22', accent: '#74C69D',
  },
  {
    href: '/learn/tajweed', icon: '🎨', arabic: 'أحكام التجويد', title: 'Tajweed',
    desc: 'Color-coded rules with examples from the Quran — Izhar, Idgham, Ghunnah, Madd, Qalqalah and more.',
    badge: '13 Rules', tag: 'Master',
    gradFrom: '#1A0A0A', gradTo: '#361414', accent: '#E57373',
  },
  {
    href: '/learn/duas', icon: '🤲', arabic: 'الأدعية والأذكار', title: 'Duas & Adhkar',
    desc: 'Arabic text, transliteration, full translation and audio — for every moment of the day.',
    badge: '200+ Duas', tag: 'Memorize',
    gradFrom: '#100A1A', gradTo: '#22143A', accent: '#B39DDB',
  },
  {
    href: '/hifz', icon: '🎯', arabic: 'تتبع الحفظ', title: 'Hifz Tracker',
    desc: 'Log daily Sabaq, Sabaqi and Manzil. Track streaks, view mistakes, and visualize your memorization journey.',
    badge: 'Daily Logs', tag: 'Track',
    gradFrom: '#081526', gradTo: '#102240', accent: '#64B5F6',
  },
];

const FEATURES = [
  { icon: '🕌', title: 'Amiri Quran Font', desc: 'Every ayah rendered in the same Uthmani script used in Madinah Mushafs' },
  { icon: '🔊', title: 'Audio TTS', desc: 'Hear correct Arabic pronunciation for every letter and ayah via our server' },
  { icon: '🌍', title: 'English + Urdu', desc: 'Sahih International and Jalandhry translations side-by-side, always visible' },
  { icon: '📊', title: 'Hifz Analytics', desc: 'Weekly progress charts, streak tracking, mistake logs and surah completion map' },
  { icon: '🆓', title: 'Completely Free', desc: 'No subscription, no ads, no tracking — open source and free forever' },
  { icon: '📱', title: 'Any Device', desc: 'Responsive design that works beautifully on mobile, tablet and desktop' },
];

const TICKER = ['📖 114 Surahs', '✏️ Qaida Lessons', '🎨 Tajweed Rules', '🤲 200+ Duas',
  '🔊 Arabic Audio', '🎯 Hifz Tracker', '📊 Progress Charts', '🌙 Free Forever'];

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  const [n1, r1] = useCountUp(114);
  const [n2, r2] = useCountUp(6236);
  const [n3, r3] = useCountUp(200);
  const [n4, r4] = useCountUp(28);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(175deg, #030A05 0%, #081510 35%, #0D2818 65%, #0F2B1B 100%)',
        padding: '7rem 1.5rem 5rem', overflow: 'hidden',
      }}>
        {/* Geometric hex grid */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.032 }}>
          <defs>
            <pattern id="hx" x="0" y="0" width="56" height="64" patternUnits="userSpaceOnUse">
              <polygon points="28,2 52,16 52,48 28,62 4,48 4,16" fill="none" stroke="#C9A84C" strokeWidth="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hx)"/>
        </svg>

        {/* Rotating star — top right */}
        <StarBg size={500} opacity={0.055}
          style={{ top: -60, right: -80, animation: 'rotateSlow 80s linear infinite' }} />
        {/* Rotating star — bottom left */}
        <StarBg size={360} opacity={0.04}
          style={{ bottom: -40, left: -60, animation: 'rotateSlow 60s linear infinite reverse' }} />

        {/* Center radial glow */}
        <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{
          position: 'relative', textAlign: 'center', maxWidth: 860,
          opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.22,1,0.36,1)',
        }}>
          {/* Live badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)',
            borderRadius: 99, padding: '0.38rem 1.1rem', marginBottom: '2rem',
            color: 'rgba(201,168,76,0.85)', fontSize: '0.75rem', letterSpacing: '0.12em',
            fontFamily: 'var(--font-heading)', textTransform: 'uppercase',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'pulseGold 2.2s ease-in-out infinite' }} />
            Free Islamic Learning Platform
          </div>

          {/* Bismillah */}
          <p style={{
            fontFamily: 'var(--font-quran)', fontSize: 'clamp(1.5rem,3.5vw,2.2rem)',
            color: 'rgba(201,168,76,0.6)', direction: 'rtl', lineHeight: 2.2,
            marginBottom: '1.5rem', animation: 'glowPulse 4s ease-in-out infinite',
          }}>
            بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ
          </p>

          {/* Brand */}
          <h1 style={{
            fontFamily: 'var(--font-arabic)', fontSize: 'clamp(3.5rem,9vw,6.5rem)',
            lineHeight: 1.1, direction: 'rtl', marginBottom: '0.6rem',
            background: 'linear-gradient(160deg, #FFF8E8 0%, #E9C46A 35%, #C9A84C 60%, #F5DFA0 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 32px rgba(201,168,76,0.35))',
          }}>نور القرآن</h1>

          <p style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.65rem,1.4vw,0.85rem)',
            color: 'rgba(255,255,255,0.22)', letterSpacing: '0.55em', textTransform: 'uppercase', marginBottom: '2.5rem',
          }}>N O O R U L Q U R A N</p>

          {/* Gold divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 90, height: 1, background: 'linear-gradient(to left, rgba(201,168,76,0.55), transparent)' }} />
            <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '1rem' }}>✦</span>
            <div style={{ width: 90, height: 1, background: 'linear-gradient(to right, rgba(201,168,76,0.55), transparent)' }} />
          </div>

          <p style={{
            fontSize: 'clamp(1rem,2.2vw,1.2rem)', color: 'rgba(255,255,255,0.65)',
            fontWeight: 300, letterSpacing: '0.05em', marginBottom: '3rem',
          }}>
            Learn · Read · Memorize
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/quran" style={{
              padding: '1rem 2.8rem',
              background: 'linear-gradient(135deg, #E2B84E 0%, #C9A84C 50%, #B8960C 100%)',
              color: '#050E08', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.06em',
              borderRadius: 99, fontFamily: 'var(--font-heading)', textTransform: 'uppercase',
              boxShadow: '0 4px 28px rgba(201,168,76,0.5), 0 1px 0 rgba(255,255,255,0.2) inset',
              transition: 'all 0.28s cubic-bezier(0.22,1,0.36,1)', textDecoration: 'none', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,0.65)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 28px rgba(201,168,76,0.5), 0 1px 0 rgba(255,255,255,0.2) inset'; }}
            >📖 Open Quran</Link>

            <Link to="/register" style={{
              padding: '1rem 2.8rem', fontSize: '0.95rem', fontWeight: 600,
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.88)', borderRadius: 99,
              backdropFilter: 'blur(8px)', transition: 'all 0.25s', textDecoration: 'none', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.color = '#E9C46A'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.88)'; }}
            >Start for Free →</Link>
          </div>

          {/* Scroll cue */}
          <div style={{ marginTop: '4.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.28 }}>
            <div style={{ width: 24, height: 38, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5 }}>
              <div style={{ width: 4, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.7)', animation: 'floatY 1.6s ease-in-out infinite' }} />
            </div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(90deg, #0A1F12, #0D2818, #0A1F12)',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '0.7rem 0', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', animation: 'marqueeScroll 22s linear infinite', width: 'max-content' }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0 2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500, whiteSpace: 'nowrap' }}>
              {t}
              <span style={{ color: 'rgba(201,168,76,0.35)', margin: '0 0.5rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(0,0,0,0.07)', borderRadius: 20, overflow: 'hidden' }}>
          {[
            { end: 114, s: '', label: 'Surahs', sub: 'Complete Quran', ref: r1, val: n1, icon: '📖' },
            { end: 6236, s: '', label: 'Ayahs', sub: 'Every verse', ref: r2, val: n2, icon: '✨' },
            { end: 200, s: '+', label: 'Duas', sub: 'Daily prayers', ref: r3, val: n3, icon: '🤲' },
            { end: 28, s: '', label: 'Letters', sub: 'Arabic alphabet', ref: r4, val: n4, icon: '✏️' },
          ].map((s, i) => (
            <div key={i} ref={s.ref} style={{ background: '#fff', padding: '2rem 1.5rem', textAlign: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#FAFAF7'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: 'var(--green-deep)', lineHeight: 1 }}>
                {s.val.toLocaleString()}{s.s}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#333', marginTop: '0.4rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: '0.15rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MODULES — full dark cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#F6F1E9', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">What's Inside</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', color: 'var(--green-deep)', fontWeight: 700, marginBottom: '0.75rem' }}>
              One Platform, Complete Journey
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
              From your first Alif to completing your full Quran memorization
            </p>
          </div>

          <div className="home-modules" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {MODULES.map((m, i) => (
              <Link key={m.href} to={m.href} style={{
                display: 'flex', flexDirection: 'column', textDecoration: 'none',
                background: `linear-gradient(150deg, ${m.gradFrom} 0%, ${m.gradTo} 100%)`,
                borderRadius: 22, overflow: 'hidden', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                transition: 'all 0.32s cubic-bezier(0.22,1,0.36,1)',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${m.accent}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
              }}
              >
                {/* Background star */}
                <svg aria-hidden viewBox="0 0 200 200" width="140" height="140"
                  style={{ position: 'absolute', bottom: -20, right: -20, opacity: 0.06, pointerEvents: 'none' }}>
                  <polygon points="100,4 116,66 180,66 130,102 148,164 100,128 52,164 70,102 20,66 84,66"
                    fill={m.accent} />
                </svg>

                {/* Card content */}
                <div style={{ padding: '1.75rem 1.75rem 0' }}>
                  {/* Tag + badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: m.accent, background: `${m.accent}18`, border: `1px solid ${m.accent}30`, borderRadius: 99, padding: '0.2rem 0.65rem' }}>{m.tag}</span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{m.badge}</span>
                  </div>

                  {/* Icon */}
                  <div style={{ fontSize: '2.4rem', marginBottom: '1rem' }}>{m.icon}</div>

                  {/* Arabic */}
                  <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.3rem', color: m.accent, direction: 'rtl', lineHeight: 1.7, marginBottom: '0.6rem' }}>{m.arabic}</p>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#fff', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '0.02em' }}>{m.title}</h3>

                  {/* Desc */}
                  <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{m.desc}</p>
                </div>

                {/* Footer link */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.75rem', marginTop: '1.25rem', borderTop: `1px solid ${m.accent}18` }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: m.accent }}>Explore →</span>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${m.accent}18`, border: `1px solid ${m.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: m.accent }}>↗</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VERSE SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section className="dark-section" style={{ padding: '6rem 1.5rem' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <StarBg size={300} opacity={0.05} style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'rotateSlow 120s linear infinite' }} />

        <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <span className="section-tag gold" style={{ marginBottom: '1.5rem' }}>Verse of the Day</span>
          <p style={{
            fontFamily: 'var(--font-quran)', fontSize: 'clamp(1.6rem,4vw,2.8rem)',
            color: 'rgba(255,255,255,0.92)', direction: 'rtl', lineHeight: 2.4,
            marginBottom: '2rem', animation: 'glowPulse 4s ease-in-out infinite',
          }}>وَرَتِّلِ ٱلۡقُرۡءَانَ تَرۡتِيلٗا</p>

          <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)', margin: '0 auto 1.5rem' }} />

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '0.4rem' }}>
            "Recite the Quran with measured recitation"
          </p>
          <p style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.8rem', marginBottom: '2.5rem' }}>— Surah Al-Muzzammil 73:4</p>

          <Link to="/quran" style={{
            display: 'inline-block', padding: '0.85rem 2.2rem',
            background: 'rgba(201,168,76,0.1)', border: '1.5px solid rgba(201,168,76,0.35)',
            color: '#E9C46A', borderRadius: 99, fontWeight: 600, fontSize: '0.9rem',
            transition: 'all 0.25s', textDecoration: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.2)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.65)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; }}
          >Open Quran Reader →</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', padding: '5.5rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Why NoorulQuran</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--green-deep)', fontWeight: 700 }}>
              Built for Every Muslim
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                padding: '1.75rem', borderRadius: 18,
                border: '1px solid rgba(27,67,50,0.07)',
                background: 'linear-gradient(145deg, #FAFAF7, #fff)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(27,67,50,0.05)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(27,67,50,0.12)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(27,67,50,0.05)'; e.currentTarget.style.borderColor = 'rgba(27,67,50,0.07)'; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, rgba(27,67,50,0.08), rgba(27,67,50,0.04))', border: '1px solid rgba(27,67,50,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--green-deep)', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#F6F1E9', padding: '5.5rem 1.5rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Get Started</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.3rem)', color: 'var(--green-deep)', fontWeight: 700 }}>
              Start in 3 Simple Steps
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 42, left: 'calc(16.6% + 1rem)', right: 'calc(16.6% + 1rem)', height: 1, background: 'linear-gradient(to right, var(--green-light), transparent, var(--green-light))', opacity: 0.4 }} />

            {[
              { n: '01', icon: '📝', title: 'Create Account', desc: 'Sign up in seconds — no credit card, completely free forever.' },
              { n: '02', icon: '✏️', title: 'Learn Qaida', desc: 'Master the Arabic alphabet with audio, diagrams and quizzes.' },
              { n: '03', icon: '🎯', title: 'Track Hifz', desc: 'Log sessions daily, view progress charts and build your streak.' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem 1.25rem', background: '#fff', borderRadius: 20, border: '1px solid rgba(27,67,50,0.07)', boxShadow: '0 2px 12px rgba(27,67,50,0.06)', position: 'relative' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem', boxShadow: '0 4px 16px rgba(27,67,50,0.3)' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.4rem' }}>STEP {s.n}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--green-deep)', fontWeight: 700, marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="dark-section" style={{ padding: '6rem 1.5rem', textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <StarBg size={350} opacity={0.045} style={{ top: '50%', left: '10%', transform: 'translateY(-50%)', animation: 'floatY 8s ease-in-out infinite' }} />
        <StarBg size={250} opacity={0.04} style={{ top: '50%', right: '8%', transform: 'translateY(-50%)', animation: 'floatY 10s ease-in-out infinite 2s' }} />

        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-quran)', fontSize: 'clamp(1.4rem,3vw,2rem)', color: 'rgba(201,168,76,0.75)', direction: 'rtl', lineHeight: 2.2, marginBottom: '1rem' }}>
            إِنَّ هَـٰذَا ٱلۡقُرۡءَانَ يَهۡدِي لِلَّتِي هِيَ أَقۡوَمُ
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.35rem' }}>
            "Indeed, this Quran guides to that which is most suitable"
          </p>
          <p style={{ color: 'rgba(201,168,76,0.38)', fontSize: '0.75rem', marginBottom: '3rem' }}>— Al-Isra 17:9</p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,3.5vw,2.4rem)', color: '#fff', fontWeight: 700, marginBottom: '0.75rem' }}>
            Begin Your Journey Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Free forever · No sign-up required to start reading
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              padding: '1rem 2.8rem',
              background: 'linear-gradient(135deg, #E2B84E, #C9A84C)',
              color: '#050E08', fontWeight: 800, fontSize: '0.95rem',
              borderRadius: 99, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em',
              boxShadow: '0 4px 28px rgba(201,168,76,0.45)',
              transition: 'all 0.25s', textDecoration: 'none', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 28px rgba(201,168,76,0.45)'; }}
            >Create Free Account</Link>

            <Link to="/quran" style={{
              padding: '1rem 2.4rem', background: 'transparent',
              color: 'rgba(255,255,255,0.82)', border: '1.5px solid rgba(255,255,255,0.18)',
              borderRadius: 99, fontWeight: 600, fontSize: '0.95rem',
              transition: 'all 0.22s', textDecoration: 'none', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            >Browse Quran</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
