import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const step = target / (1600 / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          setVal(Math.floor(cur));
          if (cur >= target) clearInterval(t);
        }, 16);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MARQUEE = [
  'القرآن الكريم', 'Quran Reader', '—',
  'الحفظ',         'Hifz Tracker', '—',
  'التجويد',       'Tajweed',      '—',
  'الأدعية',       'Duas & Adhkar','—',
  'القاعدة',       'Noorani Qaida','—',
  'الصلاة',        'Namaz Guide',  '—',
];

const MODULES = [
  {
    id: 'quran', to: '/quran',
    arabic: 'القرآن', tag: 'Quran Reader', title: 'The Noble Quran',
    desc: 'Read all 114 Surahs with Arabic, Urdu/English translations and Tafseer. Bookmark Ayahs, track progress, and listen to recitations.',
    grad: 'linear-gradient(145deg, #071F10, #03100A)',
    lightAccent: '#4ade80', spanCols: '1 / 3', featured: true,
  },
  {
    id: 'hifz', to: '/hifz',
    arabic: 'الحفظ', tag: 'Hifz Tracker', title: 'Track Memorization',
    desc: 'Log daily Sabaq, Sabaqi, Manzil & Dhor. Visual progress charts and streak tracking.',
    grad: 'linear-gradient(145deg, #071028, #03081A)',
    lightAccent: '#60a5fa', spanCols: 'auto', featured: false,
  },
  {
    id: 'qaida', to: '/learn/qaida',
    arabic: 'القاعدة', tag: 'Noorani Qaida', title: 'Learn the Basics',
    desc: 'Master Arabic letters, vowels, and pronunciation step by step from the ground up.',
    grad: 'linear-gradient(145deg, #062018, #02100C)',
    lightAccent: '#34d399', spanCols: 'auto', featured: false,
  },
  {
    id: 'tajweed', to: '/learn/tajweed',
    arabic: 'التجويد', tag: 'Tajweed Rules', title: 'Perfect Recitation',
    desc: 'Interactive Tajweed lessons covering Makharij, Sifaat, Noon Sakin, and Waqf rules.',
    grad: 'linear-gradient(145deg, #1F0808, #0F0404)',
    lightAccent: '#fca5a5', spanCols: 'auto', featured: false,
  },
  {
    id: 'duas', to: '/learn/duas',
    arabic: 'الأدعية', tag: 'Duas & Adhkar', title: 'Daily Supplications',
    desc: 'Authentic duas with Arabic text, transliteration, translation, and audio.',
    grad: 'linear-gradient(145deg, #0F0820, #060310)',
    lightAccent: '#c084fc', spanCols: 'auto', featured: false,
  },
];

const NAMAZ = {
  to: '/learn/namaz',
  arabic: 'الصلاة', tag: 'Namaz Guide', title: 'Complete Prayer Guide',
  desc: 'Step-by-step guidance for all five daily prayers — Arabic text, translations, and illustrated positions. Perfect for new Muslims and beginners.',
  grad: 'linear-gradient(135deg, #071020, #030A18)',
  lightAccent: '#7dd3fc',
};

const FEATURES = [
  { accent: '#14532D', title: 'Full Quran + Tafseer',  body: 'Browse all 114 Surahs with verse-by-verse Sahih International translation and embedded Tafseer notes.' },
  { accent: '#7c3aed', title: 'Streak Tracking',        body: 'Build consistency with daily streak logging, visual weekly charts, and personal best milestones.'        },
  { accent: '#b45309', title: 'Audio Recitation',       body: 'Listen to professional Qari recitations for every Surah — stream online or save for offline use.'         },
  { accent: '#1e40af', title: 'Multi-Role Accounts',    body: 'Teacher, Student, and Parent roles with linked dashboards and real-time progress visibility.'              },
  { accent: '#be185d', title: 'Tajweed Color-Coding',   body: 'Rules highlighted directly on Quranic text — see exactly which rule applies to each word.'                },
  { accent: '#065f46', title: 'Offline Ready',          body: 'Core reading and learning features available without a connection — learn anywhere, anytime.'              },
];

const STEPS = [
  { num: '١', title: 'Create Account', body: 'Sign up in under a minute. Choose your role as Student, Teacher, or Parent.' },
  { num: '٢', title: 'Pick Your Path', body: 'Start with Quran reading, Hifz tracking, or the beginner Qaida course.'    },
  { num: '٣', title: 'Learn Daily',    body: 'Build a consistent routine with streak tracking and personalized sessions.'   },
  { num: '٤', title: 'Track Growth',   body: 'View progress charts, share with your teacher, and celebrate milestones.'    },
];

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { user } = useAuth();
  const cta = user
    ? { to: '/quran',    label: 'Open Quran →'      }
    : { to: '/register', label: 'Start for Free'     };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <style>{`
        @keyframes nqFadeUp  { from{opacity:0;transform:translateY(26px);}  to{opacity:1;transform:translateY(0);} }
        @keyframes nqFadeIn  { from{opacity:0;} to{opacity:1;} }
        @keyframes nqFloat   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }
        @keyframes nqRing    { 0%{transform:scale(1);opacity:0.18;} 70%{transform:scale(1.2);opacity:0.04;} 100%{transform:scale(1.2);opacity:0;} }
        @keyframes nqMarquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        @keyframes nqOrb     { 0%,100%{transform:translate(0,0) scale(1);} 40%{transform:translate(24px,-32px) scale(1.08);} 70%{transform:translate(-18px,22px) scale(0.95);} }
        .nq-mc { transition:transform 0.28s ease,box-shadow 0.28s ease; }
        .nq-mc:hover { transform:translateY(-6px); box-shadow:0 24px 56px rgba(0,0,0,0.2) !important; }
        .nq-fc { transition:transform 0.22s ease,box-shadow 0.22s ease; }
        .nq-fc:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,0.09) !important; }
        @media(max-width:900px){
          .nq-hero-grid{flex-direction:column !important;}
          .nq-deco{display:none !important;}
          .nq-mgrid{grid-template-columns:1fr 1fr !important;}
          .nq-fgrid{grid-template-columns:1fr !important;}
          .nq-sgrid{grid-template-columns:1fr 1fr !important;}
          .nq-nmcard{grid-template-columns:1fr !important;}
        }
        @media(max-width:540px){
          .nq-mgrid{grid-template-columns:1fr !important;}
          .nq-sgrid{grid-template-columns:1fr !important;}
          .nq-statgrid{grid-template-columns:1fr 1fr !important;}
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section style={{ minHeight:'100vh', position:'relative', overflow:'hidden', background:'linear-gradient(160deg,#061810 0%,#0A2217 50%,#071A0E 100%)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        {/* Background orbs */}
        <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(20,83,45,0.5) 0%,transparent 70%)', top:'-12%', left:'-8%', animation:'nqOrb 20s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(245,158,11,0.1) 0%,transparent 70%)', bottom:'4%', right:'3%', animation:'nqOrb 26s ease-in-out infinite reverse', pointerEvents:'none' }} />
        {/* Grid lines */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)', backgroundSize:'54px 54px', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'6rem 2rem 5rem', width:'100%', display:'flex', alignItems:'center', gap:'4rem' }} className="nq-hero-grid">

          {/* Left — Content */}
          <div style={{ flex:'1 1 520px', zIndex:2 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.28rem 0.85rem 0.28rem 0.45rem', borderRadius:99, border:'1px solid rgba(245,158,11,0.22)', background:'rgba(245,158,11,0.06)', marginBottom:'1.8rem', animation:'nqFadeIn 0.9s ease both' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80' }} />
              <span style={{ fontSize:'0.7rem', fontWeight:700, color:'rgba(245,158,11,0.82)', letterSpacing:'0.16em', textTransform:'uppercase' }}>Free Islamic Learning Platform</span>
            </div>

            <h1 style={{ fontFamily:'var(--font-arabic)', fontSize:'clamp(3.2rem,7.5vw,6rem)', color:'#F5F0E6', lineHeight:1.15, margin:'0 0 0.15rem', animation:'nqFadeUp 0.7s ease 0.1s both' }}>
              نور القرآن
            </h1>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.5rem,3.2vw,2.5rem)', color:'rgba(245,158,11,0.88)', margin:'0 0 1.4rem', fontWeight:800, letterSpacing:'-0.02em', animation:'nqFadeUp 0.7s ease 0.18s both' }}>
              The Light of the Quran
            </h2>
            <p style={{ fontSize:'clamp(0.92rem,1.8vw,1.05rem)', color:'rgba(255,255,255,0.52)', lineHeight:1.8, maxWidth:500, margin:'0 0 2.5rem', animation:'nqFadeUp 0.7s ease 0.25s both' }}>
              An all-in-one platform for reading, learning, and memorizing the Quran. Built for students, teachers, and families — completely free.
            </p>

            <div style={{ display:'flex', gap:'0.7rem', flexWrap:'wrap', marginBottom:'3rem', animation:'nqFadeUp 0.7s ease 0.32s both' }}>
              <Link to={cta.to} style={{ padding:'0.82rem 2.1rem', borderRadius:10, background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#0A1C0F', fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:'0 4px 24px rgba(245,158,11,0.38)', transition:'all 0.22s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 34px rgba(245,158,11,0.55)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 24px rgba(245,158,11,0.38)'; }}
              >{cta.label}</Link>
              <Link to="/quran" style={{ padding:'0.82rem 1.7rem', borderRadius:10, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.13)', color:'rgba(255,255,255,0.75)', fontWeight:500, fontSize:'0.95rem', textDecoration:'none', transition:'all 0.22s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.22)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.13)'; e.currentTarget.style.color='rgba(255,255,255,0.75)'; }}
              >Read Quran</Link>
            </div>

            {/* Quick stats */}
            <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', paddingTop:'1.5rem', borderTop:'1px solid rgba(255,255,255,0.07)', animation:'nqFadeUp 0.7s ease 0.4s both' }}>
              {[{v:114,s:'',l:'Surahs'},{v:6236,s:'',l:'Ayahs'},{v:30,s:'+',l:'Juz'},{v:6,s:'',l:'Modules'}].map((x,i)=>(
                <div key={i}>
                  <div style={{ fontFamily:'var(--font-heading)', fontSize:'1.65rem', fontWeight:900, color:'#FCD34D', lineHeight:1 }}><Counter target={x.v} suffix={x.s} /></div>
                  <div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.32)', textTransform:'uppercase', letterSpacing:'0.12em', marginTop:4 }}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Decoration */}
          <div className="nq-deco" style={{ flex:'0 0 440px', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', height:440, zIndex:1, animation:'nqFadeIn 1s ease 0.5s both' }}>
            {[1,2,3].map(i=>(
              <div key={i} style={{ position:'absolute', width:i*148, height:i*148, borderRadius:'50%', border:`1px solid rgba(245,158,11,${0.22-i*0.06})`, animation:`nqRing ${2.2+i*0.9}s ease-out ${(i-1)*0.75}s infinite` }} />
            ))}
            {/* Central orb */}
            <div style={{ width:272, height:272, borderRadius:'50%', background:'radial-gradient(circle at 38% 38%,rgba(20,83,45,0.92),rgba(4,14,8,0.97))', border:'1.5px solid rgba(245,158,11,0.18)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', boxShadow:'0 0 70px rgba(20,83,45,0.5),0 0 130px rgba(20,83,45,0.22),inset 0 0 44px rgba(245,158,11,0.04)', position:'relative', animation:'nqFloat 7s ease-in-out infinite' }}>
              <div style={{ fontFamily:'var(--font-arabic)', fontSize:'5rem', color:'#F5F0E6', lineHeight:1, marginBottom:'0.3rem' }}>ن</div>
              <div style={{ fontFamily:'var(--font-arabic)', fontSize:'0.88rem', color:'rgba(245,158,11,0.55)', letterSpacing:'0.05em' }}>نور القرآن</div>
              <div style={{ position:'absolute', bottom:-1, left:'50%', transform:'translateX(-50%)', width:72, height:2, background:'linear-gradient(to right,transparent,rgba(245,158,11,0.45),transparent)' }} />
            </div>
            {/* Floating chips */}
            {[
              { label:'114 Surahs',   pos:{ top:'6%',    right:'-6%'  }, d:'0s'   },
              { label:'Hifz Tracker', pos:{ bottom:'14%', left:'-10%' }, d:'0.5s' },
              { label:'Tajweed',      pos:{ bottom:'35%', right:'-12%'}, d:'1s'   },
            ].map((c,i)=>(
              <div key={i} style={{ position:'absolute', ...c.pos, background:'rgba(255,255,255,0.04)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:10, padding:'0.45rem 0.85rem', fontSize:'0.73rem', color:'rgba(255,255,255,0.65)', fontWeight:500, whiteSpace:'nowrap', animation:`nqFloat ${5.5+i}s ease-in-out ${c.d} infinite` }}>{c.label}</div>
            ))}
          </div>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:100, background:'linear-gradient(to bottom,transparent,#0A2217)', pointerEvents:'none' }} />
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div style={{ background:'#060E09', borderTop:'1px solid rgba(245,158,11,0.1)', borderBottom:'1px solid rgba(245,158,11,0.1)', padding:'0.9rem 0', overflow:'hidden' }}>
        <div style={{ display:'flex', animation:'nqMarquee 30s linear infinite', width:'max-content' }}>
          {[...MARQUEE,...MARQUEE].map((item,i)=>(
            <span key={i} style={{ padding:'0 1.4rem', fontSize:item==='—'?'0.5rem':'0.77rem', fontFamily:/[؀-ۿ]/.test(item)?'var(--font-arabic)':'var(--font-body)', color:item==='—'?'rgba(245,158,11,0.25)':'rgba(255,255,255,0.32)', fontWeight:500, letterSpacing:'0.06em', whiteSpace:'nowrap' }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ══════════ MODULES BENTO ══════════ */}
      <section style={{ background:'#FFFBEB', padding:'6rem 2rem' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#14532D', margin:'0 0 0.55rem' }}>Platform Modules</p>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#1C1917', fontWeight:800, margin:'0 0 0.75rem', letterSpacing:'-0.02em' }}>Everything in One Place</h2>
            <p style={{ fontSize:'0.97rem', color:'#78716C', maxWidth:460, margin:'0 auto', lineHeight:1.75 }}>Six dedicated modules covering every aspect of Islamic education — from beginner to advanced.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.1rem' }} className="nq-mgrid">
            {MODULES.map(m => <ModCard key={m.id} m={m} />)}
          </div>
          <div style={{ marginTop:'1.1rem' }}>
            <NamazCard m={NAMAZ} />
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section style={{ background:'linear-gradient(135deg,#061810,#0B2415 50%,#061008)', padding:'5.5rem 2rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 18% 50%,rgba(245,158,11,0.06) 0%,transparent 55%),radial-gradient(circle at 82% 50%,rgba(20,83,45,0.45) 0%,transparent 55%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', position:'relative' }} className="nq-statgrid">
          {[
            { v:114,  s:'',  l:'Surahs',  sub:'Complete Quran'   },
            { v:6236, s:'',  l:'Ayahs',   sub:'Fully Indexed'    },
            { v:6,    s:'',  l:'Modules', sub:'All in one app'   },
            { v:100,  s:'%', l:'Free',    sub:'No subscription'  },
          ].map((x,i)=>(
            <div key={i} style={{ textAlign:'center', padding:'2.5rem 1rem', borderRight:i<3?'1px solid rgba(255,255,255,0.055)':'none' }}>
              <div style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:900, color:'#FCD34D', lineHeight:1, marginBottom:'0.4rem' }}><Counter target={x.v} suffix={x.s} /></div>
              <div style={{ fontSize:'0.95rem', color:'#fff', fontWeight:600, marginBottom:'0.2rem' }}>{x.l}</div>
              <div style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.3)', letterSpacing:'0.07em' }}>{x.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section style={{ background:'#FFFBEB', padding:'6rem 2rem' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#14532D', margin:'0 0 0.55rem' }}>Why NoorulQuran</p>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.8rem,4vw,2.6rem)', color:'#1C1917', fontWeight:800, margin:0, letterSpacing:'-0.02em' }}>Built Thoughtfully</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }} className="nq-fgrid">
            {FEATURES.map((f,i)=>(
              <div key={i} className="nq-fc" style={{ background:'#fff', borderRadius:16, padding:'1.6rem 1.5rem', border:'1px solid rgba(28,25,23,0.07)', boxShadow:'0 2px 12px rgba(20,83,45,0.05)', borderLeft:`4px solid ${f.accent}` }}>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'0.98rem', fontWeight:700, color:'#1C1917', margin:'0 0 0.5rem', letterSpacing:'-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize:'0.84rem', color:'#78716C', lineHeight:1.72, margin:0 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section style={{ background:'#F5F0E0', padding:'6rem 2rem', borderTop:'1px solid rgba(28,25,23,0.07)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'#14532D', margin:'0 0 0.55rem' }}>Get Started</p>
            <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.8rem,4vw,2.6rem)', color:'#1C1917', fontWeight:800, margin:0, letterSpacing:'-0.02em' }}>Four Simple Steps</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }} className="nq-sgrid">
            {STEPS.map((s,i)=>(
              <div key={i} style={{ position:'relative', padding:'2rem 1.5rem', background:'#fff', borderRadius:18, border:'1px solid rgba(28,25,23,0.07)', boxShadow:'0 2px 10px rgba(20,83,45,0.04)', overflow:'hidden' }}>
                <div style={{ position:'absolute', bottom:-14, right:6, fontFamily:'var(--font-arabic)', fontSize:'6rem', color:'rgba(20,83,45,0.05)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>{s.num}</div>
                <div style={{ width:38, height:38, borderRadius:11, background:'linear-gradient(135deg,#14532D,#2E7D32)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-arabic)', fontSize:'1.05rem', color:'#fff', fontWeight:700, marginBottom:'1.1rem' }}>{s.num}</div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'0.97rem', fontWeight:700, color:'#1C1917', margin:'0 0 0.4rem' }}>{s.title}</h3>
                <p style={{ fontSize:'0.82rem', color:'#78716C', lineHeight:1.68, margin:0 }}>{s.body}</p>
                {i < 3 && <div style={{ position:'absolute', top:'50%', right:-5, transform:'translateY(-50%)', fontSize:'1rem', color:'rgba(20,83,45,0.15)', fontWeight:700, zIndex:2 }}>›</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VERSE + CTA ══════════ */}
      <section style={{ background:'linear-gradient(160deg,#061810,#0A2217 50%,#071408)', padding:'7rem 2rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize:'50px 50px', pointerEvents:'none' }} />
        <div style={{ maxWidth:680, margin:'0 auto', position:'relative', zIndex:2 }}>
          <div style={{ marginBottom:'3rem', padding:'2.5rem', background:'rgba(255,255,255,0.025)', borderRadius:22, border:'1px solid rgba(245,158,11,0.13)' }}>
            <p style={{ fontFamily:'var(--font-arabic)', fontSize:'clamp(1.5rem,4vw,2.2rem)', color:'#F5F0E6', lineHeight:1.8, margin:'0 0 1.25rem', direction:'rtl' }}>
              وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
            </p>
            <div style={{ width:44, height:2, background:'linear-gradient(to right,transparent,rgba(245,158,11,0.55),transparent)', margin:'0 auto 1.25rem' }} />
            <p style={{ fontSize:'0.9rem', color:'rgba(255,255,255,0.55)', fontStyle:'italic', margin:'0 0 0.4rem', lineHeight:1.65 }}>
              "And recite the Quran with measured recitation."
            </p>
            <p style={{ fontSize:'0.68rem', color:'rgba(245,158,11,0.45)', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>Al-Muzzammil 73:4</p>
          </div>

          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.7rem,4vw,2.8rem)', color:'#fff', margin:'0 0 0.75rem', fontWeight:800, letterSpacing:'-0.02em' }}>Begin Your Journey Today</h2>
          <p style={{ fontSize:'1rem', color:'rgba(255,255,255,0.45)', margin:'0 0 2.5rem', lineHeight:1.75 }}>
            Join Muslims around the world learning and memorizing the Quran with NoorulQuran.
          </p>

          <div style={{ display:'flex', gap:'0.7rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to={user?'/quran':'/register'} style={{ padding:'0.88rem 2.4rem', borderRadius:10, background:'linear-gradient(135deg,#F59E0B,#D97706)', color:'#0A1C0F', fontWeight:700, fontSize:'1rem', textDecoration:'none', boxShadow:'0 4px 24px rgba(245,158,11,0.38)', transition:'all 0.22s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 36px rgba(245,158,11,0.55)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 24px rgba(245,158,11,0.38)'; }}
            >{user?'Open Quran →':'Get Started — Free'}</Link>
            <Link to="/learn" style={{ padding:'0.88rem 1.8rem', borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.13)', color:'rgba(255,255,255,0.75)', fontWeight:500, fontSize:'1rem', textDecoration:'none', transition:'all 0.22s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.75)'; }}
            >Explore Lessons</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Module Card (colored top + white bottom split design) ────────────────────
function ModCard({ m }) {
  return (
    <Link to={m.to} className="nq-mc" style={{
      gridColumn: m.featured ? m.spanCols : 'auto',
      borderRadius: 20, overflow: 'hidden', textDecoration: 'none',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid rgba(28,25,23,0.08)',
      display: 'flex', flexDirection: 'column',
      minHeight: m.featured ? 295 : 260,
      background: '#fff',
    }}>
      {/* Colored header */}
      <div style={{ flex: m.featured ? '0 0 52%' : '0 0 46%', background: m.grad, position: 'relative', overflow: 'hidden', padding: '1.6rem 1.7rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'absolute', bottom: -18, right: 8, fontFamily: 'var(--font-arabic)', fontSize: m.featured ? '5.5rem' : '4.8rem', color: 'rgba(255,255,255,0.055)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{m.arabic}</div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: 130, height: 130, borderRadius: '50%', background: `radial-gradient(circle,${m.lightAccent}14 0%,transparent 70%)`, transform: 'translate(35%,-35%)' }} />
        <span style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '0.2rem 0.65rem', borderRadius: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)', color: m.lightAccent, fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>{m.tag}</span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: m.featured ? '1.35rem' : '1.05rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{m.title}</h3>
      </div>
      {/* White content */}
      <div style={{ flex: 1, padding: '1.15rem 1.5rem 1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '0.82rem', color: '#78716C', lineHeight: 1.68, margin: '0 0 0.9rem' }}>{m.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#14532D', fontSize: '0.8rem', fontWeight: 700 }}>
          Explore
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M6.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </Link>
  );
}

// ─── Namaz Full-Width Horizontal Card ────────────────────────────────────────
function NamazCard({ m }) {
  return (
    <Link to={m.to} className="nq-mc nq-nmcard" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', border: '1px solid rgba(28,25,23,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.09)', minHeight: 200 }}>
      <div style={{ background: m.grad, padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: -28, left: -8, fontFamily: 'var(--font-arabic)', fontSize: '8.5rem', color: 'rgba(255,255,255,0.04)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>{m.arabic}</div>
        <span style={{ display: 'inline-block', alignSelf: 'flex-start', padding: '0.22rem 0.7rem', borderRadius: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: m.lightAccent, fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase' }}>{m.tag}</span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{m.title}</h3>
      </div>
      <div style={{ background: '#fff', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '0.88rem', color: '#78716C', lineHeight: 1.72, margin: '0 0 1.5rem' }}>{m.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#14532D', fontWeight: 700, fontSize: '0.84rem' }}>
          Open Namaz Guide
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M6.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </Link>
  );
}
