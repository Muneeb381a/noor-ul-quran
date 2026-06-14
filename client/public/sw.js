/* NoorulQuran Service Worker */
const CACHE_NAME = 'noorul-quran-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  const title = data.title || 'نور القرآن';
  const options = {
    body: data.body || 'آج کی دعا پڑھیں',
    icon: data.icon || '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/learn/duas' },
    actions: [
      { action: 'open', title: 'دعا پڑھیں' },
      { action: 'close', title: 'بعد میں' }
    ]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  if (e.action === 'close') return;
  const url = e.notification.data?.url || '/learn/duas';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
      const found = cs.find((c) => c.url.includes(url));
      if (found) return found.focus();
      return clients.openWindow(url);
    })
  );
});
