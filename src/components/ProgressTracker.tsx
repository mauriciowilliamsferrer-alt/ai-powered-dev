import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Trophy, Clock, Target, CheckCircle, Circle, Download } from "lucide-react";
import { WorkflowStage, Action } from "@/data/workflowData";

interface ProgressData {
  completedActions: string[];
  stageProgress: Record<string, number>;
  lastUpdated: string;
  achievements: string[];
}

interface ProgressTrackerProps {
  stages: WorkflowStage[];
  actions: Action[];
}

export const ProgressTracker = ({ stages, actions }: ProgressTrackerProps) => {
  const [progressData, setProgressData] = useState<ProgressData>({
    completedActions: [],
    stageProgress: {},
    lastUpdated: new Date().toISOString(),
    achievements: []
  });

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workflow-progress');
    if (saved) {
      try {
        setProgressData(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newData: ProgressData) => {
    setProgressData(newData);
    localStorage.setItem('workflow-progress', JSON.stringify(newData));
  };

  // Toggle action completion
  const toggleAction = (actionKey: string, stageId: string) => {
    const newCompleted = progressData.completedActions.includes(actionKey)
      ? progressData.completedActions.filter(id => id !== actionKey)
      : [...progressData.completedActions, actionKey];

    const stageActions = actions.filter(a => a.stage === stageId);
    const completedStageActions = stageActions.filter(a => 
      newCompleted.includes(`${a.stage}-${a.action}`)
    );
    const stageProgressPercent = (completedStageActions.length / stageActions.length) * 100;

    const newAchievements = [...progressData.achievements];
    
    // Add achievement for completing a stage
    if (stageProgressPercent === 100 && !newAchievements.includes(`stage-${stageId}`)) {
      newAchievements.push(`stage-${stageId}`);
    }

    // Add achievement for first action
    if (newCompleted.length === 1 && !newAchievements.includes('first-action')) {
      newAchievements.push('first-action');
    }

    // Add achievement for 50% overall progress
    const totalActions = actions.length;
    const overallProgress = (newCompleted.length / totalActions) * 100;
    if (overallProgress >= 50 && !newAchievements.includes('halfway')) {
      newAchievements.push('halfway');
    }

    const newData = {
      ...progressData,
      completedActions: newCompleted,
      stageProgress: {
        ...progressData.stageProgress,
        [stageId]: stageProgressPercent
      },
      lastUpdated: new Date().toISOString(),
      achievements: newAchievements
    };

    saveProgress(newData);
  };

  // Calculate overall statistics
  const totalActions = actions.length;
  const completedActionsCount = progressData.completedActions.length;
  const overallProgress = totalActions > 0 ? (completedActionsCount / totalActions) * 100 : 0;
  const completedStages = Object.values(progressData.stageProgress).filter(p => p === 100).length;

  // Export progress report
  const exportProgress = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      overall: {
        totalStages: stages.length,
        completedStages,
        totalActions,
        completedActions: completedActionsCount,
        overallProgress: Math.round(overallProgress)
      },
      stageDetails: stages.map(stage => ({
        id: stage.id,
        title: stage.title,
        progress: progressData.stageProgress[stage.id] || 0,
        actions: actions.filter(a => a.stage === stage.id).map(action => ({
          action: action.action,
          completed: progressData.completedActions.includes(`${action.stage}-${action.action}`)
        }))
      })),
      achievements: progressData.achievements
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getAchievementDetails = (achievement: string) => {
    switch (achievement) {
      case 'first-action':
        return { name: 'Primeiro Passo', description: 'Completou sua primeira ação!' };
      case 'halfway':
        return { name: 'Meio Caminho', description: 'Completou 50% do workflow!' };
      default:
        if (achievement.startsWith('stage-')) {
          const stageId = achievement.replace('stage-', '');
          const stage = stages.find(s => s.id === stageId);
          return { 
            name: `Etapa ${stageId} Completa`, 
            description: stage ? `Concluiu: ${stage.title}` : 'Etapa concluída!'
          };
        }
        return { name: 'Conquista', description: 'Parabéns!' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Etapas Completas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedStages}/{stages.length}</div>
            <p className="text-xs text-muted-foreground">etapas finalizadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ações Completas</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedActionsCount}/{totalActions}</div>
            <p className="text-xs text-muted-foreground">ações executadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressData.achievements.length}</div>
            <p className="text-xs text-muted-foreground">marcos alcançados</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      {progressData.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Conquistas Desbloqueadas</span>
            </CardTitle>
            <CardDescription>
              Parabéns pelos marcos alcançados no seu workflow!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {progressData.achievements.map((achievement) => {
                const details = getAchievementDetails(achievement);
                return (
                  <Badge key={achievement} variant="secondary" className="flex items-center space-x-1">
                    <Trophy className="h-3 w-3" />
                    <span>{details.name}</span>
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Progresso por Etapa</CardTitle>
            <CardDescription>
              Acompanhe seu avanço em cada etapa do workflow
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportProgress}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {stages.map((stage) => {
            const stageActions = actions.filter(a => a.stage === stage.id);
            const stageProgress = progressData.stageProgress[stage.id] || 0;
            const completedCount = stageActions.filter(action => 
              progressData.completedActions.includes(`${action.stage}-${action.action}`)
            ).length;

            return (
              <div key={stage.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{stage.id}. {stage.title}</h4>
                    <p className="text-sm text-muted-foreground">{stage.objective}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{Math.round(stageProgress)}%</div>
                    <div className="text-xs text-muted-foreground">
                      {completedCount}/{stageActions.length} ações
                    </div>
                  </div>
                </div>
                <Progress value={stageProgress} className="h-2" />
                
                {/* Stage Actions Checklist */}
                <div className="ml-4 space-y-2">
                  {stageActions.map((action) => {
                    const actionKey = `${action.stage}-${action.action}`;
                    const isCompleted = progressData.completedActions.includes(actionKey);
                    
                    return (
                      <div key={actionKey} className="flex items-start space-x-2">
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => toggleAction(actionKey, stage.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {action.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{action.expectedResult}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Last Updated */}
      {progressData.lastUpdated && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Última atualização: {new Date(progressData.lastUpdated).toLocaleString()}</span>
          </p>
        </div>
      )}
    </div>
  );
};