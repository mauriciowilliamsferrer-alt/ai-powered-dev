import { MobileNavigation } from "./MobileNavigation";
import { Button } from "./ui/button";
import { Search, Filter } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  currentSection?: string;
  onSectionChange?: (section: string) => void;
  onSearch?: () => void;
  onFilter?: () => void;
  showSearch?: boolean;
  showFilter?: boolean;
}

export const MobileHeader = ({ 
  title = "Workflow IA", 
  currentSection, 
  onSectionChange,
  onSearch,
  onFilter,
  showSearch = false,
  showFilter = false
}: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-top">
      <div className="mobile-padding py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MobileNavigation 
              currentSection={currentSection}
              onSectionChange={onSectionChange}
            />
            <h1 className="text-lg font-semibold truncate">{title}</h1>
          </div>
          
          <div className="flex items-center gap-1">
            {showSearch && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSearch}
                className="touch-target mobile-focus"
                aria-label="Pesquisar"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {showFilter && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onFilter}
                className="touch-target mobile-focus"
                aria-label="Filtros"
              >
                <Filter className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};