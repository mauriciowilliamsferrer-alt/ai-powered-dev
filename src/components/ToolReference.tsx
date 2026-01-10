import { Link, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getToolById, getToolByName, IndexedTool } from "@/data/toolsIndex";
import { ExternalLink } from "lucide-react";

interface ToolReferenceProps {
  /** ID numérico da ferramenta */
  toolId?: number;
  /** Nome da ferramenta (alternativa ao ID) */
  toolName?: string;
  /** Mostrar nome da ferramenta junto com o número */
  showName?: boolean;
  /** Tamanho do badge */
  size?: "sm" | "md";
  /** Classe adicional */
  className?: string;
}

/**
 * Componente que renderiza uma referência clicável para uma ferramenta.
 * Mostra um numerozinho que, ao clicar, leva ao índice na posição da ferramenta.
 */
export const ToolReference = ({ 
  toolId, 
  toolName, 
  showName = false,
  size = "sm",
  className = ""
}: ToolReferenceProps) => {
  const navigate = useNavigate();
  
  // Buscar ferramenta por ID ou nome
  const tool: IndexedTool | undefined = toolId 
    ? getToolById(toolId) 
    : toolName 
      ? getToolByName(toolName)
      : undefined;

  if (!tool) {
    console.warn(`ToolReference: Ferramenta não encontrada - ID: ${toolId}, Nome: ${toolName}`);
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Salvar posição atual e navegar para o índice
    const currentPosition = window.scrollY;
    navigate('/indice', { 
      state: { 
        returnTo: window.location.pathname,
        returnPosition: currentPosition,
        highlightedToolId: tool.id
      }
    });
  };

  const sizeClasses = {
    sm: "w-5 h-5 text-[10px]",
    md: "w-6 h-6 text-xs"
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={`
            inline-flex items-center gap-1 group
            ${className}
          `}
        >
          {showName && (
            <span className="group-hover:text-primary transition-colors">
              {tool.name}
            </span>
          )}
          <span 
            className={`
              inline-flex items-center justify-center rounded-full 
              bg-primary/10 text-primary font-bold
              hover:bg-primary hover:text-primary-foreground
              transition-all cursor-pointer
              ${sizeClasses[size]}
            `}
          >
            {tool.id}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{tool.name}</span>
            <span className="text-xs text-muted-foreground">#{tool.id}</span>
          </div>
          <p className="text-xs text-muted-foreground">{tool.description}</p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-primary">Clique para ver no índice</span>
            {tool.url && (
              <a 
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

/**
 * Componente wrapper para renderizar nome + número da ferramenta
 */
export const ToolWithRef = ({ 
  toolId, 
  toolName,
  className = ""
}: Omit<ToolReferenceProps, 'showName' | 'size'>) => {
  const tool = toolId 
    ? getToolById(toolId) 
    : toolName 
      ? getToolByName(toolName)
      : undefined;

  if (!tool) return <span>{toolName || `#${toolId}`}</span>;

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span>{tool.name}</span>
      <ToolReference toolId={tool.id} size="sm" />
    </span>
  );
};

export default ToolReference;
