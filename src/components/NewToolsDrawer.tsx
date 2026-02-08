import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sparkles, 
  ExternalLink, 
  CheckCheck,
  Star
} from "lucide-react";
import { useNewToolsAlert } from "@/hooks/useNewToolsAlert";
import { IndexedTool } from "@/data/toolsIndex";

interface NewToolsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ToolItem = ({ 
  tool, 
  isSeen, 
  onToggle 
}: { 
  tool: IndexedTool; 
  isSeen: boolean;
  onToggle: (toolId: number) => void;
}) => {
  return (
    <Card className={`transition-all ${isSeen ? 'opacity-60 bg-muted/30' : 'bg-card hover:shadow-md'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={isSeen}
            onCheckedChange={() => onToggle(tool.id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-medium ${isSeen ? 'line-through text-muted-foreground' : ''}`}>
                {tool.name}
              </h4>
              {tool.highlight && (
                <Star className="h-3 w-3 text-accent fill-accent" />
              )}
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {tool.subcategory || tool.category}
              </Badge>
            </div>
            {tool.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {tool.description}
              </p>
            )}
          </div>
          {tool.url && (
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const NewToolsDrawer = ({ open, onOpenChange }: NewToolsDrawerProps) => {
  const { 
    unseenTools, 
    unseenCount,
    markToolAsSeen, 
    markAllAsSeen 
  } = useNewToolsAlert();

  // Agrupar por categoria
  const groupedTools = unseenTools.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, IndexedTool[]>);

  const handleMarkAllAndClose = () => {
    markAllAsSeen();
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DrawerTitle className="text-xl">
                Novidades em 2025
              </DrawerTitle>
              <DrawerDescription>
                {unseenCount} {unseenCount === 1 ? 'ferramenta nova' : 'ferramentas novas'} para explorar
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 p-4 max-h-[50vh]">
          <div className="space-y-6">
            {Object.entries(groupedTools).map(([category, tools]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <span>{category}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {tools.length}
                  </Badge>
                </h3>
                <div className="space-y-2">
                  {tools.map(tool => (
                    <ToolItem 
                      key={tool.id} 
                      tool={tool} 
                      isSeen={false}
                      onToggle={markToolAsSeen}
                    />
                  ))}
                </div>
              </div>
            ))}

            {unseenCount === 0 && (
              <div className="text-center py-8">
                <CheckCheck className="h-12 w-12 text-primary mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Você já viu todas as novidades! 🎉
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t">
          <div className="flex gap-2 w-full">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1">
                Fechar
              </Button>
            </DrawerClose>
            <Button 
              className="flex-1 gap-2"
              onClick={handleMarkAllAndClose}
              disabled={unseenCount === 0}
            >
              <CheckCheck className="h-4 w-4" />
              Marcar todas como vistas
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NewToolsDrawer;
