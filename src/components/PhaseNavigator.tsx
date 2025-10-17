import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectPhase } from "@/data/workflowDataOptimized";
import { Check, ChevronRight } from "lucide-react";

interface PhaseNavigatorProps {
  phases: ProjectPhase[];
  selectedPhase: string;
  onPhaseSelect: (phaseId: string) => void;
  toolCounts: Record<string, number>;
}

export const PhaseNavigator = ({ 
  phases, 
  selectedPhase, 
  onPhaseSelect,
  toolCounts 
}: PhaseNavigatorProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">Fases do Projeto</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {phases.map((phase) => {
          const isSelected = selectedPhase === phase.id;
          const toolCount = toolCounts[phase.id] || 0;
          
          return (
            <Button
              key={phase.id}
              variant={isSelected ? "default" : "outline"}
              className="h-auto p-3 justify-start text-left"
              onClick={() => onPhaseSelect(phase.id)}
            >
              <div className="flex items-start w-full gap-2">
                <div className="text-2xl shrink-0">{phase.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs mb-1 truncate">
                    {phase.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {toolCount} {toolCount === 1 ? 'ferramenta' : 'ferramentas'}
                    </Badge>
                  </div>
                </div>
                {isSelected && <ChevronRight className="h-4 w-4 shrink-0" />}
              </div>
            </Button>
          );
        })}
      </div>
      
      <Button
        variant={selectedPhase === 'all' ? "default" : "outline"}
        className="w-full"
        onClick={() => onPhaseSelect('all')}
      >
        Ver Todas as Fases
      </Button>
    </div>
  );
};
