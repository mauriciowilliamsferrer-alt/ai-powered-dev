import { Link, useLocation } from "react-router-dom";
import { Home, Search, Sparkles, Megaphone } from "lucide-react";

const tabs = [
  { path: "/", label: "Início", icon: Home },
  { path: "/indice", label: "Ferramentas", icon: Search },
  { path: "/projetos", label: "Projetos", icon: Sparkles },
  { path: "/divulgacao", label: "Marketing", icon: Megaphone },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-md text-center transition-colors ${
                active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={tab.label}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs truncate max-w-full">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
