import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Home, BookOpen, Sparkles, Megaphone, LayoutDashboard, Wrench } from "lucide-react";
import { useNewToolsAlert } from "@/hooks/useNewToolsAlert";

const navItems = [
  { path: "/", label: "Início", icon: Home },
  { path: "/indice", label: "Ferramentas", icon: BookOpen },
  { path: "/projetos", label: "Projetos IA", icon: Sparkles },
  { path: "/divulgacao", label: "Marketing", icon: Megaphone },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/devtools-guide", label: "DevTools", icon: Wrench },
];

export const GlobalHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { unseenCount, hasUnseenTools } = useNewToolsAlert();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {/* Mobile menu */}
        <div className="md:hidden mr-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px]">
              <SheetHeader className="text-left mb-6">
                <SheetTitle>AI-Powered Dev</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {item.path === "/indice" && hasUnseenTools && (
                        <Badge variant="destructive" className="ml-auto text-[10px] px-1.5 py-0">
                          {unseenCount}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="font-bold text-base mr-6 whitespace-nowrap">
          AI-Powered Dev
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {item.path === "/indice" && hasUnseenTools && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                    {unseenCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
