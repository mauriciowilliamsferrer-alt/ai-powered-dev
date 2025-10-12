import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface LearningPathCardProps {
  title: string;
  description: string;
}

export const LearningPathCard = ({ title, description }: LearningPathCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.02] bg-gradient-to-br from-card/80 to-card border-primary/20">
      <CardContent className="p-4 flex items-start gap-3">
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">
            {title}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
