import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToolReference } from "@/components/ToolReference";
import { getToolByName } from "@/data/toolsIndex";
import { WorkflowProgressBar } from "@/components/WorkflowBreadcrumbs";
import { 
  Lightbulb, 
  Search, 
  Target, 
  Users, 
  Code2, 
  Database, 
  TestTube, 
  Rocket, 
  BarChart3,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  GitBranch,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  FileText,
  Settings,
  Play,
  Brain,
  Workflow,
  ClipboardList,
  Terminal,
  Palette,
  Server,
  Activity,
  Image,
  Video,
  Sparkles
} from "lucide-react";

// Helper para renderizar nome com referência
const ToolName = ({ name, showLink = true }: { name: string; showLink?: boolean }) => {
  const tool = getToolByName(name);
  return (
    <span className="inline-flex items-center gap-1">
      <span>{name}</span>
      {tool && <ToolReference toolId={tool.id} size="sm" />}
    </span>
  );
};

// Dados das ferramentas organizados por fase
const toolsByPhase = {
  pesquisaMercado: {
    title: "Pesquisa de Mercado & Oportunidades",
    icon: Search,
    color: "hsl(197 71% 73%)",
    description: "Antes de ter uma ideia, descubra o que o mercado precisa",
    tools: [
      { name: "Portais Governamentais", description: "Licitações e contratações públicas", examples: ["ComprasNet", "Portal de Compras Gov", "Licitações-e"] },
      { name: "Google Trends", description: "Tendências de busca e interesse do público", url: "https://trends.google.com" },
      { name: "App Store & Play Store", description: "Rankings, reviews e gaps de mercado", examples: ["App Annie", "Sensor Tower"] },
      { name: "Product Hunt", description: "Lançamentos e validação de ideias", url: "https://producthunt.com" },
      { name: "Reddit & Comunidades", description: "Dores reais de usuários", examples: ["r/SaaS", "r/startups", "Indie Hackers"] }
    ]
  },
  ideacao: {
    title: "Ideação & Brainstorm com IA",
    icon: Lightbulb,
    color: "hsl(0 84% 60%)",
    description: "Use LLMs como seu time de estratégia",
    tools: [
      { name: "ChatGPT", description: "Brainstorm inicial, user stories, validação de conceito", url: "https://chat.openai.com", role: "Product Manager" },
      { name: "Claude AI", description: "Decisões arquiteturais e análise técnica profunda", url: "https://claude.ai", role: "Arquiteto de Software" },
      { name: "Gemini", description: "Análise de contexto amplo (até 2M tokens)", url: "https://gemini.google.com", role: "Analista de Negócios" },
      { name: "Perplexity", description: "Pesquisa de concorrentes e tecnologias com fontes", url: "https://perplexity.ai", role: "Pesquisador" },
      { name: "Groq", description: "Respostas ultrarrápidas para iteração ágil", url: "https://groq.com", role: "Consultor Técnico" }
    ]
  },
  boasPraticas: {
    title: "Boas Práticas & Padrões",
    icon: Shield,
    color: "hsl(142 76% 36%)",
    description: "Fundamentos sólidos antes de escrever código",
    principles: [
      { name: "SOLID", description: "Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion" },
      { name: "Object Calisthenics", description: "9 regras para código limpo orientado a objetos" },
      { name: "12-Factor App", description: "Metodologia para apps SaaS escaláveis e portáveis" },
      { name: "Clean Architecture", description: "Separação de concerns e independência de frameworks" },
      { name: "DRY, KISS, YAGNI", description: "Don't Repeat Yourself, Keep It Simple, You Aren't Gonna Need It" },
      { name: "TDD & BDD", description: "Test-Driven e Behavior-Driven Development" }
    ]
  },
  documentacao: {
    title: "Documentação & Planejamento",
    icon: FileText,
    color: "hsl(262 83% 58%)",
    description: "Crie as regras antes de começar",
    documents: [
      { name: "PRD (Product Requirement Document)", description: "Visão, objetivos, features e critérios de sucesso" },
      { name: "Regras para IA", description: "Instruções claras para que a IA não se perca no desenvolvimento" },
      { name: "Task List & Specs", description: "Breakdown de tarefas com definição de pronto" },
      { name: "ADR (Architecture Decision Records)", description: "Registro de decisões técnicas e suas justificativas" },
      { name: "Schema de Banco", description: "Modelagem de dados com dbdiagram.io ou similar" }
    ],
    tools: [
      { name: "Notion", url: "https://notion.so" },
      { name: "Linear", url: "https://linear.app" },
      { name: "dbdiagram.io", url: "https://dbdiagram.io" },
      { name: "Miro", url: "https://miro.com" }
    ]
  },
  prototipagem: {
    title: "Prototipagem & UI",
    icon: Palette,
    color: "hsl(47 96% 53%)",
    description: "Do conceito ao visual em minutos",
    tools: [
      { name: "Figma", description: "Design system e telas finais", url: "https://figma.com" },
      { name: "v0.dev", description: "Gerar componentes React/Tailwind com prompts", url: "https://v0.dev" },
      { name: "Framer AI", description: "Design e deploy de sites em minutos", url: "https://framer.com" },
      { name: "Uizard", description: "Transformar sketches em UI", url: "https://uizard.io" },
      { name: "Galileo AI", description: "Designs de UI automatizados", url: "https://usegalileo.ai" }
    ]
  },
  design: {
    title: "Design & Criação Visual",
    icon: Palette,
    color: "hsl(330 80% 60%)",
    description: "Ferramentas profissionais e IA para design gráfico",
    designTools: [
      { name: "Figma", description: "Colaboração em tempo real, design systems, prototipagem avançada", url: "https://figma.com", category: "Design Profissional" },
      { name: "Canva", description: "Design simplificado, templates prontos, ideal para marketing", url: "https://canva.com", category: "Design Rápido" },
      { name: "Photopea", description: "Editor de imagens online gratuito compatível com Photoshop", url: "https://photopea.com", category: "Edição de Imagens" },
      { name: "Adobe XD", description: "Prototipagem e design de interfaces da Adobe", url: "https://adobe.com/products/xd", category: "Design Profissional" },
      { name: "Sketch", description: "Design de interfaces para macOS", url: "https://sketch.com", category: "Design Profissional" }
    ],
    aiImageGen: [
      { name: "Midjourney", description: "Geração de imagens artísticas de alta qualidade via Discord", url: "https://midjourney.com", highlight: true },
      { name: "DALL-E 3", description: "IA da OpenAI para geração de imagens realistas e artísticas", url: "https://openai.com/dall-e-3", highlight: true },
      { name: "Leonardo.ai", description: "Geração de assets para jogos e arte digital", url: "https://leonardo.ai", highlight: true },
      { name: "Stable Diffusion", description: "Modelo open-source rodando local ou via API", url: "https://stability.ai" },
      { name: "Adobe Firefly", description: "IA generativa integrada ao ecossistema Adobe", url: "https://adobe.com/products/firefly" },
      { name: "Ideogram", description: "Especializado em gerar texto em imagens", url: "https://ideogram.ai" },
      { name: "Flux", description: "Modelos avançados de geração de imagem", url: "https://blackforestlabs.ai" }
    ],
    videoTools: [
      { name: "Runway", description: "Edição de vídeo e efeitos com IA", url: "https://runwayml.com" },
      { name: "Pika Labs", description: "Geração de vídeos a partir de texto/imagem", url: "https://pika.art" },
      { name: "Sora", description: "Geração de vídeos da OpenAI (acesso limitado)", url: "https://openai.com/sora" },
      { name: "Kling", description: "Geração de vídeos com alta qualidade", url: "https://klingai.com" }
    ],
    iconAssets: [
      { name: "Lucide Icons", description: "Ícones open-source usados neste projeto", url: "https://lucide.dev" },
      { name: "Heroicons", description: "Ícones da equipe do Tailwind CSS", url: "https://heroicons.com" },
      { name: "Phosphor Icons", description: "Biblioteca flexível com múltiplos estilos", url: "https://phosphoricons.com" },
      { name: "Unsplash", description: "Fotos gratuitas de alta qualidade", url: "https://unsplash.com" },
      { name: "Pexels", description: "Fotos e vídeos gratuitos", url: "https://pexels.com" }
    ]
  },
  desenvolvimento: {
    title: "Desenvolvimento com IA",
    icon: Code2,
    color: "hsl(221 83% 53%)",
    description: "Builders e IDEs potencializados por IA",
    builders: [
      { name: "Lovable", description: "Frontend completo React/Vite/TypeScript + Supabase", url: "https://lovable.dev", highlight: true },
      { name: "bolt.new", description: "Apps fullstack em minutos", url: "https://bolt.new" },
      { name: "Replit AI", description: "IDE online com execução e IA", url: "https://replit.com" },
      { name: "Leap.new", description: "Apps completas com prompts", url: "https://leap.new" }
    ],
    ides: [
      { name: "Cursor", description: "IDE AI-native com Composer", url: "https://cursor.com" },
      { name: "VS Code + Extensões", description: "Cline, CodeRabbit, Continue" },
      { name: "JetBrains + AI", description: "IDEs profissionais com assistentes" },
      { name: "Windsurf", description: "IDE focada em código com IA", url: "https://windsurf.ai" }
    ],
    agents: [
      { name: "GitHub Copilot", description: "Sugestões em tempo real", url: "https://github.com/features/copilot" },
      { name: "Claude Code", description: "Agente CLI para refactors", url: "https://claude.ai" },
      { name: "Aider", description: "Commits limpos e git-first", url: "https://aider.chat" },
      { name: "Cline", description: "Features completas automaticamente", url: "https://cline.bot" },
      { name: "Amazon Q Developer", description: "Otimizações AWS", url: "https://aws.amazon.com/q/developer" }
    ]
  },
  backend: {
    title: "Backend & Database",
    icon: Database,
    color: "hsl(280 83% 68%)",
    description: "Infraestrutura serverless e escalável",
    tools: [
      { name: "Supabase", description: "PostgreSQL + Auth + Storage + Edge Functions", url: "https://supabase.com", highlight: true },
      { name: "Firebase", description: "BaaS da Google com Firestore", url: "https://firebase.google.com" },
      { name: "PlanetScale", description: "MySQL serverless escalável", url: "https://planetscale.com" },
      { name: "Neon", description: "PostgreSQL serverless", url: "https://neon.tech" }
    ],
    vectorDBs: [
      { name: "Pinecone", description: "Banco vetorial para RAG", url: "https://pinecone.io" },
      { name: "Weaviate", description: "Open-source com GraphQL", url: "https://weaviate.io" },
      { name: "Chroma", description: "Simples para projetos menores", url: "https://trychroma.com" }
    ]
  },
  qualidade: {
    title: "Qualidade & Testes",
    icon: TestTube,
    color: "hsl(215 16% 47%)",
    description: "Automação de reviews e testes",
    tools: [
      { name: "CodeRabbit", description: "Reviews inteligentes de PRs", url: "https://coderabbit.ai" },
      { name: "Qodo.ai", description: "Geração de testes unitários", url: "https://qodo.ai" },
      { name: "GitHub Actions", description: "CI/CD automático", url: "https://github.com/features/actions" },
      { name: "Sentry", description: "Error tracking em produção", url: "https://sentry.io" },
      { name: "BLACKBOX.AI", description: "Busca de código e snippets", url: "https://blackbox.ai" }
    ]
  },
  deploy: {
    title: "Deploy & Infraestrutura",
    icon: Rocket,
    color: "hsl(142 70% 45%)",
    description: "Do código ao ar em minutos",
    platforms: [
      { name: "Vercel", description: "Deploy automático para Next.js e React", url: "https://vercel.com", highlight: true },
      { name: "Netlify", description: "JAMstack e serverless", url: "https://netlify.com" },
      { name: "Railway", description: "Fullstack com banco incluído", url: "https://railway.app" },
      { name: "Render", description: "Alternativa ao Heroku", url: "https://render.com" },
      { name: "Cloudflare Pages", description: "Edge deployment global", url: "https://pages.cloudflare.com" }
    ],
    infra: [
      { name: "Cloudflare", description: "DNS, CDN, SSL, proteção DDoS", url: "https://cloudflare.com" },
      { name: "AWS S3", description: "Storage de arquivos escalável" },
      { name: "Upstash", description: "Redis e Kafka serverless", url: "https://upstash.com" }
    ]
  },
  monitoramento: {
    title: "Monitoramento & Analytics",
    icon: BarChart3,
    color: "hsl(197 71% 73%)",
    description: "Acompanhe e evolua seu produto",
    tools: [
      { name: "Google Analytics", description: "Tráfego e comportamento", url: "https://analytics.google.com" },
      { name: "Mixpanel", description: "Product analytics e funnels", url: "https://mixpanel.com" },
      { name: "PostHog", description: "Analytics open-source", url: "https://posthog.com" },
      { name: "Hotjar", description: "Heatmaps e recordings", url: "https://hotjar.com" },
      { name: "Linear", description: "Gestão de backlog e sprints", url: "https://linear.app" }
    ]
  },
  iaLocal: {
    title: "IA Local & Privacidade",
    icon: Terminal,
    color: "hsl(0 0% 45%)",
    description: "Modelos rodando na sua máquina",
    tools: [
      { name: "Ollama", description: "Rodar modelos localmente via CLI", url: "https://ollama.com" },
      { name: "LM Studio", description: "Interface gráfica para modelos locais", url: "https://lmstudio.ai" },
      { name: "Jan", description: "Cliente desktop open-source", url: "https://jan.ai" },
      { name: "LocalAI", description: "Drop-in replacement para OpenAI API", url: "https://localai.io" },
      { name: "AnythingLLM", description: "RAG local para documentos", url: "https://anythingllm.com" }
    ]
  },
  apiPlatforms: {
    title: "Plataformas de API & LLMs",
    icon: Brain,
    color: "hsl(262 83% 58%)",
    description: "Acesso a modelos de IA via API",
    platforms: [
      { name: "OpenAI", description: "GPT-4, DALL-E, Whisper", url: "https://platform.openai.com" },
      { name: "Anthropic Claude", description: "Claude 3 Opus, Sonnet, Haiku", url: "https://anthropic.com/api" },
      { name: "OpenRouter", description: "200+ modelos via API unificada", url: "https://openrouter.ai" },
      { name: "Together AI", description: "Modelos open-source", url: "https://together.ai" },
      { name: "Groq", description: "Inferência ultra-rápida", url: "https://groq.com" },
      { name: "Google AI Studio", description: "Gemini API gratuita", url: "https://aistudio.google.com" },
      { name: "Hugging Face", description: "Milhares de modelos open-source", url: "https://huggingface.co" }
    ]
  }
};

const workflowSteps = [
  {
    number: 1,
    title: "Descoberta de Oportunidades",
    description: "Pesquise o mercado antes de ter a ideia",
    icon: Search,
    tasks: [
      "Explore portais de licitações governamentais",
      "Analise tendências no Google Trends",
      "Estude rankings nas lojas de apps",
      "Identifique gaps e dores reais"
    ]
  },
  {
    number: 2,
    title: "Ideação com IA como Time",
    description: "Cada LLM assume um papel na empresa",
    icon: Users,
    tasks: [
      "ChatGPT como Product Manager",
      "Claude como Arquiteto de Software",
      "Gemini como Analista de Negócios",
      "Perplexity como Pesquisador de Mercado"
    ]
  },
  {
    number: 3,
    title: "Boas Práticas & Fundamentos",
    description: "Defina as regras antes do código",
    icon: Shield,
    tasks: [
      "Estude princípios SOLID",
      "Aplique 12-Factor App",
      "Defina padrões de código",
      "Configure Object Calisthenics"
    ]
  },
  {
    number: 4,
    title: "Documentação Técnica",
    description: "PRD, specs e regras para IA",
    icon: FileText,
    tasks: [
      "Crie o PRD do produto",
      "Escreva regras para IA não se perder",
      "Defina task list e specs",
      "Modele o schema do banco"
    ]
  },
  {
    number: 5,
    title: "Prototipagem Visual",
    description: "Do conceito ao design",
    icon: Palette,
    tasks: [
      "Crie wireframes no Figma/Miro",
      "Gere componentes com v0.dev",
      "Valide UX com usuários",
      "Defina design system"
    ]
  },
  {
    number: 6,
    title: "Desenvolvimento Agentic",
    description: "Builders e IDEs com IA",
    icon: Code2,
    tasks: [
      "Inicie no Lovable.dev com regras",
      "Use Cursor/VS Code para refinamentos",
      "Aplique agentes como Cline/Aider",
      "Faça commits frequentes"
    ]
  },
  {
    number: 7,
    title: "Backend & Integrations",
    description: "Supabase e infraestrutura",
    icon: Database,
    tasks: [
      "Configure Supabase/Firebase",
      "Implemente autenticação",
      "Crie edge functions",
      "Conecte APIs externas"
    ]
  },
  {
    number: 8,
    title: "Qualidade & Deploy",
    description: "Testes, CI/CD e produção",
    icon: Rocket,
    tasks: [
      "Configure CodeRabbit para reviews",
      "Implemente GitHub Actions",
      "Deploy no Vercel/Netlify",
      "Migre para GitHub + domínio próprio"
    ]
  }
];

export default function LandingPage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [currentWorkflowPhase, setCurrentWorkflowPhase] = useState(1);

  const handlePhaseClick = (phase: number) => {
    setCurrentWorkflowPhase(phase);
    // Scroll to the corresponding section
    const sections = ['pesquisa', 'ideacao', 'boas-praticas', 'documentacao', 'prototipagem', 'desenvolvimento', 'backend', 'deploy'];
    const sectionId = sections[phase - 1];
    if (sectionId) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Workflow Progress Bar - Sticky */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b py-4 px-4">
        <div className="container mx-auto">
          <WorkflowProgressBar 
            currentPhase={currentWorkflowPhase} 
            onPhaseClick={handlePhaseClick}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <Badge variant="outline" className="px-4 py-1 text-sm border-primary/30">
              <Zap className="w-3 h-3 mr-1 inline" />
              Guia Completo de Desenvolvimento com IA
            </Badge>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Da Ideia ao Deploy
              </span>
              <br />
              <span className="text-foreground/90">com Inteligência Artificial</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Domine o fluxo completo de desenvolvimento moderno: desde a descoberta de oportunidades 
              de mercado até o deploy em produção, utilizando as melhores ferramentas de IA como seu time virtual.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/projetos">
              <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-purple-500">
                <Sparkles className="h-4 w-4" />
                🎯 Sugestões de Projetos com IA
              </Button>
            </Link>
            <Link to="/indice">
              <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:border-primary/50">
                <BookOpen className="h-4 w-4" />
                📚 Índice de Ferramentas
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="ghost" className="gap-2">
                <Play className="h-4 w-4" />
                Explorar Workflow
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card className="p-4 text-center bg-card/50 border-primary/10">
              <div className="text-2xl md:text-3xl font-bold text-primary">70+</div>
              <p className="text-xs md:text-sm text-muted-foreground">Ferramentas</p>
            </Card>
            <Card className="p-4 text-center bg-card/50 border-primary/10">
              <div className="text-2xl md:text-3xl font-bold text-primary">8</div>
              <p className="text-xs md:text-sm text-muted-foreground">Fases do Workflow</p>
            </Card>
            <Card className="p-4 text-center bg-card/50 border-primary/10">
              <div className="text-2xl md:text-3xl font-bold text-primary">15+</div>
              <p className="text-xs md:text-sm text-muted-foreground">APIs de LLM</p>
            </Card>
            <Card className="p-4 text-center bg-card/50 border-primary/10">
              <div className="text-2xl md:text-3xl font-bold text-primary">∞</div>
              <p className="text-xs md:text-sm text-muted-foreground">Possibilidades</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Rotina Ideal Section */}
      <section id="rotina-ideal" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Workflow className="w-3 h-3 mr-1 inline" />
              A Rotina Ideal
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              O Caminho do Zero ao Deploy
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Siga este fluxo estruturado para desenvolver qualquer aplicativo, 
              utilizando IA em cada etapa do processo.
            </p>
          </div>

          {/* Timeline Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            
            {workflowSteps.map((step, index) => (
              <div 
                key={step.number}
                className={`relative flex items-start gap-4 md:gap-8 mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number Circle */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {step.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ferramentas por Fase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Layers className="w-3 h-3 mr-1 inline" />
              Arsenal Completo
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Todas as Ferramentas por Fase
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore cada categoria e descubra as melhores ferramentas para cada etapa do desenvolvimento.
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-4">
            {/* Pesquisa de Mercado */}
            <AccordionItem value="pesquisa" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.pesquisaMercado.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.pesquisaMercado.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid gap-3">
                  {toolsByPhase.pesquisaMercado.tools.map((tool) => (
                    <div key={tool.name} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Globe className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="font-medium">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        {tool.examples && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {tool.examples.map((ex) => (
                              <Badge key={ex} variant="outline" className="text-xs">
                                <ToolName name={ex} />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Ideação com IA */}
            <AccordionItem value="ideacao" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.ideacao.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.ideacao.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Dica:</strong> Atribua um papel diferente a cada LLM! Um pode ser o "engenheiro de projeto", 
                  outro o "analista de sistema", outro o "arquiteto", e assim por diante.
                </p>
                <div className="grid gap-3">
                  {toolsByPhase.ideacao.tools.map((tool) => (
                    <a 
                      key={tool.name} 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Brain className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            <ToolName name={tool.name} />
                          </p>
                          <Badge variant="secondary" className="text-xs">{tool.role}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Boas Práticas */}
            <AccordionItem value="praticas" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.boasPraticas.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.boasPraticas.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid md:grid-cols-2 gap-3">
                  {toolsByPhase.boasPraticas.principles.map((principle) => (
                    <div key={principle.name} className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-primary">
                        <ToolName name={principle.name} />
                      </p>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Documentação */}
            <AccordionItem value="docs" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.documentacao.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.documentacao.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-3">
                    {toolsByPhase.documentacao.documents.map((doc) => (
                      <div key={doc.name} className="p-3 rounded-lg bg-muted/50">
                        <p className="font-medium">
                          <ToolName name={doc.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Ferramentas recomendadas:</p>
                    <div className="flex gap-2 flex-wrap">
                      {toolsByPhase.documentacao.tools.map((tool) => (
                        <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                            <ToolName name={tool.name} />
                          </Badge>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Prototipagem */}
            <AccordionItem value="proto" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.prototipagem.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.prototipagem.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid gap-3">
                  {toolsByPhase.prototipagem.tools.map((tool) => (
                    <a 
                      key={tool.name} 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Palette className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1">
                        <p className="font-medium">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Design & Criação Visual */}
            <AccordionItem value="design" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Image className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.design.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.design.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    Ferramentas de Design
                  </h4>
                  <div className="grid gap-2">
                    {toolsByPhase.design.designTools.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              <ToolName name={tool.name} />
                            </p>
                            <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Geração de Imagens com IA
                  </h4>
                  <div className="grid gap-2">
                    {toolsByPhase.design.aiImageGen.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          tool.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              <ToolName name={tool.name} />
                            </p>
                            {tool.highlight && <Badge className="text-xs">Popular</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    Geração de Vídeos com IA
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {toolsByPhase.design.videoTools.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <p className="font-medium">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    Ícones & Assets
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {toolsByPhase.design.iconAssets.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <p className="font-medium">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Desenvolvimento */}
            <AccordionItem value="dev" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.desenvolvimento.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.desenvolvimento.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-primary" />
                    Builders (No-Code/Low-Code)
                  </h4>
                  <div className="grid gap-2">
                    {toolsByPhase.desenvolvimento.builders.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          tool.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              <ToolName name={tool.name} />
                            </p>
                            {tool.highlight && <Badge className="text-xs">Recomendado</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    IDEs com IA
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {toolsByPhase.desenvolvimento.ides.map((tool) => (
                      <div key={tool.name} className="p-3 rounded-lg bg-muted/50">
                        <p className="font-medium">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Agentes de Código
                  </h4>
                  <div className="grid gap-2">
                    {toolsByPhase.desenvolvimento.agents.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">
                            <ToolName name={tool.name} />
                          </p>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Backend */}
            <AccordionItem value="backend" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.backend.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.backend.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="grid gap-2">
                  {toolsByPhase.backend.tools.map((tool) => (
                    <a 
                      key={tool.name} 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        tool.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            <ToolName name={tool.name} />
                          </p>
                          {tool.highlight && <Badge className="text-xs">Recomendado</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Bancos Vetoriais (para RAG):</p>
                  <div className="grid md:grid-cols-3 gap-2">
                    {toolsByPhase.backend.vectorDBs.map((tool) => (
                      <a 
                        key={tool.name} 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-center"
                      >
                        <p className="font-medium text-sm">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Deploy */}
            <AccordionItem value="deploy" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.deploy.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.deploy.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="grid gap-2">
                  {toolsByPhase.deploy.platforms.map((tool) => (
                    <a 
                      key={tool.name} 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        tool.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            <ToolName name={tool.name} />
                          </p>
                          {tool.highlight && <Badge className="text-xs">Recomendado</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Infraestrutura:</p>
                  <div className="flex gap-2 flex-wrap">
                    {toolsByPhase.deploy.infra.map((tool) => (
                      <Badge key={tool.name} variant="outline">
                        <ToolName name={tool.name} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* APIs de LLM */}
            <AccordionItem value="apis" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.apiPlatforms.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.apiPlatforms.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid md:grid-cols-2 gap-2">
                  {toolsByPhase.apiPlatforms.platforms.map((platform) => (
                    <a 
                      key={platform.name} 
                      href={platform.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <p className="font-medium">
                        <ToolName name={platform.name} />
                      </p>
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* IA Local */}
            <AccordionItem value="local" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{toolsByPhase.iaLocal.title}</h3>
                    <p className="text-sm text-muted-foreground">{toolsByPhase.iaLocal.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid gap-2">
                  {toolsByPhase.iaLocal.tools.map((tool) => (
                    <a 
                      key={tool.name} 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">
                          <ToolName name={tool.name} />
                        </p>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Fluxo de Migração */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <GitBranch className="w-3 h-3 mr-1 inline" />
              Domínio & Controle
            </Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Mantenha o Controle do Seu Software
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Após a primeira publicação no Lovable, migre para o GitHub e faça deploy 
              na infraestrutura de sua escolha para total domínio do seu aplicativo.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">1. Lovable</h3>
                <p className="text-sm text-muted-foreground">Desenvolvimento inicial com IA</p>
              </Card>
              
              <Card className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">2. GitHub</h3>
                <p className="text-sm text-muted-foreground">Versionamento e colaboração</p>
              </Card>
              
              <Card className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">3. IDE Local</h3>
                <p className="text-sm text-muted-foreground">Cursor, VS Code, JetBrains</p>
              </Card>
              
              <Card className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">4. Deploy</h3>
                <p className="text-sm text-muted-foreground">Vercel, Render, Railway</p>
              </Card>
            </div>

            <Card className="mt-8 p-6 border-primary/20 bg-primary/5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Extensões Recomendadas para IDEs
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Cline", "Continue", "CodeRabbit", "GitHub Copilot", "Gemini Code Assist", "Codeium", "TabNine", "AWS Toolkit"].map((ext) => (
                  <Badge key={ext} variant="secondary">
                    <ToolName name={ext} />
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore o workflow interativo completo com todas as ferramentas, 
              ações detalhadas e recursos educacionais.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Acessar Dashboard
                </Button>
              </Link>
              <Link to="/devtools-guide">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Guia de Ferramentas
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Desenvolvido com 💜 usando Lovable, React, TypeScript e Tailwind CSS</p>
          <p className="mt-2">
            Guia completo de desenvolvimento com IA • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
