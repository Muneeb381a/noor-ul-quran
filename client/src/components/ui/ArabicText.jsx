export default function ArabicText({ children, size = 'md', className = '', style = {} }) {
  return (
    <span className={`arabic arabic-${size} ${className}`} style={style}>
      {children}
    </span>
  );
}
