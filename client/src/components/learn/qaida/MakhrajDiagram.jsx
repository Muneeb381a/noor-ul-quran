import React from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// Zone data — articulation points with full detail
// ═══════════════════════════════════════════════════════════════════════════
const ZONES = {
  jawf: {
    label_ar: 'الجَوْف', label_en: 'Al-Jawf',
    sub_ar: 'الفراغ الداخلي', sub_en: 'Open Air Space',
    color: '#5D7A8A',
    letters: ['ا', 'وْ', 'يْ'],
    desc: 'The open cavity of the mouth and throat — long vowel sounds flow through this open space with no obstruction.',
    how: 'Open your mouth, no tongue or lip contact — pure air resonance.',
    dot: { x: 302, y: 128 },
  },
  throat_deep: {
    label_ar: 'أَقْصَى الحَلْق', label_en: 'Deep Throat',
    sub_ar: 'أعمق نقطة في الحلق', sub_en: 'Larynx / Glottis',
    color: '#A93226',
    letters: ['ء', 'هـ'],
    desc: 'The deepest point of the throat near the glottis (voice box). ء is a complete closure then release. ه is a gentle open breath.',
    how: 'Constrict or close the very bottom of your throat — like a mild cough starting point.',
    dot: { x: 74, y: 348 },
  },
  throat_mid: {
    label_ar: 'وَسَط الحَلْق', label_en: 'Middle Throat',
    sub_ar: 'منتصف الحلق', sub_en: 'Mid Pharynx',
    color: '#CA6F1E',
    letters: ['ع', 'ح'],
    desc: 'The middle of the pharynx (throat). ح is voiceless friction. ع is the same but voiced — you feel vibration.',
    how: 'Squeeze the middle of your throat. ح = whisper squeeze, ع = add vocal vibration.',
    dot: { x: 74, y: 245 },
  },
  throat_upper: {
    label_ar: 'أَدْنَى الحَلْق', label_en: 'Upper Throat',
    sub_ar: 'أعلى الحلق / اللهاة', sub_en: 'Uvular / Velar',
    color: '#B7950B',
    letters: ['خ', 'غ'],
    desc: 'Near the uvula (the hanging piece at the back). خ is voiceless (like clearing the throat softly). غ is voiced.',
    how: 'Let air rub against the back of the soft palate/uvula. خ = voiceless, غ = voiced.',
    dot: { x: 74, y: 142 },
  },
  tongue_back: {
    label_ar: 'أَقْصَى اللِّسَان', label_en: 'Back of Tongue',
    sub_ar: 'اللسان مع الطبق', sub_en: 'Tongue vs Soft Palate',
    color: '#1D6A39',
    letters: ['ق', 'ك'],
    desc: 'The very back of the tongue presses against the soft palate. ق is further back (deeper), ك is slightly more forward.',
    how: 'Push the back of your tongue up. Feel it touching the roof — that soft back area.',
    dot: { x: 182, y: 168 },
  },
  tongue_mid: {
    label_ar: 'وَسَط اللِّسَان', label_en: 'Middle of Tongue',
    sub_ar: 'اللسان مع وسط الحنك', sub_en: 'Tongue vs Hard Palate',
    color: '#1A5276',
    letters: ['ج', 'ش', 'ي'],
    desc: 'The middle of the tongue rises to meet the middle of the hard palate. ش is spread wide, ج narrows and stops, ي glides.',
    how: 'Raise the middle of your tongue toward the dome of your mouth.',
    dot: { x: 292, y: 156 },
  },
  tongue_tip: {
    label_ar: 'طَرَف اللِّسَان', label_en: 'Tongue Tip',
    sub_ar: 'اللسان مع اللثة والأسنان', sub_en: 'Alveolar Ridge / Teeth Base',
    color: '#6C3483',
    letters: ['ل', 'ن', 'ر', 'ط', 'د', 'ت'],
    desc: 'The tip of the tongue at the alveolar ridge (gum bump) or upper teeth inner surface. Multiple letters share this zone with slight differences.',
    how: 'Touch the bump just behind your upper front teeth with your tongue tip.',
    dot: { x: 400, y: 152 },
  },
  tongue_teeth: {
    label_ar: 'بَيْن الأَسْنَان', label_en: 'At / Between Teeth',
    sub_ar: 'طرف اللسان عند الأسنان', sub_en: 'Dental / Interdental',
    color: '#1A3A5C',
    letters: ['ص', 'ز', 'س', 'ظ', 'ذ', 'ث'],
    desc: 'Tongue tip at the edge of or between the upper and lower front teeth. ص/ز/س are behind teeth, ظ/ذ/ث are between teeth.',
    how: 'For ث/ذ/ظ: gently stick tongue tip between teeth. For ص/ز/س: tongue behind lower teeth.',
    dot: { x: 466, y: 148 },
  },
  lip_teeth: {
    label_ar: 'الشَّفَة والأَسنان', label_en: 'Lower Lip + Teeth',
    sub_ar: 'باطن الشفة مع الأسنان', sub_en: 'Labiodental',
    color: '#78281F',
    letters: ['ف'],
    desc: 'The inner (moist) edge of the lower lip touches the tips of the upper front teeth. Air flows between them.',
    how: 'Gently bite your lower lip with your upper teeth, then blow air through.',
    dot: { x: 508, y: 145 },
  },
  lips: {
    label_ar: 'الشَّفَتَان', label_en: 'Both Lips',
    sub_ar: 'بين الشفتين', sub_en: 'Bilabial',
    color: '#784212',
    letters: ['ب', 'م', 'و'],
    desc: 'Both lips come together. ب is a sudden release, م is a nasal sound that hums through the nose, و rounds the lips with airflow.',
    how: 'Press both lips together (ب, م) or round them into an O shape (و).',
    dot: { x: 546, y: 182 },
  },
};

// ── Active zone config ──────────────────────────────────────────────────────
// ellipse positions overlaid on the anatomy for each zone
const ZONE_ELLIPSES = {
  jawf:          { cx: 302, cy: 128, rx: 92, ry: 40 },
  throat_deep:   { cx: 74,  cy: 348, rx: 36, ry: 46 },
  throat_mid:    { cx: 74,  cy: 245, rx: 36, ry: 44 },
  throat_upper:  { cx: 74,  cy: 142, rx: 36, ry: 44 },
  tongue_back:   { cx: 182, cy: 170, rx: 42, ry: 28 },
  tongue_mid:    { cx: 292, cy: 158, rx: 56, ry: 26 },
  tongue_tip:    { cx: 400, cy: 152, rx: 52, ry: 24 },
  tongue_teeth:  { cx: 466, cy: 148, rx: 27, ry: 20 },
  lip_teeth:     { cx: 508, cy: 146, rx: 17, ry: 16 },
  lips:          { cx: 546, cy: 182, rx: 20, ry: 30 },
};

// Label leader lines: { from: [x,y], to: [x,y], textX, textY, anchor }
const ZONE_LABELS = {
  jawf:          { from:[302,105], to:[302,55],  textX:302, textY:48,  anchor:'middle' },
  throat_deep:   { from:[38, 348], to:[5, 348],  textX:5,   textY:345, anchor:'start',  rotate:true, ry:60 },
  throat_mid:    { from:[38, 245], to:[5, 245],  textX:5,   textY:242, anchor:'start',  rotate:true },
  throat_upper:  { from:[38, 142], to:[5, 142],  textX:5,   textY:139, anchor:'start',  rotate:true },
  tongue_back:   { from:[182,198], to:[145,260], textX:145, textY:272, anchor:'middle' },
  tongue_mid:    { from:[292,184], to:[260,268], textX:260, textY:280, anchor:'middle' },
  tongue_tip:    { from:[400,176], to:[390,268], textX:390, textY:280, anchor:'middle' },
  tongue_teeth:  { from:[466,168], to:[460,268], textX:460, textY:280, anchor:'middle' },
  lip_teeth:     { from:[508,162], to:[508,318], textX:508, textY:330, anchor:'middle' },
  lips:          { from:[546,212], to:[546,318], textX:546, textY:330, anchor:'middle' },
};

function ZoneEllipse({ id, active }) {
  const e = ZONE_ELLIPSES[id];
  const z = ZONES[id];
  if (!e || !z) return null;
  const isActive = id === active;
  return (
    <ellipse
      cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry}
      fill={isActive ? `${z.color}45` : 'transparent'}
      stroke={isActive ? z.color : 'transparent'}
      strokeWidth={isActive ? 2.5 : 0}
      filter={isActive ? 'url(#zoneGlow)' : 'none'}
    />
  );
}

function ZoneLabel({ id, active }) {
  const l = ZONE_LABELS[id];
  const z = ZONES[id];
  if (!l || !z) return null;
  const isActive = id === active;
  const color = isActive ? z.color : 'rgba(140,120,80,0.55)';
  const weight = isActive ? 'bold' : 'normal';

  return (
    <g>
      <line x1={l.from[0]} y1={l.from[1]} x2={l.to[0]} y2={l.to[1]}
        stroke={isActive ? z.color : 'rgba(160,140,100,0.3)'} strokeWidth={isActive ? 1.5 : 1}
        strokeDasharray={isActive ? 'none' : '3,3'} />
      <text x={l.textX} y={l.textY} textAnchor={l.anchor}
        fontSize="9" fontFamily="'Noto Naskh Arabic', 'Amiri', serif"
        fill={color} fontWeight={weight} direction="rtl">
        {z.label_ar}
      </text>
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════
export default function MakhrajDiagram({ makhraj }) {
  const info = ZONES[makhraj] || null;
  const e = ZONE_ELLIPSES[makhraj];

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', fontFamily: 'var(--font-heading)' }}>
          مَخْرَج الحَرْف · Articulation Point
        </span>
      </div>

      {/* ── SVG Diagram ── */}
      <div style={{ background: '#FDF8F0', borderRadius: 'var(--radius-lg)', border: `1.5px solid ${info ? info.color + '50' : 'rgba(201,168,76,0.2)'}`, overflow: 'hidden', boxShadow: info ? `0 0 20px ${info.color}18` : 'var(--shadow-sm)', transition: 'all 0.3s' }}>
        <svg viewBox="0 0 600 420" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            {/* Glow for active zone */}
            <filter id="zoneGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Soft drop shadow for anatomy shapes */}
            <filter id="softShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="#C5A55A" floodOpacity="0.18" />
            </filter>
            {/* Gradients */}
            <linearGradient id="throatGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EDE0C8" />
              <stop offset="100%" stopColor="#F5EDD8" />
            </linearGradient>
            <linearGradient id="tongueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ECC9A8" />
              <stop offset="100%" stopColor="#D4A87A" />
            </linearGradient>
            <linearGradient id="mouthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF3E8" />
              <stop offset="100%" stopColor="#F5EDD8" />
            </linearGradient>
            <linearGradient id="nasalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAF4F8" />
              <stop offset="100%" stopColor="#D8ECF4" />
            </linearGradient>
            <linearGradient id="lipGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E8B8A0" />
              <stop offset="100%" stopColor="#D4927A" />
            </linearGradient>
          </defs>

          {/* ════════════════════════════════════════════
              ANATOMY — BACKGROUND SHAPES
          ════════════════════════════════════════════ */}

          {/* THROAT outer shape (vertical tube, left side) */}
          <path d="M 28,88 L 28,406 Q 28,418 62,418 L 108,418 Q 120,418 120,406 L 120,88 Z"
            fill="url(#throatGrad)" stroke="#C5A55A" strokeWidth="1.5" filter="url(#softShadow)" />

          {/* Throat zone dividers (subtle lines) */}
          <line x1="30" y1="192" x2="118" y2="192" stroke="rgba(180,150,80,0.3)" strokeWidth="1" strokeDasharray="4,3" />
          <line x1="30" y1="298" x2="118" y2="298" stroke="rgba(180,150,80,0.3)" strokeWidth="1" strokeDasharray="4,3" />

          {/* MOUTH CAVITY outer shell */}
          <path d="M 118,88
            Q 200,74 320,68 Q 430,62 480,72 Q 516,78 534,96
            Q 554,116 558,150 L 558,238
            Q 554,270 532,285 Q 510,300 472,308
            Q 380,318 268,312 Q 175,306 142,284 L 118,254 Z"
            fill="url(#mouthGrad)" stroke="#C5A55A" strokeWidth="1.5" filter="url(#softShadow)" />

          {/* NASAL CAVITY */}
          <path d="M 244,20 L 480,20 Q 508,20 514,38 L 514,80 Q 500,74 480,72 Q 380,64 244,68 L 244,42 Q 244,20 244,20 Z"
            fill="url(#nasalGrad)" stroke="#82C0D4" strokeWidth="1.5" />
          {/* Nasal septum */}
          <line x1="379" y1="20" x2="379" y2="66" stroke="#82C0D4" strokeWidth="1.2" />
          {/* Nasal label */}
          <text x="379" y="50" textAnchor="middle" fontSize="9"
            fontFamily="'Noto Naskh Arabic','Amiri',serif" fill="#4A8EA0">الخَيشوم</text>
          <text x="379" y="14" textAnchor="middle" fontSize="7.5"
            fontFamily="'Lato',sans-serif" fill="rgba(70,120,140,0.7)">Nasal Cavity</text>

          {/* HARD PALATE line (curved roof of mouth, dashed gold) */}
          <path d="M 120,88 Q 240,70 400,68 Q 456,68 490,78 Q 516,86 534,96"
            fill="none" stroke="#C9A030" strokeWidth="2" strokeDasharray="7,4" opacity="0.65" />

          {/* SOFT PALATE / VELUM (drooping from back of hard palate) */}
          <path d="M 154,70 Q 147,100 143,132 Q 138,165 148,196 Q 158,220 146,250 Q 140,268 148,280"
            fill="none" stroke="#C5955A" strokeWidth="2" strokeLinecap="round" />
          {/* Uvula */}
          <ellipse cx="148" cy="292" rx="10" ry="15"
            fill="#E8A090" stroke="#C07860" strokeWidth="1.5" />

          {/* TONGUE body (large organic shape) */}
          <path d="M 118,196
            Q 155,176 215,164
            Q 300,148 400,148
            Q 452,148 490,162
            Q 502,170 504,186
            L 504,205
            Q 495,222 460,230
            Q 390,240 295,238
            Q 212,235 170,226
            Q 140,218 125,208 Z"
            fill="url(#tongueGrad)" stroke="#C08060" strokeWidth="1.5" />

          {/* Tongue surface highlight (subtle) */}
          <path d="M 130,200 Q 220,180 340,174 Q 430,170 494,184"
            fill="none" stroke="rgba(255,220,180,0.5)" strokeWidth="3" strokeLinecap="round" />

          {/* UPPER TEETH */}
          <rect x="490" y="80" width="26" height="40" rx="4"
            fill="#F8F5EC" stroke="#C5B08A" strokeWidth="1.5" />
          <line x1="503" y1="80" x2="503" y2="120" stroke="rgba(180,160,100,0.4)" strokeWidth="0.8" />

          {/* LOWER TEETH */}
          <rect x="490" y="256" width="26" height="38" rx="4"
            fill="#F8F5EC" stroke="#C5B08A" strokeWidth="1.5" />
          <line x1="503" y1="256" x2="503" y2="294" stroke="rgba(180,160,100,0.4)" strokeWidth="0.8" />

          {/* UPPER LIP */}
          <path d="M 516,78 Q 546,92 558,132 Q 564,155 562,175"
            fill="none" stroke="#C07860" strokeWidth="2" strokeLinecap="round" />

          {/* LOWER LIP */}
          <path d="M 562,215 Q 564,238 556,258 Q 545,278 516,293"
            fill="none" stroke="#C07860" strokeWidth="2" strokeLinecap="round" />

          {/* LIP AREA (filled) */}
          <path d="M 516,78 Q 555,96 566,148 L 566,175 Q 558,170 558,155
            Q 554,120 516,78 Z"
            fill="url(#lipGrad)" opacity="0.7" />
          <path d="M 516,293 Q 554,276 558,240 L 558,220 Q 558,230 566,225
            L 566,248 Q 556,278 516,293 Z"
            fill="url(#lipGrad)" opacity="0.7" />
          {/* Lip center gap (mouth opening) */}
          <line x1="558" y1="175" x2="568" y2="175" stroke="rgba(180,100,70,0.5)" strokeWidth="1" />
          <line x1="558" y1="220" x2="568" y2="220" stroke="rgba(180,100,70,0.5)" strokeWidth="1" />

          {/* Alveolar ridge (bump behind upper teeth) */}
          <path d="M 490,78 Q 476,70 470,74 Q 466,76 468,80"
            fill="none" stroke="#C5B08A" strokeWidth="1.5" />

          {/* ════════════════════════════════════════════
              ZONE INTERACTIVE ELLIPSES
          ════════════════════════════════════════════ */}
          {Object.keys(ZONES).map(id => (
            <ZoneEllipse key={id} id={id} active={makhraj} />
          ))}

          {/* ════════════════════════════════════════════
              ZONE LABELS WITH LEADER LINES
          ════════════════════════════════════════════ */}
          {Object.keys(ZONES).map(id => (
            <ZoneLabel key={id} id={id} active={makhraj} />
          ))}

          {/* ════════════════════════════════════════════
              PULSING DOT — active zone center
          ════════════════════════════════════════════ */}
          {info && e && (
            <g>
              {/* Outer pulse ring */}
              <circle cx={e.cx} cy={e.cy} r="11" fill="transparent"
                stroke={info.color} strokeWidth="2" opacity="0.5">
                <animate attributeName="r" values="10;18;10" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1.4s" repeatCount="indefinite" />
              </circle>
              {/* Solid dot */}
              <circle cx={e.cx} cy={e.cy} r="7" fill={info.color} opacity="0.92" />
              <circle cx={e.cx} cy={e.cy} r="3" fill="white" />
            </g>
          )}

          {/* ════════════════════════════════════════════
              FIXED ANATOMY LABELS (always visible)
          ════════════════════════════════════════════ */}

          {/* Throat zone text labels — always inside */}
          {[
            { y: 145, label_ar: 'أَدنى الحَلق', label_en: 'Upper', zone: 'throat_upper' },
            { y: 248, label_ar: 'وَسَط الحَلق', label_en: 'Middle', zone: 'throat_mid' },
            { y: 355, label_ar: 'أَقصى الحَلق', label_en: 'Deep', zone: 'throat_deep' },
          ].map(({ y, label_ar, label_en, zone }) => {
            const isActive = makhraj === zone;
            const color = isActive ? ZONES[zone].color : 'rgba(120,90,50,0.6)';
            return (
              <g key={zone}>
                <text x="74" y={y-4} textAnchor="middle" fontSize="7.5"
                  fontFamily="'Lato',sans-serif" fill={color} fontWeight={isActive ? 'bold' : 'normal'}>
                  {label_en}
                </text>
                <text x="74" y={y+9} textAnchor="middle" fontSize="8.5"
                  fontFamily="'Noto Naskh Arabic','Amiri',serif" fill={color} fontWeight={isActive ? 'bold' : 'normal'}
                  direction="rtl">
                  {label_ar}
                </text>
              </g>
            );
          })}

          {/* Hard palate label */}
          <text x="310" y="60" textAnchor="middle" fontSize="7.5"
            fontFamily="'Lato',sans-serif" fill="rgba(160,130,50,0.55)">
            Hard Palate — الحَنك
          </text>

          {/* Direction hints */}
          <text x="74"  y="412" textAnchor="middle" fontSize="8" fontFamily="'Lato',sans-serif" fill="rgba(120,100,60,0.5)">Throat ↓</text>
          <text x="544" y="312" textAnchor="middle" fontSize="8" fontFamily="'Lato',sans-serif" fill="rgba(120,100,60,0.5)">Lips →</text>

          {/* "Select a letter" watermark when nothing selected */}
          {!makhraj && (
            <text x="300" y="220" textAnchor="middle" fontSize="14"
              fontFamily="'Lato',sans-serif" fill="rgba(120,100,60,0.22)" fontStyle="italic">
              Tap a letter to see its articulation point
            </text>
          )}
        </svg>
      </div>

      {/* ── Info Panel ── */}
      {info ? (
        <div style={{ marginTop: '0.85rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: `1.5px solid ${info.color}35`, boxShadow: `0 4px 16px ${info.color}15` }}>
          {/* Header */}
          <div style={{ background: info.color, padding: '0.75rem 1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{info.label_en}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>{info.sub_en}</div>
            </div>
            <div style={{ textAlign: 'right', direction: 'rtl' }}>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>{info.label_ar}</div>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>{info.sub_ar}</div>
            </div>
          </div>

          {/* Body */}
          <div style={{ background: 'var(--white)', padding: '0.85rem 1.1rem' }}>
            {/* Letters */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>Letters:</span>
              {info.letters.map(l => (
                <span key={l} style={{
                  fontFamily: 'var(--font-arabic)', fontSize: '1.4rem',
                  color: info.color, lineHeight: 1,
                  background: `${info.color}12`,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius)',
                  border: `1px solid ${info.color}30`,
                }}>{l}</span>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.83rem', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
              {info.desc}
            </p>

            {/* How to pronounce */}
            <div style={{ padding: '0.5rem 0.8rem', background: `${info.color}0D`, borderRadius: 'var(--radius)', borderLeft: `3px solid ${info.color}` }}>
              <span style={{ fontSize: '0.7rem', color: info.color, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>How to: </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-mid)' }}>{info.how}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '0.85rem', padding: '0.75rem 1rem', background: 'var(--cream-dark)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed rgba(201,168,76,0.3)' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
            Select a letter above to see its <strong>Makhraj</strong> — the exact articulation point in the mouth/throat.
          </p>
        </div>
      )}
    </div>
  );
}
