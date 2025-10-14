import { RoadmapPhase } from "./RoadmapPhase";
import { ArrowDown } from "lucide-react";

const roadmapPhases = [
  {
    phase: 1,
    title: "Fundamentos & Setup",
    description: "Configuração inicial do ambiente de desenvolvimento e princípios fundamentais",
    tools: [
      { name: "Twelve-Factor App", category: "Principles" },
      { name: "SOLID", category: "Principles" },
      { name: ".gitignore", category: "Config" },
      { name: "Environment Variables", category: "Config" },
      { name: "SSH", category: "Security" },
      { name: "GitHub", category: "VCS" },
      { name: "Warp Terminal", category: "Terminal" }
    ],
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    phase: 2,
    title: "Ambiente de Desenvolvimento",
    description: "Setup de IDE, assistentes AI e metodologias de código",
    tools: [
      { name: "VS Code", category: "IDE" },
      { name: "GitHub Copilot", category: "AI" },
      { name: "Cline", category: "AI" },
      { name: "Code Calisthenics", category: "Standards" }
    ],
    color: "bg-secondary/10 text-secondary-foreground border-secondary/20"
  },
  {
    phase: 3,
    title: "Prototipagem & Core Stack",
    description: "Criação de UI/UX e configuração da stack principal de desenvolvimento",
    tools: [
      { name: "Quest AI", category: "Design" },
      { name: "Node.js", category: "Runtime" },
      { name: "NPM", category: "Package Manager" },
      { name: "React", category: "Framework" },
      { name: "Vite", category: "Build Tool" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" }
    ],
    color: "bg-accent/10 text-accent-foreground border-accent/20"
  },
  {
    phase: 4,
    title: "Backend & Database",
    description: "Implementação de backend, banco de dados e APIs",
    tools: [
      { name: "PostgreSQL", category: "Database" },
      { name: "Drizzle ORM", category: "ORM" },
      { name: "Supabase", category: "BaaS" },
      { name: "JWT", category: "Auth" },
      { name: "API Tokens", category: "Security" },
      { name: "GPT-5", category: "AI API" },
      { name: "Claude", category: "AI API" }
    ],
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    phase: 5,
    title: "Desenvolvimento Agentic",
    description: "Aceleração com AI agents para code review e automação",
    tools: [
      { name: "Jules", category: "AI Agent" },
      { name: "CodeRabbit", category: "Code Review" },
      { name: "Augment", category: "AI Assistant" },
      { name: "Blackbox AI", category: "AI Assistant" },
      { name: "Pull Requests", category: "Workflow" }
    ],
    color: "bg-secondary/10 text-secondary-foreground border-secondary/20"
  },
  {
    phase: 6,
    title: "Testing & Quality",
    description: "Testes automatizados, CI/CD e garantia de qualidade",
    tools: [
      { name: "Vitest", category: "Unit Testing" },
      { name: "Cypress", category: "E2E" },
      { name: "Playwright", category: "E2E" },
      { name: "TestSprite", category: "AI Testing" },
      { name: "Qodo", category: "CI/CD Quality" },
      { name: "Sentry", category: "Error Tracking" }
    ],
    color: "bg-accent/10 text-accent-foreground border-accent/20"
  },
  {
    phase: 7,
    title: "Deployment Pipeline",
    description: "CI/CD, hosting e entrega contínua",
    tools: [
      { name: "GitHub Actions", category: "CI/CD" },
      { name: "Vercel", category: "Hosting" },
      { name: "Render", category: "Hosting" },
      { name: "Heroku", category: "PaaS" },
      { name: "Cloudflare", category: "CDN" },
      { name: "AWS S3", category: "Storage" },
      { name: ".dockerignore", category: "Config" }
    ],
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    phase: 8,
    title: "Monitoramento & Operação",
    description: "Observabilidade, comunicação e gestão de projetos",
    tools: [
      { name: "Sentry", category: "Monitoring" },
      { name: "Resend", category: "Email" },
      { name: "Linear", category: "Project Mgmt" },
      { name: "GitHub Tasklists", category: "Tasks" },
      { name: "PRD Pipeline", category: "Documentation" }
    ],
    color: "bg-secondary/10 text-secondary-foreground border-secondary/20"
  }
];

interface InteractiveRoadmapProps {
  activeTutorialPhase?: number;
}

export const InteractiveRoadmap = ({ activeTutorialPhase }: InteractiveRoadmapProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Roadmap de Desenvolvimento
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sequência lógica de ferramentas e práticas para desenvolvimento web moderno.
            Clique em cada fase para ver detalhes.
          </p>
        </div>

        <div className="space-y-6">
          {roadmapPhases.map((phase, idx) => (
            <div key={phase.phase} className="relative" id={`phase-${phase.phase}`}>
              <RoadmapPhase 
                {...phase} 
                isActiveTutorial={activeTutorialPhase === phase.phase - 1}
              />
              
              {idx < roadmapPhases.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg bg-primary/5 border border-primary/20">
          <h3 className="text-xl font-semibold mb-3">🎯 Pontos-Chave</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Segurança primeiro:</strong> Configure SSH, env vars e tokens antes de começar o desenvolvimento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>AI como acelerador:</strong> Use assistentes desde o início para ganhar produtividade</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Testing contínuo:</strong> Implemente testes desde a Fase 3, não deixe para o final</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span><strong>Deploy cedo:</strong> Configure CI/CD na Fase 7 mesmo antes do MVP completo</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
