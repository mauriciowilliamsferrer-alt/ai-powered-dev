import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import { Tool } from "@/data/workflowData";

interface MobileToolCardProps {
  tool: Tool;
  onFavorite?: (toolName: string) => void;
  isFavorited?: boolean;
}

export const MobileToolCard = ({ tool, onFavorite, isFavorited }: MobileToolCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'fácil':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'difícil':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPricingColor = (pricing: string) => {
    if (pricing?.toLowerCase().includes('grátis') || pricing?.toLowerCase().includes('free')) {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    }
    if (pricing?.toLowerCase().includes('pago') || pricing?.toLowerCase().includes('premium')) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <Card className="h-full transition-all duration-200 mobile-card-hover mobile-focus group">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base sm:text-lg line-clamp-2 mb-2">
              {tool.name}
            </CardTitle>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className="text-xs px-2 py-1">
                {tool.category}
              </Badge>
              {tool.difficulty && (
                <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(tool.difficulty)}`}>
                  {tool.difficulty}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 shrink-0">
            {onFavorite && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  onFavorite(tool.name);
                }}
                className="touch-target p-2 h-auto"
                aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Star
                  className={`h-4 w-4 ${
                    isFavorited ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              </Button>
            )}
            
            <Button size="sm" variant="ghost" asChild className="touch-target p-2 h-auto">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${tool.name} em nova aba`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Pricing and Rating - Mobile Optimized */}
        <div className="flex items-center justify-between gap-2">
          {tool.pricing && (
            <Badge className={`text-xs px-2 py-1 ${getPricingColor(tool.pricing)}`}>
              {tool.pricing}
            </Badge>
          )}
          
          {tool.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{tool.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <div>
          <p className="text-xs font-medium text-foreground mb-1">Onde usar:</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{tool.usage}</p>
        </div>
        
        <div>
          <p className="text-xs font-medium text-foreground mb-1">Observações:</p>
          <p className="text-xs text-muted-foreground line-clamp-3">{tool.notes}</p>
        </div>

        {/* Tags - Mobile Optimized */}
        {tool.tags && tool.tags.length > 0 && (
          <div>
            <p className="text-xs font-medium text-foreground mb-2">Tags:</p>
            <div className="flex flex-wrap gap-1">
              {tool.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{tool.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Integrations - Mobile Optimized */}
        {tool.integrations && tool.integrations.length > 0 && (
          <div>
            <p className="text-xs font-medium text-foreground mb-2">Integrações:</p>
            <div className="flex flex-wrap gap-1">
              {tool.integrations.slice(0, 2).map((integration, index) => (
                <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                  {integration}
                </Badge>
              ))}
              {tool.integrations.length > 2 && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  +{tool.integrations.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};