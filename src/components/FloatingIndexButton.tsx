import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { allTools, newTools } from "@/data/toolsIndex";

/**
 * Botão flutuante que aparece em todas as páginas para acesso rápido ao índice de ferramentas
 * Agora mostra um badge com a contagem real de ferramentas
 */
export const FloatingIndexButton = () => {
  const toolCount = allTools.length;
  const hasNewTools = newTools.length > 0;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/indice">
            <Button
              size="lg"
              className="relative rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-primary hover:bg-primary/90"
            >
              <BookOpen className="h-6 w-6" />
              
              {/* Badge com contagem */}
              <span className="absolute -top-1 -right-1 min-w-[1.5rem] h-6 px-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-md border-2 border-background">
                {toolCount}
              </span>
              
              {/* Indicador de novidades */}
              {hasNewTools && (
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-background" />
              )}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" className="flex flex-col gap-1">
          <p className="font-medium">📚 Índice de Ferramentas</p>
          <p className="text-xs text-muted-foreground">
            {toolCount} ferramentas catalogadas
            {hasNewTools && ` • ${newTools.length} novidades`}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FloatingIndexButton;
