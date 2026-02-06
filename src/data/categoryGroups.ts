// Agrupamento de categorias em páginas especializadas
import { Code2, Sparkles, Palette, Megaphone, Plug, Shield, LucideIcon } from "lucide-react";
import { allTools, IndexedTool } from "./toolsIndex";

export interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  categories: string[]; // nomes das categorias incluídas
}

export const categoryGroups: CategoryGroup[] = [
  {
    id: "desenvolvimento",
    name: "Desenvolvimento",
    description: "IDEs, agentes de código, backend e deploy",
    icon: Code2,
    color: "hsl(221 83% 53%)",
    gradient: "from-blue-500 to-indigo-600",
    categories: [
      "Desenvolvimento",
      "Backend",
      "Deploy",
      "Infraestrutura",
      "IA Local",
      "APIs de LLM"
    ]
  },
  {
    id: "ia-generativa",
    name: "IA Generativa",
    description: "Modelos de IA, imagens, vídeos e áudio",
    icon: Sparkles,
    color: "hsl(280 83% 58%)",
    gradient: "from-purple-500 to-pink-600",
    categories: [
      "IA Generativa",
      "Ideação com IA"
    ]
  },
  {
    id: "design",
    name: "Design",
    description: "Prototipagem, UI e assets visuais",
    icon: Palette,
    color: "hsl(330 80% 60%)",
    gradient: "from-pink-500 to-rose-600",
    categories: [
      "Prototipagem & UI",
      "Design",
      "Assets"
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Redes sociais, SEO, monetização e crescimento",
    icon: Megaphone,
    color: "hsl(15 80% 55%)",
    gradient: "from-orange-500 to-red-600",
    categories: [
      "Pesquisa de Mercado",
      "Redes Sociais",
      "Marketing Digital",
      "SEO",
      "Tendências",
      "Monetização",
      "Portfólio",
      "Networking",
      "Leads",
      "Investimento",
      "Freelance",
      "Educação"
    ]
  },
  {
    id: "servicos",
    name: "Serviços & APIs",
    description: "Scraping, email, pagamentos, auth e integrações",
    icon: Plug,
    color: "hsl(170 70% 45%)",
    gradient: "from-teal-500 to-emerald-600",
    categories: [
      "Serviços & APIs"
    ]
  },
  {
    id: "qualidade",
    name: "Qualidade & Ops",
    description: "Testes, segurança, automação e boas práticas",
    icon: Shield,
    color: "hsl(142 76% 36%)",
    gradient: "from-green-500 to-emerald-600",
    categories: [
      "Qualidade",
      "Automação",
      "Analytics",
      "Boas Práticas",
      "Documentação"
    ]
  }
];

// Função para obter ferramentas de um grupo
export const getToolsByGroup = (groupId: string): IndexedTool[] => {
  const group = categoryGroups.find(g => g.id === groupId);
  if (!group) return [];
  
  return allTools.filter(tool => group.categories.includes(tool.category));
};

// Função para encontrar o grupo de uma categoria
export const findGroupForCategory = (category: string): CategoryGroup | undefined => {
  return categoryGroups.find(group => group.categories.includes(category));
};

// Contagem de ferramentas por grupo
export const getToolCountByGroup = (groupId: string): number => {
  return getToolsByGroup(groupId).length;
};

// Função para obter todos os grupos com contagem
export const getCategoryGroupsWithCounts = () => {
  return categoryGroups.map(group => ({
    ...group,
    toolCount: getToolCountByGroup(group.id)
  }));
};
