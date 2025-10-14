import { useState, useCallback, useEffect } from 'react';
import { tutorialScripts } from '@/data/tutorialScripts';

interface TutorialState {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhase: number;
  progress: number; // 0-100
  volume: number; // 0-1
  playbackRate: number; // 0.5, 1, 1.5, 2
  autoPlay: boolean;
}

export const useTutorialVoice = () => {
  const [state, setState] = useState<TutorialState>({
    isPlaying: false,
    isPaused: false,
    currentPhase: 0,
    progress: 0,
    volume: 0.8,
    playbackRate: 1,
    autoPlay: true,
  });

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Carregar preferências do localStorage
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

  // Salvar preferências
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

    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    if (!apiKey) throw new Error('ElevenLabs API key não configurada');

    setIsGenerating(true);

    try {
      // Voice ID: Laura (FGY2WhTYpPnrIDTdsKH5)
      const voiceId = 'FGY2WhTYpPnrIDTdsKH5';
      
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text: script.narrationText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.7,
              similarity_boost: 0.8,
              style: 0.3,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao gerar áudio: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      return audioUrl;
    } finally {
      setIsGenerating(false);
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

  return {
    ...state,
    isGenerating,
    startTutorial,
    pauseTutorial,
    resumeTutorial,
    stopTutorial,
    skipToPhase,
    setVolume,
    setPlaybackRate,
    toggleAutoPlay,
  };
};
