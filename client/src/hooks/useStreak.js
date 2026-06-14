import { useQuery } from '@tanstack/react-query';
import { getStreak } from '../services/hifzService';

export function useStreak() {
  return useQuery({ queryKey: ['streak'], queryFn: getStreak });
}
