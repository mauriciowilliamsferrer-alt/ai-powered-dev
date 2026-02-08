import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { allTools } from "@/data/toolsIndex";
import { useNewToolsAlert } from "@/hooks/useNewToolsAlert";
import { NewToolsDrawer } from "./NewToolsDrawer";

/**
 * Botão flutuante que aparece em todas as páginas para acesso rápido ao índice de ferramentas
 * Mostra badge com contagem total e indicador de novidades não vistas
 */
export const FloatingIndexButton = () => {
  const toolCount = allTools.length;
  const { unseenCount, hasUnseenTools } = useNewToolsAlert();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Badge de novidades não vistas */}
        {hasUnseenTools && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full shadow-lg animate-bounce hover:scale-105 transition-transform cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            {unseenCount} {unseenCount === 1 ? 'nova' : 'novas'}
          </button>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/indice">
              <Button
                size="lg"
                className="relative rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-primary hover:bg-primary/90"
              >
                <BookOpen className="h-6 w-6" />
                
                {/* Badge com contagem total */}
                <span className="absolute -top-1 -right-1 min-w-[1.5rem] h-6 px-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-md border-2 border-background">
                  {toolCount}
                </span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left" className="flex flex-col gap-1">
            <p className="font-medium">📚 Índice de Ferramentas</p>
            <p className="text-xs text-muted-foreground">
              {toolCount} ferramentas catalogadas
              {hasUnseenTools && ` • ${unseenCount} não vistas`}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <NewToolsDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </>
  );
};

export default FloatingIndexButton;
