import { 
  Zap, 
  Calendar, 
  CalendarDays, 
  CalendarRange,
  Clock,
  Timer,
  Hourglass,
  Building,
  Building2,
  Castle,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectDuration = 
  | "1-dia" 
  | "1-semana" 
  | "1-mes" 
  | "3-meses" 
  | "6-meses" 
  | "1-ano" 
  | "2-anos" 
  | "3-anos" 
  | "4-anos"
  | "5-anos" 
  | "10-anos" 
  | "20-anos";

interface DurationCardProps {
  duration: ProjectDuration;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

interface DurationInfo {
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

const durationData: Record<ProjectDuration, DurationInfo> = {
  "1-dia": {
    name: "1 Dia",
    description: "Projetos rápidos para praticar",
    icon: Zap,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30"
  },
  "1-semana": {
    name: "1 Semana",
    description: "Mini-projetos funcionais",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30"
  },
  "1-mes": {
    name: "1 Mês",
    description: "Projetos com mais features",
    icon: CalendarDays,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30"
  },
  "3-meses": {
    name: "3 Meses",
    description: "Produtos MVP",
    icon: CalendarRange,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30"
  },
  "6-meses": {
    name: "6 Meses",
    description: "Produtos completos",
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },
  "1-ano": {
    name: "1 Ano",
    description: "Produtos com escala",
    icon: Timer,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30"
  },
  "2-anos": {
    name: "2 Anos",
    description: "Startups iniciais",
    icon: Hourglass,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30"
  },
  "3-anos": {
    name: "3 Anos",
    description: "Negócios consolidados",
    icon: Building,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30"
  },
  "4-anos": {
    name: "4 Anos",
    description: "Produtos maduros",
    icon: Building,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30"
  },
  "5-anos": {
    name: "5 Anos",
    description: "Empresas estabelecidas",
    icon: Building2,
    color: "text-fuchsia-500",
    bgColor: "bg-fuchsia-500/10",
    borderColor: "border-fuchsia-500/30"
  },
  "10-anos": {
    name: "10 Anos",
    description: "Grandes empresas",
    icon: Castle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30"
  },
  "20-anos": {
    name: "20 Anos",
    description: "Legados duradouros",
    icon: Crown,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30"
  }
};

export const DurationCard = ({ 
  duration, 
  isSelected, 
  onClick, 
  disabled = false 
}: DurationCardProps) => {
  const info = durationData[duration];
  const Icon = info.icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-4 rounded-xl border-2 transition-all duration-300",
        "hover:scale-[1.03] hover:shadow-md",
        "flex flex-col items-center text-center gap-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        isSelected
          ? `${info.bgColor} border-current ${info.color}`
          : `bg-card ${info.borderColor} hover:border-current`
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center",
        info.bgColor
      )}>
        <Icon className={cn("w-6 h-6", info.color)} />
      </div>
      
      <h3 className={cn(
        "text-base font-semibold",
        isSelected ? info.color : "text-foreground"
      )}>
        {info.name}
      </h3>
      
      <p className="text-xs text-muted-foreground line-clamp-2">
        {info.description}
      </p>
    </button>
  );
};

export const DurationGrid = ({ 
  selectedDuration, 
  onSelectDuration,
  disabled = false 
}: {
  selectedDuration: ProjectDuration | null;
  onSelectDuration: (duration: ProjectDuration) => void;
  disabled?: boolean;
}) => {
  const durations: ProjectDuration[] = [
    "1-dia", "1-semana", "1-mes", "3-meses", "6-meses", "1-ano",
    "2-anos", "3-anos", "4-anos", "5-anos", "10-anos", "20-anos"
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Quanto tempo você tem?</h2>
        <p className="text-muted-foreground mt-1">
          Escolha a duração do projeto que deseja desenvolver
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {durations.map((duration) => (
          <DurationCard
            key={duration}
            duration={duration}
            isSelected={selectedDuration === duration}
            onClick={() => onSelectDuration(duration)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default DurationCard;
