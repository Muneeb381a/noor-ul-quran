import { useState } from 'react';
import { Link } from 'react-router-dom';
import namazData from '../../data/namaz.json';

const PRAYER_COLORS = {
  fajr:    { color: '#FF8A65', grad: 'linear-gradient(135deg,#3D1C08,#7B3A0E)' },
  dhuhr:   { color: '#FFD54F', grad: 'linear-gradient(135deg,#2A1F00,#5C4200)' },
  asr:     { color: '#64B5F6', grad: 'linear-gradient(135deg,#020D22,#0D2857)' },
  maghrib: { color: '#F48FB1', grad: 'linear-gradient(135deg,#200010,#4A0626)' },
  isha:    { color: '#B39DDB', grad: 'linear-gradient(135deg,#070014,#1A0B40)' },
};

const SECTION_TABS = ['Overview', 'Wudu', 'How to Pray', 'After Prayer'];

function StepCard({ step, color, isActive, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: isActive ? `${color}0D` : 'rgba(28,25,23,0.04)',
      border: `1.5px solid ${isActive ? `${color}50` : 'rgba(28,25,23,0.09)'}`,
      borderRadius: 16, padding: '1.1rem 1.25rem',
      cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.6rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: isActive ? color : 'rgba(28,25,23,0.09)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.78rem', fontWeight: 800,
          color: isActive ? '#fff' : '#78716C',
        }}>{step.step}</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: isActive ? color : '#1C1917' }}>{step.name}</p>
          {step.position && <p style={{ margin: '0.1rem 0 0', fontSize: '0.68rem', color: '#A8A29E', fontStyle: 'italic' }}>{step.position}</p>}
          {isActive && (
            <div style={{ marginTop: '0.85rem' }}>
              {step.arabic && (
                <div style={{ background: `${color}0A`, borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '0.65rem', textAlign: 'right', border: `1px solid ${color}20` }}>
                  <p style={{ fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif', fontSize: 'clamp(1.05rem,2.5vw,1.3rem)', lineHeight: 2.2, color: '#1C1917', margin: 0, direction: 'rtl' }}>{step.arabic}</p>
                </div>
              )}
              {step.transliteration && (
                <p style={{ fontStyle: 'italic', color: '#A8A29E', fontSize: '0.8rem', lineHeight: 1.7, margin: '0 0 0.5rem' }}>{step.transliteration}</p>
              )}
              {step.translation && (
                <div style={{ background: 'rgba(46,125,50,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', borderLeft: '3px solid #22C55E', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#44403C', lineHeight: 1.65 }}>
                    <span style={{ fontWeight: 700, color: '#22C55E', marginRight: 4 }}>EN:</span>{step.translation}
                  </p>
                </div>
              )}
              {step.urdu && (
                <div style={{ background: 'rgba(106,27,154,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', borderRight: '3px solid #B39DDB', textAlign: 'right', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: '#44403C', lineHeight: 3.4, fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl', wordSpacing: '3px' }}>
                    <span style={{ fontWeight: 700, color: '#B39DDB', marginLeft: 4 }}>اردو:</span>{step.urdu}
                  </p>
                </div>
              )}
              {step.desc && (
                <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: 8, padding: '0.5rem 0.75rem', borderLeft: `3px solid rgba(245,158,11,0.5)` }}>
                  <p style={{ margin: 0, fontSize: '0.79rem', color: '#57534E', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <span style={{ color: isActive ? color : '#A8A29E', fontSize: '0.9rem', flexShrink: 0, marginTop: '0.1rem' }}>{isActive ? '▲' : '▼'}</span>
      </div>
    </div>
  );
}

export default function NamazPage() {
  const [activeSection, setActiveSection] = useState('Overview');
  const [activePrayer, setActivePrayer] = useState('fajr');
  const [activeStep, setActiveStep] = useState(null);
  const [activeWuduStep, setActiveWuduStep] = useState(null);
  const [activeAfterStep, setActiveAfterStep] = useState(null);

  const prayer = namazData.prayers.find(p => p.id === activePrayer);
  const pColor = PRAYER_COLORS[activePrayer]?.color || '#22C55E';
  const pGrad  = PRAYER_COLORS[activePrayer]?.grad  || 'linear-gradient(135deg,#052e16,#14532D)';

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg,#052e16,#14532D,#14532D)', padding: '3.5rem 1.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <Link to="/learn" style={{ color: '#A8A29E', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.25rem' }}>← Learn Center</Link>
          <p style={{ color: 'rgba(245,158,11,0.75)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>🕌 الصلاة</p>
          <h1 style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', margin: '0 0 0.5rem' }}>كيفية الصلاة</h1>
          <p style={{ fontFamily: '"Noto Nastaliq Urdu",serif', fontSize: '1.1rem', color: 'rgba(245,158,11,0.7)', direction: 'rtl', margin: '0 0 0.75rem', lineHeight: 3.4, wordSpacing: '3px' }}>نماز پڑھنے کا طریقہ</p>
          <p style={{ color: '#78716C', fontSize: '0.9rem', maxWidth: 560 }}>{namazData.intro}</p>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ position: 'sticky', top: 68, zIndex: 10, background: 'rgba(255,251,235,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(245,158,11,0.12)', padding: '0.65rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {SECTION_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveSection(tab)} style={{
              padding: '0.45rem 1rem', borderRadius: 99, border: '1px solid',
              borderColor: activeSection === tab ? 'rgba(245,158,11,0.5)' : 'rgba(28,25,23,0.1)',
              background: activeSection === tab ? 'linear-gradient(135deg,#F59E0B,#FCD34D)' : 'rgba(28,25,23,0.04)',
              color: activeSection === tab ? '#FFFBEB' : '#78716C',
              fontSize: '0.78rem', fontWeight: activeSection === tab ? 700 : 500,
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.18s',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        {/* OVERVIEW */}
        {activeSection === 'Overview' && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.1rem', color: 'rgba(245,158,11,0.85)', marginBottom: '1.5rem' }}>5 Daily Prayers — الصلوات الخمس</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {namazData.prayers.map(p => {
                const pc = PRAYER_COLORS[p.id];
                return (
                  <div key={p.id} style={{ background: '#ffffff', borderRadius: 18, border: '1px solid rgba(28,25,23,0.09)', overflow: 'hidden' }}>
                    <div style={{ background: pc.grad, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
                        <div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <h3 style={{ fontFamily: '"Playfair Display",serif', color: '#fff', margin: 0, fontSize: '1.1rem' }}>{p.name}</h3>
                            <span style={{ fontFamily: '"Noto Naskh Arabic",serif', color: '#57534E', fontSize: '1rem', direction: 'rtl' }}>{p.arabic}</span>
                          </div>
                          <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: '#78716C' }}>{p.time}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {p.rakaat.sunnah_before && <span style={{ fontSize: '0.65rem', background: 'rgba(28,25,23,0.1)', border: '1px solid rgba(28,25,23,0.14)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#44403C', fontWeight: 600 }}>{p.rakaat.sunnah_before} Sunnah (before)</span>}
                        <span style={{ fontSize: '0.65rem', background: 'rgba(245,158,11,0.25)', border: '1px solid rgba(245,158,11,0.5)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#F59E0B', fontWeight: 700 }}>{p.rakaat.fardh} Fardh</span>
                        {p.rakaat.sunnah_after && <span style={{ fontSize: '0.65rem', background: 'rgba(28,25,23,0.1)', border: '1px solid rgba(28,25,23,0.14)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#44403C', fontWeight: 600 }}>{p.rakaat.sunnah_after} Sunnah (after)</span>}
                        {p.rakaat.witr && <span style={{ fontSize: '0.65rem', background: 'rgba(28,25,23,0.1)', border: '1px solid rgba(28,25,23,0.14)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#44403C', fontWeight: 600 }}>{p.rakaat.witr} Witr</span>}
                        <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#fff', fontWeight: 800 }}>Total: {p.rakaat.total}</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem 1.5rem' }}>
                      <p style={{ margin: '0 0 0.6rem', fontSize: '0.84rem', color: '#57534E', lineHeight: 1.7 }}>{p.desc}</p>
                      <div style={{ background: `${pc.color}12`, borderRadius: 10, padding: '0.55rem 0.85rem', borderLeft: `3px solid ${pc.color}60` }}>
                        <p style={{ margin: 0, fontSize: '0.79rem', color: pc.color, fontWeight: 600, lineHeight: 1.6 }}>✨ {p.virtue}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* WUDU */}
        {activeSection === 'Wudu' && (
          <div>
            <div style={{ background: 'linear-gradient(135deg,#020D22,#0D2857)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(100,181,246,0.25)' }}>
              <h2 style={{ fontFamily: '"Playfair Display",serif', color: '#fff', margin: '0 0 0.35rem', fontSize: '1.15rem' }}>Wudu — Ablution</h2>
              <p style={{ fontFamily: '"Noto Naskh Arabic",serif', color: '#78716C', fontSize: '1.1rem', margin: '0 0 0.6rem', direction: 'rtl' }}>الوضوء</p>
              <p style={{ color: '#57534E', fontSize: '0.84rem', margin: 0, lineHeight: 1.6 }}>{namazData.wudu.intro}</p>
            </div>
            {namazData.wudu.steps.map(step => (
              <StepCard key={step.step} step={step} color="#64B5F6"
                isActive={activeWuduStep === step.step}
                onClick={() => setActiveWuduStep(activeWuduStep === step.step ? null : step.step)}
              />
            ))}
          </div>
        )}

        {/* HOW TO PRAY */}
        {activeSection === 'How to Pray' && (
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: 2 }}>
              {namazData.prayers.map(p => {
                const pc = PRAYER_COLORS[p.id];
                const isAct = activePrayer === p.id;
                return (
                  <button key={p.id} onClick={() => { setActivePrayer(p.id); setActiveStep(null); }} style={{
                    padding: '0.5rem 0.95rem', borderRadius: 99, border: '1.5px solid',
                    borderColor: isAct ? `${pc.color}80` : 'rgba(28,25,23,0.1)',
                    background: isAct ? `${pc.color}1A` : 'rgba(28,25,23,0.04)',
                    color: isAct ? pc.color : '#78716C',
                    fontSize: '0.78rem', fontWeight: 700,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    display: 'flex', gap: '0.35rem', alignItems: 'center',
                    transition: 'all 0.18s',
                  }}>{p.icon} {p.name}</button>
                );
              })}
            </div>

            <div style={{ background: pGrad, borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(28,25,23,0.09)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontFamily: '"Playfair Display",serif', color: '#fff', margin: '0 0 0.2rem', fontSize: '1.1rem' }}>{prayer.name} Prayer</h3>
                  <p style={{ color: '#78716C', fontSize: '0.79rem', margin: 0 }}>{prayer.time}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 99, padding: '0.25rem 0.7rem', color: '#F59E0B', fontWeight: 700 }}>{prayer.rakaat.fardh} Fardh Rakaat</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(28,25,23,0.1)', borderRadius: 99, padding: '0.25rem 0.7rem', color: '#44403C', fontWeight: 600 }}>Total: {prayer.rakaat.total}</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#A8A29E', marginBottom: '1rem', background: '#ffffff', borderRadius: 10, padding: '0.65rem 0.9rem', border: '1px solid rgba(28,25,23,0.09)' }}>
              ℹ️ {namazData.how_to_pray.note}
            </p>

            {namazData.how_to_pray.steps.map(step => (
              <StepCard key={step.step} step={step} color={pColor}
                isActive={activeStep === step.step}
                onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
              />
            ))}
          </div>
        )}

        {/* AFTER PRAYER */}
        {activeSection === 'After Prayer' && (
          <div>
            <div style={{ background: 'linear-gradient(135deg,#052e16,#14532D)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(245,158,11,0.2)' }}>
              <h2 style={{ fontFamily: '"Playfair Display",serif', color: '#fff', margin: '0 0 0.3rem', fontSize: '1.1rem' }}>Adhkar After Salah</h2>
              <p style={{ fontFamily: '"Noto Naskh Arabic",serif', color: 'rgba(245,158,11,0.7)', fontSize: '1rem', margin: 0, direction: 'rtl' }}>أذكار بعد الصلاة</p>
            </div>
            {namazData.after_prayer.duas.map((dua, i) => {
              const isOpen = activeAfterStep === i;
              return (
                <div key={i} onClick={() => setActiveAfterStep(isOpen ? null : i)} style={{
                  background: isOpen ? 'rgba(82,183,136,0.06)' : 'rgba(28,25,23,0.04)',
                  borderRadius: 16,
                  border: `1.5px solid ${isOpen ? 'rgba(82,183,136,0.35)' : 'rgba(28,25,23,0.09)'}`,
                  padding: '0.9rem 1.1rem', marginBottom: '0.6rem', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: isOpen ? 'linear-gradient(135deg,#14532D,#15803D)' : 'rgba(28,25,23,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: isOpen ? '#F59E0B' : '#D6D3D1', flexShrink: 0 }}>{i + 1}</div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: isOpen ? 'rgba(82,183,136,0.9)' : '#292524' }}>
                        {dua.transliteration.split('(')[0].trim()}
                      </p>
                    </div>
                    <span style={{ color: '#A8A29E', fontSize: '0.8rem' }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: '0.9rem' }}>
                      <div style={{ background: 'rgba(82,183,136,0.07)', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '0.65rem', textAlign: 'right', border: '1px solid rgba(82,183,136,0.18)' }}>
                        <p style={{ fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif', fontSize: 'clamp(0.95rem,2vw,1.2rem)', lineHeight: 2.2, color: '#1C1917', margin: 0, direction: 'rtl' }}>{dua.arabic}</p>
                      </div>
                      <p style={{ fontStyle: 'italic', color: '#A8A29E', fontSize: '0.79rem', margin: '0 0 0.5rem' }}>{dua.transliteration}</p>
                      <div style={{ background: 'rgba(46,125,50,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', borderLeft: '3px solid #22C55E', marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#44403C', lineHeight: 1.65 }}><span style={{ fontWeight: 700, color: '#22C55E', marginRight: 4 }}>EN:</span>{dua.translation}</p>
                      </div>
                      <div style={{ background: 'rgba(106,27,154,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', borderRight: '3px solid #B39DDB', textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: '#44403C', lineHeight: 3.4, fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl', wordSpacing: '3px' }}><span style={{ fontWeight: 700, color: '#B39DDB', marginLeft: 4 }}>اردو:</span>{dua.urdu}</p>
                      </div>
                      {dua.note && (
                        <div style={{ marginTop: '0.5rem', background: 'rgba(245,158,11,0.08)', borderRadius: 8, padding: '0.45rem 0.75rem', borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
                          <p style={{ margin: 0, fontSize: '0.76rem', color: '#78716C', lineHeight: 1.6 }}>⭐ {dua.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div style={{ background: 'linear-gradient(135deg,#052e16,#14532D)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: '1.2rem', color: '#F59E0B', marginBottom: '0.4rem', direction: 'rtl' }}>
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
        </p>
        <p style={{ color: '#A8A29E', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          "Indeed, prayer has been decreed upon the believers a decree of specified times." — Quran 4:103
        </p>
        <Link to="/learn/janaza" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.4rem', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 99, color: '#F59E0B', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
          Learn Namaz-e-Janaza →
        </Link>
      </div>
    </div>
  );
}
