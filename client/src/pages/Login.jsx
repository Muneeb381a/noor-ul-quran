import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// ── Shared input component ─────────────────────────────────────────────────
function Field({ label, type = 'text', value, onChange, icon, placeholder, required, minLength }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: 'relative', marginBottom: '0.25rem' }}>
      <label style={{
        position: 'absolute', left: '2.8rem', top: active ? '-0.55rem' : '0.95rem',
        fontSize: active ? '0.7rem' : '0.9rem',
        color: active ? 'var(--green-mid)' : 'var(--text-light)',
        background: active ? 'var(--white)' : 'transparent',
        padding: active ? '0 0.3rem' : '0',
        transition: 'all 0.18s ease',
        pointerEvents: 'none',
        zIndex: 1,
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
          width: '100%',
          padding: '0.85rem 1rem 0.85rem 2.8rem',
          border: `1.5px solid ${focused ? 'var(--green-mid)' : '#E0D8CC'}`,
          borderRadius: 'var(--radius-lg)',
          background: 'var(--white)',
          fontSize: '0.95rem',
          color: 'var(--text-dark)',
          outline: 'none',
          transition: 'border-color 0.18s, box-shadow 0.18s',
          boxShadow: focused ? '0 0 0 3px rgba(20,83,45,0.12)' : 'none',
        }}
      />
    </div>
  );
}

// ── Decorative left panel ──────────────────────────────────────────────────
function LeftPanel() {
  return (
    <div style={{
      background: 'linear-gradient(160deg, #052e16 0%, #14532D 60%, #15803D 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '3rem 2rem', position: 'relative', overflow: 'hidden',
      minHeight: 500,
    }}>
      {/* Geometric background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(245,158,11,1) 0, rgba(245,158,11,1) 1px, transparent 0, transparent 50%),
          repeating-linear-gradient(-45deg, rgba(245,158,11,1) 0, rgba(245,158,11,1) 1px, transparent 0, transparent 50%)
        `,
        backgroundSize: '30px 30px',
      }} />

      {/* Outer decorative ring */}
      <div style={{
        position: 'absolute', width: 340, height: 340,
        border: '1px solid rgba(245,158,11,0.12)',
        borderRadius: '50%', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
      }} />
      <div style={{
        position: 'absolute', width: 260, height: 260,
        border: '1px solid rgba(245,158,11,0.1)',
        borderRadius: '50%', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Arabic star ornament */}
        <div style={{ fontSize: '2rem', color: 'rgba(245,158,11,0.6)', marginBottom: '1rem', letterSpacing: '0.5rem' }}>
          ✦ ✦ ✦
        </div>

        {/* App name */}
        <h1 style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: 'clamp(2.8rem, 5vw, 4rem)',
          color: 'var(--gold-light)',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          direction: 'rtl',
          textShadow: '0 2px 20px rgba(245,158,11,0.3)',
        }}>نور القرآن</h1>

        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.75rem',
          color: '#A8A29E',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
        }}>NoorulQuran</p>

        {/* Gold divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.6))' }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>❖</span>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(to left, transparent, rgba(245,158,11,0.6))' }} />
        </div>

        {/* Quranic verse */}
        <p style={{
          fontFamily: 'var(--font-quran)',
          fontSize: '1.3rem',
          color: '#1C1917',
          direction: 'rtl',
          lineHeight: 2.2,
          marginBottom: '0.5rem',
        }}>
          وَرَتِّلِ ٱلۡقُرۡءَانَ تَرۡتِيلٗا
        </p>
        <p style={{ fontSize: '0.8rem', color: '#A8A29E', fontStyle: 'italic' }}>
          "Recite the Quran with measured recitation"
        </p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(245,158,11,0.5)', marginTop: '0.25rem' }}>
          — Al-Muzzammil 73:4
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {['📖 Quran Reader', '🎓 Hifz Tracker', '✏️ Qaida', '🤲 Duas'].map(f => (
            <span key={f} style={{
              padding: '0.3rem 0.75rem',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              color: '#57534E',
            }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Login Page ─────────────────────────────────────────────────────────────
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Marhaba, ${user.name}! 🌙`);
      navigate(user.role === 'teacher' ? '/teacher' : user.role === 'parent' ? '/parent' : '/dashboard');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
      background: '#FFFBEB',
    }}>
      {/* Left decorative panel */}
      <LeftPanel />

      {/* Right form panel */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        background: '#FFFBEB',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
                borderRadius: 'var(--radius)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: 'var(--gold-light)',
              }}>ن</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-light)', letterSpacing: '0.1em' }}>NOORULQURAN</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', color: 'var(--green-deep)', marginBottom: '0.4rem', fontWeight: 700 }}>
              Welcome back
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              Sign in to continue your Quranic journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <Field
              label="Email address" type="email" icon="✉️"
              placeholder="you@example.com"
              value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
            />
            <Field
              label="Password" type="password" icon="🔒"
              placeholder="Your password"
              value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
            />

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '0.9rem',
                background: loading ? 'var(--green-light)' : 'linear-gradient(135deg, var(--green-deep), var(--green-mid))',
                color: '#fff', border: 'none',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.95rem', fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.05em',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(20,83,45,0.25)',
                transition: 'all 0.2s',
                marginTop: '0.5rem',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(20,83,45,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,83,45,0.25)'; }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.75rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>New to NoorulQuran?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
          </div>

          {/* Register link */}
          <Link to="/register" style={{
            display: 'block', width: '100%', padding: '0.85rem',
            background: 'transparent',
            border: '1.5px solid rgba(20,83,45,0.2)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            color: 'var(--green-deep)',
            fontWeight: 600, fontSize: '0.9rem',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-mid)'; e.currentTarget.style.background = 'var(--green-pale)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,83,45,0.2)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Create a Free Account
          </Link>

          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '2rem' }}>
            By signing in you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
