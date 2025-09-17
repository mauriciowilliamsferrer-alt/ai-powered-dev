import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Tool } from "@/data/workflowData";

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="card-enhanced h-full transition-all duration-300 interactive-glow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg bg-gradient-accent bg-clip-text text-transparent">
              {tool.name}
            </CardTitle>
            <Badge variant="outline" className="mt-1 text-xs gradient-secondary text-white border-0">
              {tool.category}
            </Badge>
          </div>
          <Button size="sm" variant="ghost" asChild className="interactive-glow">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Onde usar:</p>
            <p className="text-sm text-muted-foreground">{tool.usage}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Observações:</p>
            <p className="text-sm text-muted-foreground">{tool.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};