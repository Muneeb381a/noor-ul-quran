import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

const NAV_LINKS = (user, dashPath) => [
  { to: '/quran',   label: 'Quran'     },
  { to: '/learn',   label: 'Learn'     },
  ...(user ? [
    { to: '/hifz',    label: 'Hifz'      },
    { to: dashPath,   label: 'Dashboard' },
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
  const navRef    = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
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
    const close = e => { if (navRef.current && !navRef.current.contains(e.target)) setMobileOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [mobileOpen]);

  const isActive = p => location.pathname === p || location.pathname.startsWith(p + '/');
  const dashPath = user?.role === 'teacher' ? '/teacher' : user?.role === 'parent' ? '/parent' : '/dashboard';
  const links    = NAV_LINKS(user, dashPath);

  return (
    <nav ref={navRef} style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#0B1D11',
      borderBottom: scrolled ? '1px solid rgba(245,158,11,0.22)' : '1px solid rgba(255,255,255,0.06)',
      boxShadow: scrolled ? '0 2px 40px rgba(0,0,0,0.55)' : 'none',
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', height: 62, gap: '1.5rem' }}>

        {/* ── Logo ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(245,158,11,0.25) inset, 0 2px 10px rgba(245,158,11,0.3)',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.2rem', color: '#0B1D11', lineHeight: 1, fontWeight: 700 }}>ن</span>
          </div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: '#F5F0E6', letterSpacing: '0.01em' }}>NoorulQuran</div>
            <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.65rem', color: 'rgba(245,158,11,0.5)', letterSpacing: '0.02em' }}>نور القرآن</div>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div className="nq-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', flex: 1 }}>
          {links.map(({ to, label }) => {
            const active = isActive(to);
            return (
              <Link key={to} to={to} style={{
                padding: '0.45rem 1rem',
                borderRadius: 7,
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: active ? 600 : 400,
                color: active ? '#FCD34D' : 'rgba(255,255,255,0.55)',
                background: active ? 'rgba(245,158,11,0.1)' : 'transparent',
                borderBottom: `2px solid ${active ? '#F59E0B' : 'transparent'}`,
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.background = 'transparent'; }}}
              >{label}</Link>
            );
          })}
        </div>

        {/* ── Right Actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>

          {/* Lang toggle */}
          <button onClick={toggleLang} style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)',
            padding: '0.32rem 0.7rem',
            borderRadius: 6, fontSize: '0.78rem', cursor: 'pointer',
            transition: 'all 0.18s',
            fontFamily: lang === 'ur' ? 'var(--font-arabic)' : 'var(--font-body)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.color = '#FCD34D'; e.currentTarget.style.background = 'rgba(245,158,11,0.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'transparent'; }}
          >{lang === 'en' ? 'اردو' : 'EN'}</button>

          {user ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button onClick={() => setUserDrop(p => !p)} style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                background: userDrop ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${userDrop ? 'rgba(245,158,11,0.38)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 8, padding: '0.3rem 0.65rem 0.3rem 0.35rem',
                cursor: 'pointer', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { if (!userDrop) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}}
              onMouseLeave={e => { if (!userDrop) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0B1D11', fontWeight: 800, fontSize: '0.75rem',
                }}>{getInitial(user.name)}</div>
                <span className="nq-nav-desktop" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name.split(' ')[0]}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" style={{ color: 'rgba(255,255,255,0.35)', transition: 'transform 0.18s', transform: userDrop ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                  <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {userDrop && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0, minWidth: 210, zIndex: 200,
                  background: '#0B1D11',
                  border: '1px solid rgba(245,158,11,0.18)',
                  borderRadius: 14, overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
                  animation: 'nqDropIn 0.16s ease',
                }}>
                  <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(245,158,11,0.04)' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#F59E0B,#D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0B1D11', fontSize: '0.85rem', flexShrink: 0 }}>{getInitial(user.name)}</div>
                    <div>
                      <div style={{ fontSize: '0.84rem', color: '#fff', fontWeight: 600, lineHeight: 1.2 }}>{user.name}</div>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(245,158,11,0.55)', textTransform: 'capitalize', marginTop: 1 }}>{user.role}</div>
                    </div>
                  </div>
                  {[
                    { to: dashPath, label: 'Dashboard' },
                    { to: '/hifz',  label: 'My Hifz'   },
                    { to: '/quran', label: 'Read Quran' },
                  ].map(item => (
                    <Link key={item.to} to={item.to} style={{
                      display: 'block', padding: '0.62rem 1rem',
                      color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                      fontSize: '0.84rem', transition: 'all 0.14s',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                    >{item.label}</Link>
                  ))}
                  <button onClick={() => { logout(); navigate('/'); setUserDrop(false); }} style={{
                    display: 'block', width: '100%', padding: '0.62rem 1rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(240,80,80,0.75)', fontSize: '0.84rem', textAlign: 'left',
                    transition: 'all 0.14s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,50,50,0.07)'; e.currentTarget.style.color = '#f87171'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(240,80,80,0.75)'; }}
                  >Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="nq-nav-desktop" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <Link to="/login" style={{
                padding: '0.38rem 0.95rem',
                color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7,
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >Sign in</Link>

              <Link to="/register" style={{
                padding: '0.38rem 1.1rem',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#0B1D11', fontSize: '0.85rem', fontWeight: 700,
                borderRadius: 7, textDecoration: 'none',
                boxShadow: '0 1px 12px rgba(245,158,11,0.35)',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 12px rgba(245,158,11,0.35)'; }}
              >Get Started</Link>
            </div>
          )}

          {/* ── Hamburger ── */}
          <button onClick={() => setMobileOpen(p => !p)} className="mob-toggle" style={{
            display: 'none', width: 36, height: 36, borderRadius: 8,
            background: mobileOpen ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${mobileOpen ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.1)'}`,
            color: mobileOpen ? '#FCD34D' : 'rgba(255,255,255,0.65)',
            cursor: 'pointer', transition: 'all 0.18s',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {mobileOpen
              ? <svg width="13" height="13" viewBox="0 0 14 14"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              : <svg width="16" height="11" viewBox="0 0 16 11"><path d="M0 1h16M0 5.5h12M0 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div style={{
          background: '#0B1D11',
          borderTop: '1px solid rgba(245,158,11,0.1)',
          padding: '0.75rem 1.25rem 1.25rem',
          animation: 'nqSlideDown 0.2s ease',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginBottom: '1rem' }}>
            {links.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                display: 'block', padding: '0.7rem 0.9rem',
                color: isActive(to) ? '#FCD34D' : 'rgba(255,255,255,0.65)',
                textDecoration: 'none', fontSize: '0.92rem',
                fontWeight: isActive(to) ? 600 : 400,
                borderRadius: 8, background: isActive(to) ? 'rgba(245,158,11,0.08)' : 'transparent',
              }}>{label}</Link>
            ))}
          </div>
          {!user && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" style={{ flex: 1, textAlign: 'center', padding: '0.62rem', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.875rem' }}>Sign in</Link>
              <Link to="/register" style={{ flex: 1, textAlign: 'center', padding: '0.62rem', background: 'linear-gradient(135deg,#F59E0B,#D97706)', borderRadius: 8, color: '#0B1D11', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700 }}>Get Started</Link>
            </div>
          )}
          {user && (
            <button onClick={() => { logout(); navigate('/'); }} style={{ width: '100%', padding: '0.62rem', background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.18)', borderRadius: 8, color: '#f87171', fontSize: '0.875rem', cursor: 'pointer', marginTop: '0.5rem' }}>
              Sign Out
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .nq-nav-desktop { display: none !important; }
          .mob-toggle { display: flex !important; }
        }
        @keyframes nqDropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes nqSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
