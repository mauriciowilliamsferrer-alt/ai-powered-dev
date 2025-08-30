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
}

export interface Action {
  stage: string;
  action: string;
  tools: string[];
  expectedResult: string;
  notes: string;
}

export interface Validation {
  stage: string;
  deliverable: string;
  validation: string;
}

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
  },
  {
    id: 'E',
    title: 'Integrações avançadas (MCP/Runners)',
    objective: 'Conectar servidores MCP e comparar runners',
    mainTools: ['MCP servers', 'KiloCode', 'Kiro', 'Trae'],
    summary: 'Habilitar 1–2 MCP; testar execução com runners alternativos',
    deliverables: 'Serviços MCP ativos; comparativo rápido de runners',
    status: 'pending'
  },
  {
    id: 'F',
    title: 'Qualidade de código & PRs',
    objective: 'Assegurar que cada PR chegue consistente e revisado',
    mainTools: ['CodeRabbit', 'Qodo.ai', 'BLACKBOX.AI', 'Copilot (PR)'],
    summary: 'Instalar bot de review; configurar checks; usar busca/snippets',
    deliverables: 'Template de PR; comentários automáticos; checks verdes',
    status: 'pending'
  },
  {
    id: 'G',
    title: 'Execução & Testes',
    objective: 'Validar execução, rodar sandboxes e medir performance',
    mainTools: ['Replit AI', 'Warp', 'Amazon Q Developer'],
    summary: 'Criar scripts de build/test; rodar PoCs; consultar Q na AWS',
    deliverables: 'Scripts no package.json/Makefile; sandbox ativo',
    status: 'pending'
  },
  {
    id: 'H',
    title: 'Orquestração de trabalho',
    objective: 'Transformar pedidos em tarefas com link de PR/preview',
    mainTools: ['Jules (Google)'],
    summary: 'Criar tarefas por épico/feature; colar prompts/contexto',
    deliverables: 'Quadro de tarefas com estados e links de PRs',
    status: 'pending'
  },
  {
    id: 'I',
    title: 'Manutenção contínua & Evolução',
    objective: 'Manter loop de melhoria e reduzir débito técnico',
    mainTools: ['Amp', 'Augment', 'MCP', 'Aider', 'Cline/Roo'],
    summary: 'Sweeps periódicos; novas integrações; correções rápidas',
    deliverables: 'Changelog quinzenal; lista viva de integrações',
    status: 'pending'
  }
];

export const tools: Tool[] = [
  {
    name: 'Aider',
    category: 'Agente git-first',
    usage: 'Gerar diffs/patches e commits guiados por IA',
    notes: 'Excelente para tarefas focadas; mantém histórico limpo',
    url: 'https://aider.chat/'
  },
  {
    name: 'Amp',
    category: 'Mudanças em larga escala',
    usage: 'Refactors amplos, renomes e migrações',
    notes: 'Use com branch isolada e revisão atenta',
    url: 'https://ampcode.com'
  },
  {
    name: 'bolt.new',
    category: 'Builder no navegador',
    usage: 'Criar app base (Next.js/TS) e editar online',
    notes: 'Ótimo para MVP rápido; depois traga ao seu repo',
    url: 'https://bolt.new/'
  },
  {
    name: 'ChatGPT – Code',
    category: 'Oráculo de código',
    usage: 'Decisões técnicas, geração de trechos e revisões',
    notes: 'Mantenha prompts com contexto e limites claros',
    url: 'https://chatgpt.com/codex'
  },
  {
    name: 'Claude Code',
    category: 'Agente/CLI & editor',
    usage: 'Refactors, navegação de base e execuções guiadas',
    notes: 'Bom em raciocínio passo a passo',
    url: 'https://claude.ai/settings/claude-code'
  },
  {
    name: 'Cline',
    category: 'Agente no editor',
    usage: 'Planejar→editar→testar→commitar dentro do VS Code',
    notes: 'Dê tarefas granulares para convergir',
    url: 'https://cline.bot/'
  },
  {
    name: 'Cursor',
    category: 'IDE com IA',
    usage: 'Daily driver para TS/React com agentes embutidos',
    notes: 'Alternativa ao VS Code com recursos nativos de IA',
    url: 'https://cursor.com/en/dashboard'
  },
  {
    name: 'GitHub Copilot',
    category: 'Copiloto de código/PR',
    usage: 'Compleções, chat, sugestões de PR',
    notes: 'Verifique políticas de privacidade/licenças',
    url: 'https://docs.github.com/pt/copilot'
  },
  {
    name: 'Lovable',
    category: 'Builder low-code',
    usage: 'Criar landing/flows simples e publicar rápido',
    notes: 'Ideal para páginas de marketing/validação',
    url: 'https://lovable.dev/'
  },
  {
    name: 'v0 (Vercel)',
    category: 'Gerador de UI',
    usage: 'Componentes/variantes de UI e colaborações',
    notes: 'Ótimo para landing e telas iniciais',
    url: 'https://v0.app/'
  }
  // Add more tools as needed
];

export const actions: Action[] = [
  {
    stage: 'A',
    action: 'Gerar GitHub PATs com escopos mínimos (repo, workflow)',
    tools: ['GitHub Tokens (PATs)'],
    expectedResult: 'Credenciais criadas e guardadas no cofre',
    notes: 'Expirar tokens que não usa mais'
  },
  {
    stage: 'A',
    action: 'Configurar variáveis e segredos (.env.local, CI/CD)',
    tools: ['Warp'],
    expectedResult: 'Ambiente local e CI aptos a builds',
    notes: 'Não commitar .env; usar .gitignore'
  },
  {
    stage: 'B',
    action: 'Instalar e escolher IDE principal (Cursor ou JetBrains)',
    tools: ['Cursor', 'JetBrains'],
    expectedResult: 'IDE pronta para o dia a dia',
    notes: 'Evite manter 2 IDEs como principal'
  },
  {
    stage: 'C',
    action: 'Gerar UI inicial (componentes/páginas)',
    tools: ['v0 (Vercel)'],
    expectedResult: 'Componentes exportados para o repo',
    notes: 'Padronizar design tokens'
  }
  // Add more actions as needed
];