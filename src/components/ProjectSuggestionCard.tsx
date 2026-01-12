import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolReference } from "@/components/ToolReference";
import { CheckCircle2, Sparkles, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectSuggestion {
  title: string;
  description: string;
  toolIds: number[];
  steps: string[];
  skills: string[];
  difficulty: "facil" | "medio" | "desafiador";
}

interface ProjectSuggestionCardProps {
  project: ProjectSuggestion;
  index: number;
}

const difficultyConfig = {
  facil: {
    label: "Fácil",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30"
  },
  medio: {
    label: "Médio",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30"
  },
  desafiador: {
    label: "Desafiador",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30"
  }
};

export const ProjectSuggestionCard = ({ project, index }: ProjectSuggestionCardProps) => {
  const difficulty = difficultyConfig[project.difficulty] || difficultyConfig.medio;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
              {index + 1}
            </span>
            <CardTitle className="text-xl leading-tight">
              {project.title}
            </CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "shrink-0",
              difficulty.bgColor,
              difficulty.borderColor,
              difficulty.color
            )}
          >
            <Gauge className="w-3 h-3 mr-1" />
            {difficulty.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {project.description}
        </p>

        {/* Ferramentas */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Ferramentas Recomendadas
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.toolIds.slice(0, 6).map((toolId) => (
              <ToolReference key={toolId} toolId={toolId} showName size="md" />
            ))}
            {project.toolIds.length > 6 && (
              <Badge variant="secondary" className="text-xs">
                +{project.toolIds.length - 6} mais
              </Badge>
            )}
          </div>
        </div>

        {/* Etapas */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Etapas Principais
          </h4>
          <ol className="space-y-1.5 ml-1">
            {project.steps.map((step, i) => (
              <li 
                key={i} 
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-[10px] font-medium shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
          {project.skills.map((skill, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSuggestionCard;
