import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMistakes, resolveMistake } from '../../services/hifzService';
import toast from 'react-hot-toast';

const SURAH_NAMES = ['Al-Fatihah','Al-Baqarah','Ali \'Imran','An-Nisa','Al-Ma\'idah','Al-An\'am','Al-A\'raf','Al-Anfal','At-Tawbah','Yunus','Hud','Yusuf','Ar-Ra\'d','Ibrahim','Al-Hijr','An-Nahl','Al-Isra','Al-Kahf','Maryam','Ta-Ha','Al-Anbiya','Al-Hajj','Al-Mu\'minun','An-Nur','Al-Furqan','Ash-Shu\'ara','An-Naml','Al-Qasas','Al-\'Ankabut','Ar-Rum','Luqman','As-Sajdah','Al-Ahzab','Saba','Fatir','Ya-Sin','As-Saffat','Sad','Az-Zumar','Ghafir','Fussilat','Ash-Shura','Az-Zukhruf','Ad-Dukhan','Al-Jathiyah','Al-Ahqaf','Muhammad','Al-Fath','Al-Hujurat','Qaf','Adh-Dhariyat','At-Tur','An-Najm','Al-Qamar','Ar-Rahman','Al-Waqi\'ah','Al-Hadid','Al-Mujadila','Al-Hashr','Al-Mumtahanah','As-Saf','Al-Jumu\'ah','Al-Munafiqun','At-Taghabun','At-Talaq','At-Tahrim','Al-Mulk','Al-Qalam','Al-Haqqah','Al-Ma\'arij','Nuh','Al-Jinn','Al-Muzzammil','Al-Muddaththir','Al-Qiyamah','Al-Insan','Al-Mursalat','An-Naba','An-Nazi\'at','Abasa','At-Takwir','Al-Infitar','Al-Mutaffifin','Al-Inshiqaq','Al-Buruj','At-Tariq','Al-A\'la','Al-Ghashiyah','Al-Fajr','Al-Balad','Ash-Shams','Al-Layl','Ad-Duha','Ash-Sharh','At-Tin','Al-\'Alaq','Al-Qadr','Al-Bayyinah','Az-Zalzalah','Al-\'Adiyat','Al-Qari\'ah','At-Takathur','Al-\'Asr','Al-Humazah','Al-Fil','Quraysh','Al-Ma\'un','Al-Kawthar','Al-Kafirun','An-Nasr','Al-Masad','Al-Ikhlas','Al-Falaq','An-Nas'];

const TYPE_META = {
  makharij:   { label: 'Makharij',   icon: '👄', color: '#E65100', bg: '#FFF3E0' },
  tajweed:    { label: 'Tajweed',    icon: '🎨', color: '#6A1B9A', bg: '#F3E5F5' },
  word:       { label: 'Word',       icon: '📝', color: '#1565C0', bg: '#E3F2FD' },
  ayah:       { label: 'Ayah',       icon: '📖', color: '#1B4332', bg: '#E8F5E9' },
  other:      { label: 'Other',      icon: '⚠️', color: '#555',    bg: '#F5F5F5' },
};

export default function MistakesPage() {
  const qc = useQueryClient();
  const { data: mistakes = [], isLoading } = useQuery({ queryKey: ['mistakes'], queryFn: getMistakes });
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'resolved'
  const [sortBy, setSortBy] = useState('surah'); // 'surah' | 'recent'

  const resolve = useMutation({
    mutationFn: resolveMistake,
    onSuccess: () => { qc.invalidateQueries(['mistakes']); toast.success('Mistake resolved! Keep it up.'); },
    onError: () => toast.error('Could not resolve. Try again.'),
  });

  const filtered = useMemo(() => {
    let list = [...mistakes];
    if (filter === 'pending') list = list.filter(m => !m.resolved);
    if (filter === 'resolved') list = list.filter(m => m.resolved);
    if (sortBy === 'surah') list.sort((a, b) => a.surah_num - b.surah_num || a.ayah_num - b.ayah_num);
    if (sortBy === 'recent') list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    return list;
  }, [mistakes, filter, sortBy]);

  /* Group by surah */
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(m => {
      const key = m.surah_num || 0;
      if (!map[key]) map[key] = [];
      map[key].push(m);
    });
    return Object.entries(map).map(([surah, items]) => ({ surah: parseInt(surah), items }));
  }, [filtered]);

  const pending = mistakes.filter(m => !m.resolved).length;
  const resolved = mistakes.filter(m => m.resolved).length;

  return (
    <div style={{ minHeight: '100vh', background: '#F6F1E9' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(150deg,#060E09,#0D2818,#1B4332)',
        padding: '2.5rem 1.5rem 2rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-60deg,rgba(201,168,76,1) 0,rgba(201,168,76,1) 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <Link to="/hifz" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '1rem' }}>← Hifz Home</Link>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: '"Cinzel",serif', fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#fff', margin: '0 0 0.3rem' }}>Mistakes Log</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', margin: 0 }}>Review, practice, and resolve your recitation mistakes</p>
            </div>
            {/* Stats pills */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <div style={{ background: 'rgba(229,57,53,0.15)', border: '1px solid rgba(229,57,53,0.4)', borderRadius: 99, padding: '0.4rem 0.9rem', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#EF9A9A', lineHeight: 1 }}>{pending}</p>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pending</p>
              </div>
              <div style={{ background: 'rgba(46,125,50,0.2)', border: '1px solid rgba(46,125,50,0.4)', borderRadius: 99, padding: '0.4rem 0.9rem', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#A5D6A7', lineHeight: 1 }}>{resolved}</p>
                <p style={{ margin: '0.1rem 0 0', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '1.5rem 1.5rem 3rem' }}>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[['all', '📋 All', mistakes.length], ['pending', '⚠️ Pending', pending], ['resolved', '✅ Resolved', resolved]].map(([v, label, count]) => (
              <button key={v} onClick={() => setFilter(v)} style={{
                padding: '0.4rem 0.85rem', borderRadius: 99, border: '1px solid',
                borderColor: filter === v ? '#1B4332' : 'rgba(0,0,0,0.12)',
                background: filter === v ? '#1B4332' : '#fff',
                color: filter === v ? '#fff' : '#555',
                fontSize: '0.75rem', fontWeight: filter === v ? 700 : 500,
                cursor: 'pointer', transition: 'all 0.18s',
              }}>{label} ({count})</button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            padding: '0.4rem 0.75rem', borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)',
            background: '#fff', fontSize: '0.75rem', color: '#555', cursor: 'pointer', outline: 'none',
          }}>
            <option value="surah">Sort by Surah</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>

        {/* Content */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>Loading mistakes...</div>
        ) : mistakes.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(27,67,50,0.1)', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(27,67,50,0.07)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</p>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1B4332' }}>No mistakes recorded!</p>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Your teachers can log mistakes during your revision sessions</p>
            <Link to="/hifz" style={{ padding: '0.65rem 1.5rem', background: 'linear-gradient(135deg,#1B4332,#2E7D32)', color: '#fff', borderRadius: 99, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>Back to Hifz</Link>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>No {filter} mistakes found.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {grouped.map(({ surah, items }) => (
              <div key={surah} style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(27,67,50,0.06)', overflow: 'hidden' }}>
                {/* Surah header */}
                <div style={{ padding: '0.85rem 1.25rem', background: 'linear-gradient(to right, rgba(27,67,50,0.04), transparent)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#1B4332,#2E7D32)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 800 }}>{surah}</div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#1B4332' }}>{SURAH_NAMES[surah - 1] || `Surah ${surah}`}</p>
                    <p style={{ margin: 0, fontSize: '0.68rem', color: '#aaa' }}>{items.length} mistake{items.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
                    {items.filter(i => !i.resolved).length > 0 && <span style={{ fontSize: '0.65rem', background: '#FFEBEE', color: '#e53935', borderRadius: 99, padding: '0.2rem 0.55rem', fontWeight: 700 }}>{items.filter(i => !i.resolved).length} pending</span>}
                    {items.filter(i => i.resolved).length > 0 && <span style={{ fontSize: '0.65rem', background: '#E8F5E9', color: '#2E7D32', borderRadius: 99, padding: '0.2rem 0.55rem', fontWeight: 700 }}>{items.filter(i => i.resolved).length} resolved</span>}
                  </div>
                </div>

                {/* Mistake rows */}
                {items.map((m, i) => {
                  const tMeta = TYPE_META[m.mistake_type] || TYPE_META.other;
                  return (
                    <div key={m.id} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.9rem',
                      padding: '0.9rem 1.25rem',
                      borderBottom: i < items.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                      background: m.resolved ? 'rgba(46,125,50,0.02)' : 'transparent',
                      transition: 'background 0.15s',
                    }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: m.resolved ? '#E8F5E9' : tMeta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{m.resolved ? '✅' : tMeta.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1B4332' }}>Ayah {m.ayah_num}</span>
                          <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 99, background: tMeta.bg, color: tMeta.color, fontWeight: 600 }}>{tMeta.label}</span>
                          {m.resolved && <span style={{ fontSize: '0.68rem', color: '#2E7D32', fontWeight: 600 }}>Resolved</span>}
                        </div>
                        {m.description && <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', lineHeight: 1.6 }}>{m.description}</p>}
                      </div>
                      {!m.resolved && (
                        <button onClick={() => resolve.mutate(m.id)} disabled={resolve.isPending}
                          style={{
                            padding: '0.35rem 0.85rem', borderRadius: 99,
                            background: 'rgba(46,125,50,0.08)', border: '1px solid rgba(46,125,50,0.25)',
                            color: '#2E7D32', fontSize: '0.72rem', fontWeight: 700,
                            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                            transition: 'all 0.18s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#2E7D32'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(46,125,50,0.08)'; e.currentTarget.style.color = '#2E7D32'; }}
                        >✓ Resolve</button>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
