import { useState, useMemo } from "react";
import { Tool } from "@/data/workflowData";
import { ProjectPhase } from "@/data/workflowDataOptimized";
import { ToolSequenceCard } from "./ToolSequenceCard";
import { PhaseNavigator } from "./PhaseNavigator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Target, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WorkflowSequenceProps {
  tools: Tool[];
  phases: ProjectPhase[];
  onFavorite?: (toolName: string) => void;
  favoriteTools?: string[];
}

export const WorkflowSequence = ({ 
  tools, 
  phases, 
  onFavorite,
  favoriteTools = []
}: WorkflowSequenceProps) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedPathType, setSelectedPathType] = useState<'completo' | 'mvp' | 'low-code' | 'ai-first'>('completo');

  // Organize tools by phase and sequence
  const sequencedTools = useMemo(() => {
    return tools
      .filter(tool => tool.sequenceNumber !== undefined)
      .sort((a, b) => (a.sequenceNumber || 0) - (b.sequenceNumber || 0));
  }, [tools]);

  // Filter by selected phase
  const filteredTools = useMemo(() => {
    if (selectedPhase === 'all') return sequencedTools;
    return sequencedTools.filter(tool => tool.phase === selectedPhase);
  }, [sequencedTools, selectedPhase]);

  // Group tools by phase
  const toolsByPhase = useMemo(() => {
    const grouped: Record<string, Tool[]> = {};
    sequencedTools.forEach(tool => {
      const phase = tool.phase || 'other';
      if (!grouped[phase]) grouped[phase] = [];
      grouped[phase].push(tool);
    });
    return grouped;
  }, [sequencedTools]);

  // Count tools per phase
  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    phases.forEach(phase => {
      counts[phase.id] = toolsByPhase[phase.id]?.length || 0;
    });
    return counts;
  }, [phases, toolsByPhase]);

  const handleToolClick = (toolName: string) => {
    const tool = tools.find(t => t.name === toolName);
    if (tool?.phase) {
      setSelectedPhase(tool.phase);
      setTimeout(() => {
        const element = document.getElementById(`tool-${toolName}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const exportStack = () => {
    const markdown = `# Stack Tecnológico

## Ferramentas Selecionadas

${sequencedTools.map(tool => `
### ${tool.sequenceNumber}. ${tool.name}
- **Categoria**: ${tool.category}
- **Fase**: ${tool.phase}
- **URL**: ${tool.url}
- **Uso**: ${tool.usage}
${tool.useCases ? `- **Casos de uso**: ${tool.useCases.join(', ')}` : ''}
${tool.setupTime ? `- **Tempo de setup**: ${tool.setupTime}` : ''}
${tool.monthlyCost ? `- **Custo mensal**: ${tool.monthlyCost}` : ''}
`).join('\n')}
`;
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stack-tecnologico.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Fluxo Completo: Ideia → Produção
          </CardTitle>
          <CardDescription>
            Roadmap sequencial com {sequencedTools.length} ferramentas organizadas em {phases.length} fases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportStack}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar Stack
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Phase Navigator */}
      <PhaseNavigator 
        phases={phases}
        selectedPhase={selectedPhase}
        onPhaseSelect={setSelectedPhase}
        toolCounts={toolCounts}
      />

      {/* Tools Timeline */}
      <div className="space-y-6">
        {selectedPhase === 'all' ? (
          // Show all phases with dividers
          phases.map((phase, phaseIdx) => {
            const phaseTools = toolsByPhase[phase.id] || [];
            if (phaseTools.length === 0) return null;

            return (
              <div key={phase.id} className="space-y-4">
                {/* Phase Header */}
                <div className="flex items-center gap-3 sticky top-0 z-10 bg-background/95 backdrop-blur py-3 border-b">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${phase.color}20` }}
                  >
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: phase.color }}>
                      {phase.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                  <Badge variant="secondary">
                    {phaseTools.length} {phaseTools.length === 1 ? 'ferramenta' : 'ferramentas'}
                  </Badge>
                </div>

                {/* Phase Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4">
                  {phaseTools.map((tool) => (
                    <div key={tool.name} id={`tool-${tool.name}`}>
                      <ToolSequenceCard 
                        tool={tool}
                        onFavorite={onFavorite}
                        isFavorited={favoriteTools.includes(tool.name)}
                        onToolClick={handleToolClick}
                      />
                    </div>
                  ))}
                </div>

                {/* Phase Divider */}
                {phaseIdx < phases.length - 1 && (
                  <div className="flex items-center justify-center py-4">
                    <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          // Show single phase
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <div key={tool.name} id={`tool-${tool.name}`}>
                <ToolSequenceCard 
                  tool={tool}
                  onFavorite={onFavorite}
                  isFavorited={favoriteTools.includes(tool.name)}
                  onToolClick={handleToolClick}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Key Takeaways */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Dicas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="mr-2">💡</span>
              <span>Não precisa usar todas as ferramentas - escolha as que fazem sentido para seu projeto</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔄</span>
              <span>O fluxo não é linear - você pode voltar e iterar entre fases</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⚡</span>
              <span>Para MVPs rápidos, foque em Ideação → Desenvolvimento → Deploy</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎯</span>
              <span>Invista tempo na fase de Planejamento para evitar retrabalho depois</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔧</span>
              <span>Configure CI/CD desde o início para automatizar qualidade e deploy</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
