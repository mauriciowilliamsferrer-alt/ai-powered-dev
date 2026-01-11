import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Botão flutuante que aparece em todas as páginas para acesso rápido ao índice de ferramentas
 */
export const FloatingIndexButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/indice">
            <Button
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-primary hover:bg-primary/90"
            >
              <BookOpen className="h-6 w-6" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>📚 Índice de Ferramentas</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FloatingIndexButton;
