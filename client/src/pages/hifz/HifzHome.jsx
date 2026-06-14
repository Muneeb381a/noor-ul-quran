import { Link } from 'react-router-dom';
import { useStreak } from '../../hooks/useStreak';
import { useQuery } from '@tanstack/react-query';
import { getLogs } from '../../services/hifzService';

const LOG_TYPE_META = {
  sabaq:   { label: 'Sabaq',   color: '#22C55E', icon: '📖' },
  sabaqi:  { label: 'Sabaqi',  color: '#64B5F6', icon: '🔄' },
  manzil:  { label: 'Manzil',  color: '#B39DDB', icon: '⭐' },
  dhor:    { label: 'Dhor',    color: '#FF8A65', icon: '🎯' },
};

const QUALITY_STARS = (q) => '★'.repeat(q || 0) + '☆'.repeat(5 - (q || 0));

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

function WeekChart({ logs }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  const counts = Array(7).fill(0);
  (logs || []).forEach(log => {
    const d = new Date(log.log_date);
    const diff = Math.round((new Date() - d) / 86400000);
    if (diff >= 0 && diff < 7) {
      const idx = (today - diff + 7) % 7;
      counts[idx]++;
    }
  });
  const reordered = [...Array(7)].map((_, i) => ({ day: days[(today - 6 + i + 7) % 7], count: counts[(today - 6 + i + 7) % 7], isToday: i === 6 }));
  const max = Math.max(...reordered.map(r => r.count), 1);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', height: 72, padding: '0 0.25rem' }}>
      {reordered.map((r, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{
            width: '100%', borderRadius: 6,
            background: r.isToday ? 'linear-gradient(180deg, #F59E0B, #A07830)' : r.count > 0 ? 'rgba(20,83,45,0.5)' : 'rgba(20,83,45,0.12)',
            height: `${Math.max(8, (r.count / max) * 48)}px`,
            transition: 'height 0.4s ease',
            boxShadow: r.isToday ? '0 2px 8px rgba(245,158,11,0.4)' : 'none',
          }} />
          <span style={{ fontSize: '0.6rem', color: r.isToday ? '#F59E0B' : '#A8A29E', fontWeight: r.isToday ? 700 : 400 }}>{r.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function HifzHome() {
  const { data: streak } = useStreak();
  const { data: logs, isLoading } = useQuery({ queryKey: ['hifz-logs'], queryFn: getLogs });

  const totalSessions = logs?.length || 0;
  const todayCount = (logs || []).filter(l => {
    const d = new Date(l.log_date);
    const t = new Date();
    return d.toDateString() === t.toDateString();
  }).length;

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* Hero header */}
      <div style={{
        background: 'linear-gradient(150deg, #052e16 0%, #14532D 55%, #14532D 100%)',
        padding: '3rem 1.5rem 2.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: 'rgba(245,158,11,0.7)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            🎯 تتبع الحفظ
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#fff', margin: '0 0 0.4rem' }}>Hifz Tracker</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', margin: 0 }}>Log your daily sabaq, track streaks, and review mistakes</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/hifz/new-log" style={{
                padding: '0.65rem 1.4rem',
                background: 'linear-gradient(135deg, #E2B84E, #F59E0B)',
                color: '#050E08', fontWeight: 800, fontSize: '0.82rem',
                borderRadius: 99, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
              }}>➕ New Log</Link>
              <Link to="/hifz/mistakes" style={{
                padding: '0.65rem 1.3rem',
                background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.4)',
                color: '#EF9A9A', fontWeight: 600, fontSize: '0.82rem',
                borderRadius: 99, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              }}>⚠️ Mistakes</Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🔥', value: streak?.current_streak || 0, label: 'Day Streak', sub: 'Keep it going!', color: '#FF8A65' },
            { icon: '🏆', value: streak?.longest_streak || 0, label: 'Best Streak', sub: 'Personal record', color: '#F59E0B' },
            { icon: '📋', value: totalSessions, label: 'Total Sessions', sub: 'All time', color: '#22C55E' },
            { icon: '📅', value: todayCount, label: "Today's Logs", sub: new Date().toLocaleDateString('en-PK', { weekday: 'long' }), color: '#64B5F6' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#ffffff', borderRadius: 18,
              border: '1px solid rgba(28,25,23,0.09)',
              padding: '1.1rem 1.2rem',
              display: 'flex', alignItems: 'center', gap: '0.9rem',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}14`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <p style={{ margin: 0, fontFamily: '"Playfair Display",serif', fontSize: '1.4rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', fontWeight: 700, color: '#44403C' }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: '0.65rem', color: '#78716C' }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Week chart + Quick tip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Weekly activity */}
          <div style={{ background: 'linear-gradient(135deg, #14532D, #14532D)', borderRadius: 18, padding: '1.4rem', border: '1px solid rgba(245,158,11,0.15)' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📊 This Week</p>
            <WeekChart logs={logs} />
          </div>

          {/* Session breakdown */}
          <div style={{ background: '#ffffff', borderRadius: 18, padding: '1.4rem', border: '1px solid rgba(28,25,23,0.09)' }}>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', fontWeight: 700, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📈 Session Types</p>
            {Object.entries(LOG_TYPE_META).map(([type, meta]) => {
              const count = (logs || []).filter(l => l.log_type === type).length;
              const pct = totalSessions ? Math.round((count / totalSessions) * 100) : 0;
              return (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem' }}>
                  <span style={{ fontSize: '0.8rem', width: 16 }}>{meta.icon}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: meta.color, width: 52 }}>{meta.label}</span>
                  <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'rgba(28,25,23,0.09)', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: meta.color, borderRadius: 99, transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#78716C', width: 24, textAlign: 'right' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Logs */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid rgba(28,25,23,0.09)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid rgba(28,25,23,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(245,158,11,0.04)' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'rgba(245,158,11,0.85)' }}>Recent Sessions</h3>
            <Link to="/hifz/new-log" style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700, textDecoration: 'none' }}>+ Add New</Link>
          </div>

          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#78716C', fontSize: '0.85rem' }}>Loading sessions...</div>
          ) : !(logs?.length) ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📖</p>
              <p style={{ fontWeight: 700, color: '#57534E', fontSize: '0.95rem' }}>No sessions yet</p>
              <p style={{ color: '#78716C', fontSize: '0.82rem', marginBottom: '1.25rem' }}>Log your first sabaq to start tracking</p>
              <Link to="/hifz/new-log" style={{ padding: '0.6rem 1.4rem', background: 'linear-gradient(135deg,#14532D,#15803D)', color: '#fff', borderRadius: 99, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 700 }}>Log First Session</Link>
            </div>
          ) : (
            <div>
              {(logs || []).slice(0, 8).map((log, i) => {
                const meta = LOG_TYPE_META[log.log_type] || LOG_TYPE_META.sabaq;
                return (
                  <div key={log.id} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.85rem 1.4rem',
                    borderBottom: i < Math.min(logs.length, 8) - 1 ? '1px solid rgba(28,25,23,0.07)' : 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(28,25,23,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${meta.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{meta.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: meta.color }}>{meta.label}</span>
                        <span style={{ fontSize: '0.72rem', color: '#A8A29E' }}>
                          Surah {log.surah_start}:{log.ayah_start} → {log.surah_end}:{log.ayah_end}
                        </span>
                      </div>
                      {log.quality_rating && (
                        <span style={{ fontSize: '0.65rem', color: '#F59E0B', letterSpacing: '0.05em' }}>{QUALITY_STARS(log.quality_rating)}</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#A8A29E', whiteSpace: 'nowrap', flexShrink: 0 }}>{formatDate(log.log_date)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
