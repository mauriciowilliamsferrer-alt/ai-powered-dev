// Dados estruturados para ferramentas de marketing e divulgação
import { 
  Share2, 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube,
  TrendingUp,
  Search,
  DollarSign,
  Users,
  Mail,
  QrCode,
  Briefcase,
  GraduationCap,
  Rocket,
  Globe,
  Megaphone,
  Target,
  BarChart3,
  FileText,
  Link2,
  type LucideIcon
} from "lucide-react";

export interface MarketingTool {
  id: number;
  name: string;
  description: string;
  url?: string;
  tip?: string;
  type: 'free' | 'freemium' | 'paid';
}

export interface MarketingCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  tools: MarketingTool[];
  tips: string[];
}

export const marketingCategories: MarketingCategory[] = [
  {
    id: "redes-sociais",
    name: "Redes Sociais",
    description: "Construa sua presença digital e conecte-se com seu público",
    icon: Share2,
    color: "hsl(330 80% 60%)",
    bgColor: "hsl(330 80% 95%)",
    tools: [
      { id: 101, name: "WhatsApp Business", description: "Catálogos, automação, listas de transmissão para atendimento profissional", url: "https://business.whatsapp.com", type: "free", tip: "Crie um catálogo com seus serviços e preços" },
      { id: 102, name: "Instagram", description: "Reels, Stories, Bio otimizada - mostre seu trabalho visualmente", url: "https://instagram.com", type: "free", tip: "Poste projetos em Reels com antes/depois" },
      { id: 103, name: "LinkedIn", description: "Perfil profissional, artigos técnicos, networking B2B", url: "https://linkedin.com", type: "freemium", tip: "Publique artigos sobre tecnologia toda semana" },
      { id: 104, name: "Twitter/X", description: "Tech community, threads sobre código, networking", url: "https://twitter.com", type: "free", tip: "Faça threads ensinando algo que você aprendeu" },
      { id: 105, name: "TikTok", description: "Conteúdo técnico viral, dicas de código em vídeos curtos", url: "https://tiktok.com", type: "free", tip: "Grave vídeos de 60s mostrando soluções de bugs" },
      { id: 106, name: "Facebook", description: "Grupos de desenvolvedores, páginas de serviços, marketplace", url: "https://facebook.com", type: "free", tip: "Participe de grupos locais de tecnologia" },
      { id: 107, name: "Discord", description: "Comunidades tech, networking, suporte", url: "https://discord.com", type: "free", tip: "Entre em servidores de frameworks que você usa" },
      { id: 108, name: "Telegram", description: "Canais e grupos de desenvolvedores", url: "https://telegram.org", type: "free", tip: "Crie um canal com dicas diárias" },
      { id: 109, name: "YouTube", description: "Tutoriais, lives, vlogs de desenvolvimento", url: "https://youtube.com", type: "freemium", tip: "Grave seu processo de criação de projetos" }
    ],
    tips: [
      "Mantenha consistência: poste pelo menos 3x por semana",
      "Use hashtags relevantes: #DevBR #ReactJS #WebDev",
      "Responda comentários em até 24 horas",
      "Mostre bastidores do seu trabalho",
      "Compartilhe aprendizados e erros também"
    ]
  },
  {
    id: "marketing-digital",
    name: "Marketing Digital & Ads",
    description: "Alcance seu público-alvo com anúncios pagos estratégicos",
    icon: Megaphone,
    color: "hsl(197 71% 53%)",
    bgColor: "hsl(197 71% 95%)",
    tools: [
      { id: 110, name: "Google Ads", description: "Campanhas de busca e display para captar clientes ativamente buscando", url: "https://ads.google.com", type: "paid", tip: "Comece com R$10/dia em palavras-chave específicas" },
      { id: 111, name: "Meta Ads", description: "Anúncios no Facebook e Instagram para alcance massivo", url: "https://business.facebook.com", type: "paid", tip: "Crie públicos personalizados baseados em interesses" },
      { id: 112, name: "LinkedIn Ads", description: "Anúncios B2B para empresas e recrutadores", url: "https://business.linkedin.com/marketing-solutions/ads", type: "paid", tip: "Ideal para serviços B2B e busca de emprego" },
      { id: 113, name: "TikTok Ads", description: "Alcance jovens e viralize seu conteúdo", url: "https://ads.tiktok.com", type: "paid", tip: "Vídeos autênticos funcionam melhor que produzidos" },
      { id: 114, name: "Taboola", description: "Native ads em portais de notícias", url: "https://taboola.com", type: "paid" },
      { id: 115, name: "Outbrain", description: "Publicidade nativa para content marketing", url: "https://outbrain.com", type: "paid" }
    ],
    tips: [
      "Defina um orçamento mensal antes de começar",
      "Teste diferentes criativos antes de escalar",
      "Use remarketing para quem já visitou seu site",
      "Acompanhe métricas: CPC, CTR, conversões",
      "Comece pequeno, aprenda, depois escale"
    ]
  },
  {
    id: "seo",
    name: "SEO & Presença Online",
    description: "Seja encontrado organicamente nos buscadores",
    icon: Search,
    color: "hsl(142 76% 36%)",
    bgColor: "hsl(142 76% 95%)",
    tools: [
      { id: 116, name: "Google Search Console", description: "Monitore como seu site aparece no Google", url: "https://search.google.com/search-console", type: "free", tip: "Envie seu sitemap e corrija erros de indexação" },
      { id: 117, name: "Google Analytics", description: "Entenda de onde vem seu tráfego e comportamento", url: "https://analytics.google.com", type: "free", tip: "Configure metas para acompanhar conversões" },
      { id: 118, name: "SEMrush", description: "Pesquisa de palavras-chave e análise de concorrentes", url: "https://semrush.com", type: "freemium", tip: "Use para descobrir keywords dos concorrentes" },
      { id: 119, name: "Ahrefs", description: "Backlinks, keywords e análise de conteúdo", url: "https://ahrefs.com", type: "paid" },
      { id: 120, name: "Ubersuggest", description: "Sugestões de keywords gratuitas e acessíveis", url: "https://neilpatel.com/ubersuggest", type: "freemium", tip: "Ótimo para quem está começando" },
      { id: 121, name: "AnswerThePublic", description: "Descubra perguntas que pessoas fazem sobre temas", url: "https://answerthepublic.com", type: "freemium", tip: "Use para criar conteúdo que responda dúvidas reais" }
    ],
    tips: [
      "Escreva títulos com menos de 60 caracteres",
      "Use sua keyword principal no H1 e primeiros parágrafos",
      "Crie conteúdo que responda perguntas específicas",
      "Consiga backlinks de sites relevantes",
      "Otimize velocidade do site (Core Web Vitals)"
    ]
  },
  {
    id: "tendencias",
    name: "Tendências & Pesquisa",
    description: "Descubra o que está em alta e oportunidades de mercado",
    icon: TrendingUp,
    color: "hsl(262 83% 58%)",
    bgColor: "hsl(262 83% 95%)",
    tools: [
      { id: 122, name: "Google Trends", description: "Veja tendências de busca ao longo do tempo", url: "https://trends.google.com", type: "free", tip: "Compare tecnologias para ver qual está crescendo" },
      { id: 123, name: "BuzzSumo", description: "Descubra conteúdo mais compartilhado por tema", url: "https://buzzsumo.com", type: "freemium", tip: "Use para encontrar formatos de conteúdo que viralizam" },
      { id: 124, name: "SparkToro", description: "Descubra onde seu público-alvo passa tempo online", url: "https://sparktoro.com", type: "freemium" },
      { id: 125, name: "SimilarWeb", description: "Analise tráfego de sites concorrentes", url: "https://similarweb.com", type: "freemium", tip: "Veja de onde vem o tráfego dos concorrentes" },
      { id: 126, name: "Exploding Topics", description: "Tendências antes de viralizarem", url: "https://explodingtopics.com", type: "freemium" }
    ],
    tips: [
      "Pesquise tendências antes de criar conteúdo",
      "Compare interesse em diferentes tecnologias",
      "Identifique sazonalidade no seu nicho",
      "Antecipe tendências para ser pioneiro"
    ]
  },
  {
    id: "monetizacao",
    name: "Monetização",
    description: "Transforme seu tráfego e conteúdo em receita",
    icon: DollarSign,
    color: "hsl(47 96% 43%)",
    bgColor: "hsl(47 96% 95%)",
    tools: [
      { id: 127, name: "Google AdSense", description: "Monetize seu site com anúncios contextuais", url: "https://adsense.google.com", type: "free", tip: "Precisa de conteúdo original e tráfego consistente" },
      { id: 128, name: "Media.net", description: "Alternativa ao AdSense, bons resultados em inglês", url: "https://media.net", type: "free" },
      { id: 129, name: "Ezoic", description: "Otimização de anúncios com IA", url: "https://ezoic.com", type: "free" },
      { id: 130, name: "Hotmart", description: "Venda cursos e produtos digitais", url: "https://hotmart.com", type: "freemium", tip: "Crie um curso sobre o que você domina" },
      { id: 131, name: "Amazon Afiliados", description: "Ganhe comissões recomendando produtos", url: "https://associados.amazon.com.br", type: "free", tip: "Recomende livros e equipamentos que você usa" },
      { id: 132, name: "Gumroad", description: "Venda produtos digitais: ebooks, templates, código", url: "https://gumroad.com", type: "freemium", tip: "Venda templates, boilerplates, componentes" }
    ],
    tips: [
      "Diversifique fontes de renda",
      "Crie produtos digitais escaláveis",
      "Programa de afiliados funciona com audiência engajada",
      "Cursos e mentorias têm alto ticket médio"
    ]
  },
  {
    id: "portfolio",
    name: "Portfólio & Presença",
    description: "Mostre seu trabalho de forma profissional",
    icon: Globe,
    color: "hsl(221 83% 53%)",
    bgColor: "hsl(221 83% 95%)",
    tools: [
      { id: 133, name: "GitHub", description: "Perfil otimizado com README, contribuições e projetos", url: "https://github.com", type: "free", tip: "Crie um README.md do perfil impressionante" },
      { id: 134, name: "Behance", description: "Portfólio visual para projetos de design/UI", url: "https://behance.net", type: "free" },
      { id: 135, name: "Dribbble", description: "Showcase de design para recrutadores", url: "https://dribbble.com", type: "freemium" },
      { id: 136, name: "Dev.to", description: "Publique artigos técnicos e ganhe visibilidade", url: "https://dev.to", type: "free", tip: "Republique seus melhores artigos aqui" },
      { id: 137, name: "Medium", description: "Blog pessoal com alcance orgânico", url: "https://medium.com", type: "freemium" },
      { id: 138, name: "Hashnode", description: "Blog técnico com domínio customizado grátis", url: "https://hashnode.com", type: "free", tip: "Melhor SEO que Medium para tech" },
      { id: 139, name: "Linktree", description: "Agregador de links para bio de redes sociais", url: "https://linktr.ee", type: "freemium", tip: "Centralize todos seus links profissionais" },
      { id: 140, name: "Bio.link", description: "Alternativa ao Linktree com mais customização", url: "https://bio.link", type: "freemium" }
    ],
    tips: [
      "Mantenha seu GitHub ativo com contribuições",
      "Documente todos os projetos no README",
      "Escreva sobre o que você está aprendendo",
      "Tenha um site pessoal com domínio próprio",
      "Inclua formas de contato claras"
    ]
  },
  {
    id: "networking",
    name: "Networking & Parcerias",
    description: "Conecte-se com pessoas e organizações estratégicas",
    icon: Users,
    color: "hsl(0 84% 60%)",
    bgColor: "hsl(0 84% 95%)",
    tools: [
      { id: 141, name: "Meetup", description: "Encontre eventos de tecnologia na sua cidade", url: "https://meetup.com", type: "freemium", tip: "Participe de pelo menos 1 evento por mês" },
      { id: 142, name: "Eventbrite", description: "Descubra conferências e workshops tech", url: "https://eventbrite.com", type: "free" },
      { id: 143, name: "TDC (The Developers Conference)", description: "Maior conferência de devs do Brasil", url: "https://thedevconf.com", type: "paid" },
      { id: 144, name: "DevConf", description: "Eventos e meetups da comunidade dev", url: "https://devconf.com.br", type: "freemium" },
      { id: 145, name: "Programaria", description: "Comunidade para mulheres na tecnologia", url: "https://programaria.org", type: "free" }
    ],
    tips: [
      "Vá a eventos presenciais quando possível",
      "Ofereça ajuda antes de pedir algo",
      "Mantenha contato após conhecer pessoas",
      "Participe de hackathons",
      "Seja ativo em comunidades online"
    ]
  },
  {
    id: "leads",
    name: "Captura de Leads",
    description: "Converta visitantes em contatos e clientes",
    icon: Target,
    color: "hsl(280 83% 68%)",
    bgColor: "hsl(280 83% 95%)",
    tools: [
      { id: 146, name: "QR Code Generator", description: "Crie QR Codes para cartões, eventos, materiais", url: "https://qr-code-generator.com", type: "freemium", tip: "Use em cartões de visita para seu portfólio" },
      { id: 147, name: "Canva QR Codes", description: "QR Codes integrados ao design", url: "https://canva.com", type: "freemium" },
      { id: 148, name: "Carrd", description: "Landing pages simples e rápidas", url: "https://carrd.co", type: "freemium", tip: "Crie uma landing page por serviço" },
      { id: 149, name: "Webflow", description: "Landing pages profissionais sem código", url: "https://webflow.com", type: "freemium" },
      { id: 150, name: "Mailchimp", description: "Email marketing gratuito até 500 contatos", url: "https://mailchimp.com", type: "freemium", tip: "Crie uma newsletter semanal" },
      { id: 151, name: "ConvertKit", description: "Email marketing para creators", url: "https://convertkit.com", type: "freemium" },
      { id: 152, name: "HubSpot CRM", description: "Gerencie leads e clientes gratuitamente", url: "https://hubspot.com/crm", type: "free", tip: "Organize todos os contatos profissionais" },
      { id: 153, name: "Pipedrive", description: "CRM focado em vendas", url: "https://pipedrive.com", type: "paid" }
    ],
    tips: [
      "Ofereça algo grátis em troca do email (lead magnet)",
      "Use QR Codes em cartões de visita",
      "Crie landing pages específicas por serviço",
      "Mantenha contato regular com sua lista",
      "Segmente contatos por interesse"
    ]
  },
  {
    id: "investimento",
    name: "Investimento & Startups",
    description: "Encontre investidores e acelere sua startup",
    icon: Rocket,
    color: "hsl(15 80% 55%)",
    bgColor: "hsl(15 80% 95%)",
    tools: [
      { id: 154, name: "AngelList", description: "Conecte-se com investidores anjo", url: "https://angel.co", type: "free", tip: "Crie um perfil mesmo sem buscar investimento" },
      { id: 155, name: "Crunchbase", description: "Pesquise investidores e startups do seu nicho", url: "https://crunchbase.com", type: "freemium" },
      { id: 156, name: "Kickstarter", description: "Crowdfunding para projetos criativos", url: "https://kickstarter.com", type: "freemium" },
      { id: 157, name: "Catarse", description: "Crowdfunding brasileiro", url: "https://catarse.me", type: "freemium", tip: "Ótimo para validar ideias com pré-vendas" },
      { id: 158, name: "Y Combinator", description: "Aceleradora mais famosa do mundo", url: "https://ycombinator.com", type: "free" },
      { id: 159, name: "500 Startups", description: "Aceleradora global com presença no Brasil", url: "https://500.co", type: "free" },
      { id: 160, name: "Startup Farm", description: "Aceleradora brasileira", url: "https://startupfarm.com.br", type: "free" },
      { id: 161, name: "Wayra", description: "Aceleradora da Telefônica/Vivo", url: "https://wayra.com", type: "free" }
    ],
    tips: [
      "Valide sua ideia antes de buscar investimento",
      "Tenha métricas claras para apresentar",
      "Participe de programas de aceleração gratuitos",
      "Network com outros founders"
    ]
  },
  {
    id: "freelance",
    name: "Trabalho Freelance",
    description: "Encontre projetos e clientes como freelancer",
    icon: Briefcase,
    color: "hsl(215 16% 47%)",
    bgColor: "hsl(215 16% 95%)",
    tools: [
      { id: 162, name: "Upwork", description: "Maior plataforma global de freelance", url: "https://upwork.com", type: "freemium", tip: "Comece com projetos menores para ganhar reviews" },
      { id: 163, name: "Fiverr", description: "Venda serviços padronizados (gigs)", url: "https://fiverr.com", type: "freemium", tip: "Crie gigs específicos, não genéricos" },
      { id: 164, name: "Toptal", description: "Freelancers top 3% do mercado", url: "https://toptal.com", type: "free" },
      { id: 165, name: "99designs", description: "Freelance focado em design", url: "https://99designs.com", type: "freemium" },
      { id: 166, name: "Workana", description: "Plataforma freelance para América Latina", url: "https://workana.com", type: "freemium", tip: "Boa para projetos em português/espanhol" },
      { id: 167, name: "GetNinjas", description: "Plataforma brasileira de serviços", url: "https://getninjas.com.br", type: "freemium" },
      { id: 168, name: "Trampos", description: "Vagas de emprego e freelas em tech no Brasil", url: "https://trampos.co", type: "freemium" },
      { id: 169, name: "99freelas", description: "Freelance brasileiro", url: "https://99freelas.com.br", type: "freemium" }
    ],
    tips: [
      "Especialize-se em um nicho específico",
      "Cobre pelo valor entregue, não por hora",
      "Construa relacionamentos de longo prazo",
      "Peça depoimentos de todos os clientes",
      "Tenha contrato para todos os projetos"
    ]
  },
  {
    id: "educacao",
    name: "Parcerias Educacionais",
    description: "Conecte-se com universidades, escolas e estudantes",
    icon: GraduationCap,
    color: "hsl(170 60% 45%)",
    bgColor: "hsl(170 60% 95%)",
    tools: [
      { id: 170, name: "GitHub Education", description: "Ferramentas gratuitas para estudantes e professores", url: "https://education.github.com", type: "free", tip: "Aplique como Campus Expert" },
      { id: 171, name: "Microsoft Imagine Academy", description: "Recursos educacionais da Microsoft", url: "https://imagine-academy.microsoft.com", type: "free" },
      { id: 172, name: "Google for Education", description: "Parcerias e recursos do Google", url: "https://edu.google.com", type: "free" },
      { id: 173, name: "AWS Educate", description: "Créditos e recursos da AWS para estudantes", url: "https://aws.amazon.com/education/awseducate", type: "free" },
      { id: 174, name: "JetBrains Educational", description: "IDEs gratuitas para estudantes", url: "https://jetbrains.com/community/education", type: "free" }
    ],
    tips: [
      "Ofereça palestras gratuitas em universidades",
      "Crie workshops práticos para estudantes",
      "Mentore projetos de conclusão de curso",
      "Participe de feiras de carreiras",
      "Conecte-se com professores da área"
    ]
  }
];

// Templates de mensagens para abordagem
export const messageTemplates = {
  universidade: `Olá Professor(a) [Nome],

Sou desenvolvedor(a) e gostaria de propor uma parceria com a [Universidade].

Ofereço:
- Palestras sobre desenvolvimento de software
- Workshops práticos de programação
- Mentoria para projetos de TCC

Teria interesse em conversar sobre possibilidades de colaboração?

Atenciosamente,
[Seu nome]`,

  investidor: `Olá [Nome],

Estou desenvolvendo [breve descrição do produto] que resolve [problema específico] para [público-alvo].

Métricas atuais:
- [métrica 1]
- [métrica 2]

Busco [valor] para [objetivo específico].

Podemos agendar uma conversa?

[Seu nome]`,

  cliente: `Olá [Nome],

Vi que a [Empresa] está [contexto relevante].

Sou especialista em [sua especialidade] e ajudei [empresa/pessoa similar] a [resultado alcançado].

Posso mostrar como poderia ajudar vocês?

[Seu nome]`,

  parceria: `Olá [Nome],

Acompanho seu trabalho e admiro [algo específico].

Tenho uma ideia de colaboração que beneficiaria nossos públicos:
[breve descrição]

Teria interesse em explorar essa parceria?

[Seu nome]`
};

// Dicas gerais de precificação
export const pricingTips = [
  "Nunca cobre por hora no início - defina preços fixos por projeto",
  "Pesquise o mercado antes de definir preços",
  "Inclua revisões limitadas no escopo",
  "Cobre pelo valor entregue, não pelo tempo gasto",
  "Tenha preços diferentes para clientes diferentes",
  "Aumente preços gradualmente conforme ganha experiência",
  "Ofereça pacotes em vez de serviços avulsos",
  "Sempre peça 50% adiantado"
];

// Checklist de presença digital
export const digitalPresenceChecklist = [
  { item: "Perfil LinkedIn completo e atualizado", priority: "alta" },
  { item: "GitHub com projetos documentados", priority: "alta" },
  { item: "Site/portfólio pessoal", priority: "alta" },
  { item: "Bio profissional de 1 parágrafo", priority: "média" },
  { item: "Foto profissional consistente em todas as redes", priority: "média" },
  { item: "Pelo menos uma rede social ativa", priority: "média" },
  { item: "Email profissional (nome@seudominio.com)", priority: "média" },
  { item: "Cartão de visita digital ou QR Code", priority: "baixa" },
  { item: "Newsletter ou blog ativo", priority: "baixa" }
];
