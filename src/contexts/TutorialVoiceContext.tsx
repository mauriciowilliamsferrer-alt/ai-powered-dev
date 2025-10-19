import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { tutorialScripts } from '@/data/tutorialScripts';

interface TutorialState {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhase: number;
  progress: number;
  volume: number;
  playbackRate: number;
  autoPlay: boolean;
  isGenerating: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
}

interface TutorialVoiceContextType extends TutorialState {
  startTutorial: (phaseIndex?: number) => Promise<void>;
  pauseTutorial: () => void;
  resumeTutorial: () => void;
  stopTutorial: () => void;
  skipToPhase: (phaseIndex: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  toggleAutoPlay: () => void;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
}

const TutorialVoiceContext = createContext<TutorialVoiceContextType | undefined>(undefined);

export const TutorialVoiceProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<TutorialState>({
    isPlaying: false,
    isPaused: false,
    currentPhase: 0,
    progress: 0,
    volume: 0.8,
    playbackRate: 1,
    autoPlay: true,
    isGenerating: false,
    selectedVoice: null,
  });

  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);

  // Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const ptBRVoice = voices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt-BR'));
      const ptVoice = voices.find(v => v.lang.startsWith('pt'));
      
      if (!state.selectedVoice && (ptBRVoice || ptVoice)) {
        setState(prev => ({ 
          ...prev, 
          selectedVoice: ptBRVoice || ptVoice || voices[0] || null 
        }));
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [state.selectedVoice]);

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tutorial-preferences');
    if (saved) {
      const prefs = JSON.parse(saved);
      setState(prev => ({
        ...prev,
        volume: prefs.volume ?? 0.8,
        playbackRate: prefs.playbackRate ?? 1,
        autoPlay: prefs.autoPlay ?? true,
      }));
    }
  }, []);

  // Save preferences
  const savePreferences = useCallback(() => {
    localStorage.setItem('tutorial-preferences', JSON.stringify({
      volume: state.volume,
      playbackRate: state.playbackRate,
      autoPlay: state.autoPlay,
      lastPhase: state.currentPhase,
    }));
  }, [state]);

  useEffect(() => {
    savePreferences();
  }, [state.volume, state.playbackRate, state.autoPlay, savePreferences]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    };
  }, [progressInterval]);

  // Wait for voices to be loaded
  const waitForVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();
      
      if (voices.length > 0) {
        resolve(voices);
        return;
      }
      
      const handler = () => {
        voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          window.speechSynthesis.removeEventListener('voiceschanged', handler);
          resolve(voices);
        }
      };
      
      window.speechSynthesis.addEventListener('voiceschanged', handler);
      
      // Safety timeout (5 seconds)
      setTimeout(() => {
        window.speechSynthesis.removeEventListener('voiceschanged', handler);
        resolve(window.speechSynthesis.getVoices());
      }, 5000);
    });
  };

  const startTutorial = useCallback(async (phaseIndex: number = 0) => {
    try {
      const script = tutorialScripts[phaseIndex];
      if (!script) throw new Error('Script não encontrado');

      // Wait for voices to load
      const voices = await waitForVoices();
      
      if (voices.length === 0) {
        console.error('❌ Nenhuma voz disponível no navegador');
        throw new Error('Nenhuma voz disponível no navegador');
      }

      // Select PT-BR voice if not selected
      let voiceToUse = state.selectedVoice;
      if (!voiceToUse) {
        const ptBRVoice = voices.find(v => v.lang === 'pt-BR' || v.lang.startsWith('pt-BR'));
        const ptVoice = voices.find(v => v.lang.startsWith('pt'));
        voiceToUse = ptBRVoice || ptVoice || voices[0];
        
        setState(prev => ({ ...prev, selectedVoice: voiceToUse }));
      }

      if (progressInterval) clearInterval(progressInterval);

      // Create new utterance
      const newUtterance = new SpeechSynthesisUtterance(script.narrationText);
      
      if (voiceToUse) {
        newUtterance.voice = voiceToUse;
      }
      
      newUtterance.volume = state.volume;
      newUtterance.rate = state.playbackRate;
      newUtterance.lang = 'pt-BR';
      newUtterance.pitch = 1;

      console.log('🎤 Iniciando síntese de voz:', {
        texto: script.narrationText.substring(0, 50) + '...',
        voz: voiceToUse?.name,
        idioma: voiceToUse?.lang,
        volume: state.volume,
        velocidade: state.playbackRate
      });

      // Progress tracking (estimated based on script duration)
      const estimatedDuration = script.duration * 1000; // Convert to milliseconds
      let elapsed = 0;
      
      const interval = setInterval(() => {
        elapsed += 100;
        const progress = Math.min((elapsed / estimatedDuration) * 100, 100);
        setState(prev => ({ ...prev, progress }));
        
        if (elapsed >= estimatedDuration) {
          clearInterval(interval);
        }
      }, 100);
      
      setProgressInterval(interval);

      // Event handlers
      newUtterance.onstart = () => {
        console.log('✅ Reprodução INICIADA com sucesso');
      };

      newUtterance.onend = () => {
        console.log('✅ Reprodução FINALIZADA');
        if (interval) clearInterval(interval);
        
        if (state.autoPlay && phaseIndex < tutorialScripts.length - 1) {
          startTutorial(phaseIndex + 1);
        } else {
          setState(prev => ({ 
            ...prev, 
            isPlaying: false, 
            isPaused: false,
            progress: 100 
          }));
        }
      };

      newUtterance.onerror = (event) => {
        console.error('❌ ERRO na síntese de voz:', {
          erro: event.error,
          voz: voiceToUse?.name
        });
        if (interval) clearInterval(interval);
        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          isPaused: false 
        }));
      };

      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);

      setState(prev => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        currentPhase: phaseIndex,
        progress: 0,
      }));
    } catch (error) {
      console.error('Erro ao iniciar tutorial:', error);
      throw error;
    }
  }, [state.volume, state.playbackRate, state.autoPlay, state.selectedVoice, progressInterval]);

  const pauseTutorial = useCallback(() => {
    window.speechSynthesis.pause();
    if (progressInterval) clearInterval(progressInterval);
    setState(prev => ({ ...prev, isPaused: true, isPlaying: false }));
  }, [progressInterval]);

  const resumeTutorial = useCallback(() => {
    window.speechSynthesis.resume();
    
    // Resume progress tracking
    const script = tutorialScripts[state.currentPhase];
    if (script) {
      const estimatedDuration = script.duration * 1000;
      let elapsed = (state.progress / 100) * estimatedDuration;
      
      const interval = setInterval(() => {
        elapsed += 100;
        const progress = Math.min((elapsed / estimatedDuration) * 100, 100);
        setState(prev => ({ ...prev, progress }));
        
        if (elapsed >= estimatedDuration) {
          clearInterval(interval);
        }
      }, 100);
      
      setProgressInterval(interval);
    }
    
    setState(prev => ({ ...prev, isPaused: false, isPlaying: true }));
  }, [state.currentPhase, state.progress]);

  const stopTutorial = useCallback(() => {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    if (progressInterval) clearInterval(progressInterval);
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      progress: 0,
    }));
  }, [progressInterval]);

  const skipToPhase = useCallback((phaseIndex: number) => {
    window.speechSynthesis.cancel();
    if (progressInterval) clearInterval(progressInterval);
    startTutorial(phaseIndex);
  }, [progressInterval, startTutorial]);

  const setVolume = useCallback((volume: number) => {
    if (utterance) {
      utterance.volume = volume;
    }
    setState(prev => ({ ...prev, volume }));
  }, [utterance]);

  const setPlaybackRate = useCallback((rate: number) => {
    if (utterance) {
      utterance.rate = rate;
    }
    setState(prev => ({ ...prev, playbackRate: rate }));
  }, [utterance]);

  const toggleAutoPlay = useCallback(() => {
    setState(prev => ({ ...prev, autoPlay: !prev.autoPlay }));
  }, []);

  const setSelectedVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setState(prev => ({ ...prev, selectedVoice: voice }));
  }, []);

  return (
    <TutorialVoiceContext.Provider
      value={{
        ...state,
        startTutorial,
        pauseTutorial,
        resumeTutorial,
        stopTutorial,
        skipToPhase,
        setVolume,
        setPlaybackRate,
        toggleAutoPlay,
        setSelectedVoice,
      }}
    >
      {children}
    </TutorialVoiceContext.Provider>
  );
};

export const useTutorialVoice = () => {
  const context = useContext(TutorialVoiceContext);
  if (context === undefined) {
    throw new Error('useTutorialVoice must be used within a TutorialVoiceProvider');
  }
  return context;
};
