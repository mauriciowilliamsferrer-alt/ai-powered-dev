import { useTutorialVoice } from '@/contexts/TutorialVoiceContext';
import { useBrowserVoices } from '@/hooks/useBrowserVoices';
import { TutorialControls } from './TutorialControls';
import { TutorialTranscript } from './TutorialTranscript';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Loader2, Mic2 } from 'lucide-react';
import { tutorialScripts } from '@/data/tutorialScripts';

interface VoiceTutorialProps {
  onClose: () => void;
  activeTutorialPhase?: number;
}

export const VoiceTutorial = ({ onClose, activeTutorialPhase }: VoiceTutorialProps) => {
  const {
    isPlaying,
    isPaused,
    currentPhase,
    progress,
    volume,
    playbackRate,
    isGenerating,
    selectedVoice,
    pauseTutorial,
    resumeTutorial,
    skipToPhase,
    setVolume,
    setPlaybackRate,
    stopTutorial,
    setSelectedVoice,
  } = useTutorialVoice();

  const { portugueseVoices, allVoices } = useBrowserVoices();

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTutorial();
    } else {
      resumeTutorial();
    }
  };

  const handlePrevious = () => {
    if (currentPhase > 0) {
      skipToPhase(currentPhase - 1);
    }
  };

  const handleNext = () => {
    if (currentPhase < tutorialScripts.length - 1) {
      skipToPhase(currentPhase + 1);
    }
  };

  const handleRestart = () => {
    skipToPhase(currentPhase);
  };

  const handleClose = () => {
    stopTutorial();
    onClose();
  };

  return (
    <Card className="fixed bottom-6 right-6 w-full max-w-md z-50 shadow-2xl border-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-semibold text-sm">
              🎧 Tutorial Guiado
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-1.5" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Fase {currentPhase + 1} de {tutorialScripts.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Voice Selector */}
        {(portugueseVoices.length > 0 || allVoices.length > 0) && (
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground flex items-center gap-2">
              <Mic2 className="h-3 w-3" />
              Voz do Narrador
            </label>
            <Select
              value={selectedVoice?.name || ''}
              onValueChange={(value) => {
                const voice = [...portugueseVoices, ...allVoices].find(
                  v => v.voice.name === value
                );
                if (voice) setSelectedVoice(voice.voice);
              }}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Selecione uma voz" />
              </SelectTrigger>
              <SelectContent>
                {portugueseVoices.length > 0 && (
                  <>
                    <SelectItem value="portuguese-header" disabled className="text-xs font-semibold">
                      Vozes em Português
                    </SelectItem>
                    {portugueseVoices.map((v) => (
                      <SelectItem key={v.voice.name} value={v.voice.name} className="text-xs">
                        {v.name} ({v.lang})
                      </SelectItem>
                    ))}
                  </>
                )}
                {allVoices.length > 0 && (
                  <>
                    <SelectItem value="other-header" disabled className="text-xs font-semibold">
                      Outras Vozes
                    </SelectItem>
                    {allVoices
                      .filter(v => !v.isPortuguese)
                      .slice(0, 5)
                      .map((v) => (
                        <SelectItem key={v.voice.name} value={v.voice.name} className="text-xs">
                          {v.name} ({v.lang})
                        </SelectItem>
                      ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Controls */}
        <TutorialControls
          isPlaying={isPlaying}
          isPaused={isPaused}
          currentPhase={currentPhase}
          totalPhases={tutorialScripts.length}
          volume={volume}
          playbackRate={playbackRate}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onVolumeChange={setVolume}
          onPlaybackRateChange={setPlaybackRate}
          onRestart={handleRestart}
        />

        {/* Loading State */}
        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Gerando áudio...</span>
          </div>
        )}

        {/* Transcript */}
        {!isGenerating && <TutorialTranscript currentPhase={currentPhase} />}
      </CardContent>
    </Card>
  );
};
