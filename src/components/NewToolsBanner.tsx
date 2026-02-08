import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
        <Alert className="rounded-none border-x-0 border-t-0 bg-gradient-to-r from-primary/90 via-primary to-primary/90 text-primary-foreground shadow-lg">
          <div className="container mx-auto flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <AlertTitle className="text-sm font-semibold">
                  🎉 Novidades!
                </AlertTitle>
                <AlertDescription className="text-xs text-primary-foreground/90">
                  {unseenCount} {unseenCount === 1 ? 'nova ferramenta' : 'novas ferramentas'} desde sua última visita
                </AlertDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                className="h-8 gap-1 text-xs font-medium"
                onClick={() => setIsDrawerOpen(true)}
              >
                Ver Novidades
                <ChevronRight className="h-3 w-3" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={dismissBanner}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dispensar</span>
              </Button>
            </div>
          </div>
        </Alert>
      </div>

      <NewToolsDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </>
  );
};

export default NewToolsBanner;
