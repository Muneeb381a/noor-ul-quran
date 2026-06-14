import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import toast from 'react-hot-toast';

function getInitials(name = '') {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function StatCard({ icon, value, label, color = '#14532D' }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(20,83,45,0.07)', padding: '1.2rem 1.4rem', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: color + '12', border: `1px solid ${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ margin: 0, fontFamily: '"Playfair Display",serif', fontSize: '1.5rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
        <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', fontWeight: 600, color: '#555' }}>{label}</p>
      </div>
    </div>
  );
}

export default function TeacherDashboard() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  /* Fetch teacher's students */
  const { data: students = [], isLoading } = useQuery({
    queryKey: ['teacher-students'],
    queryFn: () => api.get('/user/students').then(r => r.data),
  });

  /* Generate invite code */
  const genInvite = useMutation({
    mutationFn: () => api.post('/auth/invite').then(r => r.data),
    onSuccess: (data) => {
      setInviteCode(data.code || data.invite_code || '------');
      setShowInviteModal(true);
    },
    onError: () => toast.error('Could not generate invite code'),
  });

  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast.success('Code copied!');
  };

  const activeStudents = students.filter(s => s.last_log_date);
  const totalSessions = students.reduce((sum, s) => sum + (s.total_logs || 0), 0);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(150deg,#052e16,#14532D,#14532D)', padding: '3rem 1.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(245,158,11,1) 0,rgba(245,158,11,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <p style={{ color: 'rgba(245,158,11,0.7)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>🎓 لوحة المعلم</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', margin: '0 0 0.3rem' }}>
                Welcome, {user?.name?.split(' ')[0] || 'Teacher'}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem', margin: 0 }}>Manage your students and track their hifz progress</p>
            </div>
            <button onClick={() => genInvite.mutate()} disabled={genInvite.isPending} style={{
              padding: '0.7rem 1.4rem',
              background: 'linear-gradient(135deg,#E2B84E,#F59E0B)',
              color: '#050E08', fontWeight: 800, fontSize: '0.82rem',
              borderRadius: 99, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              {genInvite.isPending ? '...' : '➕ Invite Student'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <StatCard icon="👥" value={students.length} label="Total Students" color="#14532D" />
          <StatCard icon="🔥" value={activeStudents.length} label="Active Today" color="#E65100" />
          <StatCard icon="📋" value={totalSessions} label="Total Sessions" color="#1565C0" />
          <StatCard icon="⭐" value={students.filter(s => (s.current_streak || 0) >= 7).length} label="7-Day Streaks" color="#F59E0B" />
        </div>

        {/* Students List */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 16px rgba(20,83,45,0.07)', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to right,rgba(20,83,45,0.03),transparent)' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#14532D' }}>My Students</h3>
            <span style={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 600 }}>{students.length} students</span>
          </div>

          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa' }}>Loading students...</div>
          ) : students.length === 0 ? (
            <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👨‍🎓</p>
              <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#555', marginBottom: '0.5rem' }}>No students yet</p>
              <p style={{ color: '#aaa', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Generate an invite code and share it with your students</p>
              <button onClick={() => genInvite.mutate()} style={{ padding: '0.65rem 1.4rem', background: 'linear-gradient(135deg,#14532D,#2E7D32)', color: '#fff', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>
                Generate Invite Code
              </button>
            </div>
          ) : (
            <div>
              {/* Header row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '1rem', padding: '0.6rem 1.4rem', background: '#FAFAFA', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: '0.65rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <span>Student</span><span>Streak</span><span>Sessions</span><span>Last Active</span><span>Status</span>
              </div>
              {students.map((s, i) => (
                <div key={s.id} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '1rem',
                  padding: '0.9rem 1.4rem', alignItems: 'center',
                  borderBottom: i < students.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#14532D,#2E7D32)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{getInitials(s.name)}</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#222' }}>{s.name}</p>
                      <p style={{ margin: 0, fontSize: '0.68rem', color: '#aaa' }}>{s.email}</p>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, color: s.current_streak >= 7 ? '#E65100' : '#555', fontSize: '0.85rem' }}>
                    {s.current_streak >= 7 ? '🔥' : ''} {s.current_streak || 0}d
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#555', fontWeight: 600 }}>{s.total_logs || 0}</span>
                  <span style={{ fontSize: '0.75rem', color: '#aaa' }}>
                    {s.last_log_date ? new Date(s.last_log_date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' }) : 'Never'}
                  </span>
                  <span style={{
                    fontSize: '0.65rem', padding: '0.2rem 0.55rem', borderRadius: 99, fontWeight: 700,
                    background: s.last_log_date && new Date() - new Date(s.last_log_date) < 86400000 * 2 ? '#E8F5E9' : '#FFF3E0',
                    color: s.last_log_date && new Date() - new Date(s.last_log_date) < 86400000 * 2 ? '#2E7D32' : '#E65100',
                  }}>
                    {s.last_log_date && new Date() - new Date(s.last_log_date) < 86400000 * 2 ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setShowInviteModal(false); }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '2rem', width: '100%', maxWidth: 420, boxShadow: '0 24px 64px rgba(0,0,0,0.25)', textAlign: 'center', animation: 'scaleIn 0.25s ease' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔑</p>
            <h3 style={{ fontFamily: '"Playfair Display",serif', color: '#14532D', margin: '0 0 0.4rem' }}>Invite Code Generated</h3>
            <p style={{ color: '#888', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Share this code with your student. It expires in 24 hours.</p>
            <div style={{ background: '#F6F9F7', borderRadius: 14, padding: '1rem 1.5rem', border: '2px dashed rgba(20,83,45,0.25)', marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '1.8rem', fontWeight: 800, color: '#14532D', margin: 0, letterSpacing: '0.15em' }}>{inviteCode}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={copyCode} style={{ flex: 1, padding: '0.7rem', background: 'linear-gradient(135deg,#14532D,#2E7D32)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>📋 Copy Code</button>
              <button onClick={() => setShowInviteModal(false)} style={{ flex: 1, padding: '0.7rem', background: '#F0F0F0', color: '#555', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
