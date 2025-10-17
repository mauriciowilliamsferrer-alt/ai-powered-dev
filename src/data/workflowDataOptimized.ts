// Optimized version with lazy loading for large data structures
export interface WorkflowStage {
  id: string;
  title: string;
  objective: string;
  mainTools: string[];
  summary: string;
  deliverables: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Tool {
  name: string;
  category: string;
  usage: string;
  notes: string;
  url: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  pricing: 'Gratuito' | 'Freemium' | 'Pago' | 'Beta';
  tags: string[];
  rating: number;
  integrations: string[];
  sequenceNumber?: number;
  phase?: string;
  nextTools?: string[];
  previousTools?: string[];
  useCases?: string[];
  setupTime?: string;
  monthlyCost?: string;
  learningCurve?: number;
}

export interface EducationalResource {
  id: string;
  title: string;
  type: 'tutorial' | 'video' | 'documentation' | 'guide' | 'example';
  description: string;
  url: string;
  duration?: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  relatedStages: string[];
  relatedTools: string[];
}

export interface ValidationCriteria {
  stage: string;
  deliverable: string;
  criteria: string[];
  examples: string[];
  commonMistakes: string[];
}

export interface ApiPlatform {
  name: string;
  description: string;
  availableModels: string;
  freeLimits: string;
  apiUrl: string;
  compatibleWithOpenAI: boolean;
  isLocal: boolean;
}

export interface Action {
  stage: string;
  action: string;
  tools: string[];
  expectedResult: string;
  notes: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const projectPhases: ProjectPhase[] = [
  {
    id: 'ideacao',
    name: '1. Ideação & Brainstorm',
    description: 'Definir conceito, validar ideia, criar briefing inicial',
    color: 'hsl(0 84.2% 60.2%)',
    icon: '💡'
  },
  {
    id: 'planejamento',
    name: '2. Planejamento & Arquitetura',
    description: 'Schemas de banco, arquitetura, stack técnico',
    color: 'hsl(197.4 71.4% 73.3%)',
    icon: '📋'
  },
  {
    id: 'design',
    name: '3. Design & Prototipagem',
    description: 'UI/UX, componentes visuais, design system',
    color: 'hsl(262.1 83.3% 57.8%)',
    icon: '🎨'
  },
  {
    id: 'desenvolvimento',
    name: '4. Desenvolvimento',
    description: 'Código, implementação, features',
    color: 'hsl(142.1 76.2% 36.3%)',
    icon: '💻'
  },
  {
    id: 'backend',
    name: '5. Backend & Database',
    description: 'APIs, banco de dados, autenticação',
    color: 'hsl(47.9 95.8% 53.1%)',
    icon: '🔧'
  },
  {
    id: 'qualidade',
    name: '6. Qualidade & Testes',
    description: 'Testes, revisão de código, CI/CD',
    color: 'hsl(215.4 16.3% 46.9%)',
    icon: '✅'
  },
  {
    id: 'deploy',
    name: '7. Deploy & Infraestrutura',
    description: 'Hospedagem, domínio, SSL, CDN',
    color: 'hsl(221.2 83.2% 53.3%)',
    icon: '🚀'
  },
  {
    id: 'monitora',
    name: '8. Monitoramento & Manutenção',
    description: 'Analytics, logs, suporte, updates',
    color: 'hsl(280 83.3% 67.8%)',
    icon: '📊'
  }
];

// Essential data loaded immediately
export const workflowStages: WorkflowStage[] = [
  {
    id: 'A',
    title: 'Fundamentos & Acesso',
    objective: 'Deixar contas, tokens e ambiente prontos e seguros',
    mainTools: ['GitHub PATs', 'Amazon Q Developer', 'Warp'],
    summary: 'Gerar tokens; validar logins; configurar terminal e variáveis',
    deliverables: '.env.local seguro; acesso AWS validado; Warp com aliases/scripts',
    status: 'completed'
  },
  {
    id: 'B',
    title: 'Editor/IDE + Assistentes',
    objective: 'Definir IDE diária e habilitar copilotos/agents',
    mainTools: ['Cursor ou JetBrains', 'GitHub Copilot', 'ChatGPT – Code', 'Claude Code', 'Cline/Roo'],
    summary: 'Instalar IDE; ativar IA; testar um agente em repo de exemplo',
    deliverables: 'IDE configurada; agente funcionando com um commit de teste',
    status: 'current'
  },
  {
    id: 'C',
    title: 'Protótipo UI & Esqueleto do App',
    objective: 'Levantar Next.js/TS e primeiras telas',
    mainTools: ['v0.app', 'bolt.new', 'Lovable', 'Replit AI', 'Leap.new'],
    summary: 'Gerar componentes; criar projeto base; publicar preview',
    deliverables: 'Repo Next.js/TS; UI exportada; deploy/preview online',
    status: 'pending'
  },
  {
    id: 'D',
    title: 'Implementação Agentic no Repo',
    objective: 'Evoluir features com agentes',
    mainTools: ['Aider', 'Cline/Roo', 'Claude Code', 'ChatGPT – Code', 'Amazon Q', 'Augment', 'Amp'],
    summary: 'Resolver issues via agentes; aplicar refactors; registrar decisões',
    deliverables: 'PRs pequenos e frequentes; mini-ADR (decisões)',
    status: 'pending'
  }
];

// Lazy loading functions for heavy data
export const loadTools = async (): Promise<Tool[]> => {
  const { tools } = await import('./workflowData');
  return tools;
};

export const loadApiPlatforms = async (): Promise<ApiPlatform[]> => {
  const { apiPlatforms } = await import('./workflowData');
  return apiPlatforms;
};

export const loadEducationalResources = async (): Promise<EducationalResource[]> => {
  const { educationalResources } = await import('./workflowData');
  return educationalResources;
};

export const loadActions = async (): Promise<Action[]> => {
  const { actions } = await import('./workflowData');
  return actions;
};

export const loadValidationCriteria = async (): Promise<ValidationCriteria[]> => {
  const { validationCriteria } = await import('./workflowData');
  return validationCriteria;
};