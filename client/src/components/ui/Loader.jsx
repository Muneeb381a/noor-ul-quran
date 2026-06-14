export default function Loader({ text = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'var(--green-mid)' }}>
      {text}
    </div>
  );
}
