import { useState } from 'react';
import { useSurahs } from '../../hooks/useQuran';
import { Link } from 'react-router-dom';

const JUZS = [
  [1,2],[2,2],[3,3],[4,3],[5,4],[6,4],[7,5],[8,6],[9,7],[10,8],
  [11,9],[12,10],[13,11],[14,12],[15,15],[16,18],[17,21],[18,23],
  [19,25],[20,27],[21,29],[22,33],[23,36],[24,39],[25,41],[26,46],
  [27,51],[28,58],[29,67],[30,78],
];
function getJuz(n) {
  for (let i = JUZS.length - 1; i >= 0; i--) if (n >= JUZS[i][1]) return i + 1;
  return 1;
}
function toAr(n) { return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]); }

function SurahSkeleton() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'0.85rem' }}>
      {Array.from({ length: 18 }).map((_,i) => (
        <div key={i} style={{ height:82, borderRadius:16, background:'#ffffff', animation:'shimmerDark 1.6s ease-in-out infinite', animationDelay:`${i*0.07}s` }}/>
      ))}
    </div>
  );
}

export default function QuranHome() {
  const { data: surahs, isLoading } = useSurahs();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = surahs?.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.englishName.toLowerCase().includes(q) || s.name.includes(q) || String(s.number).includes(q);
    const matchFilter = filter === 'all' || s.revelationType.toLowerCase() === filter;
    return matchSearch && matchFilter;
  }) ?? [];

  return (
    <div style={{ minHeight:'100vh', background:'#FFFBEB' }}>

      {/* ── Hero Header ── */}
      <div style={{
        position:'relative', overflow:'hidden',
        background:'linear-gradient(160deg,#052e16 0%,#14532D 60%,#081510 100%)',
        padding:'4rem 1.5rem 3rem', textAlign:'center',
        borderBottom:'1px solid rgba(245,158,11,0.12)',
      }}>
        {/* Hex grid */}
        <svg aria-hidden style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.022 }}>
          <defs><pattern id="hq" x="0" y="0" width="44" height="50" patternUnits="userSpaceOnUse">
            <polygon points="22,2 40,12 40,38 22,48 4,38 4,12" fill="none" stroke="#F59E0B" strokeWidth="0.7"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hq)"/>
        </svg>

        {/* Glow */}
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 60%,rgba(245,158,11,0.07) 0%,transparent 65%)',pointerEvents:'none' }}/>

        <div style={{ position:'relative',zIndex:2 }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'0.4rem',padding:'0.28rem 0.9rem',borderRadius:99,marginBottom:'1.2rem',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(245,158,11,0.72)' }}>
            ✦ Al-Quran Al-Kareem
          </div>

          <h1 style={{
            fontFamily:'var(--font-arabic)',fontSize:'clamp(2.5rem,7vw,4.5rem)',
            direction:'rtl',lineHeight:1.2,marginBottom:'0.4rem',
            background:'linear-gradient(155deg,#FFFCF0 0%,#F5DFA0 25%,#FCD34D 55%,#F59E0B 80%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            filter:'drop-shadow(0 4px 24px rgba(245,158,11,0.22))',
          }}>القرآن الكريم</h1>

          <p style={{ fontFamily:'var(--font-heading)',fontSize:'0.72rem',color:'rgba(255,255,255,0.5)',letterSpacing:'0.5em',textTransform:'uppercase',marginBottom:'0.85rem' }}>
            THE NOBLE QURAN
          </p>

          <p style={{ color:'rgba(255,255,255,0.6)',fontSize:'0.88rem' }}>
            114 Surahs &nbsp;·&nbsp; 6,236 Ayahs &nbsp;·&nbsp; 30 Juz
          </p>
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <div style={{ background:'#FFFBEB',borderBottom:'1px solid rgba(28,25,23,0.07)',padding:'1.1rem 1.5rem',position:'sticky',top:68,zIndex:9 }}>
        <div style={{ maxWidth:1160,margin:'0 auto',display:'flex',gap:'0.75rem',alignItems:'center',flexWrap:'wrap' }}>

          {/* Search */}
          <div style={{ position:'relative',flex:'1 1 220px',minWidth:180 }}>
            <svg width="15" height="15" viewBox="0 0 15 15" style={{ position:'absolute',left:'0.85rem',top:'50%',transform:'translateY(-50%)',color:'#A8A29E' }}>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or number..."
              style={{
                width:'100%',padding:'0.6rem 1rem 0.6rem 2.2rem',
                background:'#ffffff',
                border:'1px solid rgba(28,25,23,0.1)',
                borderRadius:99,color:'#292524',fontSize:'0.87rem',
                outline:'none',transition:'all 0.2s',
              }}
              onFocus={e=>{e.target.style.borderColor='rgba(245,158,11,0.45)';e.target.style.background='rgba(28,25,23,0.09)';}}
              onBlur={e=>{e.target.style.borderColor='rgba(28,25,23,0.1)';e.target.style.background='rgba(28,25,23,0.04)';}}
            />
          </div>

          {/* Filter pills */}
          <div style={{ display:'flex',gap:'0.45rem' }}>
            {[
              { key:'all',    label:'All Surahs' },
              { key:'meccan', label:'Makki',      api:'makkiyah' },
              { key:'medinan',label:'Madani',     api:'madaniyah' },
            ].map(f => {
              const active = filter === (f.api || f.key);
              return (
                <button key={f.key} onClick={() => setFilter(f.api || f.key)} style={{
                  padding:'0.48rem 1rem',borderRadius:99,fontSize:'0.8rem',fontWeight:active?700:400,
                  cursor:'pointer',transition:'all 0.2s',
                  background: active ? 'linear-gradient(135deg,#D4A843,#F59E0B)' : 'rgba(28,25,23,0.04)',
                  color: active ? '#050E08' : '#57534E',
                  border: active ? 'none' : '1px solid rgba(28,25,23,0.09)',
                  boxShadow: active ? '0 2px 14px rgba(245,158,11,0.4)' : 'none',
                }}>{f.label}</button>
              );
            })}
          </div>

          {surahs && (
            <span style={{ marginLeft:'auto',fontSize:'0.78rem',color:'#78716C',flexShrink:0 }}>
              {filtered.length} / 114
            </span>
          )}
        </div>
      </div>

      {/* ── Surah Grid ── */}
      <div style={{ maxWidth:1160,margin:'0 auto',padding:'1.75rem 1.5rem' }}>
        {isLoading ? <SurahSkeleton /> : (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))',gap:'0.85rem' }}>
            {filtered.map(s => {
              const juz    = getJuz(s.number);
              const isMakki = s.revelationType === 'Meccan';
              return (
                <Link key={s.number} to={`/quran/${s.number}`} style={{ textDecoration:'none' }}>
                  <div style={{
                    display:'flex',alignItems:'center',gap:'0.95rem',
                    padding:'0.95rem 1.1rem',
                    background:'#ffffff',
                    border:'1px solid rgba(28,25,23,0.09)',
                    borderRadius:18,
                    transition:'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                    cursor:'pointer',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(245,158,11,0.06)';e.currentTarget.style.borderColor='rgba(245,158,11,0.22)';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.35)';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='#ffffff';e.currentTarget.style.borderColor='rgba(28,25,23,0.09)';e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='none';}}
                  >
                    {/* Number badge */}
                    <div style={{
                      width:46,height:46,flexShrink:0,borderRadius:12,
                      background:'linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.08))',
                      border:'1px solid rgba(245,158,11,0.22)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontFamily:'var(--font-arabic)',fontSize:'1.05rem',
                      color:'#FCD34D',fontWeight:700,
                      boxShadow:'0 2px 10px rgba(245,158,11,0.12)',
                    }}>{toAr(s.number)}</div>

                    {/* Info */}
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'0.28rem' }}>
                        <span style={{ fontWeight:600,color:'#1C1917',fontSize:'0.93rem' }}>
                          {s.englishName}
                        </span>
                        <span style={{ fontFamily:'var(--font-arabic)',fontSize:'1.28rem',color:'rgba(245,158,11,0.85)',lineHeight:1.3 }}>
                          {s.name}
                        </span>
                      </div>
                      <div style={{ display:'flex',gap:'0.45rem',alignItems:'center',flexWrap:'wrap' }}>
                        <span style={{ fontSize:'0.73rem',color:'#78716C' }}>{s.englishNameTranslation}</span>
                        <span style={{ color:'rgba(28,25,23,0.2)',fontSize:'0.65rem' }}>·</span>
                        <span style={{ fontSize:'0.73rem',color:'#78716C' }}>{s.numberOfAyahs} ayahs</span>
                        <span style={{ color:'rgba(28,25,23,0.2)',fontSize:'0.65rem' }}>·</span>
                        <span style={{ fontSize:'0.63rem',color:'#A8A29E' }}>Juz {juz}</span>
                        <span style={{
                          fontSize:'0.62rem',fontWeight:700,padding:'0.1rem 0.5rem',borderRadius:99,marginLeft:'auto',
                          background: isMakki ? 'rgba(245,158,11,0.12)' : 'rgba(82,183,136,0.12)',
                          color:       isMakki ? 'rgba(245,158,11,0.75)' : 'rgba(82,183,136,0.75)',
                          border:      isMakki ? '1px solid rgba(245,158,11,0.22)' : '1px solid rgba(82,183,136,0.22)',
                        }}>{isMakki ? 'Makki' : 'Madani'}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ color:'#A8A29E',flexShrink:0 }}>
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div style={{ textAlign:'center',padding:'5rem 1rem' }}>
            <p style={{ fontSize:'2.5rem',marginBottom:'0.75rem' }}>🔍</p>
            <p style={{ color:'#A8A29E',fontSize:'1rem' }}>No surah found for &ldquo;{search}&rdquo;</p>
            <button onClick={() => setSearch('')} style={{ marginTop:'1rem',padding:'0.5rem 1.2rem',background:'rgba(28,25,23,0.09)',border:'1px solid rgba(28,25,23,0.12)',color:'#57534E',borderRadius:99,cursor:'pointer',fontSize:'0.85rem' }}>
              Clear search
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmerDark {
          0%,100% { opacity:0.5; }
          50%      { opacity:1;   }
        }
      `}</style>
    </div>
  );
}
