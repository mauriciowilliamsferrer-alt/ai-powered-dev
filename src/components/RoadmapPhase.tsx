import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoadmapPhaseProps {
  phase: number;
  title: string;
  description: string;
  tools: Array<{ name: string; category: string }>;
  completed?: boolean;
  color: string;
}

export const RoadmapPhase = ({ 
  phase, 
  title, 
  description, 
  tools,
  completed = false,
  color
}: RoadmapPhaseProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
      className={cn(
        "transition-all duration-300 hover:shadow-lg border-2",
        completed ? "border-primary/50 bg-primary/5" : "border-border"
      )}
    >
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          <div 
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shrink-0",
              color
            )}
          >
            {completed ? <CheckCircle2 className="w-6 h-6" /> : phase}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{title}</CardTitle>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 animate-accordion-down">
          <div className="ml-16 space-y-3">
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <Badge 
                  key={idx}
                  variant="secondary"
                  className="text-xs"
                >
                  {tool.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
