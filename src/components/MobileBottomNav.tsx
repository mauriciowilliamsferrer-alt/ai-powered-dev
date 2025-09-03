import { Button } from "./ui/button";
import { Home, Search, Settings, BookOpen, Star } from "lucide-react";

interface MobileBottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const MobileBottomNav = ({ activeTab = "home", onTabChange }: MobileBottomNavProps) => {
  const tabs = [
    { id: "home", label: "Início", icon: Home },
    { id: "workflow", label: "Workflow", icon: Settings },
    { id: "tools", label: "Ferramentas", icon: Search },
    { id: "resources", label: "Recursos", icon: BookOpen },
    { id: "favorites", label: "Favoritos", icon: Star }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange?.(tab.id)}
              className={`flex-1 flex-col gap-1 h-auto py-2 px-1 touch-target mobile-focus ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground"
              }`}
              aria-label={tab.label}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs truncate max-w-full">
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};