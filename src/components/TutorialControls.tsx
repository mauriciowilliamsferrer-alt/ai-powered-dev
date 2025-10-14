import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Gauge, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TutorialControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentPhase: number;
  totalPhases: number;
  volume: number;
  playbackRate: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onVolumeChange: (value: number) => void;
  onPlaybackRateChange: (value: number) => void;
  onRestart: () => void;
}

export const TutorialControls = ({
  isPlaying,
  isPaused,
  currentPhase,
  totalPhases,
  volume,
  playbackRate,
  onPlayPause,
  onPrevious,
  onNext,
  onVolumeChange,
  onPlaybackRateChange,
  onRestart,
}: TutorialControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Botão Anterior */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={currentPhase === 0}
        className="h-8 w-8"
      >
        <SkipBack className="h-4 w-4" />
      </Button>

      {/* Botão Play/Pause */}
      <Button
        variant="default"
        size="icon"
        onClick={onPlayPause}
        className="h-10 w-10"
      >
        {isPlaying || isPaused ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </Button>

      {/* Botão Próximo */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={currentPhase >= totalPhases - 1}
        className="h-8 w-8"
      >
        <SkipForward className="h-4 w-4" />
      </Button>

      {/* Controle de Volume */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32">
          <div className="space-y-2">
            <p className="text-sm font-medium">Volume</p>
            <Slider
              value={[volume * 100]}
              onValueChange={(value) => onVolumeChange(value[0] / 100)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Velocidade */}
      <Select
        value={playbackRate.toString()}
        onValueChange={(value) => onPlaybackRateChange(parseFloat(value))}
      >
        <SelectTrigger className="h-8 w-20 text-xs">
          <Gauge className="h-3 w-3 mr-1" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5">0.5x</SelectItem>
          <SelectItem value="0.75">0.75x</SelectItem>
          <SelectItem value="1">1x</SelectItem>
          <SelectItem value="1.25">1.25x</SelectItem>
          <SelectItem value="1.5">1.5x</SelectItem>
          <SelectItem value="2">2x</SelectItem>
        </SelectContent>
      </Select>

      {/* Reiniciar */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onRestart}
        className="h-8 w-8"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};
