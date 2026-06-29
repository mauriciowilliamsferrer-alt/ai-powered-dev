import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X, ChevronRight } from "lucide-react";
import { useNewToolsAlert } from "@/hooks/useNewToolsAlert";
import { NewToolsDrawer } from "./NewToolsDrawer";

export const NewToolsBanner = () => {
  const { unseenCount, showBanner, dismissBanner } = useNewToolsAlert();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300">
        <div className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="container mx-auto flex items-center justify-between gap-4 py-2 px-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <p className="text-sm text-foreground truncate">
                <span className="font-medium">{unseenCount} {unseenCount === 1 ? 'nova ferramenta' : 'novas ferramentas'}</span>
                <span className="text-muted-foreground"> desde sua última visita</span>
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 gap-1 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10"
                onClick={() => setIsDrawerOpen(true)}
              >
                Ver novidades
                <ChevronRight className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={dismissBanner}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dispensar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NewToolsDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </>
  );
};

export default NewToolsBanner;
