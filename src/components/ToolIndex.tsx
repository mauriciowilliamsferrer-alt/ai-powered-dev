import { useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  ArrowLeft, 
  ExternalLink, 
  List,
  Grid3X3,
  Star,
  BookOpen,
  Sparkles,
  Filter
} from "lucide-react";
import { allTools, toolCategories, toolsAlphabetical, IndexedTool, newTools } from "@/data/toolsIndex";

interface ToolIndexProps {
  onSelectTool?: (tool: IndexedTool) => void;
  highlightedToolId?: number;
}

type PricingFilter = 'all' | 'free' | 'freemium' | 'paid';

export const ToolIndex = ({ onSelectTool, highlightedToolId }: ToolIndexProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"category" | "alphabetical">("category");
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>('all');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Recuperar posição anterior para voltar
  const returnTo = location.state?.returnTo || "/";
  const returnPosition = location.state?.returnPosition;

  const filteredTools = useMemo(() => {
    let source = viewMode === "alphabetical" ? toolsAlphabetical : allTools;
    
    // Filtro por pricing
    if (pricingFilter !== 'all') {
      source = source.filter(t => t.pricing === pricingFilter);
    }
    
    // Filtro por novidades
    if (showOnlyNew) {
      source = source.filter(t => t.isNew);
    }
    
    // Filtro por busca
    if (!searchQuery.trim()) return source;
    
    const query = searchQuery.toLowerCase();
    
    return source.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      (tool.subcategory && tool.subcategory.toLowerCase().includes(query))
    );
  }, [searchQuery, viewMode, pricingFilter, showOnlyNew]);

  const handleBack = () => {
    if (returnPosition) {
      navigate(returnTo);
      // Scroll para a posição após navegação
      setTimeout(() => {
        window.scrollTo({ top: returnPosition, behavior: 'smooth' });
      }, 100);
    } else {
      navigate(-1);
    }
  };

  const handleToolClick = (tool: IndexedTool) => {
    if (onSelectTool) {
      onSelectTool(tool);
    }
  };

  const pricingLabels: Record<PricingFilter, string> = {
    all: 'Todos',
    free: 'Grátis',
    freemium: 'Freemium',
    paid: 'Pago'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Fixo */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Índice de Ferramentas
              </h1>
              <p className="text-sm text-muted-foreground">
                {allTools.length} ferramentas catalogadas • {newTools.length} novas em 2025
              </p>
            </div>
          </div>

          {/* Busca e Filtros */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ferramenta, categoria ou descrição..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "category" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("category")}
                  className="gap-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Por Categoria</span>
                </Button>
                <Button
                  variant={viewMode === "alphabetical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("alphabetical")}
                  className="gap-2"
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">A-Z</span>
                </Button>
              </div>
            </div>

            {/* Filtros de pricing e novidades */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filtros:</span>
              </div>
              
              {/* Filtro por preço */}
              <div className="flex gap-1">
                {(['all', 'free', 'freemium', 'paid'] as PricingFilter[]).map((filter) => (
                  <Button
                    key={filter}
                    variant={pricingFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPricingFilter(filter)}
                    className="h-7 text-xs px-2"
                  >
                    {pricingLabels[filter]}
                  </Button>
                ))}
              </div>

              {/* Toggle novidades */}
              <Button
                variant={showOnlyNew ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOnlyNew(!showOnlyNew)}
                className="h-7 text-xs px-2 gap-1"
              >
                <Sparkles className="h-3 w-3" />
                Novidades 2025
              </Button>

              {/* Contador de resultados */}
              <Badge variant="secondary" className="ml-auto">
                {filteredTools.length} ferramentas
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="container mx-auto px-4 py-6">
        {viewMode === "category" ? (
          <div className="space-y-8">
            {toolCategories.map((category) => {
              const categoryTools = filteredTools.filter(t => t.category === category.name || 
                (category.tools && category.tools.some(ct => ct.id === t.id)));
              
              if (categoryTools.length === 0) return null;

              return (
                <section key={category.id} id={`category-${category.id}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.tools.length}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{category.name}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {categoryTools.length} ferramentas
                    </Badge>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryTools.map((tool) => (
                      <ToolCard 
                        key={tool.id} 
                        tool={tool} 
                        isHighlighted={tool.id === highlightedToolId}
                        onClick={() => handleToolClick(tool)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isHighlighted={tool.id === highlightedToolId}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma ferramenta encontrada</h3>
            <p className="text-muted-foreground">
              Tente buscar com outros termos ou ajuste os filtros
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

// Card individual de ferramenta
interface ToolCardProps {
  tool: IndexedTool;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const ToolCard = ({ tool, isHighlighted, onClick }: ToolCardProps) => {
  const getPricingBadge = () => {
    switch (tool.pricing) {
      case 'free':
        return <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Grátis</Badge>;
      case 'freemium':
        return <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Freemium</Badge>;
      case 'paid':
        return <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pago</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      id={`tool-${tool.id}`}
      className={`cursor-pointer transition-all hover:shadow-md ${
        isHighlighted 
          ? 'ring-2 ring-primary shadow-lg bg-primary/5' 
          : 'hover:border-primary/30'
      } ${tool.highlight ? 'border-primary/20 bg-primary/5' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Número da ferramenta */}
          <div className={`
            shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
            ${tool.highlight 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
            }
          `}>
            {tool.id}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-medium truncate">{tool.name}</h3>
              {tool.highlight && <Star className="h-3 w-3 text-yellow-500 shrink-0" />}
              {tool.isNew && (
                <Badge className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                  Novo
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {tool.description}
            </p>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {tool.category}
              </Badge>
              {tool.subcategory && (
                <Badge variant="secondary" className="text-xs">
                  {tool.subcategory}
                </Badge>
              )}
              {getPricingBadge()}
              {tool.role && (
                <Badge className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                  {tool.role}
                </Badge>
              )}
            </div>
            
            {tool.url && (
              <a 
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
              >
                <ExternalLink className="h-3 w-3" />
                Acessar
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolIndex;
