import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { tutorialScripts } from '@/data/tutorialScripts';
import { supabase } from '@/lib/supabase';

interface TutorialState {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhase: number;
  progress: number;
  volume: number;
  playbackRate: number;
  autoPlay: boolean;
  isGenerating: boolean;
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
  });

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

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

  const generateAudio = useCallback(async (phaseIndex: number): Promise<string> => {
    const script = tutorialScripts[phaseIndex];
    if (!script) throw new Error('Script não encontrado');

    setState(prev => ({ ...prev, isGenerating: true }));

    try {
      const { data, error } = await supabase.functions.invoke('generate-tutorial-audio', {
        body: {
          text: script.narrationText,
          phaseIndex,
        },
      });

      if (error) {
        console.error('Error calling edge function:', error);
        throw new Error(`Erro ao gerar áudio: ${error.message}`);
      }

      if (data instanceof Blob) {
        return URL.createObjectURL(data);
      } else if (data && typeof data === 'object' && data.error) {
        throw new Error(data.error);
      }

      // If data is ArrayBuffer or similar, convert to Blob
      const blob = new Blob([data], { type: 'audio/mpeg' });
      return URL.createObjectURL(blob);
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  }, []);

  const startTutorial = useCallback(async (phaseIndex: number = 0) => {
    try {
      const audioUrl = await generateAudio(phaseIndex);
      
      const audio = new Audio(audioUrl);
      audio.volume = state.volume;
      audio.playbackRate = state.playbackRate;

      audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        setState(prev => ({ ...prev, progress }));
      });

      audio.addEventListener('ended', () => {
        if (state.autoPlay && phaseIndex < tutorialScripts.length - 1) {
          startTutorial(phaseIndex + 1);
        } else {
          setState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
        }
      });

      setAudioElement(audio);
      await audio.play();

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
  }, [state.volume, state.playbackRate, state.autoPlay, generateAudio]);

  const pauseTutorial = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      setState(prev => ({ ...prev, isPaused: true, isPlaying: false }));
    }
  }, [audioElement]);

  const resumeTutorial = useCallback(() => {
    if (audioElement) {
      audioElement.play();
      setState(prev => ({ ...prev, isPaused: false, isPlaying: true }));
    }
  }, [audioElement]);

  const stopTutorial = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        progress: 0,
      }));
    }
  }, [audioElement]);

  const skipToPhase = useCallback((phaseIndex: number) => {
    if (audioElement) {
      audioElement.pause();
    }
    startTutorial(phaseIndex);
  }, [audioElement, startTutorial]);

  const setVolume = useCallback((volume: number) => {
    if (audioElement) {
      audioElement.volume = volume;
    }
    setState(prev => ({ ...prev, volume }));
  }, [audioElement]);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioElement) {
      audioElement.playbackRate = rate;
    }
    setState(prev => ({ ...prev, playbackRate: rate }));
  }, [audioElement]);

  const toggleAutoPlay = useCallback(() => {
    setState(prev => ({ ...prev, autoPlay: !prev.autoPlay }));
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
