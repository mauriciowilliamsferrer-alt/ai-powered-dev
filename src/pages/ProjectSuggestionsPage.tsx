import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LevelSelector, UserLevel } from "@/components/LevelSelector";
import { DurationGrid, ProjectDuration } from "@/components/DurationCard";
import { ProjectSuggestionCard, ProjectSuggestion } from "@/components/ProjectSuggestionCard";
import { ProjectSuggestionsLoading } from "@/components/ProjectSuggestionsLoading";
import { ArrowLeft, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProjectSuggestionsPage = () => {
  const [level, setLevel] = useState<UserLevel | null>(null);
  const [duration, setDuration] = useState<ProjectDuration | null>(null);
  const [projects, setProjects] = useState<ProjectSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    if (!level || !duration) {
      toast.error("Selecione seu nível e a duração do projeto");
      return;
    }

    setIsLoading(true);
    setError(null);
    setProjects([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/suggest-projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ level, duration }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          throw new Error("Limite de requisições excedido. Aguarde alguns segundos e tente novamente.");
        }
        if (response.status === 402) {
          throw new Error("Créditos de IA esgotados. Adicione mais créditos para continuar.");
        }
        
        throw new Error(errorData.error || "Erro ao gerar sugestões");
      }

      const data = await response.json();
      setProjects(data.projects || []);
      
      if (data.projects?.length > 0) {
        toast.success(`${data.projects.length} projetos gerados com sucesso!`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDurationSelect = (selectedDuration: ProjectDuration) => {
    setDuration(selectedDuration);
    // Auto-fetch quando ambos estão selecionados
    if (level) {
      setTimeout(() => {
        setDuration(selectedDuration);
        // Trigger fetch com o novo duration
        fetchWithParams(level, selectedDuration);
      }, 100);
    }
  };

  const fetchWithParams = async (userLevel: UserLevel, projectDuration: ProjectDuration) => {
    setIsLoading(true);
    setError(null);
    setProjects([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/suggest-projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ level: userLevel, duration: projectDuration }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          throw new Error("Limite de requisições excedido. Aguarde alguns segundos e tente novamente.");
        }
        if (response.status === 402) {
          throw new Error("Créditos de IA esgotados. Adicione mais créditos para continuar.");
        }
        
        throw new Error(errorData.error || "Erro ao gerar sugestões");
      }

      const data = await response.json();
      setProjects(data.projects || []);
      
      if (data.projects?.length > 0) {
        toast.success(`${data.projects.length} projetos gerados com sucesso!`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
          
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Sugestões de Projetos</span>
          </div>
          
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            O que você quer construir?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A IA vai sugerir projetos personalizados com base no seu nível e no tempo disponível.
            Cada projeto inclui ferramentas recomendadas e etapas claras.
          </p>
        </section>

        {/* Level Selection */}
        <section>
          <LevelSelector 
            selectedLevel={level} 
            onSelectLevel={setLevel} 
          />
        </section>

        {/* Duration Selection */}
        <section className={!level ? "opacity-50 pointer-events-none" : ""}>
          <DurationGrid
            selectedDuration={duration}
            onSelectDuration={handleDurationSelect}
            disabled={!level}
          />
        </section>

        {/* Generate Button (manual) */}
        {level && duration && !isLoading && projects.length === 0 && !error && (
          <section className="text-center">
            <Button 
              size="lg" 
              onClick={fetchSuggestions}
              className="gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Gerar Sugestões
            </Button>
          </section>
        )}

        {/* Loading State */}
        {isLoading && <ProjectSuggestionsLoading />}

        {/* Error State */}
        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro ao gerar sugestões</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchSuggestions}
                className="ml-4"
              >
                Tentar novamente
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {projects.length > 0 && !isLoading && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Projetos Sugeridos
              </h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchSuggestions}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Gerar Novos
              </Button>
            </div>

            <div className="grid gap-6">
              {projects.map((project, index) => (
                <ProjectSuggestionCard 
                  key={index} 
                  project={project} 
                  index={index} 
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ProjectSuggestionsPage;
