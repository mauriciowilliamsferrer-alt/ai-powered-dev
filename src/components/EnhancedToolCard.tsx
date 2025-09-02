import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, DollarSign, Users, Zap } from "lucide-react";
import { Tool } from "@/data/workflowData";

interface EnhancedToolCardProps {
  tool: Tool;
  onFavorite?: (toolName: string) => void;
  isFavorited?: boolean;
}

export const EnhancedToolCard = ({ tool, onFavorite, isFavorited = false }: EnhancedToolCardProps) => {
  const getDifficultyColor = (difficulty: Tool['difficulty']) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-muted text-muted-foreground border-border';
      case 'Intermediário': return 'bg-accent text-accent-foreground border-border';
      case 'Avançado': return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  const getPricingColor = (pricing: Tool['pricing']) => {
    switch (pricing) {
      case 'Gratuito': return 'bg-muted text-muted-foreground border-border';
      case 'Freemium': return 'bg-primary/10 text-primary border-primary/20';
      case 'Pago': return 'bg-secondary text-secondary-foreground border-border';
      case 'Beta': return 'bg-accent text-accent-foreground border-border';
    }
  };

  const getPricingIcon = (pricing: Tool['pricing']) => {
    switch (pricing) {
      case 'Gratuito': return <Zap className="h-3 w-3" />;
      case 'Freemium': return <Users className="h-3 w-3" />;
      case 'Pago': return <DollarSign className="h-3 w-3" />;
      case 'Beta': return <Zap className="h-3 w-3" />;
    }
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="text-lg truncate">{tool.name}</CardTitle>
              {onFavorite && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onFavorite(tool.name)}
                  className={`p-1 ${isFavorited ? 'text-yellow-500' : 'text-muted-foreground'}`}
                >
                  <Star className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {tool.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getDifficultyColor(tool.difficulty)}`}>
                {tool.difficulty}
              </Badge>
              <Badge variant="outline" className={`text-xs flex items-center space-x-1 ${getPricingColor(tool.pricing)}`}>
                {getPricingIcon(tool.pricing)}
                <span>{tool.pricing}</span>
              </Badge>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${i < Math.floor(tool.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{tool.rating}</span>
            </div>
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
      
      <CardContent className="pt-0 space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Onde usar:</p>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis line-clamp-2">{tool.usage}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Observações:</p>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis line-clamp-2">{tool.notes}</p>
        </div>
        
        {/* Tags */}
        {tool.tags.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Tags:</p>
            <div className="flex flex-wrap gap-1">
              {tool.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{tool.tags.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Integrations */}
        {tool.integrations.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Integrações:</p>
            <div className="flex flex-wrap gap-1">
              {tool.integrations.slice(0, 3).map((integration) => (
                <Badge key={integration} variant="outline" className="text-xs">
                  {integration}
                </Badge>
              ))}
              {tool.integrations.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.integrations.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};