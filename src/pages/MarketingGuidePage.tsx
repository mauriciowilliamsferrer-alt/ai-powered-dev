import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Megaphone, 
  Users, 
  DollarSign, 
  Rocket,
  Target,
  BookOpen,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import { MarketingCategoryCard } from "@/components/MarketingCategoryCard";
import { MarketingTipBox, MarketingChecklist } from "@/components/MarketingTipBox";
import { 
  marketingCategories, 
  messageTemplates, 
  pricingTips,
  digitalPresenceChecklist 
} from "@/data/marketingToolsData";

export default function MarketingGuidePage() {
  const [activeTab, setActiveTab] = useState("ferramentas");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Marketing & Divulgação
              </h1>
              <p className="text-sm text-muted-foreground">
                Aprenda a divulgar seu trabalho e conquistar clientes
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Desenvolvedores também precisam saber vender
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Não basta saber programar. Aprenda a divulgar seus projetos, conseguir clientes, 
              encontrar empregos, atrair investidores e construir uma carreira de sucesso.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Clientes</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm">Monetização</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border">
                <Rocket className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Investidores</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Networking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="ferramentas" className="text-xs sm:text-sm">
              <Megaphone className="h-4 w-4 mr-1.5 hidden sm:inline" />
              Ferramentas
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-xs sm:text-sm">
              <MessageSquare className="h-4 w-4 mr-1.5 hidden sm:inline" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="precificacao" className="text-xs sm:text-sm">
              <DollarSign className="h-4 w-4 mr-1.5 hidden sm:inline" />
              Preços
            </TabsTrigger>
            <TabsTrigger value="checklist" className="text-xs sm:text-sm">
              <CheckCircle2 className="h-4 w-4 mr-1.5 hidden sm:inline" />
              Checklist
            </TabsTrigger>
          </TabsList>

          {/* Tab: Ferramentas */}
          <TabsContent value="ferramentas" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">
                {marketingCategories.length} Categorias de Ferramentas
              </h3>
              <p className="text-muted-foreground">
                Clique em cada categoria para ver as ferramentas e dicas práticas
              </p>
            </div>
            <div className="grid gap-4">
              {marketingCategories.map((category) => (
                <MarketingCategoryCard key={category.id} category={category} />
              ))}
            </div>
          </TabsContent>

          {/* Tab: Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Templates de Mensagens
              </h3>
              <p className="text-muted-foreground">
                Use esses modelos como base para suas abordagens profissionais
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <MarketingTipBox 
                title="📧 Abordagem para Universidades" 
                content={messageTemplates.universidade}
                copyable
              />
              <MarketingTipBox 
                title="💰 Apresentação para Investidores" 
                content={messageTemplates.investidor}
                copyable
              />
              <MarketingTipBox 
                title="🤝 Proposta para Clientes" 
                content={messageTemplates.cliente}
                copyable
              />
              <MarketingTipBox 
                title="🔗 Proposta de Parceria" 
                content={messageTemplates.parceria}
                copyable
              />
            </div>
          </TabsContent>

          {/* Tab: Precificação */}
          <TabsContent value="precificacao" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Como Precificar seus Serviços
              </h3>
              <p className="text-muted-foreground">
                Dicas para cobrar o valor justo pelo seu trabalho
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Dicas de Precificação
                </CardTitle>
                <CardDescription>
                  Estratégias para definir preços que valorizam seu trabalho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pricingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-800">Iniciante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-700 mb-2">R$ 50-100/h</p>
                  <p className="text-sm text-green-600">Primeiros projetos, construindo portfólio</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-blue-800">Intermediário</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-700 mb-2">R$ 100-200/h</p>
                  <p className="text-sm text-blue-600">2+ anos, projetos de referência</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-purple-800">Especialista</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-purple-700 mb-2">R$ 200-500/h</p>
                  <p className="text-sm text-purple-600">Expert reconhecido, resultados comprovados</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Checklist */}
          <TabsContent value="checklist" className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Checklist de Presença Digital
              </h3>
              <p className="text-muted-foreground">
                Marque os itens que você já completou
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <MarketingChecklist 
                title="Sua Presença Digital" 
                items={digitalPresenceChecklist}
              />
            </div>

            <Card className="max-w-2xl mx-auto mt-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Próximos Passos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary">1.</span>
                    Complete todos os itens de alta prioridade primeiro
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary">2.</span>
                    Escolha 2-3 redes sociais para focar
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary">3.</span>
                    Crie um calendário de conteúdo semanal
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary">4.</span>
                    Comece a postar e interagir diariamente
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary">5.</span>
                    Revise e ajuste sua estratégia mensalmente
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer CTA */}
      <section className="py-12 bg-muted/50 border-t">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Pronto para começar?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Use as ferramentas certas, aplique as dicas e comece a construir sua presença digital hoje.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/projetos">
                🎯 Sugestões de Projetos com IA
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/indice">
                📚 Ver Índice de Ferramentas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
