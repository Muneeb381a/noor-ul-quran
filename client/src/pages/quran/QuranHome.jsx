import { useState } from 'react';
import { useSurahs } from '../../hooks/useQuran';
import { Link } from 'react-router-dom';

const JUZS = [
  [1,2],[2,2],[3,3],[4,3],[5,4],[6,4],[7,5],[8,6],[9,7],[10,8],
  [11,9],[12,10],[13,11],[14,12],[15,15],[16,18],[17,21],[18,23],
  [19,25],[20,27],[21,29],[22,33],[23,36],[24,39],[25,41],[26,46],
  [27,51],[28,58],[29,67],[30,78],
];

function getJuz(surahNum) {
  for (let i = JUZS.length - 1; i >= 0; i--) {
    if (surahNum >= JUZS[i][1]) return i + 1;
  }
  return 1;
}

function toArabicNum(n) {
  return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

// Skeleton loader
function SurahSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 88, borderRadius: 'var(--radius-lg)' }} />
      ))}
    </div>
  );
}

export default function QuranHome() {
  const { data: surahs, isLoading } = useSurahs();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | makkiyah | madaniyah

  const filtered = surahs?.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.englishName.toLowerCase().includes(q) || s.name.includes(q) || String(s.number).includes(q);
    const matchFilter = filter === 'all' || s.revelationType.toLowerCase() === filter;
    return matchSearch && matchFilter;
  }) ?? [];

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-arabic)', fontSize: '2.5rem', color: 'var(--green-deep)', direction: 'rtl', marginBottom: '0.25rem' }}>
          القرآن الكريم
        </h1>
        <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-light)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          The Noble Quran — 114 Surahs
        </p>
        <div className="ornament" style={{ maxWidth: 400, margin: '1rem auto' }}>
          <span style={{ fontSize: '1rem' }}>✦</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', fontSize: '0.9rem' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search surah..."
            style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.25rem', border: '1.5px solid rgba(27,67,50,0.15)', borderRadius: 'var(--radius-full)', background: 'var(--white)', outline: 'none', fontSize: '0.9rem', color: 'var(--text-dark)', boxShadow: 'var(--shadow-sm)' }}
          />
        </div>
        {['all', 'makkiyah', 'madaniyah'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.55rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            border: '1.5px solid',
            borderColor: filter === f ? 'var(--green-deep)' : 'rgba(27,67,50,0.15)',
            background: filter === f ? 'var(--green-deep)' : 'var(--white)',
            color: filter === f ? '#fff' : 'var(--text-mid)',
            fontSize: '0.85rem',
            fontWeight: filter === f ? 600 : 400,
            cursor: 'pointer',
            textTransform: 'capitalize',
            transition: 'all 0.2s',
          }}>
            {f === 'all' ? 'All' : f === 'makkiyah' ? 'Makki' : 'Madani'}
          </button>
        ))}
        {surahs && <span style={{ marginLeft: 'auto', color: 'var(--text-light)', fontSize: '0.85rem' }}>{filtered.length} surahs</span>}
      </div>

      {/* Grid */}
      {isLoading ? <SurahSkeleton /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filtered.map(s => (
            <Link key={s.number} to={`/quran/${s.number}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                border: '1px solid rgba(27,67,50,0.08)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'rgba(27,67,50,0.08)'; }}
              >
                {/* Number badge */}
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
                  borderRadius: 'var(--radius)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold-light)',
                  fontFamily: 'var(--font-arabic)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(27,67,50,0.2)',
                }}>
                  {toArabicNum(s.number)}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{s.englishName}</span>
                    <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.3rem', color: 'var(--green-deep)' }}>{s.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{s.englishNameTranslation}</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>·</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{s.numberOfAyahs} ayahs</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>·</span>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600, padding: '0.1rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      background: s.revelationType === 'Meccan' ? 'var(--gold-pale)' : 'var(--green-pale)',
                      color: s.revelationType === 'Meccan' ? 'var(--text-gold)' : 'var(--green-mid)',
                    }}>
                      {s.revelationType === 'Meccan' ? 'Makki' : 'Madani'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
