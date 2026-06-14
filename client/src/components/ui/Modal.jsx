export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }} onClick={onClose}>
      <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', maxWidth: 500, width: '90%' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>x</button>
        </div>
        {children}
      </div>
    </div>
  );
}
