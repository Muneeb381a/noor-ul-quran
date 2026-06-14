import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

const NAV_LINKS = (user, dashPath) => [
  { to: '/quran',   label: 'Quran',     ar: 'القرآن',  icon: '📖' },
  { to: '/learn',   label: 'Learn',     ar: 'تعلّم',   icon: '🎓' },
  ...(user ? [
    { to: '/hifz',   label: 'Hifz',     ar: 'الحفظ',  icon: '🎯' },
    { to: dashPath,  label: 'Dashboard', ar: 'لوحتي',  icon: '📊' },
  ] : []),
];

function getInitial(name = '') { return name.charAt(0).toUpperCase(); }

export default function Navbar() {
  const { user, logout }     = useAuth();
  const { lang, toggleLang } = useLang();
  const navigate             = useNavigate();
  const location             = useLocation();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDrop, setUserDrop]     = useState(false);
  const dropRef   = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserDrop(false); }, [location.pathname]);

  useEffect(() => {
    if (!userDrop) return;
    const close = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserDrop(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [userDrop]);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = e => { if (mobileRef.current && !mobileRef.current.contains(e.target)) setMobileOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [mobileOpen]);

  const isActive = p => location.pathname === p || location.pathname.startsWith(p + '/');
  const dashPath = user?.role === 'teacher' ? '/teacher' : user?.role === 'parent' ? '/parent' : '/dashboard';
  const links    = NAV_LINKS(user, dashPath);

  return (
    <>
      {/* ── Gold shimmer top line ── */}
      <div style={{
        height: 2, position: 'relative', zIndex: 101,
        background: 'linear-gradient(90deg,transparent 0%,#6B4E0A 10%,#C9A84C 30%,#F5DFA0 50%,#C9A84C 70%,#6B4E0A 90%,transparent 100%)',
      }}/>

      <nav ref={mobileRef} style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(4,9,6,0.98)' : 'rgba(5,12,7,0.94)',
        backdropFilter: 'blur(32px) saturate(2)',
        WebkitBackdropFilter: 'blur(32px) saturate(2)',
        borderBottom: `1px solid ${scrolled ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.1)'}`,
        boxShadow: scrolled ? '0 8px 48px rgba(0,0,0,0.6),0 1px 0 rgba(201,168,76,0.1) inset' : 'none',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{ maxWidth: 1260, margin: '0 auto', padding: '0 1.75rem', display: 'flex', alignItems: 'center', height: 68, gap: '0.5rem' }}>

          {/* ══ LOGO ══ */}
          <Link to="/" style={{ display:'flex',alignItems:'center',gap:'0.72rem',textDecoration:'none',marginRight:'1.75rem',flexShrink:0 }}>
            {/* Emblem */}
            <div style={{ width:40,height:40,position:'relative',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
              <svg viewBox="0 0 42 42" width="42" height="42" style={{ position:'absolute',inset:0 }}>
                <defs>
                  <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(201,168,76,0.35)"/>
                    <stop offset="100%" stopColor="rgba(201,168,76,0.06)"/>
                  </radialGradient>
                </defs>
                <circle cx="21" cy="21" r="20" fill="url(#emblemGlow)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6"/>
                <polygon
                  points="21,3 24.8,13.2 35.7,13.2 27.1,19.4 30.3,29.6 21,23.7 11.7,29.6 14.9,19.4 6.3,13.2 17.2,13.2"
                  fill="none" stroke="rgba(201,168,76,0.65)" strokeWidth="0.7"/>
                <circle cx="21" cy="21" r="12" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
              </svg>
              <span style={{ fontFamily:'var(--font-arabic)',fontSize:'1.15rem',color:'#E9C46A',position:'relative',zIndex:1,filter:'drop-shadow(0 0 10px rgba(201,168,76,0.55))' }}>ن</span>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-arabic)',fontSize:'1.18rem',color:'#E9C46A',lineHeight:1.15,direction:'rtl',filter:'drop-shadow(0 0 12px rgba(201,168,76,0.28))' }}>نور القرآن</div>
              <div style={{ fontFamily:'var(--font-heading)',fontSize:'0.44rem',color:'rgba(201,168,76,0.32)',letterSpacing:'0.32em',textTransform:'uppercase',marginTop:2 }}>NOOR UL QURAN</div>
            </div>
          </Link>

          {/* ══ NAV LINKS ══ */}
          <div className="nav-desktop" style={{ display:'flex',alignItems:'center',gap:'0.15rem',flex:1 }}>
            {links.map(({ to, label, ar, icon }) => {
              const active = isActive(to);
              return (
                <Link key={to} to={to} style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', gap: '0.38rem',
                  padding: '0.52rem 1rem',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#0A1810' : 'rgba(255,255,255,0.6)',
                  background: active
                    ? 'linear-gradient(135deg,#D4A843 0%,#C9A84C 100%)'
                    : 'transparent',
                  boxShadow: active
                    ? '0 2px 18px rgba(201,168,76,0.5),0 1px 0 rgba(255,255,255,0.22) inset'
                    : 'none',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={e => {
                  if (active) return;
                  e.currentTarget.style.color = 'rgba(255,255,255,0.92)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  if (active) return;
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = '';
                }}
                >
                  <span style={{ fontSize:'0.82rem',lineHeight:1 }}>{icon}</span>
                  <span>{label}</span>
                  {active && (
                    <span style={{ fontFamily:'var(--font-arabic)',fontSize:'0.68rem',opacity:0.55,lineHeight:1,marginLeft:1 }}>{ar}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ══ RIGHT ACTIONS ══ */}
          <div style={{ display:'flex',alignItems:'center',gap:'0.5rem',flexShrink:0 }}>

            {/* Lang toggle */}
            <button onClick={toggleLang} style={{
              background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',
              color:'rgba(255,255,255,0.5)',padding:'0.38rem 0.82rem',
              borderRadius:99,fontSize:'0.77rem',cursor:'pointer',transition:'all 0.2s',
              fontFamily: lang === 'ur' ? 'var(--font-arabic)' : 'var(--font-heading)',
              letterSpacing: lang === 'ur' ? 0 : '0.06em',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,0.1)';e.currentTarget.style.borderColor='rgba(201,168,76,0.38)';e.currentTarget.style.color='#E9C46A';}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.09)';e.currentTarget.style.color='rgba(255,255,255,0.5)';}}
            >{lang === 'en' ? 'اردو' : 'EN'}</button>

            <div className="nav-desktop" style={{ width:1,height:22,background:'rgba(255,255,255,0.1)',flexShrink:0 }}/>

            {user ? (
              /* ── User dropdown ── */
              <div ref={dropRef} style={{ position:'relative' }}>
                <button onClick={() => setUserDrop(p => !p)} style={{
                  display:'flex',alignItems:'center',gap:'0.52rem',
                  background: userDrop ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.05)',
                  border:`1px solid ${userDrop ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius:99,padding:'0.3rem 0.82rem 0.3rem 0.3rem',
                  cursor:'pointer',transition:'all 0.22s',
                }}
                onMouseEnter={e=>{if(!userDrop){e.currentTarget.style.background='rgba(255,255,255,0.08)';e.currentTarget.style.borderColor='rgba(255,255,255,0.18)';}}}
                onMouseLeave={e=>{if(!userDrop){e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';}}}
                >
                  <div style={{ width:32,height:32,borderRadius:'50%',flexShrink:0,background:'linear-gradient(135deg,#E2B84E 0%,#9A7210 100%)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:800,fontSize:'0.82rem',fontFamily:'var(--font-heading)',boxShadow:'0 0 0 2px rgba(201,168,76,0.28),0 2px 12px rgba(201,168,76,0.28)' }}>
                    {getInitial(user.name)}
                  </div>
                  <div className="nav-desktop" style={{ display:'flex',flexDirection:'column',alignItems:'flex-start',lineHeight:1.15 }}>
                    <span style={{ fontSize:'0.78rem',color:'rgba(255,255,255,0.9)',fontWeight:600,maxWidth:78,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{user.name.split(' ')[0]}</span>
                    <span style={{ fontSize:'0.6rem',color:'rgba(201,168,76,0.55)',textTransform:'capitalize' }}>{user.role}</span>
                  </div>
                  <svg width="9" height="9" viewBox="0 0 10 10" style={{ color:'rgba(255,255,255,0.32)',transition:'transform 0.22s',transform:userDrop?'rotate(180deg)':'none',flexShrink:0 }}>
                    <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {userDrop && (
                  <div style={{
                    position:'absolute',top:'calc(100% + 10px)',right:0,minWidth:214,zIndex:200,
                    background:'rgba(5,12,7,0.99)',backdropFilter:'blur(28px)',
                    border:'1px solid rgba(201,168,76,0.15)',borderRadius:18,overflow:'hidden',
                    boxShadow:'0 24px 64px rgba(0,0,0,0.65),0 0 0 1px rgba(255,255,255,0.03)',
                    animation:'dropIn 0.18s cubic-bezier(0.22,1,0.36,1)',
                  }}>
                    {/* Header */}
                    <div style={{ padding:'1rem 1.1rem 0.85rem',background:'linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'0.7rem' }}>
                      <div style={{ width:38,height:38,borderRadius:'50%',background:'linear-gradient(135deg,#E2B84E,#9A7210)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',fontSize:'0.9rem',boxShadow:'0 0 0 3px rgba(201,168,76,0.2)' }}>{getInitial(user.name)}</div>
                      <div>
                        <div style={{ fontSize:'0.87rem',color:'#fff',fontWeight:700 }}>{user.name}</div>
                        <div style={{ fontSize:'0.67rem',color:'rgba(201,168,76,0.6)',textTransform:'capitalize',display:'flex',alignItems:'center',gap:'0.3rem' }}>
                          <span style={{ width:5,height:5,borderRadius:'50%',background:'#52b788',display:'inline-block' }}/>
                          {user.role}
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    {[
                      { icon:'📊', label:'Dashboard', sub:'Your progress',    to:dashPath },
                      { icon:'🎯', label:'My Hifz',   sub:'Sessions & streak', to:'/hifz'  },
                      { icon:'📖', label:'Quran',     sub:'Read & listen',    to:'/quran'  },
                    ].map(item => (
                      <Link key={item.to} to={item.to} style={{
                        display:'flex',alignItems:'center',gap:'0.72rem',padding:'0.65rem 1.1rem',
                        textDecoration:'none',color:'rgba(255,255,255,0.7)',fontSize:'0.84rem',
                        transition:'all 0.15s',borderBottom:'1px solid rgba(255,255,255,0.04)',
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.color='#fff';e.currentTarget.style.paddingLeft='1.3rem';}}
                      onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,255,255,0.7)';e.currentTarget.style.paddingLeft='1.1rem';}}
                      >
                        <div style={{ width:30,height:30,borderRadius:8,background:'rgba(255,255,255,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.84rem',flexShrink:0 }}>{item.icon}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:600,lineHeight:1.2 }}>{item.label}</div>
                          <div style={{ fontSize:'0.67rem',color:'rgba(255,255,255,0.3)',marginTop:1 }}>{item.sub}</div>
                        </div>
                        <svg width="7" height="7" viewBox="0 0 8 8" style={{ color:'rgba(255,255,255,0.2)',flexShrink:0 }}>
                          <path d="M1 1L7 4L1 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    ))}

                    {/* Sign out */}
                    <button onClick={() => { logout(); navigate('/'); }} style={{
                      display:'flex',alignItems:'center',gap:'0.72rem',width:'100%',
                      padding:'0.7rem 1.1rem',background:'transparent',border:'none',
                      color:'rgba(255,100,100,0.75)',fontSize:'0.84rem',cursor:'pointer',textAlign:'left',transition:'all 0.15s',
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,50,50,0.07)';e.currentTarget.style.color='rgba(255,130,130,1)';e.currentTarget.style.paddingLeft='1.3rem';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,100,100,0.75)';e.currentTarget.style.paddingLeft='1.1rem';}}
                    >
                      <div style={{ width:30,height:30,borderRadius:8,background:'rgba(255,50,50,0.07)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.84rem',flexShrink:0 }}>🚪</div>
                      <span style={{ fontWeight:600 }}>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Auth buttons ── */
              <div className="nav-desktop" style={{ display:'flex',gap:'0.45rem',alignItems:'center' }}>
                <Link to="/login" style={{
                  padding:'0.44rem 1.1rem',
                  color:'rgba(255,255,255,0.65)',fontSize:'0.82rem',fontWeight:500,
                  border:'1px solid rgba(255,255,255,0.12)',borderRadius:99,textDecoration:'none',
                  fontFamily:'var(--font-heading)',letterSpacing:'0.04em',transition:'all 0.2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='rgba(255,255,255,0.32)';e.currentTarget.style.background='rgba(255,255,255,0.06)';}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.65)';e.currentTarget.style.borderColor='rgba(255,255,255,0.12)';e.currentTarget.style.background='transparent';}}
                >Login</Link>

                <Link to="/register" style={{
                  padding:'0.44rem 1.2rem',
                  background:'linear-gradient(135deg,#D4A843 0%,#B8960C 100%)',
                  color:'#07110A',fontSize:'0.82rem',fontWeight:800,borderRadius:99,
                  textDecoration:'none',fontFamily:'var(--font-heading)',letterSpacing:'0.04em',
                  boxShadow:'0 2px 16px rgba(201,168,76,0.48),0 1px 0 rgba(255,255,255,0.28) inset',
                  transition:'all 0.22s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 6px 28px rgba(201,168,76,0.65)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 16px rgba(201,168,76,0.48),0 1px 0 rgba(255,255,255,0.28) inset';}}
                >Get Started</Link>
              </div>
            )}

            {/* ── Hamburger ── */}
            <button onClick={() => setMobileOpen(p => !p)} className="mob-toggle" style={{
              display:'none',width:38,height:38,borderRadius:9,
              background: mobileOpen ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.05)',
              border:`1px solid ${mobileOpen ? 'rgba(201,168,76,0.38)' : 'rgba(255,255,255,0.1)'}`,
              color: mobileOpen ? '#E9C46A' : 'rgba(255,255,255,0.7)',
              cursor:'pointer',transition:'all 0.2s',
              alignItems:'center',justifyContent:'center',flexShrink:0,
            }}>
              {mobileOpen
                ? <svg width="13" height="13" viewBox="0 0 14 14"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                : <svg width="16" height="11" viewBox="0 0 16 11"><path d="M0 1h16M0 5.5h12M0 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              }
            </button>
          </div>
        </div>

        {/* ══ MOBILE MENU ══ */}
        {mobileOpen && (
          <div style={{
            background:'rgba(4,10,6,0.99)',backdropFilter:'blur(28px)',
            borderTop:'1px solid rgba(201,168,76,0.1)',padding:'0.75rem 1.5rem 1.5rem',
            animation:'slideDown 0.22s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{ display:'flex',flexDirection:'column',gap:'0.22rem',marginBottom:'1rem' }}>
              {links.map(({ to, label, ar, icon }) => {
                const active = isActive(to);
                return (
                  <Link key={to} to={to} style={{
                    display:'flex',alignItems:'center',justifyContent:'space-between',
                    padding:'0.78rem 0.9rem',textDecoration:'none',borderRadius:11,
                    color: active ? '#0A1810' : 'rgba(255,255,255,0.78)',
                    fontWeight: active ? 700 : 400,fontSize:'0.94rem',
                    fontFamily: active ? 'var(--font-heading)' : 'inherit',
                    letterSpacing: active ? '0.04em' : 0,
                    background: active ? 'linear-gradient(135deg,#D4A843,#C9A84C)' : 'rgba(255,255,255,0.03)',
                    border:`1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: active ? '0 2px 16px rgba(201,168,76,0.38)' : 'none',
                    transition:'all 0.18s',
                  }}>
                    <span style={{ display:'flex',alignItems:'center',gap:'0.65rem' }}>
                      <span style={{ fontSize:'1rem',opacity:active?1:0.68 }}>{icon}</span>
                      {label}
                    </span>
                    <span style={{ fontFamily:'var(--font-arabic)',fontSize:'0.85rem',opacity:active?0.55:0.3 }}>{ar}</span>
                  </Link>
                );
              })}
            </div>

            <div style={{ height:1,background:'rgba(255,255,255,0.06)',margin:'0.5rem 0 1rem' }}/>

            {user ? (
              <div>
                <div style={{ display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.62rem 0.9rem',background:'rgba(201,168,76,0.06)',borderRadius:11,marginBottom:'0.7rem',border:'1px solid rgba(201,168,76,0.12)' }}>
                  <div style={{ width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#E2B84E,#9A7210)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'#fff',flexShrink:0,boxShadow:'0 0 0 2px rgba(201,168,76,0.22)' }}>{getInitial(user.name)}</div>
                  <div>
                    <div style={{ fontSize:'0.88rem',color:'#fff',fontWeight:600 }}>{user.name}</div>
                    <div style={{ fontSize:'0.67rem',color:'rgba(201,168,76,0.55)',textTransform:'capitalize' }}>{user.role}</div>
                  </div>
                </div>
                <button onClick={() => { logout(); navigate('/'); }} style={{ width:'100%',padding:'0.62rem 1rem',background:'rgba(255,50,50,0.07)',border:'1px solid rgba(255,50,50,0.15)',color:'rgba(255,120,120,0.9)',borderRadius:11,cursor:'pointer',fontSize:'0.88rem',fontWeight:600 }}>🚪 Sign Out</button>
              </div>
            ) : (
              <div style={{ display:'flex',gap:'0.65rem' }}>
                <Link to="/login"    style={{ flex:1,padding:'0.65rem',textAlign:'center',border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.8)',borderRadius:99,fontSize:'0.9rem',textDecoration:'none',fontWeight:500 }}>Login</Link>
                <Link to="/register" style={{ flex:1,padding:'0.65rem',textAlign:'center',background:'linear-gradient(135deg,#D4A843,#C9A84C)',color:'#07110A',borderRadius:99,fontSize:'0.9rem',fontWeight:800,textDecoration:'none' }}>Get Started</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 720px) {
          .mob-toggle  { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
        @media (min-width: 721px) {
          .mob-toggle  { display: none !important; }
          .nav-desktop { display: flex !important; }
        }
        @keyframes dropIn {
          from { opacity:0; transform:translateY(-10px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </>
  );
}
