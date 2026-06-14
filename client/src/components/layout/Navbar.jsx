import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';

const NAV_LINKS = (user, dashPath) => [
  { to: '/quran',   label: 'Quran',     ar: 'القرآن',  icon: '📖' },
  { to: '/learn',   label: 'Learn',     ar: 'تعلّم',   icon: '🎓' },
  ...(user ? [
    { to: '/hifz',   label: 'Hifz',      ar: 'الحفظ',  icon: '🎯' },
    { to: dashPath,  label: 'Dashboard', ar: 'لوحتي',  icon: '📊' },
  ] : []),
];

function getInitial(name = '') { return name.charAt(0).toUpperCase(); }

export default function Navbar() {
  const { user, logout } = useAuth();
  const { lang, toggleLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userDrop, setUserDrop]       = useState(false);
  const dropRef  = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserDrop(false); }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!userDrop) return;
    const close = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserDrop(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [userDrop]);

  // Close mobile on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const close = e => { if (mobileRef.current && !mobileRef.current.contains(e.target)) setMobileOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [mobileOpen]);

  const isActive  = p => location.pathname === p || location.pathname.startsWith(p + '/');
  const dashPath  = user?.role === 'teacher' ? '/teacher' : user?.role === 'parent' ? '/parent' : '/dashboard';
  const links     = NAV_LINKS(user, dashPath);

  return (
    <>
      {/* ── Top shimmer line ── */}
      <div style={{
        height: 2,
        background: 'linear-gradient(90deg, transparent 0%, #8B6914 15%, #C9A84C 35%, #F5DFA0 50%, #C9A84C 65%, #8B6914 85%, transparent 100%)',
        position: 'relative', zIndex: 101,
      }} />

      <nav ref={mobileRef} style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled
          ? 'rgba(5,11,7,0.97)'
          : 'rgba(7,16,10,0.93)',
        backdropFilter: 'blur(28px) saturate(1.9)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.9)',
        borderBottom: '1px solid rgba(201,168,76,0.14)',
        boxShadow: scrolled
          ? '0 8px 48px rgba(0,0,0,0.55), 0 1px 0 rgba(201,168,76,0.12) inset'
          : '0 2px 24px rgba(0,0,0,0.3)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          padding: '0 1.75rem',
          display: 'flex', alignItems: 'center',
          height: 68, gap: '0.5rem',
        }}>

          {/* ══════════════════════════════════ LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginRight: '2rem', flexShrink: 0 }}>
            {/* Star emblem */}
            <div style={{
              width: 42, height: 42, flexShrink: 0, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 42 42" width="42" height="42" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(201,168,76,0.25)" />
                    <stop offset="100%" stopColor="rgba(201,168,76,0.07)" />
                  </linearGradient>
                </defs>
                <polygon
                  points="21,2 25,13 37,13 28,20 31,31 21,25 11,31 14,20 5,13 17,13"
                  fill="url(#logoGrad)" stroke="rgba(201,168,76,0.55)" strokeWidth="0.8"
                />
                <circle cx="21" cy="21" r="14" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="0.6" />
              </svg>
              <span style={{
                fontFamily: 'var(--font-arabic)', fontSize: '1.2rem',
                color: '#E9C46A', position: 'relative', zIndex: 1,
                filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.5))',
              }}>ن</span>
            </div>

            <div>
              <div style={{
                fontFamily: 'var(--font-arabic)', fontSize: '1.2rem',
                color: '#E9C46A', lineHeight: 1.15, direction: 'rtl',
                filter: 'drop-shadow(0 0 10px rgba(201,168,76,0.3))',
              }}>نور القرآن</div>
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: '0.48rem',
                color: 'rgba(201,168,76,0.38)', letterSpacing: '0.28em',
                textTransform: 'uppercase', marginTop: 2,
              }}>NOOR UL QURAN</div>
            </div>
          </Link>

          {/* ══════════════════════════════════ NAV LINKS */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flex: 1 }}>
            {links.map(({ to, label, ar, icon }) => {
              const active = isActive(to);
              return (
                <Link key={to} to={to} style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.48rem 1.05rem',
                  borderRadius: 10,
                  textDecoration: 'none',
                  color: active ? '#0A1810' : 'rgba(255,255,255,0.68)',
                  fontWeight: active ? 700 : 450,
                  fontSize: '0.87rem',
                  letterSpacing: '0.01em',
                  background: active
                    ? 'linear-gradient(135deg, #D4A843 0%, #C9A84C 100%)'
                    : 'transparent',
                  boxShadow: active ? '0 2px 16px rgba(201,168,76,0.45), 0 1px 0 rgba(255,255,255,0.2) inset' : 'none',
                  transition: 'all 0.22s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={e => {
                  if (active) return;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  if (active) return;
                  e.currentTarget.style.color = 'rgba(255,255,255,0.68)';
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = '';
                }}
                >
                  <span style={{ fontSize: '0.85rem', opacity: active ? 1 : 0.75 }}>{icon}</span>
                  <span>{label}</span>
                  <span style={{
                    fontFamily: 'var(--font-arabic)', fontSize: '0.72rem',
                    opacity: active ? 0.6 : 0.35, lineHeight: 1,
                  }}>{ar}</span>
                </Link>
              );
            })}
          </div>

          {/* ══════════════════════════════════ RIGHT ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>

            {/* Lang pill */}
            <button onClick={toggleLang} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.55)',
              padding: '0.38rem 0.85rem',
              borderRadius: 99, fontSize: '0.78rem',
              cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: lang === 'ur' ? 'var(--font-arabic)' : 'inherit',
              letterSpacing: '0.04em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
              e.currentTarget.style.color = '#E9C46A';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
            }}
            >{lang === 'en' ? 'اردو' : 'EN'}</button>

            {/* ── Divider ── */}
            <div className="nav-desktop" style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)' }} />

            {user ? (
              /* ── User bubble ── */
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button onClick={() => setUserDrop(p => !p)} style={{
                  display: 'flex', alignItems: 'center', gap: '0.55rem',
                  background: userDrop
                    ? 'rgba(201,168,76,0.12)'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${userDrop ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 99, padding: '0.3rem 0.85rem 0.3rem 0.3rem',
                  cursor: 'pointer', transition: 'all 0.22s',
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #E2B84E 0%, #9A7210 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: '0.82rem',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: '0 0 0 2px rgba(201,168,76,0.25), 0 2px 10px rgba(201,168,76,0.25)',
                  }}>
                    {getInitial(user.name)}
                  </div>

                  <div className="nav-desktop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: 'rgba(201,168,76,0.55)', textTransform: 'capitalize' }}>{user.role}</span>
                  </div>

                  <svg width="10" height="10" viewBox="0 0 10 10" style={{ color: 'rgba(255,255,255,0.35)', transition: 'transform 0.22s', transform: userDrop ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                    <path d="M1 3 L5 7 L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* ── Dropdown ── */}
                {userDrop && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                    minWidth: 210, zIndex: 200,
                    background: 'rgba(6,14,9,0.98)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(201,168,76,0.16)',
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
                    animation: 'dropIn 0.18s cubic-bezier(0.22,1,0.36,1)',
                  }}>
                    {/* Header */}
                    <div style={{
                      padding: '1rem 1.1rem 0.85rem',
                      background: 'linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.02))',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', gap: '0.7rem',
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #E2B84E, #9A7210)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, color: '#fff', fontSize: '0.9rem',
                        boxShadow: '0 0 0 3px rgba(201,168,76,0.2)',
                      }}>
                        {getInitial(user.name)}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 700 }}>{user.name}</div>
                        <div style={{
                          fontSize: '0.68rem', color: 'rgba(201,168,76,0.6)',
                          textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '0.3rem',
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#52b788', display: 'inline-block' }} />
                          {user.role}
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    {[
                      { icon: '📊', label: 'Dashboard', sub: 'Your progress', to: dashPath },
                      { icon: '🎯', label: 'My Hifz',   sub: 'Sessions & streak', to: '/hifz' },
                      { icon: '📖', label: 'Quran',     sub: 'Read & listen', to: '/quran' },
                    ].map(item => (
                      <Link key={item.to} to={item.to} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.65rem 1.1rem', textDecoration: 'none',
                        color: 'rgba(255,255,255,0.72)', fontSize: '0.85rem',
                        transition: 'all 0.15s', borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.paddingLeft = '1.35rem';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.72)';
                        e.currentTarget.style.paddingLeft = '1.1rem';
                      }}
                      >
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontWeight: 600, lineHeight: 1.2 }}>{item.label}</div>
                          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{item.sub}</div>
                        </div>
                        <svg width="8" height="8" viewBox="0 0 8 8" style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                          <path d="M1 1 L7 4 L1 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}

                    {/* Sign out */}
                    <button onClick={() => { logout(); navigate('/'); }} style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      width: '100%', padding: '0.7rem 1.1rem',
                      background: 'transparent', border: 'none',
                      color: 'rgba(255,100,100,0.75)', fontSize: '0.85rem',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,50,50,0.08)';
                      e.currentTarget.style.color = 'rgba(255,130,130,1)';
                      e.currentTarget.style.paddingLeft = '1.35rem';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,100,100,0.75)';
                      e.currentTarget.style.paddingLeft = '1.1rem';
                    }}
                    >
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,50,50,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0 }}>🚪</div>
                      <span style={{ fontWeight: 600 }}>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

            ) : (
              /* ── Auth buttons ── */
              <div className="nav-desktop" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Link to="/login" style={{
                  padding: '0.44rem 1.1rem',
                  color: 'rgba(255,255,255,0.68)', fontSize: '0.85rem', fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 99, textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.68)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.background = 'transparent'; }}
                >Login</Link>

                <Link to="/register" style={{
                  padding: '0.44rem 1.25rem',
                  background: 'linear-gradient(135deg, #D4A843 0%, #B8960C 100%)',
                  color: '#07110A', fontSize: '0.85rem', fontWeight: 800,
                  borderRadius: 99, textDecoration: 'none',
                  fontFamily: 'var(--font-heading)', letterSpacing: '0.03em',
                  boxShadow: '0 2px 14px rgba(201,168,76,0.45), 0 1px 0 rgba(255,255,255,0.25) inset',
                  transition: 'all 0.22s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(201,168,76,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 14px rgba(201,168,76,0.45), 0 1px 0 rgba(255,255,255,0.25) inset'; }}
                >Get Started</Link>
              </div>
            )}

            {/* ── Hamburger ── */}
            <button onClick={() => setMobileOpen(p => !p)} className="mob-toggle" style={{
              display: 'none',
              width: 38, height: 38, borderRadius: 9,
              background: mobileOpen ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${mobileOpen ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.1)'}`,
              color: mobileOpen ? '#E9C46A' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', transition: 'all 0.2s',
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {mobileOpen
                ? <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                : <svg width="16" height="12" viewBox="0 0 16 12"><path d="M0 1h16M0 6h16M0 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              }
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════ MOBILE MENU */}
        {mobileOpen && (
          <div style={{
            background: 'rgba(5,12,7,0.99)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(201,168,76,0.12)',
            padding: '0.75rem 1.5rem 1.5rem',
            animation: 'slideDown 0.22s cubic-bezier(0.22,1,0.36,1)',
          }}>
            {/* Nav items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' }}>
              {links.map(({ to, label, ar, icon }) => {
                const active = isActive(to);
                return (
                  <Link key={to} to={to} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.75rem 0.9rem', textDecoration: 'none', borderRadius: 10,
                    color: active ? '#0A1810' : 'rgba(255,255,255,0.78)',
                    fontWeight: active ? 700 : 400, fontSize: '0.95rem',
                    background: active ? 'linear-gradient(135deg, #D4A843, #C9A84C)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: active ? '0 2px 14px rgba(201,168,76,0.35)' : 'none',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '1rem', opacity: active ? 1 : 0.7 }}>{icon}</span>
                      {label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', opacity: active ? 0.6 : 0.35 }}>{ar}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0.5rem 0 1rem' }} />

            {/* Auth area */}
            {user ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.9rem', background: 'rgba(201,168,76,0.06)', borderRadius: 10, marginBottom: '0.75rem', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#E2B84E,#9A7210)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
                    {getInitial(user.name)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(201,168,76,0.55)', textTransform: 'capitalize' }}>{user.role}</div>
                  </div>
                </div>
                <button onClick={() => { logout(); navigate('/'); }} style={{
                  width: '100%', padding: '0.6rem 1rem',
                  background: 'rgba(255,50,50,0.07)', border: '1px solid rgba(255,50,50,0.15)',
                  color: 'rgba(255,120,120,0.9)', borderRadius: 10, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                }}>🚪 Sign Out</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Link to="/login" style={{ flex: 1, padding: '0.65rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.8)', borderRadius: 99, fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>
                  Login
                </Link>
                <Link to="/register" style={{ flex: 1, padding: '0.65rem', textAlign: 'center', background: 'linear-gradient(135deg,#D4A843,#C9A84C)', color: '#07110A', borderRadius: 99, fontSize: '0.9rem', fontWeight: 800, textDecoration: 'none' }}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 720px) {
          .mob-toggle { display: flex !important; }
          .nav-desktop { display: none !important; }
        }
        @media (min-width: 721px) {
          .mob-toggle { display: none !important; }
          .nav-desktop { display: flex !important; }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
