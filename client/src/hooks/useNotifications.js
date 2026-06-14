import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dua_notification_settings';
const ALARM_KEY = 'dua_alarm_timer';

function getSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { enabled: false, time: '07:00' };
  } catch {
    return { enabled: false, time: '07:00' };
  }
}

function saveSettings(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function useNotifications() {
  const [permission, setPermission] = useState(Notification.permission);
  const [settings, setSettings] = useState(getSettings);
  const [timerId, setTimerId] = useState(null);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'unsupported';
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const scheduleLocalNotification = useCallback((time, duaTitle, duaArabic) => {
    if (timerId) clearTimeout(timerId);
    const [h, m] = time.split(':').map(Number);
    const now = new Date();
    const next = new Date();
    next.setHours(h, m, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const delay = next - now;
    const id = setTimeout(() => {
      if (Notification.permission === 'granted') {
        const n = new Notification('نور القرآن — آج کی دعا', {
          body: duaTitle + '\n' + duaArabic,
          icon: '/favicon.ico',
          tag: 'daily-dua',
          renotify: true,
        });
        n.onclick = () => { window.focus(); n.close(); };
      }
      scheduleLocalNotification(time, duaTitle, duaArabic);
    }, delay);
    setTimerId(id);
    localStorage.setItem(ALARM_KEY, JSON.stringify({ time, scheduledAt: Date.now(), delay }));
    return id;
  }, [timerId]);

  const enableNotifications = useCallback(async (time, duaTitle, duaArabic) => {
    const perm = await requestPermission();
    if (perm !== 'granted') return false;
    const next = { enabled: true, time };
    setSettings(next);
    saveSettings(next);
    scheduleLocalNotification(time, duaTitle, duaArabic);
    return true;
  }, [requestPermission, scheduleLocalNotification]);

  const disableNotifications = useCallback(() => {
    if (timerId) clearTimeout(timerId);
    const next = { ...settings, enabled: false };
    setSettings(next);
    saveSettings(next);
    localStorage.removeItem(ALARM_KEY);
  }, [timerId, settings]);

  const updateTime = useCallback((time, duaTitle, duaArabic) => {
    const next = { ...settings, time };
    setSettings(next);
    saveSettings(next);
    if (settings.enabled && Notification.permission === 'granted') {
      scheduleLocalNotification(time, duaTitle, duaArabic);
    }
  }, [settings, scheduleLocalNotification]);

  useEffect(() => {
    return () => { if (timerId) clearTimeout(timerId); };
  }, [timerId]);

  return {
    permission,
    settings,
    requestPermission,
    enableNotifications,
    disableNotifications,
    updateTime,
    isSupported: 'Notification' in window,
  };
}
