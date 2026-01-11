import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Tool } from "@/data/workflowData";
import { ToolReference } from "./ToolReference";

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-1.5">
              {tool.name}
              <ToolReference toolName={tool.name} size="sm" />
            </CardTitle>
            <Badge variant="outline" className="mt-1 text-xs">
              {tool.category}
            </Badge>
          </div>
          <Button size="sm" variant="ghost" asChild>
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