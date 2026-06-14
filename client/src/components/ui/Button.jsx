export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled, style = {} }) {
  const base = { padding: '0.6rem 1.25rem', borderRadius: 'var(--radius)', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'opacity 0.2s' };
  const variants = {
    primary: { background: 'var(--green-deep)', color: '#fff' },
    gold: { background: 'var(--gold)', color: '#fff' },
    danger: { background: 'var(--danger)', color: '#fff' },
    outline: { background: 'transparent', color: 'var(--green-deep)', border: '1.5px solid var(--green-deep)' },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style, opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
}
