import { useRef, useCallback } from 'react';
import { API_BASE } from '../config';

export function useArabicSpeech() {
  const audioRef = useRef(null);

  const speak = useCallback((text) => {
    if (!text) return;

    // Stop previous
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    // Server proxy — no CORS, no installation, works everywhere
    const audio = new Audio(`${API_BASE}/api/tts?q=${encodeURIComponent(text)}`);
    audioRef.current = audio;
    audio.play().catch((err) => {
      console.warn('TTS failed:', err);
      // Fallback: try browser's own synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'ar-SA';
        utt.rate = 0.75;
        window.speechSynthesis.speak(utt);
      }
    });
  }, []);

  return { speak };
}
