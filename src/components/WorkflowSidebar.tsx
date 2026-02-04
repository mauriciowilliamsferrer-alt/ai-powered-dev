import { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  FileText, 
  Palette, 
  Code, 
  Database, 
  Rocket,
  TestTube,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const workflowPhases = [
  { id: 'ideacao', label: 'Ideação', icon: Lightbulb, color: 'text-yellow-500' },
  { id: 'documentacao', label: 'Documentação', icon: FileText, color: 'text-blue-500' },
  { id: 'design', label: 'Design', icon: Palette, color: 'text-pink-500' },
  { id: 'desenvolvimento', label: 'Desenvolvimento', icon: Code, color: 'text-green-500' },
  { id: 'backend', label: 'Backend', icon: Database, color: 'text-purple-500' },
  { id: 'qualidade', label: 'Qualidade', icon: TestTube, color: 'text-orange-500' },
  { id: 'deploy', label: 'Deploy', icon: Rocket, color: 'text-red-500' },
  { id: 'monitoramento', label: 'Monitoramento', icon: BarChart3, color: 'text-cyan-500' },
];

export function WorkflowSidebar() {
  const [activeSection, setActiveSection] = useState<string>('ideacao');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = workflowPhases.map(phase => ({
        id: phase.id,
        element: document.getElementById(phase.id)
      })).filter(s => s.element);

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhaseClick = (phaseId: string) => {
    const element = document.getElementById(phaseId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col",
        "bg-card/95 backdrop-blur-sm border border-border rounded-r-xl shadow-lg",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-14" : "w-48"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Header */}
      <div className={cn(
        "p-3 border-b border-border",
        isCollapsed && "flex justify-center"
      )}>
        {!isCollapsed && (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Workflow
          </span>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-2">
        <ul className="space-y-1 px-2">
          {workflowPhases.map((phase) => {
            const Icon = phase.icon;
            const isActive = activeSection === phase.id;
            
            return (
              <li key={phase.id}>
                <button
                  onClick={() => handlePhaseClick(phase.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
                    "transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary/10 text-primary font-medium border-l-2 border-primary",
                    !isActive && "text-muted-foreground",
                    isCollapsed && "justify-center px-2"
                  )}
                  title={phase.label}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", isActive ? phase.color : "")} />
                  {!isCollapsed && (
                    <span className="truncate">{phase.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Progress Indicator */}
      <div className={cn(
        "p-3 border-t border-border",
        isCollapsed && "flex justify-center"
      )}>
        {!isCollapsed ? (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progresso</span>
              <span>{Math.round(((workflowPhases.findIndex(p => p.id === activeSection) + 1) / workflowPhases.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ 
                  width: `${((workflowPhases.findIndex(p => p.id === activeSection) + 1) / workflowPhases.length) * 100}%` 
                }}
              />
            </div>
          </div>
        ) : (
          <div className="h-16 w-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="w-full bg-primary rounded-full transition-all duration-300"
              style={{ 
                height: `${((workflowPhases.findIndex(p => p.id === activeSection) + 1) / workflowPhases.length) * 100}%` 
              }}
            />
          </div>
        )}
      </div>
    </aside>
  );
}
