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
    url: 'https://aider.chat/',
    difficulty: 'Intermediário',
    pricing: 'Freemium',
    tags: ['git', 'commits', 'patches', 'cli'],
    rating: 4.5,
    integrations: ['GitHub', 'VS Code', 'Terminal']
  },
  {
    name: 'Amp',
    category: 'Mudanças em larga escala',
    usage: 'Refactors amplos, renomes e migrações',
    notes: 'Use com branch isolada e revisão atenta',
    url: 'https://ampcode.com',
    difficulty: 'Avançado',
    pricing: 'Pago',
    tags: ['refactor', 'migration', 'large-scale'],
    rating: 4.2,
    integrations: ['GitHub', 'GitLab']
  },
  {
    name: 'bolt.new',
    category: 'Builder no navegador',
    usage: 'Criar app base (Next.js/TS) e editar online',
    notes: 'Ótimo para MVP rápido; depois traga ao seu repo',
    url: 'https://bolt.new/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['nextjs', 'typescript', 'mvp', 'online'],
    rating: 4.6,
    integrations: ['GitHub', 'Vercel', 'Netlify']
  },
  {
    name: 'ChatGPT – Code',
    category: 'Oráculo de código',
    usage: 'Decisões técnicas, geração de trechos e revisões',
    notes: 'Mantenha prompts com contexto e limites claros',
    url: 'https://chatgpt.com/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['chat', 'code-generation', 'review', 'decisions'],
    rating: 4.4,
    integrations: ['API', 'Plugins', 'Extensions']
  },
  {
    name: 'Claude Code',
    category: 'Agente/CLI & editor',
    usage: 'Refactors, navegação de base e execuções guiadas',
    notes: 'Bom em raciocínio passo a passo',
    url: 'https://claude.ai/',
    difficulty: 'Intermediário',
    pricing: 'Freemium',
    tags: ['reasoning', 'refactor', 'analysis'],
    rating: 4.7,
    integrations: ['API', 'CLI', 'Cline']
  },
  {
    name: 'Cline',
    category: 'Agente no editor',
    usage: 'Planejar→editar→testar→commitar dentro do VS Code',
    notes: 'Dê tarefas granulares para convergir',
    url: 'https://cline.bot/',
    difficulty: 'Intermediário',
    pricing: 'Gratuito',
    tags: ['vscode', 'automation', 'planning', 'commit'],
    rating: 4.3,
    integrations: ['VS Code', 'Claude', 'GitHub']
  },
  {
    name: 'Cursor',
    category: 'IDE com IA',
    usage: 'Daily driver para TS/React com agentes embutidos',
    notes: 'Alternativa ao VS Code com recursos nativos de IA',
    url: 'https://cursor.com/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['ide', 'typescript', 'react', 'ai-native'],
    rating: 4.8,
    integrations: ['GitHub', 'Extensions', 'OpenAI']
  },
  {
    name: 'GitHub Copilot',
    category: 'Copiloto de código/PR',
    usage: 'Compleções, chat, sugestões de PR',
    notes: 'Verifique políticas de privacidade/licenças',
    url: 'https://github.com/features/copilot',
    difficulty: 'Iniciante',
    pricing: 'Pago',
    tags: ['completion', 'pr-suggestions', 'chat'],
    rating: 4.5,
    integrations: ['GitHub', 'VS Code', 'JetBrains']
  },
  {
    name: 'Lovable',
    category: 'Builder low-code',
    usage: 'Criar landing/flows simples e publicar rápido',
    notes: 'Ideal para páginas de marketing/validação',
    url: 'https://lovable.dev/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['low-code', 'landing', 'marketing'],
    rating: 4.4,
    integrations: ['GitHub', 'Vercel', 'Supabase']
  },
  {
    name: 'v0 (Vercel)',
    category: 'Gerador de UI',
    usage: 'Componentes/variantes de UI e colaborações',
    notes: 'Ótimo para landing e telas iniciais',
    url: 'https://v0.app/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['ui', 'components', 'design', 'collaboration'],
    rating: 4.6,
    integrations: ['Vercel', 'React', 'Tailwind']
  },
  {
    name: 'Replit AI',
    category: 'IDE + Execução',
    usage: 'Desenvolver e executar código online com assistente IA',
    notes: 'Ideal para prototipagem rápida e aprendizado',
    url: 'https://replit.com/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['online-ide', 'execution', 'prototyping'],
    rating: 4.2,
    integrations: ['GitHub', 'NPM', 'Multiple Languages']
  },
  {
    name: 'Warp',
    category: 'Terminal inteligente',
    usage: 'Terminal com IA para comandos e automação',
    notes: 'Melhor produtividade com sugestões e blocos',
    url: 'https://warp.dev/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['terminal', 'ai-suggestions', 'blocks'],
    rating: 4.3,
    integrations: ['Zsh', 'Bash', 'Git', 'AWS']
  },
  {
    name: 'Amazon Q Developer',
    category: 'Assistente AWS',
    usage: 'Consultorias sobre AWS e otimizações de código',
    notes: 'Especializado em ecossistema AWS',
    url: 'https://aws.amazon.com/q/developer/',
    difficulty: 'Intermediário',
    pricing: 'Freemium',
    tags: ['aws', 'cloud', 'optimization', 'consulting'],
    rating: 4.1,
    integrations: ['AWS', 'VS Code', 'JetBrains']
  },
  {
    name: 'CodeRabbit',
    category: 'Review automático',
    usage: 'Bot para revisar PRs com sugestões inteligentes',
    notes: 'Configura checks de qualidade e padrões',
    url: 'https://coderabbit.ai/',
    difficulty: 'Intermediário',
    pricing: 'Freemium',
    tags: ['pr-review', 'quality', 'automation'],
    rating: 4.4,
    integrations: ['GitHub', 'GitLab', 'Bitbucket']
  },
  {
    name: 'Qodo.ai (ex-CodiumAI)',
    category: 'Testes e qualidade',
    usage: 'Geração automática de testes e análise de código',
    notes: 'Foco em test generation e code analysis',
    url: 'https://qodo.ai/',
    difficulty: 'Intermediário',
    pricing: 'Freemium',
    tags: ['testing', 'quality', 'analysis'],
    rating: 4.2,
    integrations: ['VS Code', 'JetBrains', 'GitHub']
  },
  {
    name: 'Jules (Google)',
    category: 'Orquestração',
    usage: 'Gerenciar tarefas e projetos com IA',
    notes: 'Conecta requisitos com PRs e deploys',
    url: 'https://jules.ai/',
    difficulty: 'Avançado',
    pricing: 'Beta',
    tags: ['project-management', 'orchestration', 'tasks'],
    rating: 4.0,
    integrations: ['Google Workspace', 'GitHub']
  },
  {
    name: 'Augment',
    category: 'Context-aware assistant',
    usage: 'Assistente que entende contexto completo do projeto',
    notes: 'Navega e entende toda a codebase',
    url: 'https://augmentcode.com/',
    difficulty: 'Intermediário',
    pricing: 'Pago',
    tags: ['context-aware', 'codebase-analysis'],
    rating: 4.3,
    integrations: ['VS Code', 'GitHub']
  },
  {
    name: 'BLACKBOX.AI',
    category: 'Code search & snippets',
    usage: 'Buscar código e snippets em repositórios',
    notes: 'Grande base de código para referência',
    url: 'https://blackbox.ai/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['code-search', 'snippets', 'reference'],
    rating: 4.0,
    integrations: ['Browser', 'Extensions']
  },
  {
    name: 'KiloCode',
    category: 'Code execution',
    usage: 'Execução segura de código em sandbox',
    notes: 'Ambiente isolado para teste de código',
    url: 'https://kilocode.com/',
    difficulty: 'Intermediário',
    pricing: 'Freemium',
    tags: ['sandbox', 'execution', 'testing'],
    rating: 3.9,
    integrations: ['API', 'Multiple Languages']
  },
  {
    name: 'Kiro',
    category: 'AI runner',
    usage: 'Executar scripts e automações com IA',
    notes: 'Foco em automação de tarefas repetitivas',
    url: 'https://kiro.ai/',
    difficulty: 'Intermediário',
    pricing: 'Beta',
    tags: ['automation', 'scripts', 'ai-runner'],
    rating: 3.8,
    integrations: ['CLI', 'Scripts']
  },
  {
    name: 'Trae',
    category: 'Testing runner',
    usage: 'Executar e gerenciar suites de teste',
    notes: 'Otimizado para CI/CD pipelines',
    url: 'https://trae.dev/',
    difficulty: 'Avançado',
    pricing: 'Freemium',
    tags: ['testing', 'ci-cd', 'runner'],
    rating: 4.1,
    integrations: ['GitHub Actions', 'Jenkins']
  },
  {
    name: 'MCP Servers',
    category: 'Protocol & Integration',
    usage: 'Conectar diferentes ferramentas via protocolo padronizado',
    notes: 'Padrão emergente para interoperabilidade',
    url: 'https://modelcontextprotocol.io/',
    difficulty: 'Avançado',
    pricing: 'Gratuito',
    tags: ['protocol', 'integration', 'interoperability'],
    rating: 4.0,
    integrations: ['Claude', 'Multiple Tools']
  },
  {
    name: 'Leap.new',
    category: 'AI App Builder',
    usage: 'Criar aplicações completas com prompts',
    notes: 'Foco em full-stack development',
    url: 'https://leap.new/',
    difficulty: 'Iniciante',
    pricing: 'Freemium',
    tags: ['full-stack', 'app-builder', 'prompts'],
    rating: 4.2,
    integrations: ['GitHub', 'Deployment Platforms']
  }
];

export const apiPlatforms: ApiPlatform[] = [
  {
    name: 'OpenRouter',
    description: 'Plataforma que roteia para múltiplos provedores de LLMs, incluindo DeepSeek. Oferece acesso gratuito a modelos como DeepSeek-R1 via API compatível com OpenAI.',
    availableModels: 'DeepSeek-R1, Llama, Mistral e outros open-source',
    freeLimits: '1M tokens gratuitos iniciais + créditos de teste; limites de taxa diários',
    apiUrl: 'https://openrouter.ai',
    compatibleWithOpenAI: true,
    isLocal: false
  },
  {
    name: 'Hugging Face Inference API',
    description: 'Hospeda milhares de modelos open-source, incluindo DeepSeek-V3 e alternativas como Qwen, Mistral e Llama. API gratuita para inferência em modelos hospedados.',
    availableModels: 'DeepSeek-V3, Qwen2.5, Mistral-7B, Llama-3.1 (até 70B params)',
    freeLimits: 'Até 1.000 requisições/dia; limites de tokens por minuto',
    apiUrl: 'https://huggingface.co/docs/inference-endpoints',
    compatibleWithOpenAI: false,
    isLocal: false
  },
  {
    name: 'Google AI Studio (Gemini API)',
    description: 'API gratuita para modelos do Google, com foco em raciocínio, codificação e multimodal (texto + imagem). Semelhante à DeepSeek em eficiência.',
    availableModels: 'Gemini 1.5 Flash, Gemini Pro (versões gratuitas)',
    freeLimits: '60 requisições/minuto; 1.500/dia para testes',
    apiUrl: 'https://aistudio.google.com/app/apikey',
    compatibleWithOpenAI: false,
    isLocal: false
  },
  {
    name: 'Groq',
    description: 'Plataforma de inferência rápida para modelos open-source, com API gratuita para desenvolvedores. Excelente para codificação e respostas velozes.',
    availableModels: 'Llama-3, Mixtral, Gemma (até 70B params)',
    freeLimits: 'Créditos gratuitos iniciais (ex.: 1M tokens); limites de taxa',
    apiUrl: 'https://console.groq.com/keys',
    compatibleWithOpenAI: true,
    isLocal: false
  },
  {
    name: 'Together AI',
    description: 'Oferece API para mais de 200 modelos open-source, incluindo DeepSeek-R1. Foco em pay-per-token, mas com tier gratuito para testes.',
    availableModels: 'DeepSeek-R1, Qwen, Llama-Vision, Mistral',
    freeLimits: 'Tokens gratuitos para novos usuários; limites de throughput',
    apiUrl: 'https://www.together.ai/models',
    compatibleWithOpenAI: true,
    isLocal: false
  },
  {
    name: 'AI/ML API',
    description: 'Plataforma que unifica APIs para modelos open-source como DeepSeek-V3. Tier gratuito para sandbox e testes, ideal para integração rápida.',
    availableModels: 'DeepSeek-V3, Llama, Stable Diffusion (para texto e imagem)',
    freeLimits: 'Acesso gratuito a sandbox; limites de requisições diárias',
    apiUrl: 'https://aimlapi.com/models/deepseek-v3',
    compatibleWithOpenAI: true,
    isLocal: false
  },
  {
    name: 'Ollama',
    description: 'Ferramenta para rodar modelos localmente via API (não hospedada, mas gratuita). Suporta DeepSeek e similares; perfeito se você quiser evitar limites de nuvem.',
    availableModels: 'DeepSeek-Coder, Llama-3, Mistral (baixe e rode localmente)',
    freeLimits: 'Ilimitado (depende do seu hardware); API local',
    apiUrl: 'https://ollama.com',
    compatibleWithOpenAI: true,
    isLocal: true
  }
];

export const actions: Action[] = [
  // Stage A: Fundamentos & Acesso
  {
    stage: 'A',
    action: 'Gerar GitHub PATs com escopos mínimos (repo, workflow)',
    tools: ['GitHub'],
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
    stage: 'A',
    action: 'Configurar Amazon Q Developer com credenciais AWS',
    tools: ['Amazon Q Developer', 'AWS'],
    expectedResult: 'Acesso Q funcionando com permissões adequadas',
    notes: 'Usar IAM roles com princípio do menor privilégio'
  },
  {
    stage: 'A',
    action: 'Personalizar Warp com aliases e scripts úteis',
    tools: ['Warp'],
    expectedResult: 'Terminal otimizado com comandos personalizados',
    notes: 'Sincronizar configuração entre dispositivos'
  },

  // Stage B: Editor/IDE + Assistentes
  {
    stage: 'B',
    action: 'Instalar e escolher IDE principal (Cursor ou JetBrains)',
    tools: ['Cursor', 'JetBrains'],
    expectedResult: 'IDE pronta para o dia a dia',
    notes: 'Evite manter 2 IDEs como principal'
  },
  {
    stage: 'B',
    action: 'Configurar GitHub Copilot com settings adequados',
    tools: ['GitHub Copilot'],
    expectedResult: 'Sugestões funcionando em diferentes linguagens',
    notes: 'Ajustar configurações de privacidade se necessário'
  },
  {
    stage: 'B',
    action: 'Instalar e testar Cline no VS Code/Cursor',
    tools: ['Cline', 'VS Code', 'Cursor'],
    expectedResult: 'Agente capaz de fazer commits simples',
    notes: 'Comece com tarefas pequenas para avaliar comportamento'
  },
  {
    stage: 'B',
    action: 'Configurar ChatGPT/Claude com contexto de projeto',
    tools: ['ChatGPT – Code', 'Claude Code'],
    expectedResult: 'Assistentes cientes do stack tecnológico',
    notes: 'Manter prompts padrão para consultas recorrentes'
  },

  // Stage C: Protótipo UI & Esqueleto do App
  {
    stage: 'C',
    action: 'Gerar UI inicial (componentes/páginas)',
    tools: ['v0 (Vercel)'],
    expectedResult: 'Componentes exportados para o repo',
    notes: 'Padronizar design tokens'
  },
  {
    stage: 'C',
    action: 'Criar projeto base Next.js/TS via bolt.new',
    tools: ['bolt.new'],
    expectedResult: 'Aplicação funcional com estrutura básica',
    notes: 'Exportar código limpo para repositório próprio'
  },
  {
    stage: 'C',
    action: 'Usar Lovable para landing pages/marketing',
    tools: ['Lovable'],
    expectedResult: 'Páginas de apresentação publicadas',
    notes: 'Ideal para validação rápida de conceito'
  },
  {
    stage: 'C',
    action: 'Configurar deploy automático (Vercel/Netlify)',
    tools: ['Vercel', 'Netlify'],
    expectedResult: 'Pipeline de deploy funcionando',
    notes: 'Conectar repositório para deploys automáticos'
  },

  // Stage D: Implementação Agentic no Repo
  {
    stage: 'D',
    action: 'Configurar Aider para commits estruturados',
    tools: ['Aider'],
    expectedResult: 'Fluxo git limpo com mensagens padronizadas',
    notes: 'Usar .aiderignore para arquivos sensíveis'
  },
  {
    stage: 'D',
    action: 'Implementar features via Claude Code/Cline',
    tools: ['Claude Code', 'Cline'],
    expectedResult: 'Funcionalidades implementadas com testes',
    notes: 'Dividir tarefas grandes em subtarefas específicas'
  },
  {
    stage: 'D',
    action: 'Usar Amazon Q para otimizações AWS',
    tools: ['Amazon Q Developer'],
    expectedResult: 'Código otimizado para serviços AWS',
    notes: 'Focar em performance e custos'
  },
  {
    stage: 'D',
    action: 'Documentar decisões arquiteturais (ADR)',
    tools: ['Markdown', 'GitHub'],
    expectedResult: 'Histórico de decisões técnicas',
    notes: 'Template padrão para consistency'
  },

  // Stage E: Integrações avançadas (MCP/Runners)
  {
    stage: 'E',
    action: 'Configurar servidores MCP básicos',
    tools: ['MCP Servers'],
    expectedResult: '2-3 integrações MCP funcionando',
    notes: 'Começar com integrações simples e estáveis'
  },
  {
    stage: 'E',
    action: 'Testar execução com KiloCode',
    tools: ['KiloCode'],
    expectedResult: 'Ambiente de sandbox configurado',
    notes: 'Usar para testes de código não confiável'
  },
  {
    stage: 'E',
    action: 'Experimentar runners alternativos (Kiro/Trae)',
    tools: ['Kiro', 'Trae'],
    expectedResult: 'Comparativo de performance dos runners',
    notes: 'Documentar vantagens/desvantagens'
  },

  // Stage F: Qualidade de código & PRs
  {
    stage: 'F',
    action: 'Configurar CodeRabbit para review automático',
    tools: ['CodeRabbit'],
    expectedResult: 'Bot ativo fazendo reviews inteligentes',
    notes: 'Ajustar configurações para evitar spam'
  },
  {
    stage: 'F',
    action: 'Implementar Qodo.ai para geração de testes',
    tools: ['Qodo.ai'],
    expectedResult: 'Testes automáticos para funcionalidades críticas',
    notes: 'Revisar testes gerados antes de comitar'
  },
  {
    stage: 'F',
    action: 'Configurar template padrão de PR',
    tools: ['GitHub'],
    expectedResult: 'PRs com checklist e informações padronizadas',
    notes: 'Incluir links para preview e documentação'
  },
  {
    stage: 'F',
    action: 'Usar BLACKBOX.AI para referências de código',
    tools: ['BLACKBOX.AI'],
    expectedResult: 'Snippets de qualidade para problemas comuns',
    notes: 'Sempre adaptar código encontrado ao contexto'
  },

  // Stage G: Execução & Testes
  {
    stage: 'G',
    action: 'Criar scripts de build/test no package.json',
    tools: ['NPM', 'Warp'],
    expectedResult: 'Comandos padronizados para desenvolvimento',
    notes: 'Incluir scripts para diferentes ambientes'
  },
  {
    stage: 'G',
    action: 'Configurar sandbox no Replit para PoCs',
    tools: ['Replit AI'],
    expectedResult: 'Ambiente de testes isolado funcionando',
    notes: 'Usar para validar conceitos antes da implementação'
  },
  {
    stage: 'G',
    action: 'Implementar métricas básicas de performance',
    tools: ['Lighthouse', 'Web Vitals'],
    expectedResult: 'Dashboard de métricas de performance',
    notes: 'Automatizar coleta via CI/CD'
  },

  // Stage H: Orquestração de trabalho
  {
    stage: 'H',
    action: 'Configurar Jules para gestão de tarefas',
    tools: ['Jules (Google)'],
    expectedResult: 'Quadro Kanban conectado com desenvolvimento',
    notes: 'Integrar com GitHub Issues/Projects'
  },
  {
    stage: 'H',
    action: 'Criar templates para diferentes tipos de tarefa',
    tools: ['GitHub', 'Notion'],
    expectedResult: 'Templates padronizados para features/bugs/refactors',
    notes: 'Incluir critérios de aceitação claros'
  },
  {
    stage: 'H',
    action: 'Implementar automação de deploy por ambiente',
    tools: ['GitHub Actions', 'Vercel'],
    expectedResult: 'Pipeline automatizado dev→staging→prod',
    notes: 'Incluir rollback automático se necessário'
  },

  // Stage I: Manutenção contínua & Evolução
  {
    stage: 'I',
    action: 'Configurar sweeps periódicos com Amp',
    tools: ['Amp'],
    expectedResult: 'Refactors automáticos agendados',
    notes: 'Sempre revisar mudanças em larga escala'
  },
  {
    stage: 'I',
    action: 'Implementar monitoramento de dependências',
    tools: ['Dependabot', 'npm audit'],
    expectedResult: 'Atualizações e patches de segurança automáticos',
    notes: 'Configurar auto-merge para patches seguros'
  },
  {
    stage: 'I',
    action: 'Criar changelog automático',
    tools: ['Conventional Commits', 'GitHub'],
    expectedResult: 'Histórico de mudanças gerado automaticamente',
    notes: 'Seguir padrão de conventional commits'
  },
  {
    stage: 'I',
    action: 'Avaliar e integrar novas ferramentas mensalmente',
    tools: ['Augment', 'Novos MCP servers'],
    expectedResult: 'Workflow sempre atualizado com melhores práticas',
    notes: 'Manter lista de ferramentas candidatas'
  }
];

export const educationalResources: EducationalResource[] = [
  {
    id: 'cursor-setup',
    title: 'Configuração Inicial do Cursor IDE',
    type: 'tutorial',
    description: 'Guia completo para configurar o Cursor IDE com todas as extensões e configurações necessárias',
    url: 'https://cursor.com/docs',
    duration: '15 min',
    difficulty: 'Iniciante',
    relatedStages: ['B'],
    relatedTools: ['Cursor']
  },
  {
    id: 'aider-workflow',
    title: 'Workflow Eficiente com Aider',
    type: 'video',
    description: 'Como usar Aider para manter um histórico Git limpo e produtivo',
    url: 'https://aider.chat/docs/usage.html',
    duration: '25 min',
    difficulty: 'Intermediário',
    relatedStages: ['D'],
    relatedTools: ['Aider']
  },
  {
    id: 'mcp-servers-intro',
    title: 'Introdução aos MCP Servers',
    type: 'documentation',
    description: 'Entenda o protocolo MCP e como configurar seus primeiros servidores',
    url: 'https://modelcontextprotocol.io/docs',
    difficulty: 'Avançado',
    relatedStages: ['E'],
    relatedTools: ['MCP Servers', 'Claude Code']
  },
  {
    id: 'github-tokens-security',
    title: 'Segurança com GitHub PATs',
    type: 'guide',
    description: 'Melhores práticas para criar e gerenciar Personal Access Tokens',
    url: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token',
    duration: '10 min',
    difficulty: 'Iniciante',
    relatedStages: ['A'],
    relatedTools: ['GitHub']
  },
  {
    id: 'nextjs-typescript-setup',
    title: 'Next.js + TypeScript: Setup Perfeito',
    type: 'tutorial',
    description: 'Configure um projeto Next.js com TypeScript, ESLint e Prettier',
    url: 'https://nextjs.org/docs/getting-started/typescript',
    duration: '20 min',
    difficulty: 'Iniciante',
    relatedStages: ['C'],
    relatedTools: ['bolt.new', 'v0 (Vercel)']
  },
  {
    id: 'pr-review-automation',
    title: 'Automatizando Review de PRs',
    type: 'example',
    description: 'Exemplos práticos de configuração de bots de review automático',
    url: 'https://coderabbit.ai/docs',
    duration: '30 min',
    difficulty: 'Intermediário',
    relatedStages: ['F'],
    relatedTools: ['CodeRabbit', 'Qodo.ai']
  }
];

export const validationCriteria: ValidationCriteria[] = [
  {
    stage: 'A',
    deliverable: '.env.local seguro',
    criteria: [
      'Arquivo está no .gitignore',
      'Variáveis têm nomes descritivos',
      'Valores sensíveis não estão expostos',
      'Documentação de variáveis existe'
    ],
    examples: [
      'GITHUB_PAT=ghp_xxxxxxxxxxxx',
      'AWS_ACCESS_KEY_ID=AKIA...',
      'DATABASE_URL=postgresql://...'
    ],
    commonMistakes: [
      'Commitar .env no repositório',
      'Usar valores de produção em desenvolvimento',
      'Não documentar variáveis obrigatórias'
    ]
  },
  {
    stage: 'B',
    deliverable: 'IDE configurada',
    criteria: [
      'Extensions essenciais instaladas',
      'Configurações de formatação ativas',
      'Atalhos personalizados configurados',
      'Integração com Git funcionando'
    ],
    examples: [
      'ESLint + Prettier configurados',
      'GitLens extension ativa',
      'Snippets personalizados criados'
    ],
    commonMistakes: [
      'Instalar muitas extensions desnecessárias',
      'Não sincronizar configurações',
      'Ignorar configurações de workspace'
    ]
  },
  {
    stage: 'C',
    deliverable: 'Repo Next.js/TS',
    criteria: [
      'Estrutura de pastas padronizada',
      'TypeScript configurado corretamente',
      'Build sem erros',
      'Deploy automático funcionando'
    ],
    examples: [
      'pages/ ou app/ estruturado',
      'components/ organizados por feature',
      'tsconfig.json otimizado'
    ],
    commonMistakes: [
      'Estrutura de pastas inconsistente',
      'Tipos TypeScript muito permissivos',
      'Não configurar ESLint rules'
    ]
  }
];