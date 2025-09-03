import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Settings, Info, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MobileNavigationProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export const MobileNavigation = ({ currentSection, onSectionChange }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'workflow', label: 'Workflow', icon: Settings },
    { id: 'tools', label: 'Ferramentas', icon: Search },
    { id: 'about', label: 'Sobre', icon: Info },
  ];

  const handleNavigation = (sectionId: string) => {
    onSectionChange?.(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="touch-target mobile-focus"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-[280px] mobile-scroll safe-area-top"
        >
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-lg font-semibold">
              Workflow IA
            </SheetTitle>
            <SheetDescription>
              Navegue pelas seções do guia
            </SheetDescription>
          </SheetHeader>
          
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full justify-start touch-target mobile-focus"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                  {isActive && (
                    <Badge variant="secondary" className="ml-auto">
                      Atual
                    </Badge>
                  )}
                </Button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};