export default function Badge({ children, color = 'var(--green-light)' }) {
  return (
    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '99px', background: color, color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>
      {children}
    </span>
  );
}
