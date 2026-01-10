// Índice central de todas as ferramentas com numeração única
// Cada ferramenta tem um ID único que pode ser referenciado em qualquer lugar do app

export interface IndexedTool {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  url?: string;
  role?: string;
  highlight?: boolean;
  examples?: string[];
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tools: IndexedTool[];
}

// Todas as ferramentas com IDs únicos
export const allTools: IndexedTool[] = [
  // === PESQUISA DE MERCADO (1-10) ===
  { id: 1, name: "ComprasNet", description: "Portal de compras do Governo Federal", category: "Pesquisa de Mercado", subcategory: "Portais Governamentais", url: "https://www.gov.br/compras" },
  { id: 2, name: "Portal de Compras Gov", description: "Licitações e contratações públicas federais", category: "Pesquisa de Mercado", subcategory: "Portais Governamentais", url: "https://www.gov.br/compras" },
  { id: 3, name: "Licitações-e", description: "Portal de licitações eletrônicas", category: "Pesquisa de Mercado", subcategory: "Portais Governamentais", url: "https://www.licitacoes-e.com.br" },
  { id: 4, name: "Google Trends", description: "Tendências de busca e interesse do público ao longo do tempo", category: "Pesquisa de Mercado", url: "https://trends.google.com" },
  { id: 5, name: "App Annie", description: "Analytics de apps e rankings de lojas", category: "Pesquisa de Mercado", subcategory: "App Stores", url: "https://www.data.ai" },
  { id: 6, name: "Sensor Tower", description: "Inteligência de mercado para apps móveis", category: "Pesquisa de Mercado", subcategory: "App Stores", url: "https://sensortower.com" },
  { id: 7, name: "Product Hunt", description: "Lançamentos de produtos e validação de ideias", category: "Pesquisa de Mercado", url: "https://producthunt.com" },
  { id: 8, name: "Reddit", description: "Comunidades e discussões sobre dores reais de usuários", category: "Pesquisa de Mercado", subcategory: "Comunidades", url: "https://reddit.com", examples: ["r/SaaS", "r/startups"] },
  { id: 9, name: "Indie Hackers", description: "Comunidade de empreendedores indie e makers", category: "Pesquisa de Mercado", subcategory: "Comunidades", url: "https://indiehackers.com" },
  
  // === IDEAÇÃO COM IA (11-20) ===
  { id: 10, name: "ChatGPT", description: "Brainstorm inicial, user stories, validação de conceito. Use como Product Manager para definir requisitos.", category: "Ideação com IA", role: "Product Manager", url: "https://chat.openai.com" },
  { id: 11, name: "Claude AI", description: "Decisões arquiteturais e análise técnica profunda. Ideal para revisão de código e documentação.", category: "Ideação com IA", role: "Arquiteto de Software", url: "https://claude.ai" },
  { id: 12, name: "Gemini", description: "Análise de contexto amplo com janela de até 2M tokens. Perfeito para analisar documentos grandes.", category: "Ideação com IA", role: "Analista de Negócios", url: "https://gemini.google.com" },
  { id: 13, name: "Perplexity", description: "Pesquisa de concorrentes e tecnologias com fontes citadas e verificáveis.", category: "Ideação com IA", role: "Pesquisador", url: "https://perplexity.ai" },
  { id: 14, name: "Groq", description: "Respostas ultrarrápidas para iteração ágil. Inferência com baixíssima latência.", category: "Ideação com IA", role: "Consultor Técnico", url: "https://groq.com" },

  // === BOAS PRÁTICAS (21-30) ===
  { id: 15, name: "SOLID", description: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion - princípios fundamentais de OOP.", category: "Boas Práticas" },
  { id: 16, name: "Object Calisthenics", description: "9 regras para escrever código limpo orientado a objetos mais legível e manutenível.", category: "Boas Práticas" },
  { id: 17, name: "12-Factor App", description: "Metodologia para construir aplicações SaaS escaláveis, portáveis e resilientes.", category: "Boas Práticas", url: "https://12factor.net/pt_br/" },
  { id: 18, name: "Clean Architecture", description: "Separação de concerns e independência de frameworks. Camadas bem definidas.", category: "Boas Práticas" },
  { id: 19, name: "DRY", description: "Don't Repeat Yourself - evite duplicação de código e lógica.", category: "Boas Práticas" },
  { id: 20, name: "KISS", description: "Keep It Simple, Stupid - mantenha soluções simples e diretas.", category: "Boas Práticas" },
  { id: 21, name: "YAGNI", description: "You Aren't Gonna Need It - não implemente funcionalidades especulativas.", category: "Boas Práticas" },
  { id: 22, name: "TDD", description: "Test-Driven Development - escreva testes antes do código de produção.", category: "Boas Práticas" },
  { id: 23, name: "BDD", description: "Behavior-Driven Development - especificações executáveis em linguagem natural.", category: "Boas Práticas" },

  // === DOCUMENTAÇÃO (24-35) ===
  { id: 24, name: "PRD", description: "Product Requirement Document - visão, objetivos, features e critérios de sucesso do produto.", category: "Documentação" },
  { id: 25, name: "ADR", description: "Architecture Decision Records - registro de decisões técnicas e suas justificativas.", category: "Documentação" },
  { id: 26, name: "Notion", description: "Workspace all-in-one para docs, wikis, databases e gestão de projetos.", category: "Documentação", url: "https://notion.so" },
  { id: 27, name: "Linear", description: "Gestão de projetos moderna para times de desenvolvimento. Issues e sprints.", category: "Documentação", url: "https://linear.app" },
  { id: 28, name: "dbdiagram.io", description: "Modelagem visual de bancos de dados com sintaxe simples.", category: "Documentação", url: "https://dbdiagram.io" },
  { id: 29, name: "Miro", description: "Quadro branco colaborativo para brainstorm e mapeamento visual.", category: "Documentação", url: "https://miro.com" },

  // === PROTOTIPAGEM & UI (36-45) ===
  { id: 30, name: "Figma", description: "Design system, prototipagem e colaboração em tempo real. Padrão da indústria.", category: "Prototipagem & UI", url: "https://figma.com", highlight: true },
  { id: 31, name: "v0.dev", description: "Gerar componentes React/Tailwind com prompts de texto. Da Vercel.", category: "Prototipagem & UI", url: "https://v0.dev", highlight: true },
  { id: 32, name: "Framer AI", description: "Design e deploy de sites em minutos com IA generativa.", category: "Prototipagem & UI", url: "https://framer.com" },
  { id: 33, name: "Uizard", description: "Transformar sketches e wireframes em UI funcional.", category: "Prototipagem & UI", url: "https://uizard.io" },
  { id: 34, name: "Galileo AI", description: "Designs de UI automatizados a partir de descrições textuais.", category: "Prototipagem & UI", url: "https://usegalileo.ai" },

  // === DESIGN PROFISSIONAL (46-55) ===
  { id: 35, name: "Canva", description: "Design simplificado, templates prontos, ideal para marketing e social media.", category: "Design", subcategory: "Design Rápido", url: "https://canva.com" },
  { id: 36, name: "Photopea", description: "Editor de imagens online gratuito compatível com arquivos Photoshop.", category: "Design", subcategory: "Edição de Imagens", url: "https://photopea.com" },
  { id: 37, name: "Adobe XD", description: "Prototipagem e design de interfaces da suite Adobe.", category: "Design", subcategory: "Design Profissional", url: "https://adobe.com/products/xd" },
  { id: 38, name: "Sketch", description: "Design de interfaces para macOS. Popular entre designers.", category: "Design", subcategory: "Design Profissional", url: "https://sketch.com" },

  // === GERAÇÃO DE IMAGENS COM IA (56-70) ===
  { id: 39, name: "Midjourney", description: "Geração de imagens artísticas de alta qualidade via Discord. Estilo único.", category: "IA Generativa", subcategory: "Imagens", url: "https://midjourney.com", highlight: true },
  { id: 40, name: "DALL-E 3", description: "IA da OpenAI para geração de imagens realistas e artísticas com prompts.", category: "IA Generativa", subcategory: "Imagens", url: "https://openai.com/dall-e-3", highlight: true },
  { id: 41, name: "Leonardo.ai", description: "Geração de assets para jogos, arte digital e ilustrações.", category: "IA Generativa", subcategory: "Imagens", url: "https://leonardo.ai", highlight: true },
  { id: 42, name: "Stable Diffusion", description: "Modelo open-source para geração de imagens. Rode local ou via API.", category: "IA Generativa", subcategory: "Imagens", url: "https://stability.ai" },
  { id: 43, name: "Adobe Firefly", description: "IA generativa integrada ao ecossistema Adobe Creative Cloud.", category: "IA Generativa", subcategory: "Imagens", url: "https://adobe.com/products/firefly" },
  { id: 44, name: "Ideogram", description: "Especializado em gerar texto legível dentro de imagens.", category: "IA Generativa", subcategory: "Imagens", url: "https://ideogram.ai" },
  { id: 45, name: "Flux", description: "Modelos avançados de geração de imagem da Black Forest Labs.", category: "IA Generativa", subcategory: "Imagens", url: "https://blackforestlabs.ai" },

  // === GERAÇÃO DE VÍDEOS COM IA (71-80) ===
  { id: 46, name: "Runway", description: "Edição de vídeo e efeitos visuais com IA. Gen-2 para geração de vídeo.", category: "IA Generativa", subcategory: "Vídeos", url: "https://runwayml.com", highlight: true },
  { id: 47, name: "Pika Labs", description: "Geração de vídeos curtos a partir de texto ou imagem.", category: "IA Generativa", subcategory: "Vídeos", url: "https://pika.art" },
  { id: 48, name: "Sora", description: "Geração de vídeos da OpenAI. Qualidade cinematográfica (acesso limitado).", category: "IA Generativa", subcategory: "Vídeos", url: "https://openai.com/sora" },
  { id: 49, name: "Kling", description: "Geração de vídeos com alta qualidade e movimentos realistas.", category: "IA Generativa", subcategory: "Vídeos", url: "https://klingai.com" },

  // === ÍCONES & ASSETS (81-90) ===
  { id: 50, name: "Lucide Icons", description: "Ícones open-source, leves e customizáveis. Fork do Feather Icons.", category: "Assets", subcategory: "Ícones", url: "https://lucide.dev" },
  { id: 51, name: "Heroicons", description: "Ícones SVG da equipe do Tailwind CSS. Estilos outline e solid.", category: "Assets", subcategory: "Ícones", url: "https://heroicons.com" },
  { id: 52, name: "Phosphor Icons", description: "Biblioteca flexível com 6 estilos diferentes.", category: "Assets", subcategory: "Ícones", url: "https://phosphoricons.com" },
  { id: 53, name: "Unsplash", description: "Fotos gratuitas de alta qualidade para uso comercial.", category: "Assets", subcategory: "Fotos", url: "https://unsplash.com" },
  { id: 54, name: "Pexels", description: "Fotos e vídeos gratuitos para qualquer projeto.", category: "Assets", subcategory: "Fotos/Vídeos", url: "https://pexels.com" },

  // === BUILDERS NO-CODE/LOW-CODE (91-100) ===
  { id: 55, name: "Lovable", description: "Frontend completo React/Vite/TypeScript + Supabase com IA. Crie apps rapidamente.", category: "Desenvolvimento", subcategory: "Builders", url: "https://lovable.dev", highlight: true },
  { id: 56, name: "bolt.new", description: "Apps fullstack em minutos direto no navegador.", category: "Desenvolvimento", subcategory: "Builders", url: "https://bolt.new" },
  { id: 57, name: "Replit AI", description: "IDE online com execução de código e assistente IA integrado.", category: "Desenvolvimento", subcategory: "Builders", url: "https://replit.com" },
  { id: 58, name: "Leap.new", description: "Crie apps completas com prompts de linguagem natural.", category: "Desenvolvimento", subcategory: "Builders", url: "https://leap.new" },

  // === IDEs COM IA (101-110) ===
  { id: 59, name: "Cursor", description: "IDE AI-native com Composer para edição de código com contexto.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://cursor.com", highlight: true },
  { id: 60, name: "VS Code", description: "Editor leve e extensível. Suporte a milhares de extensões.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://code.visualstudio.com" },
  { id: 61, name: "JetBrains IDEs", description: "IDEs profissionais (IntelliJ, WebStorm, PyCharm) com AI Assistant.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://jetbrains.com" },
  { id: 62, name: "Windsurf", description: "IDE focada em desenvolvimento com IA. Experiência fluida.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://windsurf.ai" },

  // === AGENTES DE CÓDIGO (111-120) ===
  { id: 63, name: "GitHub Copilot", description: "Sugestões de código em tempo real baseadas em contexto.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://github.com/features/copilot", highlight: true },
  { id: 64, name: "Claude Code", description: "Agente CLI para refactors, análise e geração de código.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://claude.ai" },
  { id: 65, name: "Aider", description: "Commits limpos e desenvolvimento git-first com IA.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://aider.chat" },
  { id: 66, name: "Cline", description: "Implemente features completas automaticamente no VS Code.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://cline.bot" },
  { id: 67, name: "Amazon Q Developer", description: "Assistente IA da AWS para otimizações e desenvolvimento cloud.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://aws.amazon.com/q/developer" },

  // === BACKEND & DATABASE (121-135) ===
  { id: 68, name: "Supabase", description: "PostgreSQL + Auth + Storage + Edge Functions. Backend completo open-source.", category: "Backend", subcategory: "BaaS", url: "https://supabase.com", highlight: true },
  { id: 69, name: "Firebase", description: "BaaS da Google com Firestore, Auth, Hosting e Functions.", category: "Backend", subcategory: "BaaS", url: "https://firebase.google.com" },
  { id: 70, name: "PlanetScale", description: "MySQL serverless altamente escalável com branching.", category: "Backend", subcategory: "Database", url: "https://planetscale.com" },
  { id: 71, name: "Neon", description: "PostgreSQL serverless com branching e escalonamento automático.", category: "Backend", subcategory: "Database", url: "https://neon.tech" },
  { id: 72, name: "Pinecone", description: "Banco de dados vetorial para RAG e busca semântica.", category: "Backend", subcategory: "Vector DB", url: "https://pinecone.io" },
  { id: 73, name: "Weaviate", description: "Banco vetorial open-source com GraphQL e módulos de ML.", category: "Backend", subcategory: "Vector DB", url: "https://weaviate.io" },
  { id: 74, name: "Chroma", description: "Banco vetorial simples e leve para projetos menores.", category: "Backend", subcategory: "Vector DB", url: "https://trychroma.com" },

  // === QUALIDADE & TESTES (136-145) ===
  { id: 75, name: "CodeRabbit", description: "Reviews inteligentes de Pull Requests com IA.", category: "Qualidade", url: "https://coderabbit.ai", highlight: true },
  { id: 76, name: "Qodo.ai", description: "Geração automática de testes unitários com IA.", category: "Qualidade", url: "https://qodo.ai" },
  { id: 77, name: "GitHub Actions", description: "CI/CD automático integrado ao GitHub.", category: "Qualidade", subcategory: "CI/CD", url: "https://github.com/features/actions" },
  { id: 78, name: "Sentry", description: "Error tracking e monitoramento de performance em produção.", category: "Qualidade", url: "https://sentry.io" },
  { id: 79, name: "BLACKBOX.AI", description: "Busca de código e snippets com IA.", category: "Qualidade", url: "https://blackbox.ai" },

  // === DEPLOY & INFRA (146-160) ===
  { id: 80, name: "Vercel", description: "Deploy automático para Next.js e React. Edge network global.", category: "Deploy", url: "https://vercel.com", highlight: true },
  { id: 81, name: "Netlify", description: "JAMstack, serverless functions e deploy automático.", category: "Deploy", url: "https://netlify.com" },
  { id: 82, name: "Railway", description: "Deploy fullstack com banco de dados incluído. Simples.", category: "Deploy", url: "https://railway.app" },
  { id: 83, name: "Render", description: "Alternativa moderna ao Heroku. Deploy fácil.", category: "Deploy", url: "https://render.com" },
  { id: 84, name: "Cloudflare Pages", description: "Edge deployment global com performance excepcional.", category: "Deploy", url: "https://pages.cloudflare.com" },
  { id: 85, name: "Cloudflare", description: "DNS, CDN, SSL, proteção DDoS e Workers.", category: "Infraestrutura", url: "https://cloudflare.com" },
  { id: 86, name: "AWS S3", description: "Storage de arquivos escalável e durável.", category: "Infraestrutura", url: "https://aws.amazon.com/s3" },
  { id: 87, name: "Upstash", description: "Redis e Kafka serverless para cache e mensageria.", category: "Infraestrutura", url: "https://upstash.com" },

  // === MONITORAMENTO & ANALYTICS (161-175) ===
  { id: 88, name: "Google Analytics", description: "Análise de tráfego e comportamento de usuários.", category: "Analytics", url: "https://analytics.google.com" },
  { id: 89, name: "Mixpanel", description: "Product analytics, funnels e análise de retenção.", category: "Analytics", url: "https://mixpanel.com" },
  { id: 90, name: "PostHog", description: "Product analytics open-source com feature flags.", category: "Analytics", url: "https://posthog.com" },
  { id: 91, name: "Hotjar", description: "Heatmaps, recordings e feedback de usuários.", category: "Analytics", url: "https://hotjar.com" },

  // === IA LOCAL & PRIVACIDADE (176-185) ===
  { id: 92, name: "Ollama", description: "Rodar modelos LLM localmente via CLI. Simples e poderoso.", category: "IA Local", url: "https://ollama.com", highlight: true },
  { id: 93, name: "LM Studio", description: "Interface gráfica para rodar modelos locais. User-friendly.", category: "IA Local", url: "https://lmstudio.ai" },
  { id: 94, name: "Jan", description: "Cliente desktop open-source para IA local.", category: "IA Local", url: "https://jan.ai" },
  { id: 95, name: "LocalAI", description: "Drop-in replacement para OpenAI API rodando local.", category: "IA Local", url: "https://localai.io" },
  { id: 96, name: "AnythingLLM", description: "RAG local para documentos. Privacidade total.", category: "IA Local", url: "https://anythingllm.com" },

  // === PLATAFORMAS DE API & LLMs (186-200) ===
  { id: 97, name: "OpenAI API", description: "GPT-4, DALL-E, Whisper e mais. Referência do mercado.", category: "APIs de LLM", url: "https://platform.openai.com", highlight: true },
  { id: 98, name: "Anthropic API", description: "Claude 3 Opus, Sonnet e Haiku via API.", category: "APIs de LLM", url: "https://anthropic.com/api" },
  { id: 99, name: "OpenRouter", description: "200+ modelos via API unificada. Gateway universal.", category: "APIs de LLM", url: "https://openrouter.ai", highlight: true },
  { id: 100, name: "Together AI", description: "Modelos open-source com alta performance e baixo custo.", category: "APIs de LLM", url: "https://together.ai" },
  { id: 101, name: "Google AI Studio", description: "Gemini API gratuita para experimentação.", category: "APIs de LLM", url: "https://aistudio.google.com" },
  { id: 102, name: "Hugging Face", description: "Milhares de modelos open-source. Hub da comunidade ML.", category: "APIs de LLM", url: "https://huggingface.co" },
];

// Categorias organizadas
export const toolCategories: ToolCategory[] = [
  {
    id: "pesquisa",
    name: "Pesquisa de Mercado",
    description: "Descubra oportunidades antes de ter a ideia",
    icon: "Search",
    color: "hsl(197 71% 73%)",
    tools: allTools.filter(t => t.category === "Pesquisa de Mercado")
  },
  {
    id: "ideacao",
    name: "Ideação com IA",
    description: "Use LLMs como seu time de estratégia",
    icon: "Lightbulb",
    color: "hsl(0 84% 60%)",
    tools: allTools.filter(t => t.category === "Ideação com IA")
  },
  {
    id: "praticas",
    name: "Boas Práticas",
    description: "Fundamentos sólidos antes de escrever código",
    icon: "Shield",
    color: "hsl(142 76% 36%)",
    tools: allTools.filter(t => t.category === "Boas Práticas")
  },
  {
    id: "documentacao",
    name: "Documentação",
    description: "Crie as regras antes de começar",
    icon: "FileText",
    color: "hsl(262 83% 58%)",
    tools: allTools.filter(t => t.category === "Documentação")
  },
  {
    id: "prototipagem",
    name: "Prototipagem & UI",
    description: "Do conceito ao visual em minutos",
    icon: "Palette",
    color: "hsl(47 96% 53%)",
    tools: allTools.filter(t => t.category === "Prototipagem & UI")
  },
  {
    id: "design",
    name: "Design",
    description: "Ferramentas profissionais de design",
    icon: "Palette",
    color: "hsl(330 80% 60%)",
    tools: allTools.filter(t => t.category === "Design")
  },
  {
    id: "ia-generativa",
    name: "IA Generativa",
    description: "Geração de imagens e vídeos com IA",
    icon: "Sparkles",
    color: "hsl(280 83% 68%)",
    tools: allTools.filter(t => t.category === "IA Generativa")
  },
  {
    id: "assets",
    name: "Assets",
    description: "Ícones, fotos e recursos visuais",
    icon: "Image",
    color: "hsl(200 80% 50%)",
    tools: allTools.filter(t => t.category === "Assets")
  },
  {
    id: "desenvolvimento",
    name: "Desenvolvimento",
    description: "Builders, IDEs e agentes de código",
    icon: "Code2",
    color: "hsl(221 83% 53%)",
    tools: allTools.filter(t => t.category === "Desenvolvimento")
  },
  {
    id: "backend",
    name: "Backend & Database",
    description: "Infraestrutura serverless e escalável",
    icon: "Database",
    color: "hsl(280 83% 68%)",
    tools: allTools.filter(t => t.category === "Backend")
  },
  {
    id: "qualidade",
    name: "Qualidade & Testes",
    description: "Automação de reviews e testes",
    icon: "TestTube",
    color: "hsl(215 16% 47%)",
    tools: allTools.filter(t => t.category === "Qualidade")
  },
  {
    id: "deploy",
    name: "Deploy",
    description: "Do código ao ar em minutos",
    icon: "Rocket",
    color: "hsl(142 70% 45%)",
    tools: allTools.filter(t => t.category === "Deploy")
  },
  {
    id: "infra",
    name: "Infraestrutura",
    description: "CDN, storage e serviços cloud",
    icon: "Server",
    color: "hsl(200 70% 45%)",
    tools: allTools.filter(t => t.category === "Infraestrutura")
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Acompanhe e evolua seu produto",
    icon: "BarChart3",
    color: "hsl(197 71% 73%)",
    tools: allTools.filter(t => t.category === "Analytics")
  },
  {
    id: "ia-local",
    name: "IA Local",
    description: "Modelos rodando na sua máquina",
    icon: "Terminal",
    color: "hsl(0 0% 45%)",
    tools: allTools.filter(t => t.category === "IA Local")
  },
  {
    id: "apis",
    name: "APIs de LLM",
    description: "Acesso a modelos via API",
    icon: "Brain",
    color: "hsl(262 83% 58%)",
    tools: allTools.filter(t => t.category === "APIs de LLM")
  }
];

// Função para buscar ferramenta por ID
export const getToolById = (id: number): IndexedTool | undefined => {
  return allTools.find(t => t.id === id);
};

// Função para buscar ferramenta por nome (com fuzzy matching)
export const getToolByName = (name: string): IndexedTool | undefined => {
  const normalizedName = name.toLowerCase().trim();
  
  // Busca exata primeiro
  const exactMatch = allTools.find(t => t.name.toLowerCase() === normalizedName);
  if (exactMatch) return exactMatch;
  
  // Busca parcial (contém o nome)
  const partialMatch = allTools.find(t => 
    t.name.toLowerCase().includes(normalizedName) || 
    normalizedName.includes(t.name.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  // Mapeamento de aliases comuns
  const aliases: Record<string, string> = {
    'gpt': 'ChatGPT',
    'chatgpt': 'ChatGPT',
    'gpt-4': 'ChatGPT',
    'claude': 'Claude AI',
    'gemini': 'Gemini',
    'dall-e': 'DALL-E 3',
    'dalle': 'DALL-E 3',
    'midjourney': 'Midjourney',
    'figma': 'Figma',
    'vs code': 'VS Code',
    'vscode': 'VS Code',
    'github copilot': 'GitHub Copilot',
    'copilot': 'GitHub Copilot',
    'supabase': 'Supabase',
    'vercel': 'Vercel',
    'lovable': 'Lovable',
    'cursor': 'Cursor',
    'notion': 'Notion',
    'linear': 'Linear',
    'ollama': 'Ollama',
    'openai': 'OpenAI API',
    'openrouter': 'OpenRouter',
    'huggingface': 'Hugging Face',
    'hugging face': 'Hugging Face',
  };
  
  const aliasMatch = aliases[normalizedName];
  if (aliasMatch) {
    return allTools.find(t => t.name.toLowerCase() === aliasMatch.toLowerCase());
  }
  
  return undefined;
};

// Ferramentas ordenadas alfabeticamente
export const toolsAlphabetical = [...allTools].sort((a, b) => 
  a.name.localeCompare(b.name, 'pt-BR')
);

// Total de ferramentas
export const totalTools = allTools.length;
