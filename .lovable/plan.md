
# Mecanismo de Alerta para Novidades

## Contexto Atual

O projeto ja possui:
- **139 ferramentas** marcadas com `isNew: true` no `toolsIndex.ts`
- Export `newTools` que filtra todas as ferramentas novas
- Indicador visual no `FloatingIndexButton` (bolinha verde pulsante)
- Badge "Novo" exibido nos cards de ferramentas

O que falta:
- Persistencia de quais novidades o usuario ja visualizou
- Notificacao/alerta ao entrar no site com novidades nao vistas
- Historico de quando as ferramentas foram adicionadas
- Componente de destaque para novidades

## Arquitetura Proposta

```text
+----------------------------------+
|  USUARIO ENTRA NO SITE           |
+----------------------------------+
           |
           v
+----------------------------------+
|  VERIFICA localStorage           |
|  (seen-tools: [id1, id2, ...])  |
+----------------------------------+
           |
           v
+----------------------------------+
|  COMPARA COM newTools            |
|  unseenCount = newTools - seen   |
+----------------------------------+
           |
           v
+----------------------------------+
|  SE unseenCount > 0:             |
|  - Mostrar alerta/banner         |
|  - Atualizar FloatingButton      |
|  - Destacar na navegacao         |
+----------------------------------+
```

## Componentes a Criar

### 1. Hook useNewToolsAlert

Gerencia o estado de novidades vistas/nao vistas:

```typescript
interface NewToolsState {
  seenToolIds: number[];       // IDs de ferramentas ja visualizadas
  lastSeenDate: string;        // Data da ultima visita
  unseenCount: number;         // Quantas novidades nao vistas
  unseenTools: IndexedTool[];  // Lista de ferramentas nao vistas
}

const useNewToolsAlert = () => {
  // Carregar do localStorage
  // Comparar com newTools atual
  // Retornar estado e funcoes para marcar como visto
};
```

### 2. Componente NewToolsBanner

Banner de alerta que aparece na pagina inicial:

```text
+--------------------------------------------------+
| NOVIDADES! 12 novas ferramentas desde sua        |
| ultima visita                                     |
|                                                   |
| [Ver Novidades]          [Dispensar]              |
+--------------------------------------------------+
```

### 3. Componente NewToolsDrawer/Modal

Lista detalhada das novidades nao vistas:

```text
+----------------------------------+
|  Novidades em 2025               |
|  12 ferramentas novas            |
+----------------------------------+
|                                  |
|  [x] Cursor IDE                  |
|      Editor AI-first...          |
|                                  |
|  [ ] Windsurf                    |
|      IDE da Codeium...           |
|                                  |
|  [ ] Zed                         |
|      Editor em Rust...           |
|                                  |
+----------------------------------+
|  [Marcar todas como vistas]      |
+----------------------------------+
```

### 4. FloatingIndexButton Atualizado

Adicionar badge com contagem de nao vistos:

```text
ANTES:
[268] (bolinha verde)

DEPOIS:
[268] (badge vermelho "12 novas")
```

## Arquivos a Criar

```text
src/hooks/useNewToolsAlert.tsx    # Hook de gerenciamento de estado
src/components/NewToolsBanner.tsx  # Banner de alerta no topo
src/components/NewToolsDrawer.tsx  # Drawer/modal com lista de novidades
```

## Arquivos a Modificar

```text
src/data/toolsIndex.ts            # Adicionar campo addedDate (opcional)
src/components/FloatingIndexButton.tsx  # Integrar com hook de alertas
src/pages/LandingPage.tsx         # Adicionar NewToolsBanner
src/App.tsx                       # Context provider (opcional)
```

## Fluxo de Usuario

### Primeira Visita
1. Usuario entra no site
2. Nenhum dado no localStorage
3. Todas as `newTools` sao consideradas "nao vistas"
4. Banner aparece: "12 novas ferramentas para explorar!"
5. Usuario clica em "Ver Novidades"
6. Drawer abre com lista das novidades
7. Usuario pode marcar individualmente ou "marcar todas"
8. IDs sao salvos no localStorage

### Visitas Subsequentes
1. Usuario volta ao site
2. Sistema compara `newTools` com `seenToolIds`
3. Se novas ferramentas foram adicionadas: mostrar banner
4. Se todas ja foram vistas: nao mostrar nada

### Adicionar Nova Ferramenta (Dev)
1. Dev adiciona ferramenta com `isNew: true`
2. Na proxima visita do usuario, ela aparece como "nao vista"
3. Sistema detecta automaticamente

## Estrutura de Dados no localStorage

```json
{
  "new-tools-seen": {
    "seenIds": [62, 253, 255, 264, 265, 266, 267, 271, ...],
    "lastVisit": "2025-02-08T10:30:00.000Z",
    "dismissedBanner": false
  }
}
```

## Interface do Hook

```typescript
interface UseNewToolsAlertReturn {
  // Estado
  unseenTools: IndexedTool[];
  unseenCount: number;
  hasUnseenTools: boolean;
  
  // Acoes
  markToolAsSeen: (toolId: number) => void;
  markAllAsSeen: () => void;
  dismissBanner: () => void;
  resetSeenTools: () => void;
  
  // UI
  showBanner: boolean;
}
```

## Componente NewToolsBanner

```typescript
interface NewToolsBannerProps {
  onViewClick: () => void;
  onDismiss: () => void;
}

const NewToolsBanner = ({ onViewClick, onDismiss }: NewToolsBannerProps) => {
  const { unseenCount, showBanner } = useNewToolsAlert();
  
  if (!showBanner) return null;
  
  return (
    <Alert className="fixed top-0 left-0 right-0 z-50">
      <Sparkles className="h-4 w-4" />
      <AlertTitle>Novidades!</AlertTitle>
      <AlertDescription>
        {unseenCount} novas ferramentas desde sua ultima visita
      </AlertDescription>
      <Button onClick={onViewClick}>Ver Novidades</Button>
      <Button variant="ghost" onClick={onDismiss}>Dispensar</Button>
    </Alert>
  );
};
```

## Integracao com FloatingIndexButton

```typescript
export const FloatingIndexButton = () => {
  const { unseenCount, hasUnseenTools } = useNewToolsAlert();
  
  return (
    <Button className="relative">
      <BookOpen />
      <span className="badge">{allTools.length}</span>
      
      {/* Badge de novidades nao vistas */}
      {hasUnseenTools && (
        <span className="absolute -top-2 -left-2 bg-red-500 text-white 
                         text-[10px] rounded-full px-1.5 animate-bounce">
          {unseenCount}
        </span>
      )}
    </Button>
  );
};
```

## Secao Tecnica

### Hook useNewToolsAlert Completo

```typescript
import { useState, useEffect, useCallback, useMemo } from 'react';
import { newTools, IndexedTool } from '@/data/toolsIndex';

const STORAGE_KEY = 'new-tools-seen';

interface StoredData {
  seenIds: number[];
  lastVisit: string;
  dismissedBanner: boolean;
}

export const useNewToolsAlert = () => {
  const [data, setData] = useState<StoredData>({
    seenIds: [],
    lastVisit: new Date().toISOString(),
    dismissedBanner: false
  });
  
  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch {
        // Ignorar erro de parse
      }
    }
  }, []);
  
  // Salvar no localStorage
  const saveData = useCallback((newData: StoredData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);
  
  // Ferramentas nao vistas
  const unseenTools = useMemo(() => 
    newTools.filter(tool => !data.seenIds.includes(tool.id)),
    [data.seenIds]
  );
  
  // Marcar como vista
  const markToolAsSeen = useCallback((toolId: number) => {
    if (!data.seenIds.includes(toolId)) {
      saveData({
        ...data,
        seenIds: [...data.seenIds, toolId],
        lastVisit: new Date().toISOString()
      });
    }
  }, [data, saveData]);
  
  // Marcar todas como vistas
  const markAllAsSeen = useCallback(() => {
    saveData({
      ...data,
      seenIds: newTools.map(t => t.id),
      lastVisit: new Date().toISOString(),
      dismissedBanner: true
    });
  }, [data, saveData]);
  
  return {
    unseenTools,
    unseenCount: unseenTools.length,
    hasUnseenTools: unseenTools.length > 0,
    showBanner: unseenTools.length > 0 && !data.dismissedBanner,
    markToolAsSeen,
    markAllAsSeen,
    dismissBanner: () => saveData({ ...data, dismissedBanner: true }),
    resetSeenTools: () => saveData({ 
      seenIds: [], 
      lastVisit: new Date().toISOString(),
      dismissedBanner: false 
    })
  };
};
```

## Fases de Implementacao

### Fase 1: Hook e Persistencia
- Criar `useNewToolsAlert.tsx`
- Implementar logica de localStorage
- Testes unitarios

### Fase 2: Componentes Visuais
- Criar `NewToolsBanner.tsx`
- Criar `NewToolsDrawer.tsx`
- Estilizacao com Tailwind

### Fase 3: Integracao
- Atualizar `FloatingIndexButton.tsx`
- Adicionar banner na `LandingPage.tsx`
- Testar fluxo completo

### Fase 4: UX Polish
- Animacoes de entrada/saida
- Transicoes suaves
- Acessibilidade (a11y)

## Beneficios

1. **Engajamento**: Usuarios voltam para ver novidades
2. **Descoberta**: Ferramentas novas ganham destaque
3. **Retencao**: Motivo para revisitar o site
4. **Personalizacao**: Experiencia adaptada ao usuario
5. **Metricas**: Possivel rastrear quais ferramentas geram interesse
