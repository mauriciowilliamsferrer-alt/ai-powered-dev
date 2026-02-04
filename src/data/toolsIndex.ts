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
  isNew?: boolean;
  pricing?: 'free' | 'freemium' | 'paid';
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
  { id: 1, name: "ComprasNet", description: "Portal de compras do Governo Federal", category: "Pesquisa de Mercado", subcategory: "Portais Governamentais", url: "https://www.gov.br/compras", pricing: "free" },
  { id: 2, name: "Portal de Compras Gov", description: "Licitações e contratações públicas federais", category: "Pesquisa de Mercado", subcategory: "Portais Governamentais", url: "https://www.gov.br/compras", pricing: "free" },
  { id: 3, name: "Licitações-e", description: "Portal de licitações eletrônicas", category: "Pesquisa de Mercado", subcategory: "Portais Governamentais", url: "https://www.licitacoes-e.com.br", pricing: "free" },
  { id: 4, name: "Google Trends", description: "Tendências de busca e interesse do público ao longo do tempo", category: "Pesquisa de Mercado", url: "https://trends.google.com", pricing: "free" },
  { id: 5, name: "App Annie", description: "Analytics de apps e rankings de lojas", category: "Pesquisa de Mercado", subcategory: "App Stores", url: "https://www.data.ai", pricing: "freemium" },
  { id: 6, name: "Sensor Tower", description: "Inteligência de mercado para apps móveis", category: "Pesquisa de Mercado", subcategory: "App Stores", url: "https://sensortower.com", pricing: "freemium" },
  { id: 7, name: "Product Hunt", description: "Lançamentos de produtos e validação de ideias", category: "Pesquisa de Mercado", url: "https://producthunt.com", pricing: "free" },
  { id: 8, name: "Reddit", description: "Comunidades e discussões sobre dores reais de usuários", category: "Pesquisa de Mercado", subcategory: "Comunidades", url: "https://reddit.com", examples: ["r/SaaS", "r/startups"], pricing: "free" },
  { id: 9, name: "Indie Hackers", description: "Comunidade de empreendedores indie e makers", category: "Pesquisa de Mercado", subcategory: "Comunidades", url: "https://indiehackers.com", pricing: "free" },
  
  // === IDEAÇÃO COM IA (11-20) ===
  { id: 10, name: "ChatGPT", description: "Brainstorm inicial, user stories, validação de conceito. Use como Product Manager para definir requisitos.", category: "Ideação com IA", role: "Product Manager", url: "https://chat.openai.com", pricing: "freemium" },
  { id: 11, name: "Claude AI", description: "Decisões arquiteturais e análise técnica profunda. Ideal para revisão de código e documentação.", category: "Ideação com IA", role: "Arquiteto de Software", url: "https://claude.ai", pricing: "freemium" },
  { id: 12, name: "Gemini", description: "Análise de contexto amplo com janela de até 2M tokens. Perfeito para analisar documentos grandes.", category: "Ideação com IA", role: "Analista de Negócios", url: "https://gemini.google.com", pricing: "freemium" },
  { id: 13, name: "Perplexity", description: "Pesquisa de concorrentes e tecnologias com fontes citadas e verificáveis.", category: "Ideação com IA", role: "Pesquisador", url: "https://perplexity.ai", pricing: "freemium" },
  { id: 14, name: "Groq", description: "Respostas ultrarrápidas para iteração ágil. Inferência com baixíssima latência.", category: "Ideação com IA", role: "Consultor Técnico", url: "https://groq.com", pricing: "free" },

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
  { id: 26, name: "Notion", description: "Workspace all-in-one para docs, wikis, databases e gestão de projetos.", category: "Documentação", url: "https://notion.so", pricing: "freemium" },
  { id: 27, name: "Linear", description: "Gestão de projetos moderna para times de desenvolvimento. Issues e sprints.", category: "Documentação", url: "https://linear.app", pricing: "freemium" },
  { id: 28, name: "dbdiagram.io", description: "Modelagem visual de bancos de dados com sintaxe simples.", category: "Documentação", url: "https://dbdiagram.io", pricing: "freemium" },
  { id: 29, name: "Miro", description: "Quadro branco colaborativo para brainstorm e mapeamento visual.", category: "Documentação", url: "https://miro.com", pricing: "freemium" },

  // === PROTOTIPAGEM & UI (36-45) ===
  { id: 30, name: "Figma", description: "Design system, prototipagem e colaboração em tempo real. Padrão da indústria.", category: "Prototipagem & UI", url: "https://figma.com", highlight: true, pricing: "freemium" },
  { id: 31, name: "v0.dev", description: "Gerar componentes React/Tailwind com prompts de texto. Da Vercel.", category: "Prototipagem & UI", url: "https://v0.dev", highlight: true, pricing: "freemium" },
  { id: 32, name: "Framer AI", description: "Design e deploy de sites em minutos com IA generativa.", category: "Prototipagem & UI", url: "https://framer.com", pricing: "freemium" },
  { id: 33, name: "Uizard", description: "Transformar sketches e wireframes em UI funcional.", category: "Prototipagem & UI", url: "https://uizard.io", pricing: "freemium" },
  { id: 34, name: "Galileo AI", description: "Designs de UI automatizados a partir de descrições textuais.", category: "Prototipagem & UI", url: "https://usegalileo.ai", pricing: "paid" },

  // === DESIGN PROFISSIONAL (46-55) ===
  { id: 35, name: "Canva", description: "Design simplificado, templates prontos, ideal para marketing e social media.", category: "Design", subcategory: "Design Rápido", url: "https://canva.com", pricing: "freemium" },
  { id: 36, name: "Photopea", description: "Editor de imagens online gratuito compatível com arquivos Photoshop.", category: "Design", subcategory: "Edição de Imagens", url: "https://photopea.com", pricing: "free" },
  { id: 37, name: "Adobe XD", description: "Prototipagem e design de interfaces da suite Adobe.", category: "Design", subcategory: "Design Profissional", url: "https://adobe.com/products/xd", pricing: "paid" },
  { id: 38, name: "Sketch", description: "Design de interfaces para macOS. Popular entre designers.", category: "Design", subcategory: "Design Profissional", url: "https://sketch.com", pricing: "paid" },

  // === GERAÇÃO DE IMAGENS COM IA (56-70) ===
  { id: 39, name: "Midjourney", description: "Geração de imagens artísticas de alta qualidade via Discord. Estilo único.", category: "IA Generativa", subcategory: "Imagens", url: "https://midjourney.com", highlight: true, pricing: "paid" },
  { id: 40, name: "DALL-E 3", description: "IA da OpenAI para geração de imagens realistas e artísticas com prompts.", category: "IA Generativa", subcategory: "Imagens", url: "https://openai.com/dall-e-3", highlight: true, pricing: "paid" },
  { id: 41, name: "Leonardo.ai", description: "Geração de assets para jogos, arte digital e ilustrações.", category: "IA Generativa", subcategory: "Imagens", url: "https://leonardo.ai", highlight: true, pricing: "freemium" },
  { id: 42, name: "Stable Diffusion", description: "Modelo open-source para geração de imagens. Rode local ou via API.", category: "IA Generativa", subcategory: "Imagens", url: "https://stability.ai", pricing: "freemium" },
  { id: 43, name: "Adobe Firefly", description: "IA generativa integrada ao ecossistema Adobe Creative Cloud.", category: "IA Generativa", subcategory: "Imagens", url: "https://adobe.com/products/firefly", pricing: "freemium" },
  { id: 44, name: "Ideogram", description: "Especializado em gerar texto legível dentro de imagens.", category: "IA Generativa", subcategory: "Imagens", url: "https://ideogram.ai", pricing: "freemium" },
  { id: 45, name: "Flux", description: "Modelos avançados de geração de imagem da Black Forest Labs.", category: "IA Generativa", subcategory: "Imagens", url: "https://blackforestlabs.ai", pricing: "freemium" },

  // === GERAÇÃO DE VÍDEOS COM IA (71-80) ===
  { id: 46, name: "Runway", description: "Edição de vídeo e efeitos visuais com IA. Gen-2 para geração de vídeo.", category: "IA Generativa", subcategory: "Vídeos", url: "https://runwayml.com", highlight: true, pricing: "freemium" },
  { id: 47, name: "Pika Labs", description: "Geração de vídeos curtos a partir de texto ou imagem.", category: "IA Generativa", subcategory: "Vídeos", url: "https://pika.art", pricing: "freemium" },
  { id: 48, name: "Sora", description: "Geração de vídeos da OpenAI. Qualidade cinematográfica (acesso limitado).", category: "IA Generativa", subcategory: "Vídeos", url: "https://openai.com/sora", pricing: "paid" },
  { id: 49, name: "Kling", description: "Geração de vídeos com alta qualidade e movimentos realistas.", category: "IA Generativa", subcategory: "Vídeos", url: "https://klingai.com", pricing: "freemium" },

  // === ÍCONES & ASSETS (81-90) ===
  { id: 50, name: "Lucide Icons", description: "Ícones open-source, leves e customizáveis. Fork do Feather Icons.", category: "Assets", subcategory: "Ícones", url: "https://lucide.dev", pricing: "free" },
  { id: 51, name: "Heroicons", description: "Ícones SVG da equipe do Tailwind CSS. Estilos outline e solid.", category: "Assets", subcategory: "Ícones", url: "https://heroicons.com", pricing: "free" },
  { id: 52, name: "Phosphor Icons", description: "Biblioteca flexível com 6 estilos diferentes.", category: "Assets", subcategory: "Ícones", url: "https://phosphoricons.com", pricing: "free" },
  { id: 53, name: "Unsplash", description: "Fotos gratuitas de alta qualidade para uso comercial.", category: "Assets", subcategory: "Fotos", url: "https://unsplash.com", pricing: "free" },
  { id: 54, name: "Pexels", description: "Fotos e vídeos gratuitos para qualquer projeto.", category: "Assets", subcategory: "Fotos/Vídeos", url: "https://pexels.com", pricing: "free" },

  // === BUILDERS NO-CODE/LOW-CODE (91-100) ===
  { id: 55, name: "Lovable", description: "Frontend completo React/Vite/TypeScript + Supabase com IA. Crie apps rapidamente.", category: "Desenvolvimento", subcategory: "Builders", url: "https://lovable.dev", highlight: true, pricing: "freemium" },
  { id: 56, name: "bolt.new", description: "Apps fullstack em minutos direto no navegador.", category: "Desenvolvimento", subcategory: "Builders", url: "https://bolt.new", pricing: "freemium" },
  { id: 57, name: "Replit AI", description: "IDE online com execução de código e assistente IA integrado.", category: "Desenvolvimento", subcategory: "Builders", url: "https://replit.com", pricing: "freemium" },
  { id: 58, name: "Leap.new", description: "Crie apps completas com prompts de linguagem natural.", category: "Desenvolvimento", subcategory: "Builders", url: "https://leap.new", pricing: "freemium" },

  // === IDEs COM IA (101-110) ===
  { id: 59, name: "Cursor", description: "IDE AI-native com Composer para edição de código com contexto.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://cursor.com", highlight: true, pricing: "freemium" },
  { id: 60, name: "VS Code", description: "Editor leve e extensível. Suporte a milhares de extensões.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://code.visualstudio.com", pricing: "free" },
  { id: 61, name: "JetBrains IDEs", description: "IDEs profissionais (IntelliJ, WebStorm, PyCharm) com AI Assistant.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://jetbrains.com", pricing: "paid" },
  { id: 62, name: "Windsurf", description: "IDE focada em desenvolvimento com IA. Experiência fluida.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://windsurf.ai", pricing: "freemium" },

  // === AGENTES DE CÓDIGO (111-120) ===
  { id: 63, name: "GitHub Copilot", description: "Sugestões de código em tempo real baseadas em contexto.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://github.com/features/copilot", highlight: true, pricing: "paid" },
  { id: 64, name: "Claude Code", description: "Agente CLI para refactors, análise e geração de código.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://claude.ai", pricing: "paid" },
  { id: 65, name: "Aider", description: "Commits limpos e desenvolvimento git-first com IA.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://aider.chat", pricing: "free" },
  { id: 66, name: "Cline", description: "Implemente features completas automaticamente no VS Code.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://cline.bot", pricing: "free" },
  { id: 67, name: "Amazon Q Developer", description: "Assistente IA da AWS para otimizações e desenvolvimento cloud.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://aws.amazon.com/q/developer", pricing: "freemium" },

  // === BACKEND & DATABASE (121-135) ===
  { id: 68, name: "Supabase", description: "PostgreSQL + Auth + Storage + Edge Functions. Backend completo open-source.", category: "Backend", subcategory: "BaaS", url: "https://supabase.com", highlight: true, pricing: "freemium" },
  { id: 69, name: "Firebase", description: "BaaS da Google com Firestore, Auth, Hosting e Functions.", category: "Backend", subcategory: "BaaS", url: "https://firebase.google.com", pricing: "freemium" },
  { id: 70, name: "PlanetScale", description: "MySQL serverless altamente escalável com branching.", category: "Backend", subcategory: "Database", url: "https://planetscale.com", pricing: "freemium" },
  { id: 71, name: "Neon", description: "PostgreSQL serverless com branching e escalonamento automático.", category: "Backend", subcategory: "Database", url: "https://neon.tech", pricing: "freemium" },
  { id: 72, name: "Pinecone", description: "Banco de dados vetorial para RAG e busca semântica.", category: "Backend", subcategory: "Vector DB", url: "https://pinecone.io", pricing: "freemium" },
  { id: 73, name: "Weaviate", description: "Banco vetorial open-source com GraphQL e módulos de ML.", category: "Backend", subcategory: "Vector DB", url: "https://weaviate.io", pricing: "freemium" },
  { id: 74, name: "Chroma", description: "Banco vetorial simples e leve para projetos menores.", category: "Backend", subcategory: "Vector DB", url: "https://trychroma.com", pricing: "free" },

  // === QUALIDADE & TESTES (136-145) ===
  { id: 75, name: "CodeRabbit", description: "Reviews inteligentes de Pull Requests com IA.", category: "Qualidade", url: "https://coderabbit.ai", highlight: true, pricing: "freemium" },
  { id: 76, name: "Qodo.ai", description: "Geração automática de testes unitários com IA.", category: "Qualidade", url: "https://qodo.ai", pricing: "freemium" },
  { id: 77, name: "GitHub Actions", description: "CI/CD automático integrado ao GitHub.", category: "Qualidade", subcategory: "CI/CD", url: "https://github.com/features/actions", pricing: "freemium" },
  { id: 78, name: "Sentry", description: "Error tracking e monitoramento de performance em produção.", category: "Qualidade", url: "https://sentry.io", pricing: "freemium" },
  { id: 79, name: "BLACKBOX.AI", description: "Busca de código e snippets com IA.", category: "Qualidade", url: "https://blackbox.ai", pricing: "freemium" },

  // === DEPLOY & INFRA (146-160) ===
  { id: 80, name: "Vercel", description: "Deploy automático para Next.js e React. Edge network global.", category: "Deploy", url: "https://vercel.com", highlight: true, pricing: "freemium" },
  { id: 81, name: "Netlify", description: "JAMstack, serverless functions e deploy automático.", category: "Deploy", url: "https://netlify.com", pricing: "freemium" },
  { id: 82, name: "Railway", description: "Deploy fullstack com banco de dados incluído. Simples.", category: "Deploy", url: "https://railway.app", pricing: "freemium" },
  { id: 83, name: "Render", description: "Alternativa moderna ao Heroku. Deploy fácil.", category: "Deploy", url: "https://render.com", pricing: "freemium" },
  { id: 84, name: "Cloudflare Pages", description: "Edge deployment global com performance excepcional.", category: "Deploy", url: "https://pages.cloudflare.com", pricing: "freemium" },
  { id: 85, name: "Cloudflare", description: "DNS, CDN, SSL, proteção DDoS e Workers.", category: "Infraestrutura", url: "https://cloudflare.com", pricing: "freemium" },
  { id: 86, name: "AWS S3", description: "Storage de arquivos escalável e durável.", category: "Infraestrutura", url: "https://aws.amazon.com/s3", pricing: "paid" },
  { id: 87, name: "Upstash", description: "Redis e Kafka serverless para cache e mensageria.", category: "Infraestrutura", url: "https://upstash.com", pricing: "freemium" },

  // === MONITORAMENTO & ANALYTICS (161-175) ===
  { id: 88, name: "Google Analytics", description: "Análise de tráfego e comportamento de usuários.", category: "Analytics", url: "https://analytics.google.com", pricing: "free" },
  { id: 89, name: "Mixpanel", description: "Product analytics, funnels e análise de retenção.", category: "Analytics", url: "https://mixpanel.com", pricing: "freemium" },
  { id: 90, name: "PostHog", description: "Product analytics open-source com feature flags.", category: "Analytics", url: "https://posthog.com", pricing: "freemium" },
  { id: 91, name: "Hotjar", description: "Heatmaps, recordings e feedback de usuários.", category: "Analytics", url: "https://hotjar.com", pricing: "freemium" },

  // === IA LOCAL & PRIVACIDADE (176-185) ===
  { id: 92, name: "Ollama", description: "Rodar modelos LLM localmente via CLI. Simples e poderoso.", category: "IA Local", url: "https://ollama.com", highlight: true, pricing: "free" },
  { id: 93, name: "LM Studio", description: "Interface gráfica para rodar modelos locais. User-friendly.", category: "IA Local", url: "https://lmstudio.ai", pricing: "free" },
  { id: 94, name: "Jan", description: "Cliente desktop open-source para IA local.", category: "IA Local", url: "https://jan.ai", pricing: "free" },
  { id: 95, name: "LocalAI", description: "Drop-in replacement para OpenAI API rodando local.", category: "IA Local", url: "https://localai.io", pricing: "free" },
  { id: 96, name: "AnythingLLM", description: "RAG local para documentos. Privacidade total.", category: "IA Local", url: "https://anythingllm.com", pricing: "free" },

  // === PLATAFORMAS DE API & LLMs (186-200) ===
  { id: 97, name: "OpenAI API", description: "GPT-4, DALL-E, Whisper e mais. Referência do mercado.", category: "APIs de LLM", url: "https://platform.openai.com", highlight: true, pricing: "paid" },
  { id: 98, name: "Anthropic API", description: "Claude 3 Opus, Sonnet e Haiku via API.", category: "APIs de LLM", url: "https://anthropic.com/api", pricing: "paid" },
  { id: 99, name: "OpenRouter", description: "200+ modelos via API unificada. Gateway universal.", category: "APIs de LLM", url: "https://openrouter.ai", highlight: true, pricing: "paid" },
  { id: 100, name: "Together AI", description: "Modelos open-source com alta performance e baixo custo.", category: "APIs de LLM", url: "https://together.ai", pricing: "paid" },
  { id: 101, name: "Google AI Studio", description: "Gemini API gratuita para experimentação.", category: "APIs de LLM", url: "https://aistudio.google.com", pricing: "free" },
  { id: 102, name: "Hugging Face", description: "Milhares de modelos open-source. Hub da comunidade ML.", category: "APIs de LLM", url: "https://huggingface.co", pricing: "freemium" },

  // ========================================
  // === FERRAMENTAS DE MARKETING (103-176) ===
  // ========================================

  // === REDES SOCIAIS (103-111) ===
  { id: 103, name: "WhatsApp Business", description: "Catálogos, automação, listas de transmissão para atendimento profissional", category: "Redes Sociais", url: "https://business.whatsapp.com", pricing: "free" },
  { id: 104, name: "Instagram", description: "Reels, Stories, Bio otimizada - mostre seu trabalho visualmente", category: "Redes Sociais", url: "https://instagram.com", pricing: "free" },
  { id: 105, name: "LinkedIn", description: "Perfil profissional, artigos técnicos, networking B2B", category: "Redes Sociais", url: "https://linkedin.com", pricing: "freemium" },
  { id: 106, name: "Twitter/X", description: "Tech community, threads sobre código, networking", category: "Redes Sociais", url: "https://twitter.com", pricing: "free" },
  { id: 107, name: "TikTok", description: "Conteúdo técnico viral, dicas de código em vídeos curtos", category: "Redes Sociais", url: "https://tiktok.com", pricing: "free" },
  { id: 108, name: "Facebook", description: "Grupos de desenvolvedores, páginas de serviços, marketplace", category: "Redes Sociais", url: "https://facebook.com", pricing: "free" },
  { id: 109, name: "Discord", description: "Comunidades tech, networking, suporte", category: "Redes Sociais", url: "https://discord.com", pricing: "free" },
  { id: 110, name: "Telegram", description: "Canais e grupos de desenvolvedores", category: "Redes Sociais", url: "https://telegram.org", pricing: "free" },
  { id: 111, name: "YouTube", description: "Tutoriais, lives, vlogs de desenvolvimento", category: "Redes Sociais", url: "https://youtube.com", pricing: "freemium" },

  // === MARKETING DIGITAL & ADS (112-117) ===
  { id: 112, name: "Google Ads", description: "Campanhas de busca e display para captar clientes ativamente buscando", category: "Marketing Digital", url: "https://ads.google.com", pricing: "paid" },
  { id: 113, name: "Meta Ads", description: "Anúncios no Facebook e Instagram para alcance massivo", category: "Marketing Digital", url: "https://business.facebook.com", pricing: "paid" },
  { id: 114, name: "LinkedIn Ads", description: "Anúncios B2B para empresas e recrutadores", category: "Marketing Digital", url: "https://business.linkedin.com/marketing-solutions/ads", pricing: "paid" },
  { id: 115, name: "TikTok Ads", description: "Alcance jovens e viralize seu conteúdo", category: "Marketing Digital", url: "https://ads.tiktok.com", pricing: "paid" },
  { id: 116, name: "Taboola", description: "Native ads em portais de notícias", category: "Marketing Digital", url: "https://taboola.com", pricing: "paid" },
  { id: 117, name: "Outbrain", description: "Publicidade nativa para content marketing", category: "Marketing Digital", url: "https://outbrain.com", pricing: "paid" },

  // === SEO & PRESENÇA ONLINE (118-123) ===
  { id: 118, name: "Google Search Console", description: "Monitore como seu site aparece no Google", category: "SEO", url: "https://search.google.com/search-console", pricing: "free" },
  { id: 119, name: "SEMrush", description: "Pesquisa de palavras-chave e análise de concorrentes", category: "SEO", url: "https://semrush.com", pricing: "freemium" },
  { id: 120, name: "Ahrefs", description: "Backlinks, keywords e análise de conteúdo", category: "SEO", url: "https://ahrefs.com", pricing: "paid" },
  { id: 121, name: "Ubersuggest", description: "Sugestões de keywords gratuitas e acessíveis", category: "SEO", url: "https://neilpatel.com/ubersuggest", pricing: "freemium" },
  { id: 122, name: "AnswerThePublic", description: "Descubra perguntas que pessoas fazem sobre temas", category: "SEO", url: "https://answerthepublic.com", pricing: "freemium" },

  // === TENDÊNCIAS & PESQUISA (123-127) ===
  { id: 123, name: "BuzzSumo", description: "Descubra conteúdo mais compartilhado por tema", category: "Tendências", url: "https://buzzsumo.com", pricing: "freemium" },
  { id: 124, name: "SparkToro", description: "Descubra onde seu público-alvo passa tempo online", category: "Tendências", url: "https://sparktoro.com", pricing: "freemium" },
  { id: 125, name: "SimilarWeb", description: "Analise tráfego de sites concorrentes", category: "Tendências", url: "https://similarweb.com", pricing: "freemium" },
  { id: 126, name: "Exploding Topics", description: "Tendências antes de viralizarem", category: "Tendências", url: "https://explodingtopics.com", pricing: "freemium" },

  // === MONETIZAÇÃO (127-132) ===
  { id: 127, name: "Google AdSense", description: "Monetize seu site com anúncios contextuais", category: "Monetização", url: "https://adsense.google.com", pricing: "free" },
  { id: 128, name: "Media.net", description: "Alternativa ao AdSense, bons resultados em inglês", category: "Monetização", url: "https://media.net", pricing: "free" },
  { id: 129, name: "Ezoic", description: "Otimização de anúncios com IA", category: "Monetização", url: "https://ezoic.com", pricing: "free" },
  { id: 130, name: "Hotmart", description: "Venda cursos e produtos digitais", category: "Monetização", url: "https://hotmart.com", pricing: "freemium" },
  { id: 131, name: "Amazon Afiliados", description: "Ganhe comissões recomendando produtos", category: "Monetização", url: "https://associados.amazon.com.br", pricing: "free" },
  { id: 132, name: "Gumroad", description: "Venda produtos digitais: ebooks, templates, código", category: "Monetização", url: "https://gumroad.com", pricing: "freemium" },

  // === PORTFÓLIO & PRESENÇA (133-140) ===
  { id: 133, name: "GitHub", description: "Perfil otimizado com README, contribuições e projetos", category: "Portfólio", url: "https://github.com", pricing: "free" },
  { id: 134, name: "Behance", description: "Portfólio visual para projetos de design/UI", category: "Portfólio", url: "https://behance.net", pricing: "free" },
  { id: 135, name: "Dribbble", description: "Showcase de design para recrutadores", category: "Portfólio", url: "https://dribbble.com", pricing: "freemium" },
  { id: 136, name: "Dev.to", description: "Publique artigos técnicos e ganhe visibilidade", category: "Portfólio", url: "https://dev.to", pricing: "free" },
  { id: 137, name: "Medium", description: "Blog pessoal com alcance orgânico", category: "Portfólio", url: "https://medium.com", pricing: "freemium" },
  { id: 138, name: "Hashnode", description: "Blog técnico com domínio customizado grátis", category: "Portfólio", url: "https://hashnode.com", pricing: "free" },
  { id: 139, name: "Linktree", description: "Agregador de links para bio de redes sociais", category: "Portfólio", url: "https://linktr.ee", pricing: "freemium" },
  { id: 140, name: "Bio.link", description: "Alternativa ao Linktree com mais customização", category: "Portfólio", url: "https://bio.link", pricing: "freemium" },

  // === NETWORKING & PARCERIAS (141-145) ===
  { id: 141, name: "Meetup", description: "Encontre eventos de tecnologia na sua cidade", category: "Networking", url: "https://meetup.com", pricing: "freemium" },
  { id: 142, name: "Eventbrite", description: "Descubra conferências e workshops tech", category: "Networking", url: "https://eventbrite.com", pricing: "free" },
  { id: 143, name: "TDC", description: "Maior conferência de devs do Brasil - The Developers Conference", category: "Networking", url: "https://thedevconf.com", pricing: "paid" },
  { id: 144, name: "DevConf", description: "Eventos e meetups da comunidade dev", category: "Networking", url: "https://devconf.com.br", pricing: "freemium" },
  { id: 145, name: "Programaria", description: "Comunidade para mulheres na tecnologia", category: "Networking", url: "https://programaria.org", pricing: "free" },

  // === CAPTURA DE LEADS (146-153) ===
  { id: 146, name: "QR Code Generator", description: "Crie QR Codes para cartões, eventos, materiais", category: "Leads", url: "https://qr-code-generator.com", pricing: "freemium" },
  { id: 147, name: "Carrd", description: "Landing pages simples e rápidas", category: "Leads", url: "https://carrd.co", pricing: "freemium" },
  { id: 148, name: "Webflow", description: "Landing pages profissionais sem código", category: "Leads", url: "https://webflow.com", pricing: "freemium" },
  { id: 149, name: "Mailchimp", description: "Email marketing gratuito até 500 contatos", category: "Leads", url: "https://mailchimp.com", pricing: "freemium" },
  { id: 150, name: "ConvertKit", description: "Email marketing para creators", category: "Leads", url: "https://convertkit.com", pricing: "freemium" },
  { id: 151, name: "HubSpot CRM", description: "Gerencie leads e clientes gratuitamente", category: "Leads", url: "https://hubspot.com/crm", pricing: "free" },
  { id: 152, name: "Pipedrive", description: "CRM focado em vendas", category: "Leads", url: "https://pipedrive.com", pricing: "paid" },

  // === INVESTIMENTO & STARTUPS (153-160) ===
  { id: 153, name: "AngelList", description: "Conecte-se com investidores anjo", category: "Investimento", url: "https://angel.co", pricing: "free" },
  { id: 154, name: "Crunchbase", description: "Pesquise investidores e startups do seu nicho", category: "Investimento", url: "https://crunchbase.com", pricing: "freemium" },
  { id: 155, name: "Kickstarter", description: "Crowdfunding para projetos criativos", category: "Investimento", url: "https://kickstarter.com", pricing: "freemium" },
  { id: 156, name: "Catarse", description: "Crowdfunding brasileiro", category: "Investimento", url: "https://catarse.me", pricing: "freemium" },
  { id: 157, name: "Y Combinator", description: "Aceleradora mais famosa do mundo", category: "Investimento", url: "https://ycombinator.com", pricing: "free" },
  { id: 158, name: "500 Startups", description: "Aceleradora global com presença no Brasil", category: "Investimento", url: "https://500.co", pricing: "free" },
  { id: 159, name: "Startup Farm", description: "Aceleradora brasileira", category: "Investimento", url: "https://startupfarm.com.br", pricing: "free" },
  { id: 160, name: "Wayra", description: "Aceleradora da Telefônica/Vivo", category: "Investimento", url: "https://wayra.com", pricing: "free" },

  // === TRABALHO FREELANCE (161-168) ===
  { id: 161, name: "Upwork", description: "Maior plataforma global de freelance", category: "Freelance", url: "https://upwork.com", pricing: "freemium" },
  { id: 162, name: "Fiverr", description: "Venda serviços padronizados (gigs)", category: "Freelance", url: "https://fiverr.com", pricing: "freemium" },
  { id: 163, name: "Toptal", description: "Freelancers top 3% do mercado", category: "Freelance", url: "https://toptal.com", pricing: "free" },
  { id: 164, name: "99designs", description: "Freelance focado em design", category: "Freelance", url: "https://99designs.com", pricing: "freemium" },
  { id: 165, name: "Workana", description: "Plataforma freelance para América Latina", category: "Freelance", url: "https://workana.com", pricing: "freemium" },
  { id: 166, name: "GetNinjas", description: "Plataforma brasileira de serviços", category: "Freelance", url: "https://getninjas.com.br", pricing: "freemium" },
  { id: 167, name: "Trampos", description: "Vagas de emprego e freelas em tech no Brasil", category: "Freelance", url: "https://trampos.co", pricing: "freemium" },
  { id: 168, name: "99freelas", description: "Freelance brasileiro", category: "Freelance", url: "https://99freelas.com.br", pricing: "freemium" },

  // === PARCERIAS EDUCACIONAIS (169-173) ===
  { id: 169, name: "GitHub Education", description: "Ferramentas gratuitas para estudantes e professores", category: "Educação", url: "https://education.github.com", pricing: "free" },
  { id: 170, name: "Microsoft Imagine Academy", description: "Recursos educacionais da Microsoft", category: "Educação", url: "https://imagine-academy.microsoft.com", pricing: "free" },
  { id: 171, name: "Google for Education", description: "Parcerias e recursos do Google", category: "Educação", url: "https://edu.google.com", pricing: "free" },
  { id: 172, name: "AWS Educate", description: "Créditos e recursos da AWS para estudantes", category: "Educação", url: "https://aws.amazon.com/education/awseducate", pricing: "free" },
  { id: 173, name: "JetBrains for Students", description: "IDEs profissionais grátis para estudantes", category: "Educação", url: "https://jetbrains.com/student", pricing: "free" },

  // ========================================
  // === FERRAMENTAS NOVAS 2025 (174-220) ===
  // ========================================

  // === MODELOS DE IA ATUALIZADOS 2025 (174-181) ===
  { id: 174, name: "GPT-5", description: "Nova geração do ChatGPT com raciocínio avançado e multimodalidade aprimorada.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://openai.com", highlight: true, isNew: true, pricing: "paid" },
  { id: 175, name: "Claude 4 Opus", description: "Versão mais avançada do Claude com capacidade estendida de código e análise.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://anthropic.com", highlight: true, isNew: true, pricing: "paid" },
  { id: 176, name: "Grok 3", description: "IA da xAI com acesso em tempo real ao X/Twitter e personalidade única.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://x.ai", highlight: true, isNew: true, pricing: "paid" },
  { id: 177, name: "Gemini 2.5 Pro", description: "Modelo avançado do Google com janela de 2M tokens e forte em código.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://deepmind.google/gemini", highlight: true, isNew: true, pricing: "paid" },
  { id: 178, name: "DeepSeek V3", description: "Modelo chinês de código aberto competitivo com GPT-4. Excelente custo-benefício.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://deepseek.com", isNew: true, pricing: "freemium" },
  { id: 179, name: "Mistral Large 2", description: "Modelo europeu open-source de alta performance. Forte em raciocínio.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://mistral.ai", isNew: true, pricing: "paid" },
  { id: 180, name: "Llama 4", description: "Modelo open-source da Meta. Pode rodar localmente com ótimo desempenho.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://llama.meta.com", isNew: true, pricing: "free" },
  { id: 181, name: "Command R+", description: "Modelo da Cohere otimizado para RAG e aplicações empresariais.", category: "Modelos IA 2025", subcategory: "LLMs", url: "https://cohere.com", isNew: true, pricing: "paid" },

  // === AGENTES DE CÓDIGO NOVOS 2025 (182-189) ===
  { id: 182, name: "Devin", description: "Primeiro agente de IA autônomo que escreve código, debuga e faz deploy sozinho.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://devin.ai", highlight: true, isNew: true, pricing: "paid" },
  { id: 183, name: "Tabnine Enterprise", description: "Completions de código com foco em privacidade. Roda 100% local.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://tabnine.com", isNew: true, pricing: "paid" },
  { id: 184, name: "Supermaven", description: "Autocompletar ultrarrápido para código. Latência sub-10ms.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://supermaven.com", isNew: true, pricing: "freemium" },
  { id: 185, name: "Continue.dev", description: "Assistente de código open-source para VS Code e JetBrains.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://continue.dev", isNew: true, pricing: "free" },
  { id: 186, name: "Cody", description: "Assistente de código da Sourcegraph com contexto completo do repositório.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://sourcegraph.com/cody", isNew: true, pricing: "freemium" },
  { id: 187, name: "Pieces for Developers", description: "Captura snippets de código com IA e sincroniza entre dispositivos.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://pieces.app", isNew: true, pricing: "freemium" },
  { id: 188, name: "Augment Code", description: "Agente de código que entende todo o contexto do projeto.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://augmentcode.com", isNew: true, pricing: "paid" },
  { id: 189, name: "Amp", description: "Agente de IA para desenvolvimento de software com interface CLI.", category: "Desenvolvimento", subcategory: "Agentes", url: "https://amp.dev", isNew: true, pricing: "freemium" },

  // === IDEs NOVOS 2025 (190-191) ===
  { id: 190, name: "Zed Editor", description: "Editor ultrarrápido com colaboração nativa e IA integrada. Escrito em Rust.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://zed.dev", highlight: true, isNew: true, pricing: "free" },
  { id: 191, name: "Void Editor", description: "IDE open-source alternativa ao Cursor. Foco em privacidade.", category: "Desenvolvimento", subcategory: "IDEs", url: "https://voideditor.com", isNew: true, pricing: "free" },

  // === IA GENERATIVA NOVOS 2025 (192-198) ===
  { id: 192, name: "Imagen 3", description: "Geração de imagens do Google com qualidade fotográfica e texto legível.", category: "IA Generativa", subcategory: "Imagens", url: "https://deepmind.google/imagen", isNew: true, pricing: "paid" },
  { id: 193, name: "Grok Image", description: "Geração de imagens da xAI integrada ao Grok.", category: "IA Generativa", subcategory: "Imagens", url: "https://x.ai", isNew: true, pricing: "paid" },
  { id: 194, name: "Luma AI", description: "Geração de vídeos 3D e modelos a partir de texto ou imagem.", category: "IA Generativa", subcategory: "Vídeos 3D", url: "https://lumalabs.ai", isNew: true, pricing: "freemium" },
  { id: 195, name: "Haiper", description: "Geração de vídeos rápida e acessível com resultados consistentes.", category: "IA Generativa", subcategory: "Vídeos", url: "https://haiper.ai", isNew: true, pricing: "freemium" },
  { id: 196, name: "Minimax", description: "Plataforma chinesa de geração de vídeo com qualidade competitiva.", category: "IA Generativa", subcategory: "Vídeos", url: "https://minimax.io", isNew: true, pricing: "freemium" },
  { id: 197, name: "Udio", description: "Geração de músicas completas com IA. Alta qualidade sonora.", category: "IA Generativa", subcategory: "Áudio", url: "https://udio.com", isNew: true, pricing: "freemium" },
  { id: 198, name: "Suno", description: "Crie músicas e canções com IA a partir de descrições textuais.", category: "IA Generativa", subcategory: "Áudio", url: "https://suno.ai", isNew: true, pricing: "freemium" },

  // === AUTOMAÇÃO & INTEGRAÇÃO (199-202) ===
  { id: 199, name: "n8n", description: "Automação de workflows open-source. Alternativa ao Zapier com auto-hospedagem.", category: "Automação", url: "https://n8n.io", highlight: true, isNew: true, pricing: "freemium" },
  { id: 200, name: "Make", description: "Automação visual de workflows. Antigo Integromat.", category: "Automação", url: "https://make.com", pricing: "freemium" },
  { id: 201, name: "Zapier", description: "Conecte milhares de apps sem código. Líder em automação no-code.", category: "Automação", url: "https://zapier.com", pricing: "freemium" },
  { id: 202, name: "Pipedream", description: "Automação serverless para desenvolvedores. Código + no-code.", category: "Automação", url: "https://pipedream.com", pricing: "freemium" },

  // === SEGURANÇA & QUALIDADE (203-206) ===
  { id: 203, name: "Snyk", description: "Encontre e corrija vulnerabilidades em dependências e código.", category: "Segurança", url: "https://snyk.io", highlight: true, isNew: true, pricing: "freemium" },
  { id: 204, name: "SonarQube", description: "Análise estática de código para qualidade e segurança.", category: "Segurança", url: "https://sonarqube.org", pricing: "freemium" },
  { id: 205, name: "GitGuardian", description: "Detecte secrets e credenciais expostas em repositórios.", category: "Segurança", url: "https://gitguardian.com", isNew: true, pricing: "freemium" },
  { id: 206, name: "Dependabot", description: "Atualizações automáticas de dependências no GitHub.", category: "Segurança", url: "https://github.com/dependabot", pricing: "free" },

  // === DOCUMENTAÇÃO (207-209) ===
  { id: 207, name: "Mintlify", description: "Documentação moderna e bonita a partir de código e markdown.", category: "Documentação", url: "https://mintlify.com", isNew: true, pricing: "freemium" },
  { id: 208, name: "GitBook", description: "Documentação colaborativa com controle de versão.", category: "Documentação", url: "https://gitbook.com", pricing: "freemium" },
  { id: 209, name: "ReadMe", description: "Hubs de documentação de API interativos e elegantes.", category: "Documentação", url: "https://readme.com", pricing: "freemium" },
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
    id: "modelos-ia-2025",
    name: "Modelos IA 2025",
    description: "Os modelos de IA mais avançados do momento",
    icon: "Brain",
    color: "hsl(280 83% 58%)",
    tools: allTools.filter(t => t.category === "Modelos IA 2025")
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
    description: "Geração de imagens, vídeos e áudio com IA",
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
    id: "seguranca",
    name: "Segurança",
    description: "Proteção de código e dependências",
    icon: "Shield",
    color: "hsl(0 70% 50%)",
    tools: allTools.filter(t => t.category === "Segurança")
  },
  {
    id: "automacao",
    name: "Automação",
    description: "Workflows e integrações automatizadas",
    icon: "Workflow",
    color: "hsl(30 80% 55%)",
    tools: allTools.filter(t => t.category === "Automação")
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
  },
  // === CATEGORIAS DE MARKETING ===
  {
    id: "redes-sociais",
    name: "Redes Sociais",
    description: "Construa sua presença digital",
    icon: "Share2",
    color: "hsl(330 80% 60%)",
    tools: allTools.filter(t => t.category === "Redes Sociais")
  },
  {
    id: "marketing-digital",
    name: "Marketing Digital",
    description: "Alcance seu público com anúncios",
    icon: "Megaphone",
    color: "hsl(197 71% 53%)",
    tools: allTools.filter(t => t.category === "Marketing Digital")
  },
  {
    id: "seo",
    name: "SEO",
    description: "Seja encontrado nos buscadores",
    icon: "Search",
    color: "hsl(142 76% 36%)",
    tools: allTools.filter(t => t.category === "SEO")
  },
  {
    id: "tendencias",
    name: "Tendências",
    description: "Descubra oportunidades de mercado",
    icon: "TrendingUp",
    color: "hsl(262 83% 58%)",
    tools: allTools.filter(t => t.category === "Tendências")
  },
  {
    id: "monetizacao",
    name: "Monetização",
    description: "Transforme tráfego em receita",
    icon: "DollarSign",
    color: "hsl(47 96% 43%)",
    tools: allTools.filter(t => t.category === "Monetização")
  },
  {
    id: "portfolio",
    name: "Portfólio",
    description: "Mostre seu trabalho profissionalmente",
    icon: "Globe",
    color: "hsl(221 83% 53%)",
    tools: allTools.filter(t => t.category === "Portfólio")
  },
  {
    id: "networking",
    name: "Networking",
    description: "Conecte-se com a comunidade",
    icon: "Users",
    color: "hsl(0 84% 60%)",
    tools: allTools.filter(t => t.category === "Networking")
  },
  {
    id: "leads",
    name: "Captura de Leads",
    description: "Converta visitantes em contatos",
    icon: "Target",
    color: "hsl(280 83% 68%)",
    tools: allTools.filter(t => t.category === "Leads")
  },
  {
    id: "investimento",
    name: "Investimento",
    description: "Encontre investidores e acelere",
    icon: "Rocket",
    color: "hsl(15 80% 55%)",
    tools: allTools.filter(t => t.category === "Investimento")
  },
  {
    id: "freelance",
    name: "Freelance",
    description: "Encontre projetos e clientes",
    icon: "Briefcase",
    color: "hsl(215 16% 47%)",
    tools: allTools.filter(t => t.category === "Freelance")
  },
  {
    id: "educacao",
    name: "Educação",
    description: "Recursos educacionais e parcerias",
    icon: "GraduationCap",
    color: "hsl(170 60% 45%)",
    tools: allTools.filter(t => t.category === "Educação")
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
    'gpt-5': 'GPT-5',
    'gpt5': 'GPT-5',
    'claude': 'Claude AI',
    'claude 4': 'Claude 4 Opus',
    'claude4': 'Claude 4 Opus',
    'gemini': 'Gemini',
    'gemini 2.5': 'Gemini 2.5 Pro',
    'grok': 'Grok 3',
    'grok3': 'Grok 3',
    'deepseek': 'DeepSeek V3',
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
    'devin': 'Devin',
    'tabnine': 'Tabnine Enterprise',
    'zed': 'Zed Editor',
    'n8n': 'n8n',
    'zapier': 'Zapier',
    'make': 'Make',
    'snyk': 'Snyk',
    'suno': 'Suno',
    'udio': 'Udio',
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

// Ferramentas novas (2025)
export const newTools = allTools.filter(t => t.isNew);

// Ferramentas por pricing
export const freeTools = allTools.filter(t => t.pricing === 'free');
export const freemiumTools = allTools.filter(t => t.pricing === 'freemium');
export const paidTools = allTools.filter(t => t.pricing === 'paid');
