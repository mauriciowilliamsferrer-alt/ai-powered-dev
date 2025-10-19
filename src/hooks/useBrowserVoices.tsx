import { useState, useEffect } from 'react';

export interface BrowserVoice {
  voice: SpeechSynthesisVoice;
  name: string;
  lang: string;
  isPortuguese: boolean;
}

export const useBrowserVoices = () => {
  const [voices, setVoices] = useState<BrowserVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      const mappedVoices: BrowserVoice[] = availableVoices.map(voice => ({
        voice,
        name: voice.name,
        lang: voice.lang,
        isPortuguese: voice.lang.startsWith('pt'),
      }));

      setVoices(mappedVoices);
      setIsLoading(false);

      // Auto-select first Portuguese (Brazil) voice
      const ptBRVoice = availableVoices.find(v => 
        v.lang === 'pt-BR' || v.lang.startsWith('pt-BR')
      );
      const ptVoice = availableVoices.find(v => v.lang.startsWith('pt'));
      
      if (!selectedVoice) {
        setSelectedVoice(ptBRVoice || ptVoice || availableVoices[0] || null);
      }
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoice]);

  const portugueseVoices = voices.filter(v => v.isPortuguese);

  return {
    allVoices: voices,
    portugueseVoices,
    selectedVoice,
    setSelectedVoice,
    isLoading,
  };
};
