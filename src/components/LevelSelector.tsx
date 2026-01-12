import { Sprout, Leaf, Trees } from "lucide-react";
import { cn } from "@/lib/utils";

export type UserLevel = "iniciante" | "intermediario" | "avancado";

interface LevelSelectorProps {
  selectedLevel: UserLevel | null;
  onSelectLevel: (level: UserLevel) => void;
}

const levels = [
  {
    id: "iniciante" as UserLevel,
    name: "Iniciante",
    description: "Estou começando a programar e quero praticar os fundamentos",
    icon: Sprout,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    selectedBg: "bg-green-500/20",
    selectedBorder: "border-green-500"
  },
  {
    id: "intermediario" as UserLevel,
    name: "Intermediário",
    description: "Já criei alguns projetos e conheço React/frameworks modernos",
    icon: Leaf,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    selectedBg: "bg-blue-500/20",
    selectedBorder: "border-blue-500"
  },
  {
    id: "avancado" as UserLevel,
    name: "Avançado",
    description: "Domino arquitetura, DevOps e boas práticas de desenvolvimento",
    icon: Trees,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    selectedBg: "bg-purple-500/20",
    selectedBorder: "border-purple-500"
  }
];

export const LevelSelector = ({ selectedLevel, onSelectLevel }: LevelSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Qual é o seu nível?</h2>
        <p className="text-muted-foreground mt-1">
          Escolha seu nível para receber sugestões personalizadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => {
          const isSelected = selectedLevel === level.id;
          const Icon = level.icon;

          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className={cn(
                "p-6 rounded-xl border-2 transition-all duration-300",
                "hover:scale-[1.02] hover:shadow-lg",
                "flex flex-col items-center text-center gap-3",
                isSelected
                  ? `${level.selectedBg} ${level.selectedBorder}`
                  : `${level.bgColor} ${level.borderColor} hover:${level.selectedBorder}`
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                isSelected ? level.selectedBg : level.bgColor
              )}>
                <Icon className={cn("w-8 h-8", level.color)} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground">
                {level.name}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {level.description}
              </p>

              {isSelected && (
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  level.selectedBg, level.color
                )}>
                  Selecionado
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelector;
