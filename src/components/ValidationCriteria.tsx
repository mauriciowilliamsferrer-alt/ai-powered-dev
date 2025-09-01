import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { ValidationCriteria as ValidationCriteriaType } from "@/data/workflowData";
import { useState } from "react";

interface ValidationCriteriaProps {
  validations: ValidationCriteriaType[];
  selectedStage?: string;
}

export const ValidationCriteria = ({ validations, selectedStage }: ValidationCriteriaProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const filteredValidations = selectedStage 
    ? validations.filter(validation => validation.stage === selectedStage)
    : validations;

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (filteredValidations.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-foreground">Nenhum critério encontrado</p>
        <p className="text-muted-foreground">
          {selectedStage ? 'Nenhum critério de validação para esta etapa.' : 'Adicione critérios de validação para começar.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedStage && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Critérios de Validação - Etapa {selectedStage}
          </h3>
          <p className="text-muted-foreground">
            Use estes critérios para validar se os entregáveis estão corretos
          </p>
        </div>
      )}
      
      {filteredValidations.map((validation, index) => {
        const sectionKey = `${validation.stage}-${index}`;
        const isOpen = openSections[sectionKey];
        
        return (
          <Card key={sectionKey} className="transition-all duration-300 hover:shadow-md">
            <Collapsible 
              open={isOpen} 
              onOpenChange={() => toggleSection(sectionKey)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        Etapa {validation.stage}
                      </Badge>
                      <CardTitle className="text-base">{validation.deliverable}</CardTitle>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Criteria */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium text-foreground">Critérios de Validação</h4>
                    </div>
                    <ul className="space-y-2">
                      {validation.criteria.map((criterion, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-2 shrink-0" />
                          <span className="text-foreground">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  {validation.examples.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <h4 className="font-medium text-foreground">Exemplos</h4>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                        {validation.examples.map((example, idx) => (
                          <code key={idx} className="block text-sm text-foreground font-mono bg-background px-2 py-1 rounded">
                            {example}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {validation.commonMistakes.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <h4 className="font-medium text-foreground">Erros Comuns</h4>
                      </div>
                      <ul className="space-y-2">
                        {validation.commonMistakes.map((mistake, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <XCircle className="h-3 w-3 text-red-500 mt-1 shrink-0" />
                            <span className="text-foreground">{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};