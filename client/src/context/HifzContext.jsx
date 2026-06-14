import { createContext, useContext, useState, useCallback } from 'react';
import { getLogs, createLog as apiCreateLog } from '../services/hifzService';

const HifzContext = createContext(null);

export function HifzProvider({ children }) {
  const [logs, setLogs] = useState([]);

  const fetchLogs = useCallback(async () => {
    const data = await getLogs();
    setLogs(data);
  }, []);

  const addLog = async (payload) => {
    const log = await apiCreateLog(payload);
    setLogs(prev => [log, ...prev]);
    return log;
  };

  return (
    <HifzContext.Provider value={{ logs, fetchLogs, addLog }}>
      {children}
    </HifzContext.Provider>
  );
}

export const useHifz = () => useContext(HifzContext);
