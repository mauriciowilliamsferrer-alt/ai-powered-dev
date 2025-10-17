import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolCard } from "@/components/ToolCard";
import { EnhancedToolCard } from "@/components/EnhancedToolCard";
import { ApiPlatformCard } from "@/components/ApiPlatformCard";
import { WorkflowStageCard } from "@/components/WorkflowStageCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { Search, Filter, Star, Code2, Users, Brain, Zap, BarChart3, Menu, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  workflowStages, 
  loadTools, 
  loadApiPlatforms, 
  projectPhases,
  WorkflowStage,
  Tool,
  ApiPlatform 
} from "@/data/workflowDataOptimized";
import { WorkflowSequence } from "@/components/WorkflowSequence";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [apiPlatforms, setApiPlatforms] = useState<ApiPlatform[]>([]);
  const [stages, setStages] = useState<WorkflowStage[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsData, apiPlatformsData] = await Promise.all([
          loadTools(),
          loadApiPlatforms()
        ]);
        setTools(toolsData);
        setApiPlatforms(apiPlatformsData);
        setStages(workflowStages);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFavoriteToggle = (toolName: string) => {
    setFavoriteTools(prev => 
      prev.includes(toolName) 
        ? prev.filter(name => name !== toolName)
        : [...prev, toolName]
    );
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.usage.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || tool.difficulty === selectedDifficulty;
      const matchesPricing = selectedPricing === "all" || 
                            (selectedPricing === "Grátis" && tool.pricing?.toLowerCase().includes("grátis")) ||
                            (selectedPricing === "Pago" && tool.pricing?.toLowerCase().includes("pago")) ||
                            (selectedPricing === "Freemium" && tool.pricing?.toLowerCase().includes("freemium"));
      
      const matchesFavorites = !showFavoritesOnly || favoriteTools.includes(tool.name);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPricing && matchesFavorites;
    });
  }, [tools, searchTerm, selectedCategory, selectedDifficulty, selectedPricing, showFavoritesOnly, favoriteTools]);

  return (
    <div className="min-h-screen bg-background mobile-padding pb-safe-bottom">
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur safe-area-top mb-4">
        <div className="mobile-padding py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg md:text-4xl font-bold">Workflow de Desenvolvimento IA</h1>
            <Link to="/devtools-guide">
              <Button variant="outline" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">DevTools Guide</span>
              </Button>
            </Link>
          </div>
          <p className="text-xs md:text-xl text-muted-foreground text-center mt-1 md:mt-2">
            Guia completo para desenvolvimento com IA
          </p>
        </div>
      </header>

      <div className="space-y-4 md:space-y-8">
        {/* Mobile Stats Grid */}
        <section className="mobile-grid gap-3 md:gap-6">
          <Card className="text-center p-3 md:p-6 mobile-card-hover">
            <CardContent className="p-0">
              <div className="text-lg md:text-3xl font-bold text-primary mb-1">{tools.length}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Ferramentas</p>
            </CardContent>
          </Card>
          <Card className="text-center p-3 md:p-6 mobile-card-hover">
            <CardContent className="p-0">
              <div className="text-lg md:text-3xl font-bold text-primary mb-1">{apiPlatforms.length}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Plataformas</p>
            </CardContent>
          </Card>
        </section>

        {/* Progress Tracker */}
        {!isLoading && <ProgressTracker stages={stages} actions={[]} />}

        {/* Main Tabs */}
        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="mobile-grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="workflow" className="text-xs md:text-sm touch-target">
              <Code2 className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="sequence" className="text-xs md:text-sm touch-target">
              <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Fluxo
            </TabsTrigger>
            <TabsTrigger value="tools" className="text-xs md:text-sm touch-target">
              <Users className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Ferramentas
            </TabsTrigger>
            <TabsTrigger value="apis" className="text-xs md:text-sm touch-target">
              <Brain className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              APIs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflow" className="space-y-4 md:space-y-6">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-24 md:h-32" />
                ))}
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {stages.map((stage) => (
                  <WorkflowStageCard key={stage.id} stage={stage} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sequence" className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            ) : (
              <WorkflowSequence 
                tools={tools}
                phases={projectPhases}
                onFavorite={handleFavoriteToggle}
                favoriteTools={favoriteTools}
              />
            )}
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            {/* Mobile-First Search */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar ferramentas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 touch-target mobile-focus"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="touch-target">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {Array.from(new Set(tools.map(tool => tool.category))).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="touch-target mobile-focus"
                >
                  <Star className={`mr-2 h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
                  Favoritos
                </Button>
              </div>
            </div>

            {/* Tools Grid */}
            {isLoading ? (
              <div className="mobile-grid gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 md:h-64" />
                ))}
              </div>
            ) : (
              <div className="mobile-grid gap-4">
                {filteredTools.map((tool) => (
                  <EnhancedToolCard
                    key={tool.name}
                    tool={tool}
                    onFavorite={handleFavoriteToggle}
                    isFavorited={favoriteTools.includes(tool.name)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="apis" className="space-y-4">
            {isLoading ? (
              <div className="mobile-grid gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-40" />
                ))}
              </div>
            ) : (
              <div className="mobile-grid gap-4">
                {apiPlatforms.map((platform) => (
                  <ApiPlatformCard key={platform.name} platform={platform} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;