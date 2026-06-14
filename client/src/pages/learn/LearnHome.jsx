import { Link } from 'react-router-dom';

const MODULES = [
  {
    path: '/learn/qaida',
    icon: '✏️',
    arabic: 'القاعدة النورانية',
    title: 'Qaida',
    urdu: 'قاعدہ نورانیہ',
    desc: 'Master the Arabic alphabet from scratch — letters, forms, harakat, and joined words with audio.',
    badge: '10 Lessons',
    tag: 'Beginner',
    gradFrom: '#0A1B10', gradTo: '#173A22', accent: '#74C69D',
    steps: ['Arabic Letters', 'Letter Forms', 'Harakat', 'Madd & Tanween', 'Practice Words'],
  },
  {
    path: '/learn/tajweed',
    icon: '🎨',
    arabic: 'أحكام التجويد',
    title: 'Tajweed',
    urdu: 'تجوید کے احکام',
    desc: 'Learn the rules of correct Quran recitation — color-coded with examples directly from the Quran.',
    badge: '13 Rules',
    tag: 'Intermediate',
    gradFrom: '#1A0A0A', gradTo: '#361414', accent: '#E57373',
    steps: ['Noon Rules', 'Ghunnah', 'Madd Types', 'Qalqalah', 'Lam & Tafkhim'],
  },
  {
    path: '/learn/duas',
    icon: '🤲',
    arabic: 'الأدعية والأذكار',
    title: 'Duas & Adhkar',
    urdu: 'دعائیں اور اذکار',
    desc: 'Authentic duas from Quran & Sunnah for every moment — with Arabic, transliteration, explanation, and audio.',
    badge: '50+ Duas',
    tag: 'Daily',
    gradFrom: '#100A1A', gradTo: '#22143A', accent: '#B39DDB',
    steps: ['Daily Life', 'Morning & Evening', 'Prayer', 'Forgiveness', 'Special Occasions'],
  },
  {
    path: '/learn/namaz',
    icon: '🕌',
    arabic: 'كيفية الصلاة',
    title: 'Namaz Guide',
    urdu: 'نماز پڑھنے کا طریقہ',
    desc: 'Step-by-step prayer guide with all 5 prayers, wudu method, complete duas in Arabic and Urdu.',
    badge: '5 Prayers',
    tag: 'Essential',
    gradFrom: '#071A10', gradTo: '#0F3220', accent: '#81C784',
    steps: ['Wudu', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib & Isha'],
  },
  {
    path: '/learn/janaza',
    icon: '🤍',
    arabic: 'صلاة الجنازة',
    title: 'Namaz-e-Janaza',
    urdu: 'نماز جنازہ',
    desc: 'Complete funeral prayer guide — 4 takbeers, duas for the deceased, burial duas and important notes.',
    badge: '4 Takbeers',
    tag: 'Fardh Kifayah',
    gradFrom: '#0D0D0D', gradTo: '#1C1C2E', accent: '#90A4AE',
    steps: ['Niyyah', 'Thana', 'Durood', 'Dua for Deceased', 'Salam'],
  },
];

const TIPS = [
  { icon: '🎯', text: 'Start with Qaida if you are new to Arabic letters' },
  { icon: '📖', text: 'Apply Tajweed rules while reading the Quran daily' },
  { icon: '🤲', text: 'Memorize one new dua every week for consistent growth' },
  { icon: '🕌', text: 'Learn the complete Namaz method with all duas and positions' },
];

export default function LearnHome() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(150deg, #052e16 0%, #14532D 55%, #14532D 100%)',
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />
        <p style={{ color: 'rgba(245,158,11,0.75)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
          📚 تعلیمی مرکز
        </p>
        <h1 style={{
          fontFamily: '"Noto Naskh Arabic", serif',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#fff', lineHeight: 1.4, marginBottom: '0.6rem',
        }}>مركز التعلم</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: 480, margin: '0 auto 0' }}>
          Three complete modules — from your first letter to beautiful Quran recitation
        </p>
      </div>

      {/* Tip bar */}
      <div style={{ background: 'rgba(245,158,11,0.06)', borderBottom: '1px solid rgba(245,158,11,0.12)', padding: '0.72rem 1.5rem', position:'sticky', top:68, zIndex:9, backdropFilter:'blur(12px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: '1.5rem', overflowX: 'auto', flexWrap: 'wrap' }}>
          {TIPS.map((t, i) => (
            <span key={i} style={{ fontSize: '0.76rem', color: 'rgba(245,158,11,0.7)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {t.icon} {t.text}
            </span>
          ))}
        </div>
      </div>

      {/* Module Cards */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem', background: '#FFFBEB' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {MODULES.map((m, i) => (
            <Link key={m.path} to={m.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: `linear-gradient(135deg, ${m.gradFrom} 0%, ${m.gradTo} 100%)`,
                borderRadius: 24,
                border: '1px solid rgba(28,25,23,0.09)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${m.accent}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.22)'; }}
              >
                {/* Star watermark */}
                <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: 'absolute', right: -30, bottom: -30, opacity: 0.05, pointerEvents: 'none' }}>
                  <polygon points="80,5 94,52 144,52 104,82 118,128 80,100 42,128 56,82 16,52 66,52" fill={m.accent} />
                </svg>

                {/* Left: content */}
                <div style={{ padding: '2rem 2rem 2rem' }}>
                  {/* Tags row */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: m.accent, background: `${m.accent}18`, border: `1px solid ${m.accent}30`, borderRadius: 99, padding: '0.18rem 0.6rem' }}>{m.tag}</span>
                    <span style={{ fontSize: '0.68rem', color: '#A8A29E', fontWeight: 500 }}>{m.badge}</span>
                  </div>

                  {/* Icon + Arabic */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{m.icon}</span>
                    <div>
                      <p style={{ fontFamily: '"Noto Naskh Arabic", serif', fontSize: '1.1rem', color: m.accent, direction: 'rtl', margin: 0, lineHeight: 1.5 }}>{m.arabic}</p>
                      <p style={{ fontFamily: 'var(--font-urdu)', fontSize: '0.88rem', lineHeight: 3.2, color: '#A8A29E', direction: 'rtl', margin: 0, wordSpacing: '2px' }}>{m.urdu}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.35rem', color: '#fff', fontWeight: 700, margin: '0 0 0.5rem' }}>{m.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, margin: '0 0 1.2rem', maxWidth: 480 }}>{m.desc}</p>

                  {/* Steps */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {m.steps.map((s, j) => (
                      <span key={j} style={{
                        fontSize: '0.68rem', padding: '0.22rem 0.6rem', borderRadius: 99,
                        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.55)',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.75rem', borderLeft: `1px solid ${m.accent}18` }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: `${m.accent}20`, border: `1.5px solid ${m.accent}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.3rem', color: m.accent, marginBottom: '0.5rem',
                    transition: 'background 0.2s',
                  }}>→</div>
                  <span style={{ fontSize: '0.68rem', color: m.accent, fontWeight: 700, whiteSpace: 'nowrap' }}>Open</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', textAlign: 'center' }}>
          {[
            { icon: '📖', label: 'Quran',     sub: 'Read full Quran',    to: '/quran',              color:'#22C55E' },
            { icon: '🎯', label: 'Hifz',      sub: 'Track memorization', to: '/hifz',               color:'#64B5F6' },
            { icon: '📊', label: 'Dashboard', sub: 'Your progress',      to: '/dashboard/student',  color:'#B39DDB' },
          ].map(item => (
            <Link key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#ffffff', borderRadius: 18,
                border: '1px solid rgba(28,25,23,0.09)',
                padding: '1.25rem 0.75rem', transition: 'all 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = `rgba(${item.color === '#22C55E' ? '82,183,136' : item.color === '#64B5F6' ? '100,181,246' : '179,157,219'},0.07)`; e.currentTarget.style.borderColor = `${item.color}28`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(28,25,23,0.09)'; }}
              >
                <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#292524' }}>{item.label}</p>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.7rem', color: '#78716C' }}>{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
