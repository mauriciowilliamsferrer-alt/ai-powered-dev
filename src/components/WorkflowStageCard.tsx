import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { WorkflowStage } from "@/data/workflowData";
import { cn } from "@/lib/utils";

interface WorkflowStageCardProps {
  stage: WorkflowStage;
  onClick?: () => void;
}

export const WorkflowStageCard = ({ stage, onClick }: WorkflowStageCardProps) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-stage-completed" />;
      case 'current':
        return <Clock className="h-5 w-5 text-stage-current" />;
      case 'pending':
        return <Circle className="h-5 w-5 text-stage-pending" />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      completed: 'bg-stage-completed/10 text-stage-completed border-stage-completed/20',
      current: 'bg-stage-current/10 text-stage-current border-stage-current/20',
      pending: 'bg-stage-pending/10 text-stage-pending border-stage-pending/20'
    };

    return (
      <Badge 
        variant="outline" 
        className={cn("capitalize", variants[stage.status])}
      >
        {stage.status === 'current' ? 'Em andamento' : 
         stage.status === 'completed' ? 'Concluída' : 'Pendente'}
      </Badge>
    );
  };

  return (
    <Card 
      className={cn(
        "card-enhanced cursor-pointer interactive-glow",
        stage.status === 'current' && "ring-2 ring-stage-current/30 shadow-glow",
        stage.status === 'completed' && "ring-1 ring-stage-completed/30 shadow-accent"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-accent shadow-glow">
              <span className="text-sm font-semibold text-white">{stage.id}</span>
            </div>
            {getStatusIcon()}
          </div>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-xl bg-gradient-accent bg-clip-text text-transparent">{stage.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {stage.objective}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium gradient-secondary bg-clip-text text-transparent mb-2">Ferramentas principais:</p>
            <div className="flex flex-wrap gap-1">
              {stage.mainTools.slice(0, 3).map((tool, index) => (
                <Badge key={index} variant="secondary" className="text-xs gradient-card border-0">
                  {tool}
                </Badge>
              ))}
              {stage.mainTools.length > 3 && (
                <Badge variant="secondary" className="text-xs gradient-accent text-white border-0">
                  +{stage.mainTools.length - 3} mais
                </Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Entregáveis:</span> {stage.deliverables}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};