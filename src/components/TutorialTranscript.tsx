import { tutorialScripts } from '@/data/tutorialScripts';
import { Badge } from '@/components/ui/badge';

interface TutorialTranscriptProps {
  currentPhase: number;
}

export const TutorialTranscript = ({ currentPhase }: TutorialTranscriptProps) => {
  const script = tutorialScripts[currentPhase];

  if (!script) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold text-foreground">
          {script.title}
        </h4>
        <Badge variant="secondary" className="text-xs">
          Fase {script.phase}/8
        </Badge>
      </div>
      
      <div className="text-sm text-muted-foreground leading-relaxed">
        {script.narrationText.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-2 last:mb-0">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {script.highlights.map((highlight, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">
            {highlight}
          </Badge>
        ))}
      </div>
    </div>
  );
};
