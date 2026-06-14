import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHifz } from '../../context/HifzContext';
import { today } from '../../utils/dateHelpers';
import toast from 'react-hot-toast';

/* Ayah counts per surah (index 0 = surah 1) */
const AYAH_COUNTS = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,43,30,60,29,15,21,11,8,8,19,5,8,8,11,11,13,28,12,3,9,5,4,7,3,6,3,5,4,5,6];

const LOG_TYPES = [
  { value: 'sabaq',  label: 'Sabaq',  urdu: 'سبق',   icon: '📖', desc: 'New memorization today',    color: '#14532D', bg: 'linear-gradient(135deg,#14532D,#2E7D32)' },
  { value: 'sabaqi', label: 'Sabaqi', urdu: 'سبقی',  icon: '🔄', desc: 'Yesterday\'s revision',     color: '#1565C0', bg: 'linear-gradient(135deg,#1565C0,#1976D2)' },
  { value: 'manzil', label: 'Manzil', urdu: 'منزل',  icon: '⭐', desc: 'Weekly revision portion',   color: '#6A1B9A', bg: 'linear-gradient(135deg,#6A1B9A,#8E24AA)' },
  { value: 'dhor',   label: 'Dhor',   urdu: 'دور',   icon: '🎯', desc: 'Complete revision cycle',   color: '#E65100', bg: 'linear-gradient(135deg,#E65100,#F57C00)' },
];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '0.35rem' }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.1rem',
            fontSize: '1.6rem', lineHeight: 1,
            color: n <= (hover || value) ? '#F59E0B' : '#DDD',
            transform: n <= (hover || value) ? 'scale(1.15)' : 'scale(1)',
            transition: 'all 0.15s',
          }}
        >★</button>
      ))}
      <span style={{ fontSize: '0.8rem', color: '#78716C', alignSelf: 'center', marginLeft: '0.25rem' }}>
        {['', 'Poor', 'Fair', 'Good', 'Great', 'Perfect'][hover || value]}
      </span>
    </div>
  );
}

export default function NewLog() {
  const { addLog } = useHifz();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    log_date: today(), log_type: 'sabaq',
    surah_start: '', ayah_start: '', surah_end: '', ayah_end: '',
    quality_rating: 3, duration_min: '', notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: null }));
  };
  const setVal = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: null })); };

  const validate = () => {
    const e = {};
    const ss = parseInt(form.surah_start), se = parseInt(form.surah_end);
    const as = parseInt(form.ayah_start), ae = parseInt(form.ayah_end);
    if (!form.surah_start || ss < 1 || ss > 114) e.surah_start = 'Must be 1–114';
    if (!form.surah_end || se < 1 || se > 114) e.surah_end = 'Must be 1–114';
    if (ss && (!form.ayah_start || as < 1 || as > (AYAH_COUNTS[ss - 1] || 999))) e.ayah_start = `Max ${AYAH_COUNTS[ss - 1] || '?'} ayahs`;
    if (se && (!form.ayah_end || ae < 1 || ae > (AYAH_COUNTS[se - 1] || 999))) e.ayah_end = `Max ${AYAH_COUNTS[se - 1] || '?'} ayahs`;
    if (se < ss) e.surah_end = 'Cannot be less than start';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await addLog({ ...form, quality: form.quality_rating });
      toast.success('Session logged!');
      navigate('/hifz');
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedType = LOG_TYPES.find(t => t.value === form.log_type);

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem',
    border: '1.5px solid rgba(20,83,45,0.18)',
    borderRadius: 10, fontSize: '0.9rem', background: '#fff',
    color: '#1C1917', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.18s',
  };
  const errStyle = { fontSize: '0.7rem', color: '#ef5350', marginTop: '0.25rem' };
  const labelStyle = { display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#A8A29E', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(150deg,#052e16,#14532D,#14532D)',
        padding: '2.5rem 1.5rem 2rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <Link to="/hifz" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>← Back to Hifz</Link>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.6rem', color: '#fff', margin: 0 }}>Log Session</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem', margin: '0.3rem 0 0' }}>Record your hifz progress for today</p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <form onSubmit={handleSubmit}>

          {/* Log Type selector */}
          <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid rgba(28,25,23,0.09)', padding: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.78rem', fontWeight: 700, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Session Type</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.6rem' }}>
              {LOG_TYPES.map(t => (
                <button key={t.value} type="button" onClick={() => setVal('log_type', t.value)} style={{
                  padding: '0.85rem 1rem', borderRadius: 12, border: '2px solid',
                  borderColor: form.log_type === t.value ? t.color : 'rgba(0,0,0,0.1)',
                  background: form.log_type === t.value ? t.color + '12' : 'transparent',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '1rem' }}>{t.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: form.log_type === t.value ? t.color : '#333' }}>{t.label}</span>
                    <span style={{ fontFamily: '"Noto Nastaliq Urdu",serif', fontSize: '0.8rem', color: '#999', marginRight: 'auto', marginLeft: 'auto' }}>{t.urdu}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.68rem', color: '#78716C' }}>{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date + Duration */}
          <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid rgba(28,25,23,0.09)', padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" value={form.log_date} onChange={set('log_date')} style={inputStyle} required
                  onFocus={e => e.target.style.borderColor = '#14532D'}
                  onBlur={e => e.target.style.borderColor = 'rgba(20,83,45,0.18)'} />
              </div>
              <div>
                <label style={labelStyle}>Duration (minutes)</label>
                <input type="number" min="1" max="480" placeholder="e.g. 30" value={form.duration_min} onChange={set('duration_min')} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#14532D'}
                  onBlur={e => e.target.style.borderColor = 'rgba(20,83,45,0.18)'} />
              </div>
            </div>
          </div>

          {/* Range */}
          <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid rgba(28,25,23,0.09)', padding: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.78rem', fontWeight: 700, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ayah Range</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={labelStyle}>From Surah</label>
                <input type="number" min="1" max="114" placeholder="1–114" value={form.surah_start} onChange={set('surah_start')} style={{ ...inputStyle, borderColor: errors.surah_start ? '#e53935' : 'rgba(20,83,45,0.18)' }} required
                  onFocus={e => e.target.style.borderColor = '#14532D'} onBlur={e => e.target.style.borderColor = errors.surah_start ? '#e53935' : 'rgba(20,83,45,0.18)'} />
                {errors.surah_start && <p style={errStyle}>{errors.surah_start}</p>}
                {form.surah_start && AYAH_COUNTS[parseInt(form.surah_start)-1] && <p style={{ fontSize: '0.65rem', color: '#aaa', marginTop: '0.2rem' }}>{AYAH_COUNTS[parseInt(form.surah_start)-1]} ayahs</p>}
              </div>
              <div>
                <label style={labelStyle}>From Ayah</label>
                <input type="number" min="1" max={AYAH_COUNTS[parseInt(form.surah_start)-1] || 999} placeholder="Ayah #" value={form.ayah_start} onChange={set('ayah_start')} style={{ ...inputStyle, borderColor: errors.ayah_start ? '#e53935' : 'rgba(20,83,45,0.18)' }} required
                  onFocus={e => e.target.style.borderColor = '#14532D'} onBlur={e => e.target.style.borderColor = errors.ayah_start ? '#e53935' : 'rgba(20,83,45,0.18)'} />
                {errors.ayah_start && <p style={errStyle}>{errors.ayah_start}</p>}
              </div>
              <div>
                <label style={labelStyle}>To Surah</label>
                <input type="number" min="1" max="114" placeholder="1–114" value={form.surah_end} onChange={set('surah_end')} style={{ ...inputStyle, borderColor: errors.surah_end ? '#e53935' : 'rgba(20,83,45,0.18)' }} required
                  onFocus={e => e.target.style.borderColor = '#14532D'} onBlur={e => e.target.style.borderColor = errors.surah_end ? '#e53935' : 'rgba(20,83,45,0.18)'} />
                {errors.surah_end && <p style={errStyle}>{errors.surah_end}</p>}
                {form.surah_end && AYAH_COUNTS[parseInt(form.surah_end)-1] && <p style={{ fontSize: '0.65rem', color: '#aaa', marginTop: '0.2rem' }}>{AYAH_COUNTS[parseInt(form.surah_end)-1]} ayahs</p>}
              </div>
              <div>
                <label style={labelStyle}>To Ayah</label>
                <input type="number" min="1" max={AYAH_COUNTS[parseInt(form.surah_end)-1] || 999} placeholder="Ayah #" value={form.ayah_end} onChange={set('ayah_end')} style={{ ...inputStyle, borderColor: errors.ayah_end ? '#e53935' : 'rgba(20,83,45,0.18)' }} required
                  onFocus={e => e.target.style.borderColor = '#14532D'} onBlur={e => e.target.style.borderColor = errors.ayah_end ? '#e53935' : 'rgba(20,83,45,0.18)'} />
                {errors.ayah_end && <p style={errStyle}>{errors.ayah_end}</p>}
              </div>
            </div>
          </div>

          {/* Quality + Notes */}
          <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid rgba(28,25,23,0.09)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Quality Rating</label>
              <StarRating value={form.quality_rating} onChange={v => setVal('quality_rating', v)} />
            </div>
            <div>
              <label style={labelStyle}>Notes (optional)</label>
              <textarea
                placeholder="Any mistakes, areas to improve, or reminders..."
                value={form.notes} onChange={set('notes')}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
                onFocus={e => e.target.style.borderColor = '#14532D'}
                onBlur={e => e.target.style.borderColor = 'rgba(20,83,45,0.18)'}
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '1rem',
            background: loading ? '#ccc' : selectedType?.bg || 'linear-gradient(135deg,#14532D,#2E7D32)',
            color: '#fff', border: 'none', borderRadius: 14,
            fontFamily: '"Playfair Display",serif', fontSize: '1rem', fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(20,83,45,0.35)',
            transition: 'all 0.2s', letterSpacing: '0.04em',
          }}>
            {loading ? 'Saving...' : `${selectedType?.icon || '📖'} Save ${selectedType?.label || 'Log'}`}
          </button>
        </form>
      </div>
    </div>
  );
}
