import { getToolByName, IndexedTool } from "@/data/toolsIndex";
import { ToolReference } from "./ToolReference";

interface ToolNameWithRefProps {
  name: string;
  className?: string;
  showLink?: boolean;
}

/**
 * Componente que renderiza o nome de uma ferramenta com sua referência numérica.
 * Busca automaticamente pelo nome no índice.
 */
export const ToolNameWithRef = ({ 
  name, 
  className = "",
  showLink = true 
}: ToolNameWithRefProps) => {
  const tool = getToolByName(name);

  // Se não encontrar no índice, renderiza só o nome
  if (!tool) {
    return <span className={className}>{name}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span>{name}</span>
      <ToolReference toolId={tool.id} size="sm" />
    </span>
  );
};

/**
 * Componente para renderizar uma lista de ferramentas com referências
 */
interface ToolListWithRefsProps {
  tools: string[];
  separator?: string;
  className?: string;
}

export const ToolListWithRefs = ({ 
  tools, 
  separator = ", ",
  className = "" 
}: ToolListWithRefsProps) => {
  return (
    <span className={className}>
      {tools.map((toolName, index) => (
        <span key={toolName}>
          <ToolNameWithRef name={toolName} />
          {index < tools.length - 1 && separator}
        </span>
      ))}
    </span>
  );
};

/**
 * Badge de ferramenta com referência clicável
 */
interface ToolBadgeWithRefProps {
  name: string;
  variant?: "default" | "outline" | "secondary";
  className?: string;
  url?: string;
}

export const ToolBadgeWithRef = ({ 
  name, 
  variant = "secondary",
  className = "",
  url
}: ToolBadgeWithRefProps) => {
  const tool = getToolByName(name);
  
  const badgeContent = (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
      ${variant === 'default' ? 'bg-primary text-primary-foreground' : ''}
      ${variant === 'outline' ? 'border border-border bg-background' : ''}
      ${variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : ''}
      ${className}
    `}>
      <span>{name}</span>
      {tool && <ToolReference toolId={tool.id} size="sm" />}
    </span>
  );

  if (url || tool?.url) {
    return (
      <a 
        href={url || tool?.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        {badgeContent}
      </a>
    );
  }

  return badgeContent;
};

export default ToolNameWithRef;
