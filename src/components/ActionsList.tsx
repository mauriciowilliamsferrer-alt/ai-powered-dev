import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Action } from "@/data/workflowData";

interface ActionsListProps {
  actions: Action[];
  stageId: string;
}

export const ActionsList = ({ actions, stageId }: ActionsListProps) => {
  const stageActions = actions.filter(action => action.stage === stageId);

  if (stageActions.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Nenhuma ação específica definida para esta etapa.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {stageActions.map((action, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <Checkbox id={`action-${stageId}-${index}`} className="mt-1" />
              <div className="flex-1">
                <CardTitle className="text-base leading-tight">
                  {action.action}
                </CardTitle>
                <CardDescription className="mt-1">
                  <span className="font-medium">Resultado esperado:</span> {action.expectedResult}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Ferramentas:</p>
                <div className="flex flex-wrap gap-1">
                  {action.tools.map((tool, toolIndex) => (
                    <Badge key={toolIndex} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
              {action.notes && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Nota:</span> {action.notes}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};