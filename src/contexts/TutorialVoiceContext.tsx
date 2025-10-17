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

  // Load pre-generated audio files from public/audio directory
  // To generate audio files, use ElevenLabs API with voice ID: FGY2WhTYpPnrIDTdsKH5
  // Model: eleven_multilingual_v2, and save as public/audio/phase-{1-8}.mp3
  const loadAudio = useCallback(async (phaseIndex: number): Promise<string> => {
    const script = tutorialScripts[phaseIndex];
    if (!script) throw new Error('Script não encontrado');

    setState(prev => ({ ...prev, isGenerating: true }));

    try {
      const audioPath = `/audio/phase-${phaseIndex + 1}.mp3`;
      
      // Test if audio file exists
      const response = await fetch(audioPath, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error(
          `Arquivo de áudio não encontrado: ${audioPath}\n\n` +
          `Para gerar os áudios:\n` +
          `1. Use a API do ElevenLabs\n` +
          `2. Voice ID: FGY2WhTYpPnrIDTdsKH5 (Laura)\n` +
          `3. Model: eleven_multilingual_v2\n` +
          `4. Salve como public/audio/phase-1.mp3 até phase-8.mp3`
        );
      }

      return audioPath;
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  }, []);

  const startTutorial = useCallback(async (phaseIndex: number = 0) => {
    try {
      const audioUrl = await loadAudio(phaseIndex);
      
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
  }, [state.volume, state.playbackRate, state.autoPlay, loadAudio]);

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
