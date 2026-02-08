import { useState, useEffect, useCallback, useMemo } from 'react';
import { newTools, IndexedTool } from '@/data/toolsIndex';

const STORAGE_KEY = 'new-tools-seen';

interface StoredData {
  seenIds: number[];
  lastVisit: string;
  dismissedBanner: boolean;
}

const getInitialData = (): StoredData => ({
  seenIds: [],
  lastVisit: new Date().toISOString(),
  dismissedBanner: false
});

export interface UseNewToolsAlertReturn {
  // Estado
  unseenTools: IndexedTool[];
  unseenCount: number;
  hasUnseenTools: boolean;
  
  // Ações
  markToolAsSeen: (toolId: number) => void;
  markAllAsSeen: () => void;
  dismissBanner: () => void;
  resetSeenTools: () => void;
  
  // UI
  showBanner: boolean;
  lastVisit: string;
}

export const useNewToolsAlert = (): UseNewToolsAlertReturn => {
  const [data, setData] = useState<StoredData>(getInitialData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar do localStorage na montagem
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredData;
        setData(parsed);
      } catch {
        // Ignorar erro de parse, usar valores padrão
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar no localStorage
  const saveData = useCallback((newData: StoredData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  // Ferramentas não vistas
  const unseenTools = useMemo(() => 
    newTools.filter(tool => !data.seenIds.includes(tool.id)),
    [data.seenIds]
  );

  // Marcar ferramenta individual como vista
  const markToolAsSeen = useCallback((toolId: number) => {
    if (!data.seenIds.includes(toolId)) {
      saveData({
        ...data,
        seenIds: [...data.seenIds, toolId],
        lastVisit: new Date().toISOString()
      });
    }
  }, [data, saveData]);

  // Marcar todas como vistas
  const markAllAsSeen = useCallback(() => {
    saveData({
      seenIds: newTools.map(t => t.id),
      lastVisit: new Date().toISOString(),
      dismissedBanner: true
    });
  }, [saveData]);

  // Dispensar banner (sem marcar como vistas)
  const dismissBanner = useCallback(() => {
    saveData({ 
      ...data, 
      dismissedBanner: true 
    });
  }, [data, saveData]);

  // Resetar (para debug/desenvolvimento)
  const resetSeenTools = useCallback(() => {
    saveData(getInitialData());
  }, [saveData]);

  return {
    unseenTools,
    unseenCount: unseenTools.length,
    hasUnseenTools: unseenTools.length > 0,
    showBanner: isLoaded && unseenTools.length > 0 && !data.dismissedBanner,
    markToolAsSeen,
    markAllAsSeen,
    dismissBanner,
    resetSeenTools,
    lastVisit: data.lastVisit
  };
};

export default useNewToolsAlert;
