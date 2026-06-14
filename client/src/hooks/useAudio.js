import { useState, useRef } from 'react';
import { audioUrl } from '../services/quranService';

export function useAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState(null);

  const play = (ayahNum, reciter) => {
    if (audioRef.current) audioRef.current.pause();
    audioRef.current = new Audio(audioUrl(ayahNum, reciter));
    audioRef.current.play();
    setPlaying(true);
    setCurrentAyah(ayahNum);
    audioRef.current.onended = () => { setPlaying(false); setCurrentAyah(null); };
  };

  const pause = () => { audioRef.current?.pause(); setPlaying(false); };

  return { play, pause, playing, currentAyah };
}
