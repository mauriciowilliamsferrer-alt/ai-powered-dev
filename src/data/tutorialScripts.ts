export interface TutorialScript {
  phase: number;
  title: string;
  narrationText: string;
  duration: number; // em segundos
  highlights: string[];
}

export const tutorialScripts: TutorialScript[] = [
  {
    phase: 1,
    title: "Fundamentos & Setup",
    narrationText: `Bem-vindo ao tutorial de desenvolvimento web moderno! Vamos começar pelos fundamentos essenciais. 
    
    A primeira fase é crucial: configurar um ambiente seguro. Isso inclui gerenciar variáveis de ambiente, configurar autenticação SSH, e estabelecer as melhores práticas de segurança desde o início. 
    
    Também vamos configurar seu terminal com ferramentas como Oh My Zsh, e implementar controle de versão com Git. Lembre-se: segurança primeiro, sempre!`,
    duration: 45,
    highlights: ["segurança", "SSH", "variáveis de ambiente", "Git", "terminal"]
  },
  {
    phase: 2,
    title: "Ambiente de Desenvolvimento",
    narrationText: `Com o ambiente seguro estabelecido, vamos configurar seu IDE e ferramentas de desenvolvimento.
    
    O Visual Studio Code é nossa escolha recomendada, com extensões poderosas como GitHub Copilot e Cursor para assistência com IA. 
    
    Aprenda a organizar seu workspace, configurar linters, formatadores como Prettier, e aproveitar assistentes de IA para acelerar seu desenvolvimento. Um ambiente bem configurado é fundamental para sua produtividade.`,
    duration: 40,
    highlights: ["VS Code", "Copilot", "Cursor", "Prettier", "IA", "produtividade"]
  },
  {
    phase: 3,
    title: "Prototipagem & Core Stack",
    narrationText: `Agora vamos criar! Começamos com design e prototipagem usando Figma, depois partimos para a stack principal de desenvolvimento.
    
    Você vai trabalhar com React para interfaces, Vite para build rápido, TypeScript para segurança de tipos, e Tailwind CSS para estilização moderna e responsiva. 
    
    Esta é a base do desenvolvimento frontend moderno - componentes reativos, tipagem estática, e design system consistente. É aqui que suas ideias ganham vida!`,
    duration: 60,
    highlights: ["Figma", "React", "Vite", "TypeScript", "Tailwind CSS", "componentes"]
  },
  {
    phase: 4,
    title: "Backend & Database",
    narrationText: `Hora de adicionar backend e persistência de dados à sua aplicação!
    
    Utilizaremos PostgreSQL como banco de dados, Drizzle como ORM para queries type-safe, e Supabase para backend-as-a-service com autenticação, storage e APIs em tempo real.
    
    Aprenda a integrar APIs externas, gerenciar estado com TanStack Query, e implementar autenticação robusta. Seus dados estarão seguros e sua aplicação será escalável.`,
    duration: 50,
    highlights: ["PostgreSQL", "Drizzle", "Supabase", "API", "autenticação", "TanStack Query"]
  },
  {
    phase: 5,
    title: "Desenvolvimento Agentic",
    narrationText: `Acelere seu desenvolvimento com AI agents - o futuro da programação já chegou!
    
    Ferramentas como Jules AI, Aider, e CodeRabbit funcionam como desenvolvedores assistentes, automatizando tarefas repetitivas, sugerindo melhorias de código, e até implementando features completas.
    
    Aprenda a trabalhar em colaboração com IA, delegando tarefas enquanto você foca na arquitetura e decisões estratégicas. A IA como acelerador do seu trabalho!`,
    duration: 45,
    highlights: ["Jules AI", "Aider", "CodeRabbit", "automação", "IA", "produtividade"]
  },
  {
    phase: 6,
    title: "Testing & Quality",
    narrationText: `Qualidade é essencial! Vamos implementar testes abrangentes e ferramentas de qualidade.
    
    Utilize Vitest para testes unitários rápidos, Cypress e Playwright para testes end-to-end, TestSprite para testes gerados por IA, e Qodo para code review automatizado.
    
    Integre Sentry para monitoramento de erros em produção. Com estas ferramentas, você garante que seu código funciona perfeitamente e seus usuários têm a melhor experiência possível.`,
    duration: 50,
    highlights: ["Vitest", "Cypress", "Playwright", "TestSprite", "Sentry", "qualidade"]
  },
  {
    phase: 7,
    title: "Deployment Pipeline",
    narrationText: `Chegou a hora de colocar sua aplicação no ar e automatizar o deployment!
    
    Configure CI/CD com GitHub Actions para testes e deploy automatizados. Deploy seu frontend na Vercel, backend na Render ou Heroku, e use Cloudflare para performance global.
    
    Aprenda a criar pipelines robustas, implementar blue-green deployments, e garantir zero downtime. Sua aplicação estará disponível para o mundo com confiabilidade profissional!`,
    duration: 55,
    highlights: ["GitHub Actions", "CI/CD", "Vercel", "Cloudflare", "deploy", "automação"]
  },
  {
    phase: 8,
    title: "Monitoramento & Operação",
    narrationText: `Por fim, monitore e mantenha sua aplicação em produção com excelência.
    
    Use Sentry para tracking de erros, implemente analytics para entender o uso, Resend para emails transacionais, e Slack para notificações da equipe.
    
    Gerencie projetos com Linear ou GitHub Tasklists. Com monitoramento adequado, você identifica e resolve problemas antes que afetem seus usuários. Parabéns - você completou todo o fluxo de desenvolvimento moderno!`,
    duration: 40,
    highlights: ["Sentry", "analytics", "Resend", "Slack", "Linear", "monitoramento"]
  }
];
