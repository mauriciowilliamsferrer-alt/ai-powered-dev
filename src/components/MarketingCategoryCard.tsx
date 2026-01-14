import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink, Lightbulb } from "lucide-react";
import { MarketingCategory } from "@/data/marketingToolsData";

interface MarketingCategoryCardProps {
  category: MarketingCategory;
}

export const MarketingCategoryCard = ({ category }: MarketingCategoryCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = category.icon;

  const getTypeBadge = (type: 'free' | 'freemium' | 'paid') => {
    const styles = {
      free: "bg-green-100 text-green-800 border-green-200",
      freemium: "bg-blue-100 text-blue-800 border-blue-200",
      paid: "bg-amber-100 text-amber-800 border-amber-200"
    };
    const labels = {
      free: "Grátis",
      freemium: "Freemium",
      paid: "Pago"
    };
    return (
      <Badge variant="outline" className={`text-xs ${styles[type]}`}>
        {labels[type]}
      </Badge>
    );
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader 
            className="cursor-pointer transition-colors hover:bg-muted/50"
            style={{ borderLeft: `4px solid ${category.color}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="p-2.5 rounded-lg"
                  style={{ backgroundColor: category.bgColor }}
                >
                  <Icon className="h-5 w-5" style={{ color: category.color }} />
                </div>
                <div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm mt-0.5">
                    {category.description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {category.tools.length} ferramentas
                </Badge>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            {/* Lista de Ferramentas */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {category.tools.map((tool) => (
                <div 
                  key={tool.id}
                  className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-medium text-sm">{tool.name}</h4>
                    {getTypeBadge(tool.type)}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {tool.description}
                  </p>
                  {tool.tip && (
                    <p className="text-xs text-primary flex items-start gap-1 mb-2">
                      <Lightbulb className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      {tool.tip}
                    </p>
                  )}
                  {tool.url && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 px-2 text-xs w-full justify-start"
                      asChild
                    >
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1.5" />
                        Acessar
                      </a>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Dicas da Categoria */}
            {category.tips.length > 0 && (
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: category.bgColor }}
              >
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" style={{ color: category.color }} />
                  Dicas Práticas
                </h4>
                <ul className="space-y-1.5">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
