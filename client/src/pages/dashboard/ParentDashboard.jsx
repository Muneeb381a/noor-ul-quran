import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import toast from 'react-hot-toast';

function getInitials(name = '') {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

const LOG_TYPE_META = {
  sabaq:  { label: 'Sabaq',  icon: '📖', color: '#1B4332', bg: '#E8F5E9' },
  sabaqi: { label: 'Sabaqi', icon: '🔄', color: '#1565C0', bg: '#E3F2FD' },
  manzil: { label: 'Manzil', icon: '⭐', color: '#6A1B9A', bg: '#F3E5F5' },
  dhor:   { label: 'Dhor',   icon: '🎯', color: '#E65100', bg: '#FFF3E0' },
};

function StreakBadge({ streak }) {
  if (!streak) return null;
  const fire = streak >= 30 ? '🔥🔥' : streak >= 7 ? '🔥' : '🌱';
  return (
    <span style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem', borderRadius: 99, background: streak >= 7 ? '#FFF3E0' : '#F0F0F0', color: streak >= 7 ? '#E65100' : '#888', fontWeight: 700 }}>
      {fire} {streak} day streak
    </span>
  );
}

export default function ParentDashboard() {
  const { user } = useAuth();
  const [linkCode, setLinkCode] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [linking, setLinking] = useState(false);

  const { data: children = [], isLoading, refetch } = useQuery({
    queryKey: ['parent-children'],
    queryFn: () => api.get('/user/children').then(r => r.data),
  });

  const { data: childLogs = [] } = useQuery({
    queryKey: ['child-logs', selectedChild?.id],
    queryFn: () => api.get(`/user/children/${selectedChild.id}/logs`).then(r => r.data),
    enabled: !!selectedChild,
  });

  const linkChild = async () => {
    if (!linkCode.trim()) return;
    setLinking(true);
    try {
      await api.post('/user/children/link', { code: linkCode.trim() });
      toast.success('Child linked successfully!');
      setLinkCode('');
      refetch();
    } catch {
      toast.error('Invalid code or child already linked');
    } finally {
      setLinking(false);
    }
  };

  const active = children.find(c => c.id === selectedChild?.id) || children[0];

  return (
    <div style={{ minHeight: '100vh', background: '#F6F1E9' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg,#060E09,#0D2818,#1B4332)', padding: '3rem 1.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>👨‍👩‍👦 لوحة الوالدين</p>
          <h1 style={{ fontFamily: '"Cinzel",serif', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', margin: '0 0 0.3rem' }}>
            Welcome, {user?.name?.split(' ')[0] || 'Parent'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', margin: 0 }}>Monitor your child's Quran memorization journey</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Link child panel */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 2px 12px rgba(27,67,50,0.07)', padding: '1.25rem 1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.3rem' }}>🔗</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: '0 0 0.15rem', fontWeight: 700, fontSize: '0.85rem', color: '#1B4332' }}>Link a Child Account</p>
            <p style={{ margin: 0, fontSize: '0.72rem', color: '#888' }}>Enter the invite code from your child's teacher</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <input value={linkCode} onChange={e => setLinkCode(e.target.value.toUpperCase())} placeholder="INVITE CODE"
              onKeyDown={e => e.key === 'Enter' && linkChild()}
              style={{ padding: '0.5rem 0.85rem', borderRadius: 8, border: '1.5px solid rgba(27,67,50,0.2)', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.12em', color: '#1B4332', background: '#F6F9F7', outline: 'none', width: 140 }} />
            <button onClick={linkChild} disabled={linking || !linkCode.trim()} style={{ padding: '0.5rem 1.1rem', background: 'linear-gradient(135deg,#1B4332,#2E7D32)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', opacity: linking ? 0.6 : 1 }}>
              {linking ? '...' : 'Link'}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>Loading children...</div>
        ) : children.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.07)', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(27,67,50,0.07)' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👦</p>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#555', marginBottom: '0.5rem' }}>No children linked yet</p>
            <p style={{ color: '#aaa', fontSize: '0.82rem' }}>Ask your child's teacher for an invite code and enter it above</p>
          </div>
        ) : (
          <>
            {/* Child selector tabs */}
            {children.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
                {children.map(c => (
                  <button key={c.id} onClick={() => setSelectedChild(c)} style={{
                    padding: '0.5rem 1rem', borderRadius: 99, border: '1px solid',
                    borderColor: (selectedChild?.id || children[0]?.id) === c.id ? '#1B4332' : 'rgba(0,0,0,0.12)',
                    background: (selectedChild?.id || children[0]?.id) === c.id ? '#1B4332' : '#fff',
                    color: (selectedChild?.id || children[0]?.id) === c.id ? '#fff' : '#555',
                    fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap',
                    display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.18s',
                  }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: (selectedChild?.id || children[0]?.id) === c.id ? 'rgba(255,255,255,0.2)' : '#1B433215', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 800 }}>{getInitials(c.name)}</div>
                    {c.name}
                  </button>
                ))}
              </div>
            )}

            {/* Active child card */}
            {active && (
              <>
                {/* Child overview */}
                <div style={{ background: 'linear-gradient(135deg,#0D2818,#1B4332)', borderRadius: 20, padding: '1.75rem', marginBottom: '1.25rem', border: '1px solid rgba(201,168,76,0.2)', position: 'relative', overflow: 'hidden' }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', right: -20, top: -20, opacity: 0.06 }}>
                    <polygon points="60,5 70,40 105,40 78,62 88,98 60,78 32,98 42,62 15,40 50,40" fill="#C9A84C" />
                  </svg>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#C9A84C,#A07830)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: '#050E08', flexShrink: 0 }}>{getInitials(active.name)}</div>
                    <div>
                      <p style={{ margin: 0, fontFamily: '"Cinzel",serif', fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>{active.name}</p>
                      <p style={{ margin: '0.15rem 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{active.email}</p>
                    </div>
                    <div style={{ marginLeft: 'auto' }}><StreakBadge streak={active.current_streak} /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem' }}>
                    {[
                      { icon: '🔥', val: active.current_streak || 0, label: 'Streak' },
                      { icon: '📋', val: active.total_logs || 0, label: 'Sessions' },
                      { icon: '⭐', val: active.longest_streak || 0, label: 'Best' },
                      { icon: '📖', val: active.surahs_done || 0, label: 'Surahs' },
                    ].map((s, i) => (
                      <div key={i} style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                        <p style={{ margin: '0 0 0.2rem', fontSize: '1rem' }}>{s.icon}</p>
                        <p style={{ margin: 0, fontFamily: '"Cinzel",serif', fontSize: '1.1rem', color: '#C9A84C', fontWeight: 800 }}>{s.val}</p>
                        <p style={{ margin: '0.1rem 0 0', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent logs of child */}
                <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(27,67,50,0.07)', overflow: 'hidden' }}>
                  <div style={{ padding: '0.9rem 1.3rem', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'linear-gradient(to right,rgba(27,67,50,0.03),transparent)' }}>
                    <h3 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 700, color: '#1B4332' }}>Recent Sessions — {active.name}</h3>
                  </div>
                  {childLogs.length === 0 ? (
                    <div style={{ padding: '2.5rem', textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>No sessions logged yet</div>
                  ) : childLogs.slice(0, 10).map((log, i) => {
                    const meta = LOG_TYPE_META[log.log_type] || LOG_TYPE_META.sabaq;
                    return (
                      <div key={log.id} style={{
                        display: 'flex', alignItems: 'center', gap: '0.9rem',
                        padding: '0.8rem 1.3rem',
                        borderBottom: i < Math.min(childLogs.length, 10) - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                      }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', flexShrink: 0 }}>{meta.icon}</div>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: meta.color }}>{meta.label}</span>
                          <span style={{ fontSize: '0.72rem', color: '#888', marginLeft: '0.5rem' }}>Surah {log.surah_start}:{log.ayah_start} → {log.surah_end}:{log.ayah_end}</span>
                          {log.quality_rating && <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', color: '#C9A84C' }}>{'★'.repeat(log.quality_rating)}</span>}
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#bbb', flexShrink: 0 }}>
                          {new Date(log.log_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
