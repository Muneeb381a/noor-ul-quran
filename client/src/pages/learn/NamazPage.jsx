import { useState } from 'react';
import { Link } from 'react-router-dom';
import namazData from '../../data/namaz.json';

const PRAYER_COLORS = {
  fajr:    { color: '#E65100', bg: '#FFF3E0', grad: 'linear-gradient(135deg,#3D1C08,#7B3A0E)' },
  dhuhr:   { color: '#F57F17', bg: '#FFFDE7', grad: 'linear-gradient(135deg,#2A1F00,#5C4200)' },
  asr:     { color: '#1565C0', bg: '#E3F2FD', grad: 'linear-gradient(135deg,#020D22,#0D2857)' },
  maghrib: { color: '#AD1457', bg: '#FCE4EC', grad: 'linear-gradient(135deg,#200010,#4A0626)' },
  isha:    { color: '#311B92', bg: '#EDE7F6', grad: 'linear-gradient(135deg,#070014,#1A0B40)' },
};

const SECTION_TABS = ['Overview', 'Wudu', 'How to Pray', 'After Prayer'];

function StepCard({ step, color, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? color + '12' : '#fff',
        border: `1.5px solid ${isActive ? color : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 16,
        padding: '1.1rem 1.25rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginBottom: '0.6rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: isActive ? color : '#F5F5F5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.78rem', fontWeight: 800,
          color: isActive ? '#fff' : '#aaa',
          flexShrink: 0,
        }}>{step.step}</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: isActive ? color : '#1B4332' }}>{step.name}</p>
          {step.position && <p style={{ margin: '0.1rem 0 0', fontSize: '0.68rem', color: '#aaa', fontStyle: 'italic' }}>{step.position}</p>}
          {isActive && (
            <div style={{ marginTop: '0.85rem' }}>
              {step.arabic && (
                <div style={{ background: color + '08', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '0.65rem', textAlign: 'right', border: `1px solid ${color}20` }}>
                  <p style={{
                    fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif',
                    fontSize: 'clamp(1.05rem,2.5vw,1.3rem)',
                    lineHeight: 2.1, color: '#1a1a1a', margin: 0, direction: 'rtl',
                  }}>{step.arabic}</p>
                </div>
              )}
              {step.transliteration && (
                <p style={{ fontStyle: 'italic', color: '#555', fontSize: '0.8rem', lineHeight: 1.7, margin: '0 0 0.5rem' }}>{step.transliteration}</p>
              )}
              {step.translation && (
                <div style={{ background: '#F6F9F7', borderRadius: 8, padding: '0.5rem 0.75rem', borderLeft: '3px solid #2E7D32', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#333', lineHeight: 1.65 }}>
                    <span style={{ fontWeight: 700, color: '#2E7D32', marginRight: 4 }}>EN:</span>{step.translation}
                  </p>
                </div>
              )}
              {step.urdu && (
                <div style={{ background: '#FDF8FF', borderRadius: 8, padding: '0.5rem 0.75rem', borderRight: '3px solid #6A1B9A', textAlign: 'right', marginBottom: '0.5rem' }}>
                  <p style={{
                    margin: 0, fontSize: '0.82rem', color: '#333', lineHeight: 1.8,
                    fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl',
                  }}>
                    <span style={{ fontWeight: 700, color: '#6A1B9A', marginLeft: 4 }}>اردو:</span>{step.urdu}
                  </p>
                </div>
              )}
              {step.desc && (
                <div style={{ background: '#FFFDE7', borderRadius: 8, padding: '0.5rem 0.75rem', borderLeft: `3px solid ${color}` }}>
                  <p style={{ margin: 0, fontSize: '0.79rem', color: '#555', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              )}
            </div>
          )}
        </div>
        <span style={{ color: isActive ? color : '#ccc', fontSize: '0.9rem', flexShrink: 0, marginTop: '0.1rem' }}>{isActive ? '▲' : '▼'}</span>
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
  const pColor = PRAYER_COLORS[activePrayer]?.color || '#1B4332';
  const pGrad = PRAYER_COLORS[activePrayer]?.grad || 'linear-gradient(135deg,#060E09,#1B4332)';

  return (
    <div style={{ minHeight: '100vh', background: '#F6F1E9' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg,#060E09,#0D2818,#1B4332)', padding: '3.5rem 1.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <Link to="/learn" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.25rem' }}>← Learn Center</Link>
          <p style={{ color: 'rgba(201,168,76,0.75)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>🕌 الصلاة</p>
          <h1 style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', margin: '0 0 0.5rem' }}>كيفية الصلاة</h1>
          <p style={{ fontFamily: '"Noto Nastaliq Urdu",serif', fontSize: '1.1rem', color: 'rgba(201,168,76,0.7)', direction: 'rtl', margin: '0 0 0.75rem' }}>نماز پڑھنے کا طریقہ</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: 560 }}>{namazData.intro}</p>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ position: 'sticky', top: 68, zIndex: 10, background: 'rgba(246,241,233,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '0.65rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {SECTION_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveSection(tab)} style={{
              padding: '0.45rem 1rem', borderRadius: 99, border: '1px solid',
              borderColor: activeSection === tab ? '#1B4332' : 'rgba(0,0,0,0.12)',
              background: activeSection === tab ? '#1B4332' : 'transparent',
              color: activeSection === tab ? '#fff' : '#555',
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
            <h2 style={{ fontFamily: '"Cinzel",serif', fontSize: '1.1rem', color: '#1B4332', marginBottom: '1.5rem' }}>5 Daily Prayers — الصلوات الخمس</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {namazData.prayers.map(p => {
                const pc = PRAYER_COLORS[p.id];
                return (
                  <div key={p.id} style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(27,67,50,0.06)', overflow: 'hidden' }}>
                    <div style={{ background: pc.grad, padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>{p.icon}</span>
                        <div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <h3 style={{ fontFamily: '"Cinzel",serif', color: '#fff', margin: 0, fontSize: '1.1rem' }}>{p.name}</h3>
                            <span style={{ fontFamily: '"Noto Naskh Arabic",serif', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', direction: 'rtl' }}>{p.arabic}</span>
                          </div>
                          <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{p.time}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {p.rakaat.sunnah_before && <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '0.2rem 0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p.rakaat.sunnah_before} Sunnah (before)</span>}
                        <span style={{ fontSize: '0.65rem', background: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.5)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#C9A84C', fontWeight: 700 }}>{p.rakaat.fardh} Fardh</span>
                        {p.rakaat.sunnah_after && <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '0.2rem 0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p.rakaat.sunnah_after} Sunnah (after)</span>}
                        {p.rakaat.witr && <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '0.2rem 0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p.rakaat.witr} Witr</span>}
                        <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.15)', borderRadius: 99, padding: '0.2rem 0.6rem', color: '#fff', fontWeight: 800 }}>Total: {p.rakaat.total}</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem 1.5rem' }}>
                      <p style={{ margin: '0 0 0.6rem', fontSize: '0.84rem', color: '#444', lineHeight: 1.7 }}>{p.desc}</p>
                      <div style={{ background: pc.bg, borderRadius: 10, padding: '0.55rem 0.85rem', borderLeft: `3px solid ${pc.color}` }}>
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
            <div style={{ background: 'linear-gradient(135deg,#020D22,#0277BD)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(2,119,189,0.4)' }}>
              <h2 style={{ fontFamily: '"Cinzel",serif', color: '#fff', margin: '0 0 0.35rem', fontSize: '1.15rem' }}>Wudu — Ablution</h2>
              <p style={{ fontFamily: '"Noto Naskh Arabic",serif', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', margin: '0 0 0.6rem', direction: 'rtl' }}>الوضوء</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem', margin: 0, lineHeight: 1.6 }}>{namazData.wudu.intro}</p>
            </div>
            {namazData.wudu.steps.map(step => (
              <StepCard
                key={step.step}
                step={step}
                color="#0277BD"
                isActive={activeWuduStep === step.step}
                onClick={() => setActiveWuduStep(activeWuduStep === step.step ? null : step.step)}
              />
            ))}
          </div>
        )}

        {/* HOW TO PRAY */}
        {activeSection === 'How to Pray' && (
          <div>
            {/* Prayer selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: 2 }}>
              {namazData.prayers.map(p => {
                const pc = PRAYER_COLORS[p.id];
                return (
                  <button key={p.id} onClick={() => { setActivePrayer(p.id); setActiveStep(null); }} style={{
                    padding: '0.5rem 0.95rem', borderRadius: 99, border: '1.5px solid',
                    borderColor: activePrayer === p.id ? pc.color : 'rgba(0,0,0,0.12)',
                    background: activePrayer === p.id ? pc.color : '#fff',
                    color: activePrayer === p.id ? '#fff' : '#555',
                    fontSize: '0.78rem', fontWeight: 700,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    display: 'flex', gap: '0.35rem', alignItems: 'center',
                    transition: 'all 0.18s',
                  }}>{p.icon} {p.name}</button>
                );
              })}
            </div>

            {/* Prayer info card */}
            <div style={{ background: pGrad, borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', align: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontFamily: '"Cinzel",serif', color: '#fff', margin: '0 0 0.2rem', fontSize: '1.1rem' }}>{prayer.name} Prayer</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.79rem', margin: 0 }}>{prayer.time}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 99, padding: '0.25rem 0.7rem', color: '#C9A84C', fontWeight: 700 }}>{prayer.rakaat.fardh} Fardh Rakaat</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', borderRadius: 99, padding: '0.25rem 0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Total: {prayer.rakaat.total}</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem', background: '#fff', borderRadius: 10, padding: '0.65rem 0.9rem', border: '1px solid rgba(0,0,0,0.07)' }}>
              ℹ️ {namazData.how_to_pray.note}
            </p>

            {namazData.how_to_pray.steps.map(step => (
              <StepCard
                key={step.step}
                step={step}
                color={pColor}
                isActive={activeStep === step.step}
                onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
              />
            ))}
          </div>
        )}

        {/* AFTER PRAYER */}
        {activeSection === 'After Prayer' && (
          <div>
            <div style={{ background: 'linear-gradient(135deg,#060E09,#1B4332)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(201,168,76,0.2)' }}>
              <h2 style={{ fontFamily: '"Cinzel",serif', color: '#fff', margin: '0 0 0.3rem', fontSize: '1.1rem' }}>Adhkar After Salah</h2>
              <p style={{ fontFamily: '"Noto Naskh Arabic",serif', color: 'rgba(201,168,76,0.7)', fontSize: '1rem', margin: 0, direction: 'rtl' }}>أذكار بعد الصلاة</p>
            </div>
            {namazData.after_prayer.duas.map((dua, i) => {
              const isOpen = activeAfterStep === i;
              return (
                <div key={i} onClick={() => setActiveAfterStep(isOpen ? null : i)} style={{
                  background: '#fff', borderRadius: 16, border: `1.5px solid ${isOpen ? '#1B4332' : 'rgba(0,0,0,0.07)'}`,
                  padding: '0.9rem 1.1rem', marginBottom: '0.6rem', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: isOpen ? '#1B4332' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: isOpen ? '#fff' : '#aaa', flexShrink: 0 }}>{i + 1}</div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: isOpen ? '#1B4332' : '#333' }}>
                        {dua.transliteration.split('(')[0].trim()}
                      </p>
                    </div>
                    <span style={{ color: '#ccc', fontSize: '0.8rem' }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: '0.9rem' }}>
                      <div style={{ background: '#1B433208', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '0.65rem', textAlign: 'right', border: '1px solid #1B433218' }}>
                        <p style={{ fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif', fontSize: 'clamp(0.95rem,2vw,1.2rem)', lineHeight: 2.1, color: '#1a1a1a', margin: 0, direction: 'rtl' }}>{dua.arabic}</p>
                      </div>
                      <p style={{ fontStyle: 'italic', color: '#666', fontSize: '0.79rem', margin: '0 0 0.5rem' }}>{dua.transliteration}</p>
                      <div style={{ background: '#F6F9F7', borderRadius: 8, padding: '0.5rem 0.75rem', borderLeft: '3px solid #2E7D32', marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#333', lineHeight: 1.65 }}><span style={{ fontWeight: 700, color: '#2E7D32', marginRight: 4 }}>EN:</span>{dua.translation}</p>
                      </div>
                      <div style={{ background: '#FDF8FF', borderRadius: 8, padding: '0.5rem 0.75rem', borderRight: '3px solid #6A1B9A', textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#333', lineHeight: 1.8, fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl' }}><span style={{ fontWeight: 700, color: '#6A1B9A', marginLeft: 4 }}>اردو:</span>{dua.urdu}</p>
                      </div>
                      {dua.note && (
                        <div style={{ marginTop: '0.5rem', background: '#FFFDE7', borderRadius: 8, padding: '0.45rem 0.75rem', borderLeft: '3px solid #F9A825' }}>
                          <p style={{ margin: 0, fontSize: '0.76rem', color: '#555', lineHeight: 1.6 }}>⭐ {dua.note}</p>
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

      {/* Bottom navigation */}
      <div style={{ background: 'linear-gradient(135deg,#060E09,#1B4332)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: '1.2rem', color: '#C9A84C', marginBottom: '0.4rem', direction: 'rtl' }}>
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          "Indeed, prayer has been decreed upon the believers a decree of specified times." — Quran 4:103
        </p>
        <Link to="/learn/janaza" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.65rem 1.4rem', background: 'rgba(201,168,76,0.15)',
          border: '1px solid rgba(201,168,76,0.35)', borderRadius: 99,
          color: '#C9A84C', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none',
        }}>
          Learn Namaz-e-Janaza →
        </Link>
      </div>
    </div>
  );
}
