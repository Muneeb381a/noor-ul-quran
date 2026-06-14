import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(160deg, var(--green-deep) 0%, #0D2B1D 100%)',
      color: 'rgba(255,255,255,0.7)',
      borderTop: '1px solid rgba(201,168,76,0.2)',
    }}>
      {/* Gold top line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem 1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {/* Brand */}
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.6rem', color: 'var(--gold-light)', marginBottom: '0.25rem', direction: 'rtl', textAlign: 'right' }}>نور القرآن</div>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>
            A complete Quranic learning platform. <br />Open source. Free forever.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem', fontWeight: 600 }}>Learn</p>
            {[['Quran Reader', '/quran'], ['Qaida', '/learn/qaida'], ['Tajweed', '/learn/tajweed'], ['Duas', '/learn/duas']].map(([l, t]) => (
              <div key={t} style={{ marginBottom: '0.4rem' }}>
                <Link to={t} style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >{l}</Link>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem', fontWeight: 600 }}>Account</p>
            {[['Login', '/login'], ['Register', '/register'], ['Hifz Tracker', '/hifz']].map(([l, t]) => (
              <div key={t} style={{ marginBottom: '0.4rem' }}>
                <Link to={t} style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >{l}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
          NoorulQuran — Open Source MIT License
        </p>
        <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '0.9rem', color: 'rgba(201,168,76,0.5)', direction: 'rtl' }}>
          بِسْمِ اللَّهِ
        </p>
      </div>
    </footer>
  );
}
