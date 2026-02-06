import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Sparkles,
  List
} from "lucide-react";
import { categoryGroups, getToolsByGroup, findGroupForCategory } from "@/data/categoryGroups";
import { allTools, newTools } from "@/data/toolsIndex";

const ToolIndexHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Resultados da busca global
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return allTools
      .filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [searchQuery]);

  const handleSearchSelect = (toolId: number, category: string) => {
    const group = findGroupForCategory(category);
    if (group) {
      navigate(`/indice/${group.id}`, { 
        state: { highlightedToolId: toolId, searchQuery }
      });
    }
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      const firstResult = searchResults[0];
      handleSearchSelect(firstResult.id, firstResult.category);
    }
  };

  // Grupos com contagem
  const groupsWithCounts = categoryGroups.map(group => ({
    ...group,
    toolCount: getToolsByGroup(group.id).length,
    newCount: getToolsByGroup(group.id).filter(t => t.isNew).length
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Início
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

          {/* Busca Global */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ferramenta em todas as categorias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-9"
            />
            
            {/* Resultados da busca */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
                {searchResults.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSearchSelect(tool.id, tool.category)}
                    className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-center gap-3 border-b last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {tool.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{tool.name}</span>
                        {tool.isNew && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                            <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                            Novo
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {tool.category}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Grid de Categorias */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {groupsWithCounts.map((group) => {
            const Icon = group.icon;
            return (
              <Link key={group.id} to={`/indice/${group.id}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${group.gradient} text-white`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        {group.newCount > 0 && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                            <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                            {group.newCount} novas
                          </Badge>
                        )}
                        <Badge variant="secondary" className="font-bold">
                          {group.toolCount}
                        </Badge>
                      </div>
                    </div>
                    
                    <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {group.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {group.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-primary font-medium">
                      Ver ferramentas
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Link para lista A-Z */}
        <div className="text-center">
          <Link to="/indice/todas">
            <Button variant="outline" size="lg" className="gap-2">
              <List className="h-4 w-4" />
              Ver todas as ferramentas A-Z
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{allTools.length}</div>
              <div className="text-sm text-muted-foreground">Ferramentas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{categoryGroups.length}</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-500">{newTools.length}</div>
              <div className="text-sm text-muted-foreground">Novas em 2025</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-500">
                {allTools.filter(t => t.pricing === 'free').length}
              </div>
              <div className="text-sm text-muted-foreground">Gratuitas</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ToolIndexHub;
