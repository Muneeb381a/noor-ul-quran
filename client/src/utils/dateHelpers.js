export function today() {
  return new Date().toISOString().split('T')[0];
}

export function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}
