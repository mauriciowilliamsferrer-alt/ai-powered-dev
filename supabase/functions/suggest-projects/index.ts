import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Lista simplificada de ferramentas para o contexto da IA
const toolsContext = `
Ferramentas disponíveis (ID - Nome - Descrição):
1-9: Pesquisa de Mercado (ComprasNet, Google Trends, Product Hunt, Reddit, Indie Hackers)
10-14: Ideação com IA (ChatGPT, Claude AI, Gemini, Perplexity, Groq)
15-23: Boas Práticas (SOLID, Clean Architecture, TDD, BDD, DRY, KISS, YAGNI)
24-29: Documentação (PRD, ADR, Notion, Linear, dbdiagram.io, Miro)
30-34: Prototipagem & UI (Figma, v0.dev, Framer AI, Uizard, Galileo AI)
35-38: Design (Canva, Photopea, Adobe XD, Sketch)
39-49: IA Generativa - Imagens e Vídeos (Midjourney, DALL-E 3, Leonardo.ai, Stable Diffusion, Runway, Pika Labs, Sora)
50-54: Assets (Lucide Icons, Heroicons, Phosphor Icons, Unsplash, Pexels)
55-58: Builders No-Code (Lovable, bolt.new, Replit AI, Leap.new)
59-62: IDEs com IA (Cursor, VS Code, JetBrains, Windsurf)
63-67: Agentes de Código (GitHub Copilot, Claude Code, Aider, Cline, Amazon Q)
68-74: Backend & Database (Supabase, Firebase, PlanetScale, Neon, Pinecone, Weaviate)
75-79: Qualidade & Testes (CodeRabbit, Qodo.ai, GitHub Actions, Sentry)
80-87: Deploy & Infra (Vercel, Netlify, Railway, Render, Cloudflare, AWS S3, Upstash)
88-91: Analytics (Google Analytics, Mixpanel, PostHog, Hotjar)
92-96: IA Local (Ollama, LM Studio, Jan, LocalAI, AnythingLLM)
97-105: APIs de LLM (OpenAI API, Anthropic API, Google AI, Replicate, Together.ai, OpenRouter)
`;

const durationDescriptions: Record<string, string> = {
  "1-dia": "projeto rápido para praticar fundamentos, pode ser feito em algumas horas",
  "1-semana": "mini-projeto funcional com 2-3 features principais",
  "1-mes": "projeto com várias features, autenticação básica, deploy",
  "3-meses": "MVP completo, pronto para primeiros usuários beta",
  "6-meses": "produto com múltiplas funcionalidades, monetização, escala inicial",
  "1-ano": "produto maduro com analytics, otimizações e base de usuários",
  "2-anos": "startup com equipe pequena, product-market fit",
  "3-anos": "empresa consolidada com processos e crescimento",
  "5-anos": "empresa estabelecida com múltiplos produtos ou mercados",
  "10-anos": "grande empresa com impacto significativo no mercado",
  "20-anos": "legado duradouro, empresa referência na indústria"
};

const levelDescriptions: Record<string, string> = {
  "iniciante": "pessoa que está começando a programar, conhece conceitos básicos de HTML/CSS/JS",
  "intermediario": "desenvolvedor que já criou alguns projetos, conhece frameworks como React",
  "avancado": "desenvolvedor experiente que domina arquitetura, DevOps e boas práticas"
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { level, duration } = await req.json();
    
    if (!level || !duration) {
      return new Response(
        JSON.stringify({ error: "Parâmetros 'level' e 'duration' são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não está configurada");
    }

    const levelDesc = levelDescriptions[level] || level;
    const durationDesc = durationDescriptions[duration] || duration;

    const systemPrompt = `Você é um mentor de desenvolvimento de software especializado em sugerir projetos práticos.

${toolsContext}

REGRAS IMPORTANTES:
1. Sugira projetos REALISTAS para a duração especificada
2. Use APENAS IDs de ferramentas da lista acima (1-105)
3. Para iniciantes, foque em ferramentas mais simples (Lovable, Figma, Supabase)
4. Para avançados, inclua práticas como TDD, CI/CD, arquitetura
5. Cada projeto deve ter uma proposta de valor clara
6. As etapas devem ser progressivas e alcançáveis`;

    const userPrompt = `Gere 3 sugestões de projetos para:
- Nível: ${level} (${levelDesc})
- Duração: ${duration} (${durationDesc})

Os projetos devem ser práticos, com potencial real de uso, e adequados ao nível do desenvolvedor.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_projects",
              description: "Retorna 3 sugestões de projetos personalizadas",
              parameters: {
                type: "object",
                properties: {
                  projects: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { 
                          type: "string",
                          description: "Título criativo e descritivo do projeto"
                        },
                        description: { 
                          type: "string",
                          description: "Descrição clara do projeto em 2-3 frases, explicando o que faz e para quem"
                        },
                        toolIds: { 
                          type: "array", 
                          items: { type: "number" },
                          description: "IDs das ferramentas recomendadas (usar apenas IDs da lista fornecida)"
                        },
                        steps: { 
                          type: "array", 
                          items: { type: "string" },
                          description: "4-6 etapas principais do desenvolvimento"
                        },
                        skills: { 
                          type: "array", 
                          items: { type: "string" },
                          description: "3-5 skills que o usuário vai desenvolver"
                        },
                        difficulty: {
                          type: "string",
                          enum: ["facil", "medio", "desafiador"],
                          description: "Nível de dificuldade dentro da categoria escolhida"
                        }
                      },
                      required: ["title", "description", "toolIds", "steps", "skills", "difficulty"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["projects"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "suggest_projects" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados. Adicione mais créditos para continuar." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`Erro na API de IA: ${response.status}`);
    }

    const data = await response.json();
    
    // Extrair os projetos do tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("Resposta da IA não contém projetos");
    }

    const projects = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(projects),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in suggest-projects:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
