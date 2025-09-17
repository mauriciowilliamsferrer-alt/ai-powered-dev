import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Monitor, CloudUpload } from "lucide-react";
import { ApiPlatform } from "@/data/workflowData";

interface ApiPlatformCardProps {
  platform: ApiPlatform;
}

export const ApiPlatformCard = ({ platform }: ApiPlatformCardProps) => {
  return (
    <Card className="card-enhanced h-full border-l-4 border-l-primary/40 interactive-glow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold gradient-accent bg-clip-text text-transparent mb-2">
              {platform.name}
            </CardTitle>
            <div className="flex flex-wrap gap-1 mb-3">
              {platform.compatibleWithOpenAI && (
                <Badge variant="outline" className="text-xs gradient-secondary text-white border-0 shadow-glow">
                  <Zap className="h-3 w-3 mr-1" />
                  OpenAI Compatible
                </Badge>
              )}
              {platform.isLocal ? (
                <Badge variant="outline" className="text-xs bg-accent text-accent-foreground border-accent/20">
                  <Monitor className="h-3 w-3 mr-1" />
                  Local
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs gradient-accent text-white border-0">
                  <CloudUpload className="h-3 w-3 mr-1" />
                  Cloud
                </Badge>
              )}
            </div>
          </div>
          <Button size="sm" variant="ghost" asChild className="shrink-0 interactive-glow">
            <a 
              href={platform.apiUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {platform.description}
          </p>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold bg-gradient-accent bg-clip-text text-transparent uppercase tracking-wide mb-1">
              Modelos Disponíveis
            </p>
            <p className="text-sm text-muted-foreground">
              {platform.availableModels}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-semibold bg-gradient-secondary bg-clip-text text-transparent uppercase tracking-wide mb-1">
              Limites Gratuitos
            </p>
            <p className="text-sm text-muted-foreground">
              {platform.freeLimits}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};