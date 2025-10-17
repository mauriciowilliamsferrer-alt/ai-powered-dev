import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowRight, Clock, DollarSign, TrendingUp } from "lucide-react";
import { Tool } from "@/data/workflowData";

interface ToolSequenceCardProps {
  tool: Tool;
  onFavorite?: (toolName: string) => void;
  isFavorited?: boolean;
  onToolClick?: (toolName: string) => void;
}

export const ToolSequenceCard = ({ 
  tool, 
  onFavorite, 
  isFavorited = false,
  onToolClick 
}: ToolSequenceCardProps) => {
  const getPhaseColor = (phase?: string) => {
    if (!phase) return 'hsl(var(--muted))';
    const colors: Record<string, string> = {
      'ideacao': 'hsl(0 84.2% 60.2%)',
      'planejamento': 'hsl(197.4 71.4% 73.3%)',
      'design': 'hsl(262.1 83.3% 57.8%)',
      'desenvolvimento': 'hsl(142.1 76.2% 36.3%)',
      'backend': 'hsl(47.9 95.8% 53.1%)',
      'qualidade': 'hsl(215.4 16.3% 46.9%)',
      'deploy': 'hsl(221.2 83.2% 53.3%)',
      'monitora': 'hsl(280 83.3% 67.8%)',
    };
    return colors[phase] || 'hsl(var(--muted))';
  };

  const getPhaseLabel = (phase?: string) => {
    if (!phase) return '';
    const labels: Record<string, string> = {
      'ideacao': '💡 Ideação',
      'planejamento': '📋 Planejamento',
      'design': '🎨 Design',
      'desenvolvimento': '💻 Desenvolvimento',
      'backend': '🔧 Backend',
      'qualidade': '✅ Qualidade',
      'deploy': '🚀 Deploy',
      'monitora': '📊 Monitoramento',
    };
    return labels[phase] || phase;
  };

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg border-l-4" 
          style={{ borderLeftColor: getPhaseColor(tool.phase) }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {tool.sequenceNumber && (
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-white text-sm shrink-0"
                  style={{ backgroundColor: getPhaseColor(tool.phase) }}
                >
                  {tool.sequenceNumber}
                </div>
              )}
              <CardTitle className="text-base truncate">{tool.name}</CardTitle>
              {onFavorite && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onFavorite(tool.name)}
                  className={`p-1 shrink-0 ${isFavorited ? 'text-yellow-500' : 'text-muted-foreground'}`}
                >
                  <Star className={`h-3 w-3 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>
            
            {tool.phase && (
              <Badge 
                variant="secondary" 
                className="text-xs mb-2"
                style={{ 
                  backgroundColor: `${getPhaseColor(tool.phase)}20`,
                  color: getPhaseColor(tool.phase),
                  borderColor: getPhaseColor(tool.phase)
                }}
              >
                {getPhaseLabel(tool.phase)}
              </Badge>
            )}
            
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">{tool.category}</Badge>
              {tool.setupTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tool.setupTime}
                </div>
              )}
              {tool.monthlyCost && (
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {tool.monthlyCost}
                </div>
              )}
              {tool.learningCurve && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1 h-2 rounded-full ${i < tool.learningCurve ? 'bg-primary' : 'bg-muted'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Button size="sm" variant="ghost" asChild className="shrink-0">
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {tool.useCases && tool.useCases.length > 0 && (
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Casos de uso:</p>
            <ul className="space-y-1">
              {tool.useCases.slice(0, 3).map((useCase, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start">
                  <span className="mr-1">•</span>
                  <span className="line-clamp-1">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <p className="text-xs text-muted-foreground line-clamp-2">{tool.usage}</p>
        </div>
        
        {tool.nextTools && tool.nextTools.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
              <ArrowRight className="h-3 w-3" />
              Próximas ferramentas:
            </p>
            <div className="flex flex-wrap gap-1">
              {tool.nextTools.slice(0, 3).map((nextTool) => (
                <Badge 
                  key={nextTool} 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-accent"
                  onClick={() => onToolClick?.(nextTool)}
                >
                  {nextTool}
                </Badge>
              ))}
              {tool.nextTools.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tool.nextTools.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
