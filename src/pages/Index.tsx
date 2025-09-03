import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Code2, Users, Zap, BarChart3, Brain, Lightbulb } from "lucide-react";
import { WorkflowStageCard } from "@/components/WorkflowStageCard";
import { EnhancedToolCard } from "@/components/EnhancedToolCard";
import { ApiPlatformCard } from "@/components/ApiPlatformCard";
import { StageDetail } from "@/components/StageDetail";
import { EducationalResources } from "@/components/EducationalResources";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ValidationCriteria } from "@/components/ValidationCriteria";
import { 
  workflowStages, 
  loadTools, 
  loadApiPlatforms, 
  loadEducationalResources, 
  loadActions, 
  loadValidationCriteria,
  WorkflowStage,
  Tool,
  ApiPlatform 
} from "@/data/workflowDataOptimized";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [apiPlatforms, setApiPlatforms] = useState<ApiPlatform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [toolsData, apiPlatformsData] = await Promise.all([
          loadTools(),
          loadApiPlatforms()
        ]);
        setTools(toolsData);
        setApiPlatforms(apiPlatformsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.usage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApiPlatforms = apiPlatforms.filter(platform => 
    platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.availableModels.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedStages = workflowStages.filter(stage => stage.status === 'completed').length;
  const currentStages = workflowStages.filter(stage => stage.status === 'current').length;
  const pendingStages = workflowStages.filter(stage => stage.status === 'pending').length;

  if (selectedStage) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <StageDetail 
            stage={selectedStage} 
            onBack={() => setSelectedStage(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Workflow de Desenvolvimento
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Guia completo para desenvolvimento moderno com IA e automação. 
              Transforme seu processo de desenvolvimento com as melhores ferramentas e práticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Zap className="h-5 w-5 mr-2" />
                Iniciar Workflow
              </Button>
              <Button size="lg" variant="outline">
                <BarChart3 className="h-5 w-5 mr-2" />
                Ver Progresso
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 border-b bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-stage-completed/10 to-stage-completed/5">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-stage-completed mb-2">{completedStages}</div>
                <p className="text-sm text-muted-foreground">Etapas Concluídas</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-stage-current/10 to-stage-current/5">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-stage-current mb-2">{currentStages}</div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-stage-pending/10 to-stage-pending/5">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-stage-pending mb-2">{pendingStages}</div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{tools.length}+</div>
                <p className="text-sm text-muted-foreground">Ferramentas Integradas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="stages" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="stages" className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Etapas do Workflow
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Catálogo de Ferramentas
              </TabsTrigger>
              <TabsTrigger value="api-platforms" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                APIs Gratuitas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stages" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Etapas do Workflow</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Acompanhe seu progresso através das 9 etapas essenciais do desenvolvimento moderno com IA.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflowStages.map((stage) => (
                  <WorkflowStageCard
                    key={stage.id}
                    stage={stage}
                    onClick={() => setSelectedStage(stage)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Catálogo de Ferramentas</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore as melhores ferramentas de IA e automação para seu workflow de desenvolvimento.
                </p>
              </div>

              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar ferramentas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted rounded-lg h-48"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool, index) => (
                      <EnhancedToolCard key={index} tool={tool} />
                    ))}
                  </div>

                  {filteredTools.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Nenhuma ferramenta encontrada para "{searchTerm}"
                      </p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="api-platforms" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Plataformas API Gratuitas</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  APIs gratuitas (ou com tiers gratuitos) para modelos de IA generativa, 
                  semelhantes à DeepSeek. Perfeitas para desenvolvimento e testes.
                </p>
              </div>

              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar plataformas API..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted rounded-lg h-48"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApiPlatforms.map((platform, index) => (
                      <ApiPlatformCard key={index} platform={platform} />
                    ))}
                  </div>

                  {filteredApiPlatforms.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Nenhuma plataforma encontrada para "{searchTerm}"
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Tips Section */}
              <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Dicas para Começar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">🔌 Integração Fácil</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        A maioria é compatível com o SDK do OpenAI. Basta alterar a URL base da API 
                        (ex.: <code className="bg-muted px-1 rounded">base_url="https://api.openrouter.ai/v1"</code>).
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">💰 Limites e Custos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Os tiers gratuitos são para desenvolvimento e testes. Para produção, 
                        espere custos por token (geralmente mais baratos que OpenAI).
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">🏠 Open-Source Local</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Para zero custo e privacidade total, baixe modelos da DeepSeek ou Qwen 
                        do Hugging Face e rode com Ollama ou LM Studio.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">⚡ Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Verifique status de serviço, pois tráfego alto pode causar filas. 
                        Tenha sempre uma alternativa configurada.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;