import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function IslamicStar({ size = 400, opacity = 0.04, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }} aria-hidden>
      {[0, 30, 60].map(r => (
        <polygon key={r} points="100,4 116,66 180,66 130,102 148,164 100,128 52,164 70,102 20,66 84,66"
          fill="none" stroke="rgba(245,158,11,1)" strokeWidth="0.6"
          style={{ transform: `rotate(${r}deg)`, transformOrigin: '100px 100px', opacity }} />
      ))}
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(245,158,11,1)" strokeWidth="0.4" opacity={opacity * 1.5} />
      <circle cx="100" cy="100" r="38" fill="none" stroke="rgba(245,158,11,1)" strokeWidth="0.3" opacity={opacity} />
    </svg>
  );
}

function useCountUp(end, duration = 1800) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const t0 = performance.now();
      const tick = now => {
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

const MODULES = [
  { href:'/quran',       icon:'📖', arabic:'القرآن الكريم',    title:'Quran Reader',   desc:'Mushaf-style layout with Tajweed text, dual translation (English + Urdu), ayah markers, and bookmarks.', badge:'114 Surahs', tag:'Core',         gradFrom:'#051408', gradTo:'#14532D', accent:'#22C55E', steps:['Mushaf layout','Dual translation','Audio TTS','Bookmarks'] },
  { href:'/learn/qaida', icon:'✏️', arabic:'القاعدة النورانية',title:'Noorani Qaida',  desc:'Interactive Arabic alphabet with audio, makhraj anatomy diagrams, and 10 progressive lessons.',        badge:'10 Lessons', tag:'Beginner',     gradFrom:'#081A10', gradTo:'#163520', accent:'#74C69D', steps:['Arabic letters','Makhraj','Audio','Quizzes'] },
  { href:'/learn/tajweed',icon:'🎨',arabic:'أحكام التجويد',   title:'Tajweed Rules',  desc:'Color-coded rules with Quran examples — Izhar, Idgham, Ghunnah, Madd, Qalqalah and more.',           badge:'13 Rules',   tag:'Intermediate', gradFrom:'#1A0808', gradTo:'#341212', accent:'#E57373', steps:['Izhar','Idgham','Ghunnah','Madd & Qalqalah'] },
  { href:'/learn/duas',  icon:'🤲', arabic:'الأدعية والأذكار', title:'Duas & Adhkar',  desc:'Arabic text, transliteration, full Urdu/English translation — for every moment of the day.',          badge:'50+ Duas',   tag:'Daily',        gradFrom:'#0E0818', gradTo:'#1E1035', accent:'#B39DDB', steps:['Morning adhkar','Evening adhkar','Daily duas','Namaz duas'] },
  { href:'/learn/namaz', icon:'🕌', arabic:'كيفية الصلاة',    title:'Namaz Guide',    desc:'Step-by-step prayer guide for all 5 prayers, wudu method, and complete after-prayer adhkar.',        badge:'5 Prayers',  tag:'Essential',    gradFrom:'#071018', gradTo:'#0F2035', accent:'#64B5F6', steps:['Wudu','Fajr to Isha','All duas','After prayer'] },
  { href:'/hifz',        icon:'🎯', arabic:'تتبع الحفظ',      title:'Hifz Tracker',   desc:'Log Sabaq, Sabaqi and Manzil daily. Track streaks, mistakes, and visualize your memorization journey.',badge:'Daily Logs', tag:'Track',        gradFrom:'#050A18', gradTo:'#0A1530', accent:'#90CAF9', steps:['Daily logs','Streak tracking','Mistake log','Progress chart'] },
];

const FEATURES = [
  { icon:'🕌', title:'Amiri Quran Font',  desc:'Uthmani script identical to Madinah Mushaf, rendered perfectly at any size',          color:'#22C55E' },
  { icon:'🔊', title:'Arabic Audio TTS',  desc:'Correct pronunciation for every letter and ayah via our server proxy',                color:'#64B5F6' },
  { icon:'🌍', title:'Dual Translation',  desc:'Sahih International + Jalandhry Urdu translations, always visible side by side',      color:'#FCD34D' },
  { icon:'📊', title:'Hifz Analytics',    desc:'Weekly progress charts, streak calendar, mistake logs and surah completion map',       color:'#B39DDB' },
  { icon:'🆓', title:'Completely Free',   desc:'No subscription, no ads, no tracking — open source and free forever',                 color:'#E57373' },
  { icon:'📱', title:'Any Device',        desc:'Responsive design that works beautifully on mobile, tablet and desktop',              color:'#81C784' },
];

const TICKER = ['📖 114 Surahs','✏️ Qaida Lessons','🎨 13 Tajweed Rules','🤲 50+ Duas','🔊 Arabic Audio','🎯 Hifz Tracker','📊 Progress Charts','🕌 Namaz Guide','🤍 Janaza Guide','🌙 Free Forever'];

const STEPS = [
  { n:'01', icon:'📝', title:'Create Account',   desc:'Sign up in seconds — no credit card required, free forever.',      color:'#22C55E' },
  { n:'02', icon:'✏️', title:'Start with Qaida', desc:'Master the Arabic alphabet with audio, diagrams and quizzes.',     color:'#64B5F6' },
  { n:'03', icon:'📖', title:'Read the Quran',   desc:'Explore 114 surahs with Tajweed text and dual translation.',       color:'#FCD34D' },
  { n:'04', icon:'🎯', title:'Track Your Hifz',  desc:'Log sessions daily, view progress charts and build your streak.',  color:'#B39DDB' },
];

const WG = 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.68) 100%)';
const DG = 'linear-gradient(135deg,#14532D 0%,#15803D 100%)';

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const [n1, r1] = useCountUp(114);
  const [n2, r2] = useCountUp(6236);
  const [n3, r3] = useCountUp(50);
  const [n4, r4] = useCountUp(13);

  return (
    <div style={{ overflowX: 'hidden', background: '#FFFBEB' }}>

      {/* ══════════════════════════ 1. HERO ══════════════════════════════ */}
      <section style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(175deg,#020806 0%,#052e16 28%,#0A1C10 62%,#14532D 100%)',
        padding: '7rem 1.5rem 5rem',
      }}>
        {/* Hex grid */}
        <svg aria-hidden style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.025 }}>
          <defs><pattern id="hx" x="0" y="0" width="56" height="64" patternUnits="userSpaceOnUse">
            <polygon points="28,2 52,16 52,48 28,62 4,48 4,16" fill="none" stroke="#F59E0B" strokeWidth="0.8"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hx)"/>
        </svg>

        {/* Atmospheric glow orbs */}
        <div style={{ position:'absolute',top:'18%',left:'10%',width:520,height:520,borderRadius:'50%',background:'radial-gradient(circle,rgba(82,183,136,0.07) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(55px)' }}/>
        <div style={{ position:'absolute',top:'32%',right:'6%',width:620,height:620,borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,0.06) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(65px)' }}/>
        <div style={{ position:'absolute',bottom:'10%',left:'32%',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(100,181,246,0.04) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(50px)' }}/>

        {/* Rotating Islamic stars */}
        <IslamicStar size={540} opacity={0.048} style={{ top:-90,right:-110,animation:'rotateSlow 90s linear infinite' }}/>
        <IslamicStar size={380} opacity={0.038} style={{ bottom:-70,left:-80,animation:'rotateSlow 70s linear infinite reverse' }}/>
        <IslamicStar size={185} opacity={0.062} style={{ top:'11%',left:'5%',animation:'floatY 12s ease-in-out infinite' }}/>

        {/* ── Main content ── */}
        <div style={{
          position:'relative',textAlign:'center',maxWidth:900,zIndex:2,
          opacity: ready ? 1 : 0, transform: ready ? 'none' : 'translateY(50px)',
          transition: 'all 1.1s cubic-bezier(0.22,1,0.36,1)',
        }}>
          {/* Platform badge */}
          <div style={{
            display:'inline-flex',alignItems:'center',gap:'0.55rem',
            background:'rgba(82,183,136,0.08)',border:'1px solid rgba(82,183,136,0.2)',
            borderRadius:99,padding:'0.42rem 1.2rem',marginBottom:'2.2rem',
            color:'rgba(82,183,136,0.9)',fontSize:'0.71rem',letterSpacing:'0.14em',
            fontFamily:'var(--font-heading)',textTransform:'uppercase',
          }}>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'#22C55E',display:'inline-block',animation:'pulseGold 2.2s ease-in-out infinite' }}/>
            Free Islamic Learning Platform &nbsp;·&nbsp; بالكلية مجاني
          </div>

          {/* Bismillah */}
          <p style={{
            fontFamily:'var(--font-quran)',fontSize:'clamp(1.25rem,2.8vw,1.9rem)',
            color:'rgba(245,158,11,0.55)',direction:'rtl',lineHeight:2.5,
            marginBottom:'1.2rem',animation:'glowPulse 5s ease-in-out infinite',
          }}>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ</p>

          {/* Brand name */}
          <h1 style={{
            fontFamily:'var(--font-arabic)',fontSize:'clamp(3.8rem,10vw,7rem)',
            lineHeight:1.05,direction:'rtl',marginBottom:'0.5rem',
            background:'linear-gradient(155deg,#FFFCF0 0%,#F5DFA0 20%,#FCD34D 48%,#F59E0B 70%,#F5DFA0 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            filter:'drop-shadow(0 8px 44px rgba(245,158,11,0.28))',
          }}>نور القرآن</h1>

          <p style={{
            fontFamily:'var(--font-heading)',fontSize:'clamp(0.55rem,1.1vw,0.72rem)',
            color:'rgba(255,255,255,0.18)',letterSpacing:'0.65em',textTransform:'uppercase',marginBottom:'1.5rem',
          }}>N &nbsp;O &nbsp;O &nbsp;R &nbsp;U &nbsp;L &nbsp;Q &nbsp;U &nbsp;R &nbsp;A &nbsp;N</p>

          {/* Gold ornament divider */}
          <div style={{ display:'flex',alignItems:'center',gap:'1rem',justifyContent:'center',marginBottom:'1.8rem' }}>
            <div style={{ width:75,height:1,background:'linear-gradient(to left,rgba(245,158,11,0.4),transparent)' }}/>
            <span style={{ color:'rgba(245,158,11,0.35)',fontSize:'0.48rem' }}>◆</span>
            <span style={{ color:'rgba(245,158,11,0.65)',fontSize:'0.85rem' }}>✦</span>
            <span style={{ color:'rgba(245,158,11,0.35)',fontSize:'0.48rem' }}>◆</span>
            <div style={{ width:75,height:1,background:'linear-gradient(to right,rgba(245,158,11,0.4),transparent)' }}/>
          </div>

          <p style={{ fontSize:'clamp(0.88rem,1.8vw,1.05rem)',color:'rgba(255,255,255,0.42)',fontWeight:300,letterSpacing:'0.1em',marginBottom:'3rem' }}>
            Learn &nbsp;·&nbsp; Read &nbsp;·&nbsp; Memorize &nbsp;·&nbsp; Track
          </p>

          {/* CTA buttons */}
          <div style={{ display:'flex',gap:'0.85rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'3.5rem' }}>
            <Link to="/quran" style={{
              padding:'0.9rem 2.6rem',
              background:'linear-gradient(135deg,#E2B84E 0%,#F59E0B 55%,#A8810A 100%)',
              color:'#050E08',fontWeight:800,fontSize:'0.9rem',letterSpacing:'0.07em',
              borderRadius:99,fontFamily:'var(--font-heading)',textTransform:'uppercase',
              boxShadow:'0 0 0 1px rgba(255,255,255,0.18) inset,0 4px 32px rgba(245,158,11,0.55)',
              transition:'all 0.3s cubic-bezier(0.22,1,0.36,1)',textDecoration:'none',
              display:'inline-flex',alignItems:'center',gap:'0.5rem',
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px) scale(1.02)';e.currentTarget.style.boxShadow='0 0 0 1px rgba(255,255,255,0.22) inset,0 10px 50px rgba(245,158,11,0.7)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 0 0 1px rgba(255,255,255,0.18) inset,0 4px 32px rgba(245,158,11,0.55)';}}
            ><span>📖</span> Open Quran</Link>

            <Link to="/register" style={{
              padding:'0.9rem 2.2rem',fontSize:'0.9rem',fontWeight:600,
              background:'rgba(255,255,255,0.045)',border:'1px solid rgba(28,25,23,0.13)',
              color:'#292524',borderRadius:99,backdropFilter:'blur(12px)',
              transition:'all 0.28s',textDecoration:'none',
              display:'inline-flex',alignItems:'center',gap:'0.4rem',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.09)';e.currentTarget.style.borderColor='rgba(245,158,11,0.45)';e.currentTarget.style.color='#FCD34D';e.currentTarget.style.transform='translateY(-2px)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.045)';e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='#292524';e.currentTarget.style.transform='';}}
            >Start for Free →</Link>
          </div>

          {/* Floating stat chips */}
          <div style={{ display:'flex',gap:'0.55rem',justifyContent:'center',flexWrap:'wrap' }}>
            {[
              {val:'114',   label:'Surahs',        icon:'📖'},
              {val:'6,236', label:'Ayahs',          icon:'✨'},
              {val:'50+',   label:'Duas',           icon:'🤲'},
              {val:'13',    label:'Tajweed Rules',  icon:'🎨'},
              {val:'∞',     label:'Free Forever',   icon:'🆓'},
            ].map((s,i) => (
              <div key={i} style={{
                display:'inline-flex',alignItems:'center',gap:'0.42rem',
                background:'#ffffff',border:'1px solid rgba(28,25,23,0.1)',
                borderRadius:99,padding:'0.3rem 0.82rem',
                color:'rgba(255,255,255,0.48)',fontSize:'0.74rem',
                backdropFilter:'blur(8px)',transition:'all 0.22s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(245,158,11,0.09)';e.currentTarget.style.borderColor='rgba(245,158,11,0.3)';e.currentTarget.style.color='#FCD34D';}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(28,25,23,0.04)';e.currentTarget.style.borderColor='rgba(28,25,23,0.1)';e.currentTarget.style.color='rgba(255,255,255,0.48)';}}
              >
                <span>{s.icon}</span>
                <strong style={{ color:'#1C1917',fontWeight:700 }}>{s.val}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute',bottom:'2.5rem',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.45rem',opacity:0.22,animation:'floatY 2.5s ease-in-out infinite' }}>
          <div style={{ width:21,height:34,border:'1.5px solid rgba(255,255,255,0.5)',borderRadius:10,display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:5 }}>
            <div style={{ width:3,height:6,borderRadius:4,background:'rgba(255,255,255,0.8)',animation:'floatY 1.6s ease-in-out infinite' }}/>
          </div>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════ 2. TICKER ════════════════════════════ */}
      <div style={{ background:'linear-gradient(90deg,#0A1F12,#14532D,#0A1F12)',borderTop:'1px solid rgba(245,158,11,0.1)',borderBottom:'1px solid rgba(245,158,11,0.1)',padding:'0.65rem 0',overflow:'hidden' }}>
        <div style={{ display:'flex',animation:'marqueeScroll 30s linear infinite',width:'max-content' }}>
          {[...TICKER,...TICKER].map((t,i) => (
            <span key={i} style={{ display:'inline-flex',alignItems:'center',gap:'0.45rem',padding:'0 2.2rem',fontSize:'0.77rem',color:'#A8A29E',fontWeight:500,whiteSpace:'nowrap' }}>
              {t}<span style={{ color:'rgba(245,158,11,0.28)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════ 3. STATS ═════════════════════════════ */}
      <section style={{ background:'#FFFBEB',padding:'4.5rem 1.5rem' }}>
        <div className="home-stats" style={{ maxWidth:1020,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem' }}>
          {[
            { end:114,  s:'',  label:'Surahs',       sub:'Complete Holy Quran',      ref:r1,val:n1,icon:'📖',rgb:'82,183,136'  },
            { end:6236, s:'',  label:'Ayahs',         sub:'Every blessed verse',      ref:r2,val:n2,icon:'✨',rgb:'100,181,246' },
            { end:50,   s:'+', label:'Duas',          sub:'For every moment',         ref:r3,val:n3,icon:'🤲',rgb:'179,157,219' },
            { end:13,   s:'',  label:'Tajweed Rules', sub:'Color-coded & explained',  ref:r4,val:n4,icon:'🎨',rgb:'229,115,115' },
          ].map((s,i) => (
            <div key={i} ref={s.ref} style={{
              background:'#ffffff',border:'1px solid rgba(28,25,23,0.09)',
              borderRadius:22,padding:'2rem 1.5rem',textAlign:'center',
              boxShadow:'0 2px 12px rgba(20,83,45,0.07)',
              transition:'all 0.3s ease',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background=`rgba(${s.rgb},0.06)`;e.currentTarget.style.borderColor=`rgba(${s.rgb},0.22)`;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 8px 32px rgba(${s.rgb},0.15)`;}}
            onMouseLeave={e=>{e.currentTarget.style.background='#ffffff';e.currentTarget.style.borderColor='rgba(28,25,23,0.09)';e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 12px rgba(20,83,45,0.07)';}}
            >
              <div style={{ fontSize:'1.85rem',marginBottom:'0.72rem' }}>{s.icon}</div>
              <div style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,4vw,2.9rem)',fontWeight:800,lineHeight:1,color:`rgb(${s.rgb})` }}>
                {s.val.toLocaleString()}{s.s}
              </div>
              <div style={{ fontWeight:700,fontSize:'0.88rem',color:'#1C1917',marginTop:'0.5rem' }}>{s.label}</div>
              <div style={{ fontSize:'0.68rem',color:'#78716C',marginTop:'0.2rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════ 4. MODULES ═══════════════════════════ */}
      <section style={{ background:'#FFFBEB',padding:'5.5rem 1.5rem',borderTop:'1px solid rgba(28,25,23,0.06)' }}>
        <div style={{ maxWidth:1180,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'3.5rem' }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:'0.4rem',padding:'0.28rem 0.9rem',borderRadius:99,marginBottom:'0.85rem',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.22)',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.13em',textTransform:'uppercase',color:'rgba(245,158,11,0.72)' }}>✦ What&apos;s Inside</div>
            <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:700,background:DG,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:'0.75rem',lineHeight:1.25 }}>
              One Platform, Complete Journey
            </h2>
            <p style={{ color:'#78716C',fontSize:'1rem',maxWidth:480,margin:'0 auto' }}>From your first Alif to completing your Quran memorization</p>
          </div>

          <div className="home-modules" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.1rem' }}>
            {MODULES.map(m => (
              <Link key={m.href} to={m.href} style={{
                display:'flex',flexDirection:'column',textDecoration:'none',
                background:`linear-gradient(150deg,${m.gradFrom} 0%,${m.gradTo} 100%)`,
                borderRadius:24,overflow:'hidden',position:'relative',
                border:'1px solid rgba(28,25,23,0.07)',boxShadow:'0 4px 28px rgba(0,0,0,0.32)',
                transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-7px)';e.currentTarget.style.boxShadow=`0 22px 64px rgba(0,0,0,0.52),0 0 0 1px ${m.accent}32`;e.currentTarget.style.borderColor=`${m.accent}28`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 28px rgba(0,0,0,0.32)';e.currentTarget.style.borderColor='rgba(28,25,23,0.07)';}}
              >
                {/* Accent gradient top bar */}
                <div style={{ height:2,background:`linear-gradient(90deg,${m.accent}00,${m.accent},${m.accent}00)`,flexShrink:0 }}/>

                {/* Watermark star */}
                <svg aria-hidden viewBox="0 0 200 200" width="140" height="140"
                  style={{ position:'absolute',bottom:-25,right:-25,opacity:0.052,pointerEvents:'none' }}>
                  {[0,30,60].map(r=>(
                    <polygon key={r} points="100,4 116,66 180,66 130,102 148,164 100,128 52,164 70,102 20,66 84,66"
                      fill={m.accent} style={{ transform:`rotate(${r}deg)`,transformOrigin:'100px 100px' }}/>
                  ))}
                </svg>

                <div style={{ padding:'1.6rem 1.75rem 0',flex:1 }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.2rem' }}>
                    <span style={{ fontSize:'0.63rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:m.accent,background:`${m.accent}14`,border:`1px solid ${m.accent}26`,borderRadius:99,padding:'0.18rem 0.65rem' }}>{m.tag}</span>
                    <span style={{ fontSize:'0.68rem',color:'rgba(255,255,255,0.32)',fontWeight:500 }}>{m.badge}</span>
                  </div>
                  <div style={{ fontSize:'2.2rem',marginBottom:'0.85rem' }}>{m.icon}</div>
                  <p style={{ fontFamily:'var(--font-arabic)',fontSize:'1.18rem',color:m.accent,direction:'rtl',lineHeight:1.8,marginBottom:'0.5rem',opacity:0.85 }}>{m.arabic}</p>
                  <h3 style={{ fontFamily:'var(--font-heading)',fontSize:'1.05rem',color:'#fff',fontWeight:700,marginBottom:'0.55rem',letterSpacing:'0.02em' }}>{m.title}</h3>
                  <p style={{ fontSize:'0.8rem',color:'rgba(255,255,255,0.42)',lineHeight:1.8,marginBottom:'1rem' }}>{m.desc}</p>
                  <div style={{ display:'flex',flexWrap:'wrap',gap:'0.32rem',marginBottom:'1rem' }}>
                    {m.steps.map((step,si) => (
                      <span key={si} style={{ fontSize:'0.63rem',padding:'0.16rem 0.52rem',background:`${m.accent}0F`,border:`1px solid ${m.accent}1E`,borderRadius:99,color:`${m.accent}CC`,fontWeight:600 }}>{step}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0.95rem 1.75rem',borderTop:`1px solid ${m.accent}12` }}>
                  <span style={{ fontSize:'0.8rem',fontWeight:700,color:m.accent }}>Explore →</span>
                  <div style={{ width:30,height:30,borderRadius:'50%',background:`${m.accent}14`,border:`1px solid ${m.accent}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.78rem',color:m.accent }}>↗</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 5. VERSE SHOWCASE ════════════════════════ */}
      <section style={{ position:'relative',padding:'7rem 1.5rem',overflow:'hidden',background:'linear-gradient(150deg,#052e16 0%,#14532D 55%,#0A1C10 100%)' }}>
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(245,158,11,0.07) 0%,transparent 62%)',pointerEvents:'none' }}/>
        <IslamicStar size={260} opacity={0.06} style={{ top:'50%',left:'50%',transform:'translate(-50%,-50%)',animation:'rotateSlow 120s linear infinite' }}/>

        <div style={{ maxWidth:760,margin:'0 auto',textAlign:'center',position:'relative',zIndex:2 }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.3rem 1rem',borderRadius:99,marginBottom:'2rem',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.22)',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(245,158,11,0.72)' }}>
            ✦ Verse of the Day
          </div>

          {/* Framed ayah */}
          <div style={{ background:'rgba(245,158,11,0.035)',border:'1px solid rgba(245,158,11,0.12)',borderRadius:26,padding:'3rem 2.5rem',marginBottom:'2rem',position:'relative' }}>
            {/* Corner ornaments */}
            {[
              { top:10,left:10,  borderTop:'1.5px solid rgba(245,158,11,0.5)',borderLeft:'1.5px solid rgba(245,158,11,0.5)',  borderRadius:'12px 0 0 0' },
              { top:10,right:10, borderTop:'1.5px solid rgba(245,158,11,0.5)',borderRight:'1.5px solid rgba(245,158,11,0.5)', borderRadius:'0 12px 0 0' },
              { bottom:10,right:10,borderBottom:'1.5px solid rgba(245,158,11,0.5)',borderRight:'1.5px solid rgba(245,158,11,0.5)',borderRadius:'0 0 12px 0' },
              { bottom:10,left:10, borderBottom:'1.5px solid rgba(245,158,11,0.5)',borderLeft:'1.5px solid rgba(245,158,11,0.5)', borderRadius:'0 0 0 12px' },
            ].map((c,i) => <div key={i} style={{ position:'absolute',width:28,height:28,...c }}/>)}
            <p style={{ fontFamily:'var(--font-quran)',fontSize:'clamp(1.6rem,4.5vw,3rem)',color:'#1C1917',direction:'rtl',lineHeight:2.4,animation:'glowPulse 5s ease-in-out infinite' }}>
              وَرَتِّلِ ٱلۡقُرۡءَانَ تَرۡتِيلٗا
            </p>
          </div>

          <div style={{ width:48,height:1,background:'rgba(245,158,11,0.28)',margin:'0 auto 1.25rem' }}/>
          <p style={{ color:'rgba(255,255,255,0.52)',fontSize:'1.02rem',fontStyle:'italic',marginBottom:'0.35rem' }}>
            &ldquo;And recite the Quran with measured recitation&rdquo;
          </p>
          <p style={{ color:'rgba(245,158,11,0.42)',fontSize:'0.78rem',marginBottom:'2.5rem' }}>— Surah Al-Muzzammil 73:4</p>

          <Link to="/quran" style={{
            display:'inline-flex',alignItems:'center',gap:'0.5rem',padding:'0.82rem 2rem',
            background:'rgba(245,158,11,0.08)',border:'1.5px solid rgba(245,158,11,0.28)',
            color:'#FCD34D',borderRadius:99,fontWeight:600,fontSize:'0.88rem',
            transition:'all 0.25s',textDecoration:'none',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(245,158,11,0.16)';e.currentTarget.style.borderColor='rgba(245,158,11,0.55)';e.currentTarget.style.transform='translateY(-2px)';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(245,158,11,0.08)';e.currentTarget.style.borderColor='rgba(245,158,11,0.28)';e.currentTarget.style.transform='';}}
          >📖 Open Quran Reader</Link>
        </div>
      </section>

      {/* ══════════════════════════ 6. FEATURES ══════════════════════════ */}
      <section style={{ background:'#FFFBEB',padding:'5.5rem 1.5rem',borderTop:'1px solid rgba(28,25,23,0.06)' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'3.5rem' }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:'0.4rem',padding:'0.28rem 0.9rem',borderRadius:99,marginBottom:'0.85rem',background:'rgba(82,183,136,0.08)',border:'1px solid rgba(82,183,136,0.22)',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(82,183,136,0.82)' }}>✦ Why NoorulQuran</div>
            <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(1.7rem,3vw,2.5rem)',fontWeight:700,background:DG,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:'0.6rem' }}>Built for Every Muslim</h2>
            <p style={{ color:'#78716C',fontSize:'0.95rem' }}>Everything you need, nothing you don&apos;t</p>
          </div>

          <div className="home-features" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem' }}>
            {FEATURES.map((f,i) => (
              <div key={i} style={{
                padding:'1.8rem',borderRadius:22,
                background:'#ffffff',border:'1px solid rgba(28,25,23,0.09)',
                boxShadow:'0 2px 10px rgba(20,83,45,0.06)',
                transition:'all 0.28s ease',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background=`${f.color}08`;e.currentTarget.style.borderColor=`${f.color}28`;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.boxShadow=`0 8px 32px ${f.color}18`;}}
              onMouseLeave={e=>{e.currentTarget.style.background='#ffffff';e.currentTarget.style.borderColor='rgba(28,25,23,0.09)';e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 10px rgba(20,83,45,0.06)';}}
              >
                <div style={{ width:52,height:52,borderRadius:16,marginBottom:'1.1rem',background:`linear-gradient(135deg,${f.color}20,${f.color}0A)`,border:`1px solid ${f.color}25`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',boxShadow:`0 4px 22px ${f.color}12` }}>{f.icon}</div>
                <h3 style={{ fontSize:'0.93rem',color:'#1C1917',fontWeight:700,marginBottom:'0.5rem',fontFamily:'var(--font-heading)' }}>{f.title}</h3>
                <p style={{ fontSize:'0.8rem',color:'#78716C',lineHeight:1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ 7. HOW IT WORKS ══════════════════════════ */}
      <section style={{ background:'#FFFBEB',padding:'5.5rem 1.5rem',borderTop:'1px solid rgba(28,25,23,0.06)' }}>
        <div style={{ maxWidth:980,margin:'0 auto' }}>
          <div style={{ textAlign:'center',marginBottom:'3.5rem' }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:'0.4rem',padding:'0.28rem 0.9rem',borderRadius:99,marginBottom:'0.85rem',background:'rgba(100,181,246,0.08)',border:'1px solid rgba(100,181,246,0.22)',fontSize:'0.7rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(100,181,246,0.78)' }}>✦ Get Started</div>
            <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(1.7rem,3vw,2.4rem)',fontWeight:700,background:DG,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Begin in 4 Simple Steps</h2>
          </div>

          <div className="home-steps" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',position:'relative' }}>
            {/* Connecting line */}
            <div style={{ position:'absolute',top:36,left:'12.5%',right:'12.5%',height:1,background:'linear-gradient(90deg,transparent,rgba(245,158,11,0.2),rgba(245,158,11,0.2),transparent)',zIndex:0 }}/>
            {STEPS.map((s,i) => (
              <div key={i} style={{ textAlign:'center',padding:'1.75rem 1rem',position:'relative',zIndex:1 }}>
                <div style={{
                  width:52,height:52,borderRadius:'50%',margin:'0 auto 1.25rem',
                  background:`linear-gradient(135deg,${s.color}1E,${s.color}08)`,border:`1.5px solid ${s.color}32`,
                  display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.35rem',
                  boxShadow:`0 0 0 6px #FFFBEB,0 0 24px ${s.color}22`,
                }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-heading)',fontSize:'0.58rem',letterSpacing:'0.18em',color:s.color,fontWeight:700,marginBottom:'0.4rem',opacity:0.85 }}>STEP {s.n}</div>
                <h3 style={{ fontSize:'0.92rem',color:'#1C1917',fontWeight:700,marginBottom:'0.5rem',fontFamily:'var(--font-heading)' }}>{s.title}</h3>
                <p style={{ fontSize:'0.78rem',color:'#78716C',lineHeight:1.72 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ 8. FINAL CTA ═════════════════════════ */}
      <section style={{ position:'relative',padding:'7rem 1.5rem',textAlign:'center',overflow:'hidden',background:'linear-gradient(150deg,#052e16 0%,#14532D 55%,#081510 100%)',borderTop:'1px solid rgba(245,158,11,0.12)' }}>
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(245,158,11,0.065) 0%,transparent 62%)',pointerEvents:'none' }}/>
        <IslamicStar size={380} opacity={0.04}  style={{ top:'50%',left:'5%', transform:'translateY(-50%)',animation:'floatY 10s ease-in-out infinite' }}/>
        <IslamicStar size={260} opacity={0.035} style={{ top:'50%',right:'4%',transform:'translateY(-50%)',animation:'floatY 13s ease-in-out infinite 3s' }}/>

        <div style={{ maxWidth:640,margin:'0 auto',position:'relative',zIndex:2 }}>
          <div style={{ border:'1px solid rgba(245,158,11,0.14)',borderRadius:28,padding:'4rem 3rem',position:'relative',background:'rgba(245,158,11,0.025)' }}>
            {/* Corner ornaments */}
            {[
              { top:10,left:10,  borderTop:'2px solid rgba(245,158,11,0.48)',borderLeft:'2px solid rgba(245,158,11,0.48)',  borderRadius:'22px 0 0 0' },
              { top:10,right:10, borderTop:'2px solid rgba(245,158,11,0.48)',borderRight:'2px solid rgba(245,158,11,0.48)', borderRadius:'0 22px 0 0' },
              { bottom:10,right:10,borderBottom:'2px solid rgba(245,158,11,0.48)',borderRight:'2px solid rgba(245,158,11,0.48)',borderRadius:'0 0 22px 0' },
              { bottom:10,left:10, borderBottom:'2px solid rgba(245,158,11,0.48)',borderLeft:'2px solid rgba(245,158,11,0.48)', borderRadius:'0 0 0 22px' },
            ].map((c,i) => <div key={i} style={{ position:'absolute',width:32,height:32,...c }}/>)}

            <p style={{ fontFamily:'var(--font-quran)',fontSize:'clamp(1.15rem,2.6vw,1.85rem)',color:'rgba(245,158,11,0.65)',direction:'rtl',lineHeight:2.4,marginBottom:'1rem',animation:'glowPulse 5s ease-in-out infinite' }}>
              إِنَّ هَـٰذَا ٱلۡقُرۡءَانَ يَهۡدِي لِلَّتِي هِيَ أَقۡوَمُ
            </p>
            <p style={{ color:'rgba(255,255,255,0.36)',fontSize:'0.84rem',fontStyle:'italic',marginBottom:'0.35rem' }}>
              &ldquo;Indeed, this Quran guides to that which is most suitable&rdquo;
            </p>
            <p style={{ color:'rgba(245,158,11,0.35)',fontSize:'0.74rem',marginBottom:'2.5rem' }}>— Al-Isra 17:9</p>

            <h2 style={{ fontFamily:'var(--font-heading)',fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:700,background:WG,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:'0.65rem' }}>
              Begin Your Journey Today
            </h2>
            <p style={{ color:'#D6D3D1',marginBottom:'2.5rem',fontSize:'0.88rem' }}>
              Free forever &nbsp;·&nbsp; No sign-up required to start reading
            </p>

            <div style={{ display:'flex',gap:'0.85rem',justifyContent:'center',flexWrap:'wrap' }}>
              <Link to="/register" style={{
                padding:'0.9rem 2.6rem',background:'linear-gradient(135deg,#E2B84E,#F59E0B)',
                color:'#050E08',fontWeight:800,fontSize:'0.9rem',borderRadius:99,
                fontFamily:'var(--font-heading)',letterSpacing:'0.05em',
                boxShadow:'0 4px 32px rgba(245,158,11,0.45)',
                transition:'all 0.25s',textDecoration:'none',display:'inline-block',
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 50px rgba(245,158,11,0.65)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 4px 32px rgba(245,158,11,0.45)';}}
              >Create Free Account</Link>

              <Link to="/quran" style={{
                padding:'0.9rem 2.2rem',background:'transparent',
                color:'rgba(255,255,255,0.68)',border:'1px solid rgba(255,255,255,0.18)',
                borderRadius:99,fontWeight:600,fontSize:'0.9rem',
                transition:'all 0.22s',textDecoration:'none',display:'inline-block',
              }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(28,25,23,0.09)';e.currentTarget.style.borderColor='rgba(255,255,255,0.38)';e.currentTarget.style.color='#fff';}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(255,255,255,0.15)';e.currentTarget.style.color='rgba(255,255,255,0.68)';}}
              >Browse Quran</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
