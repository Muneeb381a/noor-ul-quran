import { useState } from 'react';
import { Link } from 'react-router-dom';
import janazaData from '../../data/janaza.json';

const STEP_COLOR = '#1B4332';

function StepBlock({ step, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? '#1B433210' : '#fff',
        border: `1.5px solid ${isActive ? STEP_COLOR : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 16, padding: '1rem 1.2rem',
        cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.6rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: isActive ? STEP_COLOR : '#F5F5F5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.78rem', fontWeight: 800,
          color: isActive ? '#C9A84C' : '#aaa',
        }}>{step.step}</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: isActive ? STEP_COLOR : '#222' }}>{step.name}</p>
          {isActive && (
            <div style={{ marginTop: '0.9rem' }}>
              {step.arabic && (
                <div style={{ background: '#1B433208', borderRadius: 12, padding: '0.9rem 1rem', marginBottom: '0.7rem', textAlign: 'right', border: '1px solid #1B433220' }}>
                  <p style={{
                    fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif',
                    fontSize: 'clamp(1rem,2.5vw,1.25rem)',
                    lineHeight: 2.1, color: '#1a1a1a', margin: 0, direction: 'rtl',
                  }}>{step.arabic}</p>
                </div>
              )}
              {step.transliteration && (
                <p style={{ fontStyle: 'italic', color: '#555', fontSize: '0.79rem', lineHeight: 1.7, margin: '0 0 0.55rem' }}>{step.transliteration}</p>
              )}
              {step.translation && (
                <div style={{ background: '#F6F9F7', borderRadius: 8, padding: '0.5rem 0.8rem', borderLeft: '3px solid #2E7D32', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.81rem', color: '#333', lineHeight: 1.65 }}>
                    <span style={{ fontWeight: 700, color: '#2E7D32', marginRight: 4 }}>EN:</span>{step.translation}
                  </p>
                </div>
              )}
              {step.urdu && (
                <div style={{ background: '#FDF8FF', borderRadius: 8, padding: '0.5rem 0.8rem', borderRight: '3px solid #6A1B9A', textAlign: 'right', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.81rem', color: '#333', lineHeight: 1.8, fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl' }}>
                    <span style={{ fontWeight: 700, color: '#6A1B9A', marginLeft: 4 }}>اردو:</span>{step.urdu}
                  </p>
                </div>
              )}
              {step.desc && (
                <div style={{ background: '#FFFDE7', borderRadius: 8, padding: '0.5rem 0.8rem', borderLeft: '3px solid #F9A825' }}>
                  <p style={{ margin: 0, fontSize: '0.79rem', color: '#555', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              )}
              {step.source && (
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.67rem', color: '#aaa', fontStyle: 'italic' }}>📖 Source: {step.source}</p>
              )}
            </div>
          )}
        </div>
        <span style={{ color: isActive ? STEP_COLOR : '#ccc', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>{isActive ? '▲' : '▼'}</span>
      </div>
    </div>
  );
}

export default function JanazaPage() {
  const [activeStep, setActiveStep] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F1E9' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(150deg,#060E09,#0D1A14,#1B2E22)', padding: '3.5rem 1.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <Link to="/learn" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1.25rem' }}>← Learn Center</Link>
          <p style={{ color: 'rgba(201,168,76,0.75)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>🕌 صلاة الجنازة</p>
          <h1 style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: 'clamp(2rem,5vw,3rem)', color: '#fff', margin: '0 0 0.5rem' }}>صلاةُ الجنازة</h1>
          <p style={{ fontFamily: '"Noto Nastaliq Urdu",serif', fontSize: '1.1rem', color: 'rgba(201,168,76,0.7)', direction: 'rtl', margin: '0 0 0.75rem' }}>{janazaData.urdu_title}</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', maxWidth: 580, lineHeight: 1.7 }}>{janazaData.intro}</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        {/* Virtue card */}
        <div style={{ background: 'linear-gradient(135deg,#0D2818,#1B4332)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.75rem', border: '1px solid rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', right: 10, top: 10, opacity: 0.08 }}>
            <polygon points="40,3 47,27 72,27 52,42 59,66 40,52 21,66 28,42 8,27 33,27" fill="#C9A84C" />
          </svg>
          <p style={{ margin: '0 0 0.35rem', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(201,168,76,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>⭐ Virtue</p>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, fontStyle: 'italic' }}>{janazaData.virtue}</p>
        </div>

        {/* Conditions */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(27,67,50,0.1)', boxShadow: '0 2px 12px rgba(27,67,50,0.06)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: '"Cinzel",serif', fontSize: '0.95rem', color: '#1B4332', margin: '0 0 1rem' }}>Conditions — شرائط</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {janazaData.conditions.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1B433215', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800, color: '#1B4332', flexShrink: 0, marginTop: '0.05rem' }}>{i + 1}</div>
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#444', lineHeight: 1.6 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Method header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(27,67,50,0.12)' }} />
          <h2 style={{ fontFamily: '"Cinzel",serif', fontSize: '1rem', color: '#1B4332', margin: 0, whiteSpace: 'nowrap' }}>Step-by-Step Method</h2>
          <div style={{ flex: 1, height: 1, background: 'rgba(27,67,50,0.12)' }} />
        </div>

        <div style={{ background: '#E8F5E9', borderRadius: 12, padding: '0.65rem 1rem', marginBottom: '1.25rem', border: '1px solid rgba(46,125,50,0.2)' }}>
          <p style={{ margin: 0, fontSize: '0.79rem', color: '#2E7D32', fontWeight: 600 }}>🕌 {janazaData.method.rakaat} — Click each step to expand details and duas</p>
        </div>

        {/* Steps */}
        {janazaData.method.steps.map(step => (
          <StepBlock
            key={step.step}
            step={step}
            isActive={activeStep === step.step}
            onClick={() => setActiveStep(activeStep === step.step ? null : step.step)}
          />
        ))}

        {/* Burial duas */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(27,67,50,0.12)' }} />
            <h2 style={{ fontFamily: '"Cinzel",serif', fontSize: '1rem', color: '#1B4332', margin: 0, whiteSpace: 'nowrap' }}>Duas at the Grave</h2>
            <div style={{ flex: 1, height: 1, background: 'rgba(27,67,50,0.12)' }} />
          </div>
          {janazaData.burial_duas.items.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 10px rgba(27,67,50,0.05)', overflow: 'hidden', marginBottom: '0.75rem' }}>
              <div style={{ height: 3, background: `linear-gradient(90deg,#1B4332,#2E7D32)` }} />
              <div style={{ padding: '1.1rem 1.3rem' }}>
                <p style={{ margin: '0 0 0.85rem', fontWeight: 700, fontSize: '0.85rem', color: '#1B4332' }}>{item.title}</p>
                <div style={{ background: '#1B433208', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '0.65rem', textAlign: 'right', border: '1px solid #1B433218' }}>
                  <p style={{ fontFamily: '"Noto Naskh Arabic","Amiri Quran",serif', fontSize: 'clamp(1rem,2vw,1.2rem)', lineHeight: 2, color: '#1a1a1a', margin: 0, direction: 'rtl' }}>{item.arabic}</p>
                </div>
                <p style={{ fontStyle: 'italic', color: '#666', fontSize: '0.79rem', margin: '0 0 0.5rem' }}>{item.transliteration}</p>
                <div style={{ background: '#F6F9F7', borderRadius: 8, padding: '0.5rem 0.8rem', borderLeft: '3px solid #2E7D32', marginBottom: '0.5rem' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#333', lineHeight: 1.65 }}><span style={{ fontWeight: 700, color: '#2E7D32', marginRight: 4 }}>EN:</span>{item.translation}</p>
                </div>
                <div style={{ background: '#FDF8FF', borderRadius: 8, padding: '0.5rem 0.8rem', borderRight: '3px solid #6A1B9A', textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#333', lineHeight: 1.8, fontFamily: '"Noto Nastaliq Urdu",serif', direction: 'rtl' }}><span style={{ fontWeight: 700, color: '#6A1B9A', marginLeft: 4 }}>اردو:</span>{item.urdu}</p>
                </div>
                {item.desc && (
                  <div style={{ marginTop: '0.5rem', background: '#FFFDE7', borderRadius: 8, padding: '0.45rem 0.75rem', borderLeft: '3px solid #F9A825' }}>
                    <p style={{ margin: 0, fontSize: '0.76rem', color: '#555', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                )}
                {item.source && <p style={{ margin: '0.4rem 0 0', fontSize: '0.67rem', color: '#aaa', fontStyle: 'italic' }}>📖 {item.source}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Important notes */}
        <div style={{ marginTop: '2rem', background: '#fff', borderRadius: 18, border: '1px solid rgba(27,67,50,0.1)', overflow: 'hidden' }}>
          <button onClick={() => setShowNotes(v => !v)} style={{ width: '100%', padding: '1rem 1.3rem', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'inherit' }}>
            <span style={{ fontFamily: '"Cinzel",serif', fontSize: '0.95rem', color: '#1B4332', fontWeight: 700 }}>⚠️ Important Notes for Different Madhabs</span>
            <span style={{ color: '#999', fontSize: '0.8rem' }}>{showNotes ? '▲' : '▼'}</span>
          </button>
          {showNotes && (
            <div style={{ padding: '0 1.3rem 1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', paddingTop: '1rem' }}>
                {janazaData.important_notes.map((note, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: '0.15rem', fontSize: '0.75rem' }}>•</span>
                    <p style={{ margin: 0, fontSize: '0.83rem', color: '#444', lineHeight: 1.65 }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'linear-gradient(135deg,#060E09,#1B2E22)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Noto Naskh Arabic",serif', fontSize: '1.2rem', color: '#C9A84C', marginBottom: '0.4rem', direction: 'rtl' }}>
          كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          "Every soul shall taste death." — Quran 3:185
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/learn/namaz" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 99, color: '#C9A84C', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
            ← Namaz Guide
          </Link>
          <Link to="/learn/duas" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.2rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 99, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>
            View Duas →
          </Link>
        </div>
      </div>
    </div>
  );
}
