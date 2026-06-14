import { useState, useEffect, useCallback } from 'react';
import lessons from '../../data/qaida-lessons.json';
import allLetters from '../../data/arabic-letters.json';
import MakhrajDiagram from '../../components/learn/qaida/MakhrajDiagram';
import { useArabicSpeech } from '../../hooks/useArabicSpeech';

// Module-level delegate — gets wired to the real hook in QaidaPage
const _speak = { fn: () => {} };
function speak(text, rate) { _speak.fn(text, rate); }

// ── Progress helpers ──────────────────────────────────────────────────────
const STORAGE_KEY = 'nq_qaida_progress';
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress(lessonId, score) {
  const p = loadProgress();
  p[lessonId] = { score, completedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ── Quiz helpers ──────────────────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function buildQuizQuestions(lesson) {
  if (lesson.type === 'alphabet') {
    const pool = allLetters;
    const selected = shuffle(pool).slice(0, 10);
    return selected.map(q => {
      const wrongs = shuffle(pool.filter(l => l.arabic !== q.arabic)).slice(0, 3);
      return {
        arabic: q.arabic,
        correct: q.name,
        options: shuffle([q.name, ...wrongs.map(w => w.name)]),
      };
    });
  }
  if (lesson.type === 'forms' && lesson.examples?.length) {
    const pool = lesson.examples;
    const selected = shuffle(pool).slice(0, Math.min(8, pool.length));
    return selected.map(q => {
      const wrongs = shuffle(pool.filter(e => e.name !== q.name)).slice(0, 3);
      const correctAnswer = q.name.split(' — ')[0];
      const wrongAnswers = wrongs.map(w => w.name.split(' — ')[0]);
      const opts = shuffle([correctAnswer, ...wrongAnswers.slice(0, 3)]);
      return { arabic: q.form || q.isolated, correct: correctAnswer, options: opts };
    });
  }
  if (lesson.type === 'harakat' && lesson.examples?.length) {
    const pool = lesson.examples;
    return pool.map(q => {
      const wrongs = shuffle(pool.filter(e => e.name !== q.name)).slice(0, 3);
      return {
        arabic: q.arabic,
        correct: q.name,
        options: shuffle([q.name, ...wrongs.map(w => w.name)]),
        hint: q.desc,
      };
    });
  }
  if (lesson.type === 'madd' && lesson.examples?.length) {
    const pool = lesson.examples;
    return pool.map(q => ({
      arabic: q.arabic,
      correct: q.name,
      options: shuffle([q.name, ...shuffle(pool.filter(e => e.name !== q.name)).map(w => w.name)]),
    }));
  }
  return [];
}

// ════════════════════════════════════════════════════════════════════════════
// Quiz Component
// ════════════════════════════════════════════════════════════════════════════
function QaidaQuiz({ lesson, onClose, onComplete }) {
  const [questions] = useState(() => buildQuizQuestions(lesson));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = opt === questions[current].correct;
    if (correct) setScore(s => s + 1);
    speak(questions[current].arabic);
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 1000);
  };

  if (questions.length === 0) {
    return (
      <div style={overlay}>
        <div style={modal}>
          <p>Quiz not available for this lesson yet.</p>
          <button onClick={onClose} style={btnPrimary}>Close</button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    onComplete(pct);
    return (
      <div style={overlay}>
        <div style={{ ...modal, textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            {pct >= 70 ? '' : ''}
          </div>
          <h3 style={{ color: 'var(--green-deep)', marginBottom: '0.5rem' }}>
            {pct >= 70 ? 'Well done!' : 'Keep practicing!'}
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: pct >= 70 ? 'var(--success)' : 'var(--gold)', marginBottom: '1rem' }}>
            {score}/{questions.length}
          </div>
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-mid)' }}>{pct}% correct</div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button onClick={onClose} style={btnPrimary}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div style={overlay}>
      <div style={modal}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Question {current + 1} / {questions.length}</span>
          <span style={{ color: 'var(--green-mid)', fontWeight: 'bold' }}>{score} correct</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: '1.5rem' }}>
          <div style={{ height: '100%', width: `${((current) / questions.length) * 100}%`, background: 'var(--green-light)', borderRadius: 2, transition: 'width 0.3s' }} />
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-mid)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
          Which letter / rule is this?
        </p>

        <div
          onClick={() => speak(q.arabic)}
          style={{ fontFamily: 'var(--font-arabic)', fontSize: '4rem', textAlign: 'center', marginBottom: '1.5rem', cursor: 'pointer', padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)', userSelect: 'none', color: 'rgba(255,255,255,0.88)' }}
          title="Tap to hear"
        >
          {q.arabic}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {q.options.map(opt => {
            let bg = 'var(--cream-dark)';
            let border = '1.5px solid #ddd';
            let color = 'var(--text-dark)';
            if (selected !== null) {
              if (opt === q.correct) { bg = '#d4edda'; border = '1.5px solid var(--success)'; color = 'var(--success)'; }
              else if (opt === selected) { bg = '#f8d7da'; border = '1.5px solid var(--danger)'; color = 'var(--danger)'; }
            }
            return (
              <button key={opt} onClick={() => handleAnswer(opt)} style={{ padding: '0.75rem', background: bg, border, borderRadius: 'var(--radius)', cursor: selected ? 'default' : 'pointer', fontWeight: 600, color, transition: 'all 0.2s', fontSize: '0.95rem' }}>
                {opt}
              </button>
            );
          })}
        </div>

        <button onClick={onClose} style={{ ...btnOutline, marginTop: '1.25rem', width: '100%' }}>Exit Quiz</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Letter Card (Lesson 1)
// ════════════════════════════════════════════════════════════════════════════
function LetterCard({ letter, isActive, onClick }) {
  const meta = allLetters.find(l => l.arabic === letter);
  return (
    <div
      onClick={onClick}
      style={{
        width: 80, textAlign: 'center', padding: '0.75rem 0.5rem',
        background: isActive ? 'var(--green-deep)' : 'rgba(255,255,255,0.06)',
        color: isActive ? '#fff' : 'var(--text-dark)',
        borderRadius: 'var(--radius)',
        border: isActive ? '2px solid var(--green-deep)' : '1.5px solid #ddd',
        cursor: 'pointer', transition: 'all 0.15s', userSelect: 'none',
      }}
    >
      <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '2rem', lineHeight: 1.3 }}>{letter}</div>
      <div style={{ fontSize: '0.7rem', marginTop: '0.2rem', opacity: 0.85 }}>{meta?.name}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Lesson Content
// ════════════════════════════════════════════════════════════════════════════
function LessonContent({ lesson }) {
  const [activeLetter, setActiveLetter] = useState(null);
  const activeMeta = activeLetter ? allLetters.find(l => l.arabic === activeLetter) : null;

  const handleLetterClick = useCallback((letter) => {
    setActiveLetter(prev => prev === letter ? null : letter);
    const meta = allLetters.find(l => l.arabic === letter);
    if (meta) speak(meta.arabic_name);
  }, []);

  if (lesson.type === 'alphabet') {
    return (
      <div>
        {/* ── Two-column layout when letter selected ── */}
        <div style={{ display: 'grid', gridTemplateColumns: activeMeta ? '1fr 1fr' : '1fr', gap: '1.25rem', marginBottom: '1.25rem', transition: 'all 0.3s' }}>

          {/* Left: letter info card */}
          {activeMeta && (
            <div style={{ background: 'var(--green-deep)', color: '#fff', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Big letter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '4.5rem', lineHeight: 1 }}>{activeMeta.arabic}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{activeMeta.name}</span>
                    <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.3rem', color: 'var(--gold-light)' }}>{activeMeta.arabic_name}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-urdu)', fontSize: '1.1rem', opacity: 0.85, direction: 'rtl', marginBottom: '0.15rem' }}>{activeMeta.urdu_name}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.65 }}>Sound: "{activeMeta.sound}"</div>
                </div>
              </div>

              {/* Makhraj description */}
              <div style={{ padding: '0.65rem 0.9rem', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--gold)' }}>
                <p style={{ fontSize: '0.82rem', opacity: 0.9, lineHeight: 1.6 }}>
                  {activeMeta.makhraj_desc}
                </p>
              </div>

              <button onClick={() => speak(activeMeta.arabic_name)} style={{ ...btnOutline, borderColor: 'rgba(255,255,255,0.4)', color: '#fff', alignSelf: 'flex-start' }}>
                ▶ Hear Again
              </button>
            </div>
          )}

          {/* Right: Makhraj diagram */}
          {activeMeta && (
            <MakhrajDiagram makhraj={activeMeta.makhraj} />
          )}
        </div>

        <p style={{ color: 'var(--text-mid)', marginBottom: '1rem', fontSize: '0.88rem' }}>
          {activeMeta ? 'Click another letter to compare.' : 'Tap any letter to hear its pronunciation and see where it is articulated.'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {lesson.letters.map(l => (
            <LetterCard key={l} letter={l} isActive={activeLetter === l} onClick={() => handleLetterClick(l)} />
          ))}
        </div>
      </div>
    );
  }

  if (lesson.type === 'forms') {
    return (
      <div>
        {lesson.non_connecting && (
          <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            <strong>Non-connecting letters</strong> (never connect to the next letter):&nbsp;
            <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.4rem', letterSpacing: '0.5rem' }}>{lesson.non_connecting.join(' ')}</span>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {lesson.examples?.map((ex, i) => (
            <div key={i} onClick={() => speak(ex.form || ex.isolated)} style={{ padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green-light)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd'}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.8rem', color: 'var(--green-deep)' }}>{ex.form || ex.isolated}</span>
                {ex.word && <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.2rem', color: 'var(--gold)' }}>{ex.word}</span>}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ex.name}</div>
              {ex.meaning && <div style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>{ex.meaning}</div>}
              {ex.note && <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)', fontStyle: 'italic' }}>{ex.note}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (lesson.type === 'harakat') {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {lesson.examples?.map((ex, i) => (
            <div key={i} onClick={() => speak(ex.arabic)} style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${ex.color}`, background: 'rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'transform 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '3rem', color: ex.color, textAlign: 'center', marginBottom: '0.5rem' }}>{ex.arabic}</div>
              <div style={{ fontWeight: 'bold', color: ex.color }}>{ex.name}</div>
              {ex.urdu && <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: 'var(--text-mid)' }}>{ex.urdu}</div>}
              <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', marginTop: '0.4rem' }}>{ex.desc}</div>
            </div>
          ))}
        </div>
        {lesson.practice?.length > 0 && (
          <div>
            <h4 style={{ color: 'var(--green-deep)', marginBottom: '0.75rem' }}>Practice</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {lesson.practice.map((p, i) => (
                <div key={i} onClick={() => speak(p.arabic)} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.4rem', letterSpacing: '0.4rem' }}>{p.arabic}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (lesson.type === 'madd') {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {lesson.examples?.map((ex, i) => (
            <div key={i} onClick={() => speak(ex.arabic)} style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: `2px solid ${ex.color}`, background: 'rgba(255,255,255,0.04)', cursor: 'pointer' }}>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '2.5rem', color: ex.color, textAlign: 'center', marginBottom: '0.5rem' }}>{ex.arabic}</div>
              <div style={{ fontWeight: 'bold', color: ex.color }}>{ex.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', marginTop: '0.4rem' }}>{ex.desc}</div>
            </div>
          ))}
        </div>
        {lesson.practice?.length > 0 && (
          <div>
            <h4 style={{ color: 'var(--green-deep)', marginBottom: '0.75rem' }}>Practice — tap to hear</h4>
            {lesson.practice.map((p, i) => (
              <div key={i} onClick={() => speak(p.arabic)} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', marginBottom: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.5rem' }}>{p.arabic}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>{p.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (lesson.type === 'words') {
    return (
      <div>
        <p style={{ color: 'var(--text-mid)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          These are the words of Surah Al-Fatiha. Tap any word to hear it.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {lesson.examples?.map((ex, i) => (
            <div key={i} onClick={() => speak(ex.arabic)} style={{ padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '2rem', color: 'var(--green-deep)', marginBottom: '0.4rem' }}>{ex.arabic}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', fontStyle: 'italic' }}>{ex.transliteration}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>{ex.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <p style={{ color: 'var(--text-mid)' }}>Content coming soon.</p>;
}

// ════════════════════════════════════════════════════════════════════════════
// Main QaidaPage
// ════════════════════════════════════════════════════════════════════════════
export default function QaidaPage() {
  const [activeId, setActiveId] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState(loadProgress);
  const { speak: doSpeak } = useArabicSpeech();

  // Wire the hook's speak into the module-level delegate
  useEffect(() => { _speak.fn = doSpeak; }, [doSpeak]);

  const lesson = lessons.find(l => l.id === activeId);

  const handleComplete = (score) => {
    saveProgress(activeId, score);
    setProgress(loadProgress());
    setShowQuiz(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)', fontFamily: 'var(--font-body)', background: '#030A05' }}>


      <div style={{ display: 'flex', flex: 1 }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 240, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', background: '#060F08', overflowY: 'auto', padding: '1rem 0' }}>
        <div style={{ padding: '0 1rem 0.75rem', borderBottom: '1px solid #e0ddd5', marginBottom: '0.5rem' }}>
          <h3 style={{ color: 'var(--green-deep)', fontSize: '1rem' }}>Qaida Lessons</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>
            {Object.keys(progress).length} / {lessons.length} done
          </p>
        </div>
        {lessons.map(l => {
          const done = progress[l.id];
          const isActive = l.id === activeId;
          return (
            <button key={l.id} onClick={() => setActiveId(l.id)} style={{
              width: '100%', textAlign: 'left', padding: '0.7rem 1rem', border: 'none', cursor: 'pointer',
              background: isActive ? 'var(--green-deep)' : 'transparent',
              color: isActive ? '#fff' : 'var(--text-dark)',
              borderRight: isActive ? '3px solid var(--gold)' : '3px solid transparent',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: done ? 'var(--success)' : isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 'bold', color: done ? '#fff' : isActive ? '#fff' : 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
                {done ? '✓' : l.id}
              </span>
              <span style={{ fontSize: '0.85rem', lineHeight: 1.3 }}>{l.title.split(' — ')[0]}</span>
            </button>
          );
        })}
      </aside>

      {/* ── Content ── */}
      <main style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <span style={{ background: 'var(--green-deep)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' }}>Lesson {lesson.id}</span>
              {progress[lesson.id] && (
                <span style={{ background: 'var(--success)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem' }}>
                  Score: {progress[lesson.id].score}%
                </span>
              )}
            </div>
            <h2 style={{ color: 'var(--green-deep)', margin: 0 }}>{lesson.title}</h2>
            <p style={{ fontFamily: 'var(--font-arabic)', color: 'var(--text-mid)', fontSize: '1.1rem', margin: '0.1rem 0' }}>{lesson.urdu_title}</p>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginTop: '0.4rem' }}>{lesson.description}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
            {lesson.quiz && (
              <button onClick={() => setShowQuiz(true)} style={btnPrimary}>
                Take Quiz
              </button>
            )}
            {activeId < lessons.length && (
              <button onClick={() => setActiveId(activeId + 1)} style={btnOutline}>
                Next Lesson →
              </button>
            )}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e0ddd5', marginBottom: '1.5rem' }} />

        <LessonContent lesson={lesson} />

        {/* Bottom nav */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e0ddd5' }}>
          {activeId > 1 && (
            <button onClick={() => setActiveId(activeId - 1)} style={btnOutline}>← Previous</button>
          )}
          {activeId < lessons.length && (
            <button onClick={() => setActiveId(activeId + 1)} style={{ ...btnPrimary, marginLeft: 'auto' }}>
              Next Lesson →
            </button>
          )}
        </div>
      </main>

        {showQuiz && (
          <QaidaQuiz
            lesson={lesson}
            onClose={() => setShowQuiz(false)}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────────────────
const btnPrimary = {
  padding: '0.55rem 1.2rem', background: 'var(--green-deep)', color: '#fff',
  border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
};
const btnOutline = {
  padding: '0.55rem 1.2rem', background: 'transparent', color: 'var(--green-deep)',
  border: '1.5px solid var(--green-deep)', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
};
const overlay = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem',
};
const modal = {
  background: '#060F08', borderRadius: 'var(--radius-lg)',
  padding: '1.75rem', width: '100%', maxWidth: 460, maxHeight: '90vh', overflowY: 'auto',
  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
};
