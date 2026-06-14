import { useState } from 'react';
import rules from '../../data/tajweed-rules.json';

const CATEGORIES = [
  { id: 'all',         label: 'All Rules',       ar: 'الكل',           count: rules.length },
  { id: 'noon',        label: 'Noon & Tanween',   ar: 'نون وتنوين',     count: rules.filter(r=>r.category==='noon').length },
  { id: 'ghunnah',     label: 'Ghunnah',          ar: 'غنّة',           count: rules.filter(r=>r.category==='ghunnah').length },
  { id: 'madd',        label: 'Madd',             ar: 'مدود',           count: rules.filter(r=>r.category==='madd').length },
  { id: 'qalqalah',    label: 'Qalqalah',         ar: 'قلقلة',          count: rules.filter(r=>r.category==='qalqalah').length },
  { id: 'lam',         label: 'Lam Rules',        ar: 'لام',            count: rules.filter(r=>r.category==='lam').length },
  { id: 'heavy_light', label: 'Heavy / Light',    ar: 'تفخيم وترقيق',   count: rules.filter(r=>r.category==='heavy_light').length },
];

function RuleDetail({ rule, onClose }) {
  const [tab, setTab] = useState('learn');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(3,10,5,0.88)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }} onClick={onClose}>
      <div style={{
        background: '#FFFBEB', borderRadius: 24, width: '100%', maxWidth: 780,
        maxHeight: '90vh', overflowY: 'auto',
        border: `1px solid ${rule.color}30`,
        boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px ${rule.color}18`,
        animation: 'fadeUp 0.25s ease',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${rule.color}18, ${rule.color}06)`,
          borderBottom: `2px solid ${rule.color}40`,
          padding: '1.75rem 2rem', borderRadius: '24px 24px 0 0',
          position: 'relative',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'rgba(28,25,23,0.09)', border: 'none', borderRadius: '50%',
            width: 34, height: 34, cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#78716C',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,25,23,0.14)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(28,25,23,0.09)'; }}
          >✕</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.5rem' }}>{rule.icon}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: rule.color, fontWeight: 700, margin: 0 }}>{rule.name}</h2>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.5rem', color: rule.color, opacity: 0.8 }}>{rule.arabic_name}</span>
                {rule.urdu_name && <span style={{ fontFamily: 'var(--font-urdu)', fontSize: '1rem', color: rule.color, opacity: 0.7, lineHeight: 3 }}>{rule.urdu_name}</span>}
              </div>
              <p style={{ color: '#A8A29E', fontSize: '0.9rem', marginTop: '0.3rem' }}>{rule.short}</p>
            </div>
          </div>

          {rule.counts && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem',
              background: `${rule.color}18`, border: `1px solid ${rule.color}35`,
              borderRadius: 9999, padding: '0.3rem 0.9rem',
              fontSize: '0.8rem', fontWeight: 700, color: rule.color,
            }}>⏱ {rule.counts}</div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(28,25,23,0.08)', padding: '0 2rem' }}>
          {[
            { id: 'learn',    label: '📖 Learn' },
            { id: 'apply',    label: '✅ How to Apply' },
            { id: 'examples', label: '🔤 Examples' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '0.85rem 1.1rem', border: 'none', background: 'transparent',
              color: tab === t.id ? rule.color : '#A8A29E',
              fontWeight: tab === t.id ? 700 : 400,
              fontSize: '0.88rem', cursor: 'pointer',
              borderBottom: tab === t.id ? `2.5px solid ${rule.color}` : '2.5px solid transparent',
              transition: 'all 0.18s', marginBottom: -1,
            }}>{t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem 2rem' }}>

          {tab === 'learn' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: `${rule.color}0D`, borderRadius: 14, padding: '1.25rem 1.5rem', borderLeft: `4px solid ${rule.color}` }}>
                <h4 style={{ color: rule.color, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: 700 }}>Definition</h4>
                <p style={{ fontSize: '0.95rem', color: '#292524', lineHeight: 1.8 }}>{rule.definition}</p>
                {rule.urdu_def && (
                  <p style={{ fontFamily: 'var(--font-urdu)', fontSize: '1rem', color: '#78716C', direction: 'rtl', textAlign: 'right', marginTop: '0.75rem', lineHeight: 3.4, borderTop: '1px dashed rgba(28,25,23,0.12)', paddingTop: '0.75rem', wordSpacing: '3px' }}>
                    {rule.urdu_def}
                  </p>
                )}
              </div>

              {rule.trigger_letters && rule.trigger_letters.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '0.75rem' }}>
                    {rule.trigger_label}
                  </h4>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {rule.trigger_letters.map(l => (
                      <div key={l} style={{
                        width: 52, height: 52, borderRadius: 12,
                        background: `${rule.color}12`, border: `1.5px solid ${rule.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-arabic)', fontSize: '1.5rem', color: rule.color, fontWeight: 700,
                      }}>{l}</div>
                    ))}
                  </div>
                </div>
              )}

              {rule.subtypes && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '0.75rem' }}>
                  {rule.subtypes.map(s => (
                    <div key={s.name} style={{ background: '#ffffff', border: '1px solid rgba(28,25,23,0.09)', borderRadius: 12, padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#292524' }}>{s.name}</span>
                        <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.95rem', color: rule.color }}>{s.arabic}</span>
                      </div>
                      {s.letters.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          {s.letters.map(l => (
                            <span key={l} style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.1rem', color: rule.color, background: `${rule.color}10`, borderRadius: 6, padding: '0.1rem 0.4rem', fontWeight: 700 }}>{l}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: '0.8rem', color: '#78716C', lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {rule.mnemonic && (
                <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: 12, padding: '1rem 1.25rem', border: '1px solid rgba(245,158,11,0.25)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,158,11,0.8)' }}>💡 Mnemonic / Memory Tip</span>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.9rem', color: 'rgba(245,158,11,0.65)', lineHeight: 1.7 }}>{rule.mnemonic}</p>
                </div>
              )}
            </div>
          )}

          {tab === 'apply' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontWeight: 700, color: '#44403C', marginBottom: '1rem', fontSize: '0.95rem' }}>Step-by-Step Application</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {rule.how_to.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        background: `${rule.color}15`, border: `1.5px solid ${rule.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 700, color: rule.color,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: '0.92rem', color: '#44403C', lineHeight: 1.7, paddingTop: '0.15rem' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(39,174,96,0.08)', borderRadius: 12, padding: '1rem', border: '1px solid rgba(39,174,96,0.22)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#22C55E', textTransform: 'uppercase' }}>✅ Correct Approach</span>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: 'rgba(82,183,136,0.75)', lineHeight: 1.7 }}>{rule.tip}</p>
                </div>
                <div style={{ background: 'rgba(229,57,53,0.08)', borderRadius: 12, padding: '1rem', border: '1px solid rgba(229,57,53,0.22)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: '#EF5350', textTransform: 'uppercase' }}>⚠️ Common Mistake</span>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: 'rgba(239,83,80,0.75)', lineHeight: 1.7 }}>{rule.common_mistake}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'examples' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.85rem', color: '#78716C', marginBottom: '0.25rem' }}>
                The highlighted portion shows where the rule applies:
              </p>
              {rule.examples.map((ex, i) => (
                <div key={i} style={{
                  background: `${rule.color}0A`, borderRadius: 14, padding: '1.25rem 1.5rem',
                  border: `1px solid ${rule.color}20`,
                  display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-quran)', fontSize: '2rem', direction: 'rtl', color: '#1C1917', lineHeight: 1.8, marginBottom: '0.4rem' }}>
                      {ex.arabic.split(ex.highlight).map((part, pi, arr) => (
                        <span key={pi}>
                          {part}
                          {pi < arr.length - 1 && (
                            <span style={{ color: rule.color, fontWeight: 700, background: `${rule.color}22`, borderRadius: 4, padding: '0 2px' }}>{ex.highlight}</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#78716C', fontStyle: 'italic', marginBottom: '0.2rem' }}>{ex.transliteration}</div>
                    <div style={{ fontSize: '0.85rem', color: rule.color, fontWeight: 600 }}>{ex.note}</div>
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `${rule.color}15`, border: `1.5px solid ${rule.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontWeight: 700, color: rule.color,
                    fontSize: '0.85rem', flexShrink: 0,
                  }}>{i + 1}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RuleCard({ rule, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#ffffff', borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
      border: '1px solid rgba(28,25,23,0.09)',
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      display: 'flex', flexDirection: 'column',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = `0 12px 36px ${rule.color}18`;
      e.currentTarget.style.borderColor = `${rule.color}45`;
      e.currentTarget.style.background = `${rule.color}08`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'rgba(28,25,23,0.09)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
    }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${rule.color}, ${rule.color}60)` }} />

      <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: `${rule.color}14`, border: `1.5px solid ${rule.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
          }}>{rule.icon}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.35rem', color: rule.color, lineHeight: 1 }}>{rule.arabic_name}</div>
            {rule.urdu_name && <div style={{ fontFamily: 'var(--font-urdu)', fontSize: '0.8rem', color: rule.color, opacity: 0.75, marginTop: '0.15rem', lineHeight: 3 }}>{rule.urdu_name}</div>}
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#1C1917', fontWeight: 700, marginBottom: '0.4rem' }}>{rule.name}</h3>
        <p style={{ fontSize: '0.83rem', color: '#A8A29E', lineHeight: 1.65, flex: 1 }}>{rule.short}</p>

        {rule.counts && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.85rem',
            background: `${rule.color}10`, border: `1px solid ${rule.color}25`,
            borderRadius: 9999, padding: '0.2rem 0.7rem',
            fontSize: '0.72rem', fontWeight: 700, color: rule.color, width: 'fit-content',
          }}>⏱ {rule.counts}</div>
        )}

        {rule.trigger_letters && rule.trigger_letters.length > 0 && rule.trigger_letters.length <= 7 && (
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {rule.trigger_letters.map(l => (
              <span key={l} style={{ fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: rule.color, background: `${rule.color}10`, borderRadius: 6, padding: '0.1rem 0.45rem', fontWeight: 700 }}>{l}</span>
            ))}
          </div>
        )}
        {rule.trigger_letters && rule.trigger_letters.length > 7 && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: rule.color, fontWeight: 600 }}>
            {rule.trigger_letters.length} trigger letters — click to view all
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', color: rule.color, fontSize: '0.82rem', fontWeight: 700 }}>
          Learn in detail <span style={{ fontSize: '1rem' }}>→</span>
        </div>
      </div>
    </div>
  );
}

export default function TajweedPage() {
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = rules.filter(r => {
    const catOk = category === 'all' || r.category === category;
    const q = search.toLowerCase();
    const searchOk = !q || r.name.toLowerCase().includes(q) || r.arabic_name.includes(q) || r.short.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#052e16 0%,#14532D 55%,#14532D 100%)', padding: '3.5rem 1.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 9999, padding: '0.25rem 0.9rem', fontSize: '0.72rem', color: 'rgba(245,158,11,0.85)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            ✦ علم التجويد
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#fff', fontWeight: 700, marginBottom: '0.6rem' }}>Tajweed Rules</h1>
          <p style={{ color: '#78716C', fontSize: '0.95rem', maxWidth: 540, lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Master the rules of Quranic recitation — from Noon & Tanween to Madd, Qalqalah, and beyond. Click any rule to learn in detail.
          </p>
          <div style={{ position: 'relative', maxWidth: 380 }}>
            <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', opacity: 0.4 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rules..."
              style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.4rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 9999, color: '#fff', fontSize: '0.88rem', outline: 'none' }}
              onFocus={e=>{e.target.style.borderColor='rgba(245,158,11,0.5)';}}
              onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.2)';}}
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: 'rgba(255,251,235,0.97)', borderBottom: '1px solid rgba(28,25,23,0.08)', position: 'sticky', top: 68, zIndex: 50, backdropFilter: 'blur(16px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '0.1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.95rem 0.9rem', border: 'none', background: 'transparent', cursor: 'pointer',
              color: category === cat.id ? '#F59E0B' : '#A8A29E',
              fontWeight: category === cat.id ? 700 : 400, fontSize: '0.85rem', whiteSpace: 'nowrap',
              borderBottom: category === cat.id ? '2.5px solid #F59E0B' : '2.5px solid transparent',
              transition: 'all 0.18s', marginBottom: -1,
            }}>
              <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.8rem', opacity: 0.7 }}>{cat.ar}</span>
              {cat.label}
              <span style={{
                background: category === cat.id ? 'rgba(245,158,11,0.15)' : 'rgba(28,25,23,0.07)',
                color: category === cat.id ? '#F59E0B' : '#D6D3D1',
                borderRadius: 9999, padding: '0.05rem 0.45rem',
                fontSize: '0.7rem', fontWeight: 700,
              }}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#78716C' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No rules match your search.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.82rem', color: '#78716C', marginBottom: '1.5rem' }}>
              Showing {filtered.length} rule{filtered.length !== 1 ? 's' : ''}{search && ` for "${search}"`}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '1.25rem' }}>
              {filtered.map(rule => (
                <RuleCard key={rule.id} rule={rule} onClick={() => setSelected(rule)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Reference Table */}
      <div style={{ maxWidth: 1100, margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <div style={{ background: '#ffffff', borderRadius: 18, border: '1px solid rgba(28,25,23,0.09)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(28,25,23,0.08)', background: 'rgba(245,158,11,0.05)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'rgba(245,158,11,0.85)', fontWeight: 700, margin: 0 }}>
              📋 Quick Reference — Noon Sakinah & Tanween
            </h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#ffffff' }}>
                  {['Rule', 'Arabic', 'Trigger', 'What Happens', 'Counts'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: '#57534E', fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid rgba(28,25,23,0.08)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Izhar',                  ar: 'إظهار',      trigger: 'ء ه ع غ ح خ', what: 'Pronounce clearly — no nasal',              counts: 'No extra', color: '#E57373' },
                  { name: 'Idgham (w/ Ghunnah)',     ar: 'إدغام بغنة', trigger: 'ي ن م و',    what: 'Merge noon + nasal hum',                   counts: '2 counts', color: '#64B5F6' },
                  { name: 'Idgham (no Ghunnah)',     ar: 'إدغام بلا غنة', trigger: 'ل ر',     what: 'Merge noon completely',                    counts: 'No extra', color: '#7986CB' },
                  { name: 'Iqlab',                  ar: 'إقلاب',      trigger: 'ب only',      what: 'Change to meem + nasal',                   counts: '2 counts', color: '#BA68C8' },
                  { name: 'Ikhfa',                  ar: 'إخفاء',      trigger: '15 letters',   what: 'Hide noon — between clear & merged',       counts: '2 counts', color: '#FFB74D' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(28,25,23,0.06)', transition: 'background 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(28,25,23,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; }}
                  >
                    <td style={{ padding: '0.85rem 1rem' }}><span style={{ fontWeight: 700, color: row.color }}>{row.name}</span></td>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: row.color }}>{row.ar}</td>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: '#57534E', letterSpacing: '0.1em' }}>{row.trigger}</td>
                    <td style={{ padding: '0.85rem 1rem', color: '#A8A29E', lineHeight: 1.5 }}>{row.what}</td>
                    <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: `${row.color}12`, color: row.color, borderRadius: 9999, padding: '0.15rem 0.6rem', fontSize: '0.78rem', fontWeight: 700 }}>{row.counts}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && <RuleDetail rule={selected} onClose={() => setSelected(null)} />}

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
