import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  isActive?: boolean;
}

interface WorkflowBreadcrumbsProps {
  items?: BreadcrumbItem[];
  currentPhase?: number;
  className?: string;
}

// Fases do workflow de desenvolvimento com anchors para scroll
const workflowPhases = [
  { id: 1, label: "Ideação", icon: "💡", path: "ideacao", anchor: "ideacao" },
  { id: 2, label: "Planejamento", icon: "📋", path: "planejamento", anchor: "documentacao" },
  { id: 3, label: "Design", icon: "🎨", path: "design", anchor: "design" },
  { id: 4, label: "Desenvolvimento", icon: "💻", path: "desenvolvimento", anchor: "desenvolvimento" },
  { id: 5, label: "Backend", icon: "🔧", path: "backend", anchor: "backend" },
  { id: 6, label: "Qualidade", icon: "✅", path: "qualidade", anchor: "qualidade" },
  { id: 7, label: "Deploy", icon: "🚀", path: "deploy", anchor: "deploy" },
  { id: 8, label: "Monitoramento", icon: "📊", path: "monitora", anchor: "monitoramento" },
];

// Mapeamento de rotas para breadcrumbs
const routeBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  "/": [
    { label: "Home", href: "/", icon: "🏠" },
  ],
  "/dashboard": [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Dashboard", icon: "📊" },
  ],
  "/devtools-guide": [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "DevTools Guide", icon: "🛠️" },
  ],
  "/indice": [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Índice de Ferramentas", icon: "📚" },
  ],
};

export const WorkflowBreadcrumbs = ({ 
  items, 
  currentPhase,
  className 
}: WorkflowBreadcrumbsProps) => {
  const location = useLocation();
  
  // Se não há items customizados, usar baseado na rota
  const breadcrumbItems = items || routeBreadcrumbs[location.pathname] || [
    { label: "Home", href: "/", icon: "🏠" },
  ];

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center", className)}
    >
      {/* Breadcrumbs de navegação */}
      <ol className="flex items-center gap-1 text-sm flex-wrap">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
            )}
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link 
                to={item.href}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className={cn(
                "flex items-center gap-1",
                index === breadcrumbItems.length - 1 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground"
              )}>
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Indicador de fase do workflow (se fornecido) */}
      {currentPhase !== undefined && currentPhase > 0 && (
        <div className="ml-4 pl-4 border-l flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Fase:</span>
          <div className="flex items-center gap-1">
            {workflowPhases.map((phase) => (
              <div
                key={phase.id}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  phase.id === currentPhase
                    ? "w-6 bg-primary"
                    : phase.id < currentPhase
                    ? "bg-primary/60"
                    : "bg-muted"
                )}
                title={`${phase.icon} ${phase.label}`}
              />
            ))}
          </div>
          <span className="text-xs font-medium">
            {workflowPhases[currentPhase - 1]?.icon} {workflowPhases[currentPhase - 1]?.label}
          </span>
        </div>
      )}
    </nav>
  );
};

/**
 * Barra de progresso horizontal do workflow
 */
export const WorkflowProgressBar = ({ 
  currentPhase = 0,
  onPhaseClick,
  className 
}: { 
  currentPhase?: number;
  onPhaseClick?: (phase: number) => void;
  className?: string;
}) => {
  const handlePhaseClick = (phase: typeof workflowPhases[0]) => {
    // Scroll para a seção correspondente
    const element = document.getElementById(phase.anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Também chama o callback se existir
    onPhaseClick?.(phase.id);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="relative">
        {/* Linha de fundo */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 rounded-full" />
        
        {/* Linha de progresso */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500"
          style={{ width: `${((currentPhase - 1) / (workflowPhases.length - 1)) * 100}%` }}
        />
        
        {/* Pontos das fases - agora são links clicáveis */}
        <div className="relative flex justify-between">
          {workflowPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handlePhaseClick(phase)}
              className={cn(
                "flex flex-col items-center gap-1 group transition-all cursor-pointer",
                "hover:scale-105"
              )}
              title={`Ir para ${phase.label}`}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all",
                  "border-2 bg-background",
                  phase.id === currentPhase
                    ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg"
                    : phase.id < currentPhase
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-muted text-muted-foreground group-hover:border-primary/50 group-hover:bg-primary/10"
                )}
              >
                {phase.icon}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors hidden sm:block",
                "group-hover:text-primary",
                phase.id === currentPhase
                  ? "text-primary"
                  : phase.id < currentPhase
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}>
                {phase.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Breadcrumbs compactos para mobile
 */
export const MobileWorkflowIndicator = ({ 
  currentPhase = 0,
  className 
}: { 
  currentPhase?: number;
  className?: string;
}) => {
  const phase = workflowPhases[currentPhase - 1];
  
  if (!phase) return null;

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium",
      className
    )}>
      <span>{phase.icon}</span>
      <span>Fase {phase.id}: {phase.label}</span>
      <span className="text-xs text-primary/60">
        ({currentPhase}/{workflowPhases.length})
      </span>
    </div>
  );
};

export default WorkflowBreadcrumbs;
