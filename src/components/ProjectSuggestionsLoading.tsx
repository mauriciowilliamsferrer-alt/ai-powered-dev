import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Analisando seu perfil...",
  "Buscando ideias criativas...",
  "Selecionando ferramentas...",
  "Montando etapas do projeto...",
  "Finalizando sugestões...",
];

export const ProjectSuggestionsLoading = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header de loading */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 text-primary mb-4">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">{loadingMessages[messageIndex]}</span>
        </div>
        <p className="text-muted-foreground">
          A IA está gerando projetos personalizados para você
        </p>
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-muted" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-28 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="h-4 w-full max-w-xs" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectSuggestionsLoading;
