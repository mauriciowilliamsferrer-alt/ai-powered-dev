import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  BookOpen, 
  Megaphone, 
  ArrowRight,
  Lightbulb,
  Code2,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStartOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  path: string;
  badge?: string;
  highlight?: boolean;
}

const options: QuickStartOption[] = [
  {
    id: "beginner",
    title: "Sou Iniciante",
    description: "Não sei por onde começar. Quero sugestões personalizadas de projetos para praticar.",
    icon: Sparkles,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30 hover:border-amber-500",
    path: "/projetos",
    badge: "Recomendado",
    highlight: true
  },
  {
    id: "experienced",
    title: "Já Tenho Experiência",
    description: "Conheço programação e quero explorar as melhores ferramentas de IA disponíveis.",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30 hover:border-blue-500",
    path: "/indice"
  },
  {
    id: "marketing",
    title: "Quero Divulgar",
    description: "Já tenho um projeto e preciso de estratégias de marketing e monetização.",
    icon: Megaphone,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30 hover:border-pink-500",
    path: "/divulgacao"
  }
];

interface QuickStartGuideProps {
  className?: string;
}

export const QuickStartGuide = ({ className }: QuickStartGuideProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("w-full", className)}>
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-3 px-3 py-1">
          <Lightbulb className="w-3 h-3 mr-1 inline" />
          Por onde começar?
        </Badge>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Escolha seu caminho
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Selecione a opção que melhor descreve seu momento atual
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {options.map((option) => {
          const Icon = option.icon;
          
          return (
            <Card 
              key={option.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300",
                "hover:shadow-lg hover:scale-[1.02]",
                "border-2",
                option.borderColor,
                option.highlight && "ring-2 ring-amber-500/20"
              )}
              onClick={() => navigate(option.path)}
            >
              {option.badge && (
                <Badge 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white"
                >
                  {option.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-2 pt-6">
                <div className={cn(
                  "w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center",
                  option.bgColor
                )}>
                  <Icon className={cn("w-8 h-8", option.color)} />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                <CardDescription className="mb-4 min-h-[3rem]">
                  {option.description}
                </CardDescription>
                
                <Button 
                  variant={option.highlight ? "default" : "outline"}
                  className="w-full gap-2"
                  asChild
                >
                  <Link to={option.path}>
                    Começar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
        <button 
          onClick={() => document.getElementById('ideacao')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          <TrendingUp className="w-3 h-3" />
          Ver workflow completo ↓
        </button>
      </div>
    </div>
  );
};

export default QuickStartGuide;
