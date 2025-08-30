import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Clock, Circle } from "lucide-react";
import { WorkflowStage, actions } from "@/data/workflowData";
import { ActionsList } from "./ActionsList";
import { cn } from "@/lib/utils";

interface StageDetailProps {
  stage: WorkflowStage;
  onBack: () => void;
}

export const StageDetail = ({ stage, onBack }: StageDetailProps) => {
  const getStatusIcon = () => {
    switch (stage.status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-stage-completed" />;
      case 'current':
        return <Clock className="h-6 w-6 text-stage-current" />;
      case 'pending':
        return <Circle className="h-6 w-6 text-stage-pending" />;
    }
  };

  const getStatusText = () => {
    switch (stage.status) {
      case 'completed':
        return 'Concluída';
      case 'current':
        return 'Em andamento';
      case 'pending':
        return 'Pendente';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>

      <Card className={cn(
        "bg-gradient-to-br from-card to-card/50",
        stage.status === 'current' && "ring-2 ring-stage-current/20",
        stage.status === 'completed' && "ring-1 ring-stage-completed/20"
      )}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-bold text-primary">{stage.id}</span>
              </div>
              {getStatusIcon()}
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "capitalize",
                stage.status === 'completed' && "bg-stage-completed/10 text-stage-completed border-stage-completed/20",
                stage.status === 'current' && "bg-stage-current/10 text-stage-current border-stage-current/20",
                stage.status === 'pending' && "bg-stage-pending/10 text-stage-pending border-stage-pending/20"
              )}
            >
              {getStatusText()}
            </Badge>
          </div>
          <CardTitle className="text-2xl">{stage.title}</CardTitle>
          <CardDescription className="text-base">
            {stage.objective}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Ferramentas Principais</h4>
              <div className="flex flex-wrap gap-2">
                {stage.mainTools.map((tool, index) => (
                  <Badge key={index} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resumo das Ações</h4>
              <p className="text-sm text-muted-foreground">{stage.summary}</p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Entregáveis Esperados</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">{stage.deliverables}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">Ações Detalhadas</h3>
        <ActionsList actions={actions} stageId={stage.id} />
      </div>
    </div>
  );
};