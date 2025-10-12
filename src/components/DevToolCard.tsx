import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";
import { DevTool } from "@/data/devToolsData";

interface DevToolCardProps {
  tool: DevTool;
}

export const DevToolCard = ({ tool }: DevToolCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-card/50 to-card border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {tool.name}
            </CardTitle>
            <Badge variant="outline" className="mt-1.5 text-xs border-primary/30">
              {tool.category}
            </Badge>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button size="sm" variant="ghost" asChild className="h-8 w-8 p-0">
              <a 
                href={tool.docsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Documentation"
              >
                <BookOpen className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button size="sm" variant="ghost" asChild className="h-8 w-8 p-0">
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Website"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
        <div>
          <p className="text-xs font-semibold text-foreground/80 mb-2">Key Features:</p>
          <ul className="space-y-1">
            {tool.keyFeatures.map((feature, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-primary mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
