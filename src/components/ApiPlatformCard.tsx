import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Monitor, CloudUpload } from "lucide-react";
import { ApiPlatform } from "@/data/workflowData";
import { ToolReference } from "./ToolReference";

interface ApiPlatformCardProps {
  platform: ApiPlatform;
}

export const ApiPlatformCard = ({ platform }: ApiPlatformCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-l-4 border-l-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-foreground mb-2 flex items-center gap-1.5">
              {platform.name}
              <ToolReference toolName={platform.name} size="sm" />
            </CardTitle>
            <div className="flex flex-wrap gap-1 mb-3">
              {platform.compatibleWithOpenAI && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <Zap className="h-3 w-3 mr-1" />
                  OpenAI Compatible
                </Badge>
              )}
              {platform.isLocal ? (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  <Monitor className="h-3 w-3 mr-1" />
                  Local
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                  <CloudUpload className="h-3 w-3 mr-1" />
                  Cloud
                </Badge>
              )}
            </div>
          </div>
          <Button size="sm" variant="ghost" asChild className="shrink-0">
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
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
              Modelos Disponíveis
            </p>
            <p className="text-sm text-muted-foreground">
              {platform.availableModels}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
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