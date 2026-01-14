import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface MarketingTipBoxProps {
  title: string;
  content: string;
  copyable?: boolean;
}

export const MarketingTipBox = ({ title, content, copyable = false }: MarketingTipBoxProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          {title}
          {copyable && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-7 px-2"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
          {content}
        </pre>
      </CardContent>
    </Card>
  );
};

interface ChecklistItem {
  item: string;
  priority: string;
}

interface MarketingChecklistProps {
  title: string;
  items: ChecklistItem[];
}

export const MarketingChecklist = ({ title, items }: MarketingChecklistProps) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'text-red-600 bg-red-50';
      case 'média': return 'text-amber-600 bg-amber-50';
      case 'baixa': return 'text-green-600 bg-green-50';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const completedCount = Object.values(checked).filter(Boolean).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount}/{items.length} concluídos
          </span>
        </CardTitle>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li 
              key={index}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                checked[item.item] ? 'bg-muted/50' : 'hover:bg-muted/30'
              }`}
              onClick={() => toggleItem(item.item)}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                checked[item.item] 
                  ? 'bg-primary border-primary' 
                  : 'border-muted-foreground/30'
              }`}>
                {checked[item.item] && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
              <span className={`text-sm flex-1 ${checked[item.item] ? 'line-through text-muted-foreground' : ''}`}>
                {item.item}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
