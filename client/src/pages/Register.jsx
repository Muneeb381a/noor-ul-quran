import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Field({ label, type = 'text', value, onChange, icon, placeholder, required, minLength }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        position: 'absolute', left: '2.8rem', top: active ? '-0.55rem' : '0.95rem',
        fontSize: active ? '0.7rem' : '0.9rem',
        color: active ? 'var(--green-mid)' : 'var(--text-light)',
        background: active ? 'var(--white)' : 'transparent',
        padding: active ? '0 0.3rem' : '0',
        transition: 'all 0.18s ease',
        pointerEvents: 'none', zIndex: 1,
        fontWeight: active ? 600 : 400,
      }}>{label}</label>

      <span style={{
        position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)',
        fontSize: '1rem', userSelect: 'none',
        opacity: focused ? 1 : 0.5, transition: 'opacity 0.18s',
      }}>{icon}</span>

      <input
        type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required} minLength={minLength}
        placeholder={focused ? placeholder : ''}
        style={{
          width: '100%', padding: '0.85rem 1rem 0.85rem 2.8rem',
          border: `1.5px solid ${focused ? 'var(--green-mid)' : '#E0D8CC'}`,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--white)', fontSize: '0.95rem',
          color: 'var(--text-dark)', outline: 'none',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          boxShadow: focused ? '0 0 0 3px rgba(20,83,45,0.12)' : 'none',
        }}
      />
    </div>
  );
}

const ROLES = [
  { key: 'student', icon: '🎓', label: 'Student',  urdu: 'طالب علم', desc: 'Learn & track Hifz' },
  { key: 'teacher', icon: '👨‍🏫', label: 'Teacher',  urdu: 'استاد',    desc: 'Manage students'  },
  { key: 'parent',  icon: '👨‍👩‍👦', label: 'Parent',   urdu: 'والدین',   desc: 'Monitor progress' },
];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Ahlan wa sahlan 🌙');
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed — please try again');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)',
      background: '#FFFBEB',
    }}>
      {/* Left decorative panel */}
      <div style={{
        background: 'linear-gradient(160deg, #052e16 0%, #14532D 60%, #15803D 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(45deg, rgba(245,158,11,1) 0, rgba(245,158,11,1) 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, rgba(245,158,11,1) 0, rgba(245,158,11,1) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '30px 30px',
        }} />
        <div style={{ position: 'absolute', width: 340, height: 340, border: '1px solid rgba(245,158,11,0.12)', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-arabic)', fontSize: 'clamp(2.4rem,4vw,3.5rem)', color: 'var(--gold-light)', lineHeight: 1.2, marginBottom: '0.5rem', direction: 'rtl', textShadow: '0 2px 20px rgba(245,158,11,0.3)' }}>
            نور القرآن
          </h1>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', color: '#A8A29E', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            NoorulQuran
          </p>

          {/* Role descriptions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 260, margin: '0 auto' }}>
            {ROLES.map(r => (
              <div key={r.key} style={{
                display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem',
                background: form.role === r.key ? 'rgba(245,158,11,0.12)' : 'rgba(28,25,23,0.04)',
                border: `1px solid ${form.role === r.key ? 'rgba(245,158,11,0.35)' : 'rgba(28,25,23,0.09)'}`,
                borderRadius: 'var(--radius-lg)',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: form.role === r.key ? 'var(--gold-light)' : 'rgba(255,255,255,0.78)', fontWeight: 600, fontSize: '0.9rem' }}>{r.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
            {[['Free', 'Forever'], ['114', 'Surahs'], ['6236', 'Ayahs']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: '0.68rem', color: '#A8A29E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#FFFBEB', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 460, padding: '0.5rem 0' }}>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: 'var(--gold-light)' }}>ن</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-light)', letterSpacing: '0.1em' }}>NOORULQURAN</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', color: 'var(--green-deep)', marginBottom: '0.35rem', fontWeight: 700 }}>
              Create your account
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>
              Free forever — start your Quranic journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name + Email */}
            <Field label="Full Name" icon="👤" placeholder="Your name"
              value={form.name} onChange={set('name')} required />
            <Field label="Email address" type="email" icon="✉️" placeholder="you@example.com"
              value={form.email} onChange={set('email')} required />
            <Field label="Password" type="password" icon="🔒" placeholder="Min 6 characters"
              value={form.password} onChange={set('password')} required minLength={6} />

            {/* Role selector */}
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                I am a...
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {ROLES.map(r => {
                  const active = form.role === r.key;
                  return (
                    <button
                      key={r.key} type="button"
                      onClick={() => setForm(p => ({ ...p, role: r.key }))}
                      style={{
                        padding: '0.75rem 0.5rem',
                        background: active ? 'var(--green-pale)' : 'var(--white)',
                        border: `1.5px solid ${active ? 'var(--green-mid)' : '#E0D8CC'}`,
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.18s',
                        boxShadow: active ? '0 0 0 3px rgba(20,83,45,0.1)' : 'none',
                      }}
                    >
                      <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{r.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: active ? 'var(--green-deep)' : 'var(--text-dark)' }}>{r.label}</div>
                      <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.85rem', color: active ? 'var(--green-mid)' : 'var(--text-light)' }}>{r.urdu}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '0.9rem',
                background: loading ? 'var(--green-light)' : 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
                color: '#fff', border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.95rem', fontWeight: 700,
                fontFamily: 'var(--font-heading)', letterSpacing: '0.05em',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(20,83,45,0.25)',
                transition: 'all 0.2s',
                marginTop: '0.25rem',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(20,83,45,0.35)'; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,83,45,0.25)'; }}
            >
              {loading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Already have an account?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
          </div>

          <Link to="/login" style={{
            display: 'block', width: '100%', padding: '0.85rem',
            border: '1.5px solid rgba(20,83,45,0.2)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            color: 'var(--green-deep)', fontWeight: 600, fontSize: '0.9rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-mid)'; e.currentTarget.style.background = 'var(--green-pale)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,83,45,0.2)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Sign In Instead
          </Link>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '1.5rem', lineHeight: 1.6 }}>
            By creating an account, you agree to our Terms of Service.<br />
            NoorulQuran is free and open source — no ads, no subscriptions.
          </p>
        </div>
      </div>
    </div>
  );
}
