import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Lightbulb, Code, ExternalLink } from "lucide-react";
import { EducationalResource } from "@/data/workflowData";

interface EducationalResourcesProps {
  resources: EducationalResource[];
  selectedStage?: string;
}

export const EducationalResources = ({ resources, selectedStage }: EducationalResourcesProps) => {
  const filteredResources = selectedStage 
    ? resources.filter(resource => resource.relatedStages.includes(selectedStage))
    : resources;

  const getTypeIcon = (type: EducationalResource['type']) => {
    switch (type) {
      case 'tutorial': return <BookOpen className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'documentation': return <FileText className="h-4 w-4" />;
      case 'guide': return <Lightbulb className="h-4 w-4" />;
      case 'example': return <Code className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: EducationalResource['difficulty']) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  if (filteredResources.length === 0) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-foreground">Nenhum recurso encontrado</p>
        <p className="text-muted-foreground">
          {selectedStage ? 'Nenhum recurso disponível para esta etapa.' : 'Adicione recursos educacionais para começar.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedStage && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Recursos para Etapa {selectedStage}
          </h3>
          <p className="text-muted-foreground">
            Materiais selecionados para te ajudar nesta etapa específica
          </p>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="h-full transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(resource.type)}
                  <CardTitle className="text-base line-clamp-2">{resource.title}</CardTitle>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                  {resource.difficulty}
                </Badge>
                {resource.duration && (
                  <Badge variant="secondary" className="text-xs">
                    {resource.duration}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm line-clamp-3 mb-3">
                {resource.description}
              </CardDescription>
              
              {resource.relatedTools.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Ferramentas relacionadas:</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.relatedTools.slice(0, 3).map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                    {resource.relatedTools.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.relatedTools.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};